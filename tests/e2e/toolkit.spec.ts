import { test, expect } from '@playwright/test';

test.describe('Developer Toolkit Page', () => {
  test('has correct title and meta description', async ({ page }) => {
    await page.goto('/toolkit');
    await expect(page).toHaveTitle(/Developer Toolkit/);
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', 'Centralized page for developer tools, categorized and ready to launch.');
  });

  test('renders all tools with launch buttons', async ({ page }) => {
    await page.goto('/toolkit');

    const launchButtons = page.locator('button:has-text("Launch")');
    await expect(launchButtons).toHaveCount(5);

    const toolNames = ['ESLint', 'Prettier', 'Vitest', 'Storybook', 'Docker'];
    for (const name of toolNames) {
      await expect(page.locator(`text=${name}`)).toBeVisible();
    }

    const categories = ['Linting', 'Formatting', 'Testing', 'UI Development', 'Containerization'];
    for (const cat of categories) {
      await expect(page.locator(`text=${cat}`)).toBeVisible();
    }
  });

  test('mobile viewport shows single column grid', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/toolkit');

    const grid = page.locator('.grid');
    await expect(grid).toHaveClass(/grid-cols-1/);
    await expect(page.locator('button:has-text("Launch")').first()).toBeVisible();
  });

  test('launch button opens URL in new tab', async ({ page }) => {
    await page.goto('/toolkit');

    await page.evaluate(() => {
      (window as any).lastOpenedUrl = null;
      const originalOpen = window.open;
      window.open = (url: string) => {
        (window as any).lastOpenedUrl = url;
      };
    });

    const firstLaunchButton = page.locator('button:has-text("Launch")').first();
    await firstLaunchButton.click();

    const lastOpenedUrl = await page.evaluate(() => (window as any).lastOpenedUrl);
    expect(lastOpenedUrl).toBe('https://eslint.org');
  });
});
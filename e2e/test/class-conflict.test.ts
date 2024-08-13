import { test, expect } from '@playwright/test';

test('Class conflict resolution works correctly', async ({ page }) => {
  await page.goto('http://localhost:4000');
  await page.waitForSelector('[data-testid="e2e-test-span"]');
  const div = page.locator('[data-testid="e2e-test-span"]');
  await div.evaluate((node) => node.classList.add('test_conflict'));
  await expect(div).toHaveCSS('font-size', '14px');
});

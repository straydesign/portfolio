import { test, expect } from 'playwright/test';

test.describe('Smoke Tests', () => {
  test('home page loads successfully with 200 status', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('page title is correct', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Tom Sesler/);
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto('/');
    // The hero heading "PRODUCT DESIGNER" is rendered character-by-character
    // with aria-label on the h1
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
    await expect(hero).toContainText('PRODUCT DESIGNER');
  });

  test('work section heading is visible', async ({ page }) => {
    await page.goto('/');
    const workHeading = page.getByRole('heading', { name: 'WORK', exact: true });
    await expect(workHeading).toBeVisible();
  });

  test('project cards are visible', async ({ page }) => {
    await page.goto('/');
    // Each project has a title — check at least one exists
    const projectCard = page.getByText('MERCHANDISING SYSTEM');
    await expect(projectCard).toBeVisible();
  });

  test('kind words / recommendations section is visible', async ({ page }) => {
    await page.goto('/');
    const kindWords = page.getByRole('heading', { name: 'KIND WORDS' });
    await expect(kindWords).toBeVisible();
  });

  test('get in touch section is visible', async ({ page }) => {
    await page.goto('/');
    const getInTouch = page.getByRole('heading', { name: 'GET IN TOUCH' });
    await expect(getInTouch).toBeVisible();
  });

  test('footer is visible', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("LET'S WORK TOGETHER");
  });

  test('skip-to-content link exists', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('main content landmark exists', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();
  });
});

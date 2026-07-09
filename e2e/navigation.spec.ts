import { test, expect } from 'playwright/test';

test.describe('Navigation', () => {
  test.describe('Desktop navigation', () => {
    test('desktop nav links are visible', async ({ page }) => {
      await page.goto('/');
      // Desktop nav is hidden on mobile (md:flex), ensure we have a wide viewport
      await page.setViewportSize({ width: 1280, height: 720 });

      const workLink = page.locator('nav button', { hasText: 'WORK' });
      const resumeLink = page.locator('nav button', { hasText: 'RESUME' });
      const aboutLink = page.locator('nav button', { hasText: 'ABOUT' });

      await expect(workLink).toBeVisible();
      await expect(resumeLink).toBeVisible();
      await expect(aboutLink).toBeVisible();
    });

    test('clicking RESUME navigates to resume page', async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      const resumeLink = page.locator('nav button', { hasText: 'RESUME' });
      await resumeLink.click();

      // URL should change to /resume
      await expect(page).toHaveURL(/\/resume/);
    });

    test('clicking ABOUT scrolls to the about section', async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      const aboutLink = page.locator('nav button', { hasText: 'ABOUT' });
      await aboutLink.click();

      // Single page now — the about section scrolls into view
      const aboutSection = page.locator('section#about');
      await expect(aboutSection).toBeInViewport({ timeout: 10_000 });
    });

    test('clicking WORK from the resume page returns home and scrolls to work', async ({ page }) => {
      await page.goto('/resume');
      await page.setViewportSize({ width: 1280, height: 720 });

      const workLink = page.locator('nav button', { hasText: 'WORK' });
      await workLink.click();

      await expect(page).toHaveURL('/');
      const workSection = page.locator('section#work');
      await expect(workSection).toBeInViewport({ timeout: 10_000 });
    });
  });

  test.describe('Mobile navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
    });

    test('mobile menu button is visible', async ({ page }) => {
      await page.goto('/');

      const menuButton = page.getByRole('button', { name: /navigation menu/i });
      await expect(menuButton).toBeVisible();
    });

    test('mobile menu opens and shows nav items', async ({ page }) => {
      await page.goto('/');

      const menuButton = page.getByRole('button', { name: /Open navigation menu/i });
      await menuButton.click();

      // Mobile nav items should be visible
      const mobileNav = page.locator('[role="navigation"][aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      await expect(mobileNav.locator('button', { hasText: 'WORK' })).toBeVisible();
      await expect(mobileNav.locator('button', { hasText: 'RESUME' })).toBeVisible();
      await expect(mobileNav.locator('button', { hasText: 'ABOUT' })).toBeVisible();
    });

    test('mobile menu closes when item is clicked', async ({ page }) => {
      await page.goto('/');

      const menuButton = page.getByRole('button', { name: /Open navigation menu/i });
      await menuButton.click();

      const mobileNav = page.locator('[role="navigation"][aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      // Click ABOUT in mobile nav
      await mobileNav.locator('button', { hasText: 'ABOUT' }).click();

      // Mobile nav should close, and the about section scrolls into view
      await expect(mobileNav).not.toBeVisible();
      const aboutSection = page.locator('section#about');
      await expect(aboutSection).toBeInViewport({ timeout: 10_000 });
    });

    test('mobile menu button has proper aria-expanded', async ({ page }) => {
      await page.goto('/');

      const menuButton = page.getByRole('button', { name: /navigation menu/i });
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('Keyboard navigation', () => {
    test('Tab moves focus through interactive elements', async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      // Tab from the beginning — first focusable should be the skip link
      await page.keyboard.press('Tab');
      const skipLink = page.locator('a.skip-link');
      await expect(skipLink).toBeFocused();
    });

    test('skip-to-content link navigates to main content', async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      // Focus and activate skip link
      await page.keyboard.press('Tab');
      const skipLink = page.locator('a.skip-link');
      await expect(skipLink).toBeFocused();
      await page.keyboard.press('Enter');

      // URL hash should now point to #main-content
      await expect(page).toHaveURL(/#main-content/);
    });
  });
});

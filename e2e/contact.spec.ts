import { test, expect } from 'playwright/test';

test.describe('Contact Section', () => {
  test.describe('Home page contact section', () => {
    test('get in touch section exists with email CTA', async ({ page }) => {
      await page.goto('/');

      const getInTouch = page.getByRole('heading', { name: 'GET IN TOUCH' });
      await expect(getInTouch).toBeVisible();

      // The CTA is a mailto link
      const emailLink = page.locator('a[href="mailto:tom@straydesign.co"]').first();
      await expect(emailLink).toBeVisible();
    });

    test('hero contact pills are visible', async ({ page }) => {
      await page.goto('/');

      // Contact links in the hero: Phone, LinkedIn, Email
      const phoneLink = page.locator('a[href="tel:+18149640081"]').first();
      const linkedInLink = page.locator('a[href="https://www.linkedin.com/in/tom-sesler/"]').first();
      const emailLink = page.locator('a[href="mailto:tom@straydesign.co"]').first();

      await expect(phoneLink).toBeVisible();
      await expect(linkedInLink).toBeVisible();
      await expect(emailLink).toBeVisible();
    });

    test('contact pills have correct link text', async ({ page }) => {
      await page.goto('/');

      await expect(page.locator('a').filter({ hasText: 'Phone' }).first()).toBeVisible();
      await expect(page.locator('a').filter({ hasText: 'LinkedIn' }).first()).toBeVisible();
      await expect(page.locator('a').filter({ hasText: 'Email' }).first()).toBeVisible();
    });
  });

  test.describe('About page contact CTA', () => {
    test('about page has "want to work together" section', async ({ page }) => {
      await page.goto('/about');

      const cta = page.getByRole('heading', { name: /WANT TO WORK TOGETHER/i });
      await expect(cta).toBeVisible();
    });

    test('about page email CTA links correctly', async ({ page }) => {
      await page.goto('/about');

      const emailLink = page.locator('a[href="mailto:tom@straydesign.co"]');
      await expect(emailLink.first()).toBeVisible();
    });
  });

  test.describe('Footer contact links', () => {
    test('footer has social/contact links', async ({ page }) => {
      await page.goto('/');

      const footer = page.locator('footer');

      // Phone, LinkedIn, Email icons in footer
      const phoneLink = footer.locator('a[href="tel:+18149640081"]');
      await expect(phoneLink).toBeVisible();

      const linkedInLink = footer.locator('a[href="https://www.linkedin.com/in/tom-sesler/"]');
      await expect(linkedInLink).toBeVisible();

      const emailLink = footer.locator('a[href="mailto:tom@straydesign.co"]');
      await expect(emailLink).toBeVisible();
    });

    test('footer links have aria-labels', async ({ page }) => {
      await page.goto('/');

      const footer = page.locator('footer');

      await expect(footer.locator('a[aria-label="Phone"]')).toBeAttached();
      await expect(footer.locator('a[aria-label="LinkedIn"]')).toBeAttached();
      await expect(footer.locator('a[aria-label="Email"]')).toBeAttached();
    });

    test('external links open in new tab', async ({ page }) => {
      await page.goto('/');

      const footer = page.locator('footer');
      const linkedInLink = footer.locator('a[href="https://www.linkedin.com/in/tom-sesler/"]');

      await expect(linkedInLink).toHaveAttribute('target', '_blank');
      await expect(linkedInLink).toHaveAttribute('rel', /noopener/);
    });
  });
});

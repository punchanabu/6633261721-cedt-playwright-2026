import { test as base, type Page } from '@playwright/test';

export const test = base.extend<{
  loginPage: Page;
  appointmentPage: Page;
}>({
  loginPage: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },

  appointmentPage: async ({ page }, use) => {
    await page.goto('/');

    await page.getByText('Make Appointment').click();
    await page.fill('#txt-username', 'John Doe');
    await page.fill('#txt-password', 'ThisIsNotAPassword');
    await page.click('#btn-login');

    await page.waitForURL('**/#appointment', { timeout: 10000 });
    await use(page);
  },
});

export { expect } from '@playwright/test';

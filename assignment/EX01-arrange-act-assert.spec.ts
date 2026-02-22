import { test, expect } from './fixtures';

test.describe('Login Tests - Arrange Act Assert Pattern', () => {
  const validUsername = 'John Doe';
  const validPassword = 'ThisIsNotAPassword';

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/');
    const username = validUsername;
    const password = validPassword;

    await page.getByText('Make Appointment').click();
    await page.fill('#txt-username', username);
    await page.fill('#txt-password', password);
    await page.click('#btn-login');

    await expect(page).toHaveURL(/.*appointment/);
    await expect(page.locator('h2')).toContainText('Make Appointment');
  });

  test('should fail to login with invalid password', async ({ page }) => {
    await page.goto('/');
    const username = validUsername;
    const invalidPassword = 'WrongPassword123';

    await page.getByText('Make Appointment').click();
    await page.fill('#txt-username', username);
    await page.fill('#txt-password', invalidPassword);
    await page.click('#btn-login');

    await expect(page.locator('.text-danger')).toContainText('Login failed!');
    await expect(page).toHaveURL(/.*login/);
  });

  test('should fail to login with invalid username', async ({ page }) => {
    await page.goto('/');
    const invalidUsername = 'InvalidUser';
    const password = validPassword;

    await page.getByText('Make Appointment').click();
    await page.fill('#txt-username', invalidUsername);
    await page.fill('#txt-password', password);
    await page.click('#btn-login');

    await expect(page.locator('.text-danger')).toContainText('Login failed!');
    await expect(page).toHaveURL(/.*login/);
  });
});

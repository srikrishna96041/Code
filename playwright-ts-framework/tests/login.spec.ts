import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Login tests - POM', () => {
  test('login page elements are visible', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await expect(login.usernameInput).toBeVisible();
    await expect(login.passwordInput).toBeVisible();
    await expect(login.submitButton).toBeVisible();
  });

  test('should login with valid user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('student', 'Password123');

    await expect(page).toHaveURL(/.*logged-in-successfully/);
    await expect(page.locator('text=Congratulations')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Log out')).toBeVisible();
  });

  test('should not login with invalid username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(4567, 'Password123');

    await expect(login.errorMessage).toBeVisible();
    const text = await login.getErrorText();
    expect(text).toContain('Your username is invalid');
  });

  test('should not login with invalid password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('student', 'wrongpass');

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText('Your password is invalid');
  });

  test('should show error when credentials are empty', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText('invalid');
  });

  test('should not accept whitespace-only credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('   ', '   ');

    await expect(login.errorMessage).toBeVisible();
  });

  test('can login multiple times consecutively', async ({ page }) => {
    const login = new LoginPage(page);
    for (let i = 0; i < 2; i++) {
      await login.goto();
      await login.login('student', 'Password123');
      await expect(login.logoutButton).toBeVisible();
      await login.logout();
    }
  });

  test('should logout after successful login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('student', 'Password123');

    await expect(login.logoutButton).toBeVisible();
    await login.logout();

    // after logout we should be back on login page
    await expect(page).toHaveURL(/.*practice-test-login/);
    await expect(login.usernameInput).toBeVisible();
  });
});

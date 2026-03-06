import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

// tests that run after a successful login

test.describe('Home page after login', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('student', 'Password123');
    await expect(page).toHaveURL(/.*logged-in-successfully/);
  });

  test('welcome message contains username', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.welcomeMessage).toBeVisible();
    await expect(home.welcomeMessage).toContainText('student');
  });

  test('logout link navigates back to login page', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.logoutLink).toBeVisible();
    await home.logout();
    await expect(page).toHaveURL(/.*practice-test-login/);
    await expect(page.locator('input[name="username"]')).toBeVisible();
  });

  test('navigation links are present and clickable', async ({ page }) => {
    const home = new HomePage(page);
    const links = await home.navLinks.allTextContents();
    expect(links.length).toBeGreaterThanOrEqual(5);
    await home.clickNavLink('HOME');
    await expect(page).toHaveURL('https://practicetestautomation.com/');
  });

  test('footer links include blog and contact', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.navLinks.locator('text=BLOG')).toBeVisible();
    await expect(home.navLinks.locator('text=CONTACT')).toBeVisible();
  });

  test('user can logout and login again from home', async ({ page }) => {
    const home = new HomePage(page);
    await home.logout();
    const login = new LoginPage(page);
    await login.login('student', 'Password123');
    await expect(page).toHaveURL(/.*logged-in-successfully/);
  });

  test('page title is correct', async ({ page }) => {
    // title should reflect logged-in state
    await expect(page).toHaveTitle(/Logged In Successfully/);
  });

  test('refresh keeps user logged in', async ({ page }) => {
    const home = new HomePage(page);
    await page.reload();
    await expect(home.welcomeMessage).toBeVisible();
  });

  test('practice nav link works', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickNavLink('PRACTICE');
    await expect(page).toHaveURL('https://practicetestautomation.com/practice/');
  });

  test('logout link disappears after click', async ({ page }) => {
    const home = new HomePage(page);
    await home.logout();
    // after logout the page should be the login page and logout link no longer exists
    await expect(page).toHaveURL(/.*practice-test-login/);
    await expect(home.logoutLink).toHaveCount(0);
  });

  test('navLinks count matches expected set', async ({ page }) => {
    const home = new HomePage(page);
    const links = await home.navLinks.allTextContents();
    // expecting at least the five main links from the footer
    const expected = ['HOME', 'PRACTICE', 'COURSES', 'BLOG', 'CONTACT'];
    expected.forEach(item => expect(links).toContain(item));
  });

  test('site home shows welcome banner', async ({ page }) => {
    const home = new HomePage(page);
    await home.goToSiteHome();
    await expect(home.headerBanner).toBeVisible();
    await expect(home.headerBanner).toContainText('Welcome to Practice Test Automation!');
  });
});

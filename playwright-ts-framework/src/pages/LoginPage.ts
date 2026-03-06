import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[id="submit"]');
    this.errorMessage = page.locator('//*[@id="error"]');
    this.logoutButton = page.locator('text=Log out');
  }


  async goto() {
    await this.navigate('/practice-test-login/');
  }

  async login(username: string | number, password: string) {
    await this.usernameInput.fill(String(username));
    await this.passwordInput.fill(password);
    // submit and rely on navigation or page state for assertions
    await this.submitButton.click();
    await this.waitForNetworkIdle();
  }

  async getErrorText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

export default LoginPage;

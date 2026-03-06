import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly logoutLink: Locator;
  readonly navLinks: Locator;
  readonly headerBanner: Locator;

  constructor(page: Page) {
    super(page);
    // use role-based selectors where possible for resilience
    this.welcomeMessage = page.getByRole('heading', { name: /congratulations/i }).first();
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    // navigation links in the footer or header (HOME, PRACTICE, etc.)
    this.navLinks = page.getByRole('link');
    // banner text on the actual site home - target as a heading for reliability
    this.headerBanner = page.getByRole('heading', { name: /welcome to practice test automation!/i });
  }

  async goto(): Promise<void> {
    await this.navigate('/logged-in-successfully/');
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
    await this.waitForNetworkIdle();
  }

  async clickNavLink(text: string): Promise<void> {
    await this.page.locator(`text=${text}`).click();
    await this.waitForNetworkIdle();
  }

  async goToSiteHome(): Promise<void> {
    // navigate directly to the public home page rather than trying to click a link
    await this.page.goto('https://practicetestautomation.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }
}

export default HomePage;

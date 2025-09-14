import { Page } from '@playwright/test';
import { locators } from './locators';
import { TestConfig } from './test-config';

/**
 * Base Page Object class with common functionality
 */
export class BasePage {
  constructor(protected page: Page, protected config: TestConfig) {}

  async goto(url?: string): Promise<void> {
    await this.page.goto(url || this.config.baseUrl);
  }

  async waitForTimeout(timeout?: number): Promise<void> {
    await this.page.waitForTimeout(timeout || this.config.timeouts.default);
  }
}

/**
 * Login Page Object
 */
export class LoginPage extends BasePage {
  async fillUsername(username?: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'User Name' }).click();
    await this.page.getByRole('textbox', { name: 'User Name' }).fill(username || this.config.credentials.username);
  }

  async fillPassword(password?: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password || this.config.credentials.password);
  }

  async clickLogin(): Promise<void> {
    await this.page.getByRole('button', { name: ' Log in' }).click();
  }

  async login(username?: string, password?: string): Promise<void> {
    await this.fillUsername(username);
    await this.page.getByRole('textbox', { name: 'User Name' }).press('Tab');
    await this.fillPassword(password);
    await this.clickLogin();
  }
}

/**
 * Search Page Object
 */
export class SearchPage extends BasePage {
  async navigateToSearch(): Promise<void> {
    await this.page.getByRole('link', { name: 'Search record F9' }).click();
  }

  async fillSearchField(query?: string): Promise<void> {
    await this.page.locator(locators.search.searchField).fill(query || this.config.testData.searchQuery);
  }

  async clickSearch(): Promise<void> {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async performSearch(query?: string): Promise<void> {
    await this.fillSearchField(query);
    await this.clickSearch();
    await this.waitForTimeout();
  }
}

/**
 * Navigation/Common Page Object
 */
export class NavigationPage extends BasePage {
  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Log out' }).click();
    await this.waitForTimeout();
  }
}

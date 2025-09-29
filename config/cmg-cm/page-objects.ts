import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { locators } from './locators';
import { CMGCMTestConfig } from './test-config';

/**
 * Base Page Object class with common functionality for CMG.CM
 */
export class BasePage {
  constructor(protected page: Page, protected config: CMGCMTestConfig) {}

  async goto(url?: string): Promise<void> {
    await this.page.goto(url || this.config.baseUrl);
  }

  async waitForTimeout(timeout?: number): Promise<void> {
    const actualTimeout = timeout || this.config.timeouts.default;
    console.log(`⏱️  Waiting ${actualTimeout}ms...`);
    await this.page.waitForTimeout(actualTimeout);
  }
}

/**
 * Login Page Object for CMG.CM
 */
export class LoginPage extends BasePage {
  async fillUsername(username?: string): Promise<void> {
    console.log('🔐 Filling username...');
    await this.page.getByRole('textbox', { name: 'User Name:' }).fill(username || this.config.credentials.username);
    await this.waitForTimeout(this.config.timeouts.step);
  }

  async fillPassword(password?: string): Promise<void> {
    console.log('🔑 Filling password...');
    await this.page.getByRole('textbox', { name: 'Password:' }).fill(password || this.config.credentials.password);
    await this.waitForTimeout(this.config.timeouts.step);
  }

  async clickLogin(): Promise<void> {
    console.log('🚀 Clicking login button...');
    await this.page.getByRole('button', { name: ' Log In' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async login(username?: string, password?: string): Promise<void> {
    console.log('🔐 Performing login...');
    await this.fillUsername(username);
    await this.page.getByRole('textbox', { name: 'User Name:' }).press('Tab');
    await this.fillPassword(password);
    await this.clickLogin();
    console.log('✅ Login completed');
  }
}

/**
 * Navigation Page Object for CMG.CM
 */
export class NavigationPage extends BasePage {
  async logout(): Promise<void> {
    console.log('👋 Logging out...');
    await this.page.getByRole('link', { name: 'Log Out' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Logged out successfully');
  }
}

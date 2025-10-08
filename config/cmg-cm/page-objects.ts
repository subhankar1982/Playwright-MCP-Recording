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
    console.log('🌐 Navigating to CMG Configuration Manager...');
    await this.page.goto(url || this.config.baseUrl);
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Navigation completed');
  }

  async waitForTimeout(timeout?: number): Promise<void> {
    const actualTimeout = timeout || this.config.timeouts.default;
    const finalTimeout = this.config.slowMode?.enabled 
      ? Math.round(actualTimeout * (this.config.slowMode?.multiplier || 1.5))
      : actualTimeout;
    
    console.log(`⏱️  Waiting ${finalTimeout}ms...`);
    await this.page.waitForTimeout(finalTimeout);
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
    console.log('✅ Username filled');
  }

  async fillPassword(password?: string): Promise<void> {
    console.log('🔑 Filling password...');
    await this.page.getByRole('textbox', { name: 'Password:' }).fill(password || this.config.credentials.password);
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ Password filled');
  }

  async clickLogin(): Promise<void> {
    console.log('🚀 Clicking login button...');
    await this.page.getByRole('button', { name: ' Log In' }).click();
    await this.waitForTimeout(this.config.timeouts.long);
    console.log('✅ Login button clicked');
  }

  async verifyLoginSuccess(expectedText?: string): Promise<void> {
    console.log('✅ Verifying successful login...');
    const text = expectedText || this.config.expectedData.menuText;
    await expect(this.page.locator('#divMenu')).toContainText(text);
    console.log(`✅ Login verified with text: "${text}"`);
  }

  async login(username?: string, password?: string): Promise<void> {
    console.log('🔐 Performing complete login...');
    await this.fillUsername(username);
    await this.page.getByRole('textbox', { name: 'User Name:' }).press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.verifyLoginSuccess();
    console.log('✅ Login completed successfully');
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

/**
 * System Parameters Page Object for CMG.CM
 */
export class SystemParametersPage extends BasePage {
  async setOption44(value: string): Promise<void> {
    console.log(`🔧 Setting option 44 to ${value}...`);
    await this.page.locator(locators.systemParameters.option44).selectOption(value);
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ Option 44 set');
  }

  async setValue224(value: string): Promise<void> {
    console.log(`🔧 Setting value 224 to ${value}...`);
    await this.page.locator(locators.systemParameters.value224).click();
    await this.page.locator(locators.systemParameters.value224).fill(value);
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ Value 224 set');
  }

  async setOption213(value: string): Promise<void> {
    console.log(`🔧 Setting option 213 to ${value}...`);
    await this.page.locator(locators.systemParameters.option213).selectOption(value);
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ Option 213 set');
  }

  async save(): Promise<void> {
    console.log('💾 Saving system parameters...');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForTimeout(this.config.timeouts.long);
    console.log('✅ System parameters saved');
  }
}

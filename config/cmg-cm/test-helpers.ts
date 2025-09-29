import { Page } from '@playwright/test';
import { CMGCMTestConfig } from './test-config';
import { LoginPage, NavigationPage } from './page-objects';

export class CMGCMTestHelpers {
  public loginPage: LoginPage;
  public navigationPage: NavigationPage;

  constructor(private page: Page, private config: CMGCMTestConfig) {
    this.loginPage = new LoginPage(page, config);
    this.navigationPage = new NavigationPage(page, config);
  }

  /**
   * Performs login with configured credentials
   */
  async loginFlow(username?: string, password?: string): Promise<void> {
    console.log('🔄 Performing complete login flow...');
    await this.navigationPage.goto();
    await this.loginPage.login(username, password);
    console.log('✅ Login flow completed successfully!');
  }

  /**
   * Performs logout
   */
  async logout(): Promise<void> {
    await this.navigationPage.logout();
  }
}

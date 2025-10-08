import { Page } from '@playwright/test';
import { CMGCMTestConfig } from './test-config';
import { LoginPage, NavigationPage, SystemParametersPage } from './page-objects';

export class CMGCMTestHelpers {
  public loginPage: LoginPage;
  public navigationPage: NavigationPage;
  public systemParametersPage: SystemParametersPage;

  constructor(private page: Page, private config: CMGCMTestConfig) {
    this.loginPage = new LoginPage(page, config);
    this.navigationPage = new NavigationPage(page, config);
    this.systemParametersPage = new SystemParametersPage(page, config);
  }

  private async waitForTimeout(timeout?: number): Promise<void> {
    const actualTimeout = timeout || this.config.timeouts.default;
    const finalTimeout = this.config.slowMode?.enabled 
      ? Math.round(actualTimeout * (this.config.slowMode?.multiplier || 1.5))
      : actualTimeout;
    
    console.log(`⏱️  Waiting ${finalTimeout}ms...`);
    await this.page.waitForTimeout(finalTimeout);
  }

  /**
   * Performs complete login flow with verification
   */
  async loginFlow(username?: string, password?: string): Promise<void> {
    console.log('🔄 Performing complete CMG-CM login flow...');
    await this.navigationPage.goto();
    await this.loginPage.login(username, password);
    console.log('✅ CMG-CM login flow completed successfully!');
  }

  /**
   * Performs logout
   */
  async logout(): Promise<void> {
    await this.navigationPage.logout();
  }

  /**
   * Complete login, verify, and logout flow
   */
  async completeLoginLogoutFlow(username?: string, password?: string): Promise<void> {
    console.log('🔄 Performing complete CMG-CM login-logout flow...');
    await this.loginFlow(username, password);
    await this.logout();
    console.log('✅ Complete CMG-CM flow finished successfully!');
  }

  /**
   * Performs system parameters configuration flow
   */
  async systemParametersFlow(): Promise<void> {
    console.log('🔄 Performing CMG-CM system parameters configuration flow...');
    await this.loginFlow();
    
    // Navigate to System Parameters
    console.log('🧭 Navigating to System Parameters...');
    await this.page.getByRole('link', { name: 'System Parameters' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // First configuration
    await this.systemParametersPage.setOption44(this.config.systemParameters.option44.enabled);
    await this.systemParametersPage.setValue224(this.config.systemParameters.value224.initial);
    await this.systemParametersPage.save();
    
    // Second configuration
    await this.systemParametersPage.setOption213(this.config.systemParameters.option213.disabled);
    await this.systemParametersPage.setOption44(this.config.systemParameters.option44.disabled);
    await this.systemParametersPage.setValue224(this.config.systemParameters.value224.reset);
    await this.systemParametersPage.save();
    
    await this.logout();
    console.log('✅ CMG-CM system parameters flow completed successfully!');
  }
}

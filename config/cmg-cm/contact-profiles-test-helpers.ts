import { Page } from '@playwright/test';
import { TestConfig } from './contact-profiles-config';
import { LoginPage, NavigationPage, ContactProfilesPage } from './contact-profiles-page-objects';

/**
 * Test Helpers for Contact Profiles functionality
 */
export class ContactProfilesTestHelpers {
  public loginPage: LoginPage;
  public navigationPage: NavigationPage;
  public contactProfilesPage: ContactProfilesPage;

  constructor(private page: Page, private config: TestConfig) {
    this.loginPage = new LoginPage(page, config);
    this.navigationPage = new NavigationPage(page, config);
    this.contactProfilesPage = new ContactProfilesPage(page, config);
  }

  private async waitForTimeout(timeout?: number): Promise<void> {
    const actualTimeout = timeout || this.config.timeouts.default;
    const finalTimeout = this.config.slowMode?.enabled 
      ? Math.round(actualTimeout * (this.config.slowMode?.multiplier || 2.0))
      : actualTimeout;
    
    console.log(`⏱️  Waiting ${finalTimeout}ms...`);
    await this.page.waitForTimeout(finalTimeout);
  }

  /**
   * Performs complete login flow
   */
  async loginFlow(username?: string, password?: string): Promise<void> {
    console.log('🔄 Performing complete login flow...');
    await this.navigationPage.goto();
    await this.loginPage.login(username, password);
    console.log('✅ Login flow completed successfully!');
  }

  /**
   * Navigates to Contact Profiles section
   */
  async navigateToContactProfiles(): Promise<void> {
    console.log('📋 Navigating to Contact Profiles...');
    await this.navigationPage.clickContactProfiles();
    console.log('✅ Contact Profiles navigation completed!');
  }

  /**
   * Complete contact profile creation workflow
   */
  async createContactProfileWorkflow(profileData?: Partial<typeof this.config.contactProfile>): Promise<void> {
    console.log('🔄 Performing complete contact profile creation workflow...');
    await this.loginFlow();
    await this.navigateToContactProfiles();
    await this.contactProfilesPage.createContactProfile(profileData);
    console.log('✅ Contact profile creation workflow completed successfully!');
  }

  /**
   * Complete contact profile modification workflow
   */
  async modifyContactProfileWorkflow(profileName?: string, username?: string, password?: string): Promise<void> {
    console.log('🔄 Performing complete contact profile modification workflow...');
    await this.navigationPage.logout();
    await this.waitForTimeout(this.config.timeouts.navigation);
    await this.loginPage.login(username, password);
    await this.navigateToContactProfiles();
    await this.contactProfilesPage.modifyContactProfile(profileName);
    console.log('✅ Contact profile modification workflow completed successfully!');
  }

  /**
   * Complete end-to-end contact profiles test workflow
   */
  async completeContactProfilesWorkflow(profileData?: Partial<typeof this.config.contactProfile>): Promise<void> {
    console.log('🔄 Performing complete Contact Profiles end-to-end workflow...');
    
    // Create contact profile
    await this.createContactProfileWorkflow(profileData);
    
    // Modify contact profile (simulate logout/login cycle)
    await this.modifyContactProfileWorkflow(profileData?.name);
    
    // Final logout
    await this.navigationPage.logout();
    
    console.log('✅ Complete Contact Profiles workflow finished successfully!');
  }

  /**
   * Logout flow
   */
  async logout(): Promise<void> {
    await this.navigationPage.logout();
  }
}

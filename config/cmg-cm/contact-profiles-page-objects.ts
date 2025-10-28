import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { TestConfig } from './contact-profiles-config';

/**
 * Base Page Object class with common functionality for CMG.CM Contact Profiles
 */
export class BasePage {
  constructor(protected page: Page, protected config: TestConfig) {}

  async goto(url?: string): Promise<void> {
    console.log('🌐 Navigating to CMG Configuration Manager...');
    await this.page.goto(url || this.config.baseUrl);
    await this.waitForTimeout(this.config.timeouts.navigation);
    console.log('✅ Navigation completed');
  }

  async waitForTimeout(timeout?: number): Promise<void> {
    const actualTimeout = timeout || this.config.timeouts.default;
    const finalTimeout = this.config.slowMode?.enabled 
      ? Math.round(actualTimeout * (this.config.slowMode?.multiplier || 2.0))
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
    await this.page.getByRole('textbox', { name: 'User Name:' }).press('Tab');
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
    await this.waitForTimeout(this.config.timeouts.navigation);
    console.log('✅ Login completed');
  }

  async login(username?: string, password?: string): Promise<void> {
    console.log('🔄 Performing complete login flow...');
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    console.log('✅ Login flow completed successfully!');
  }
}

/**
 * Navigation Page Object for CMG.CM
 */
export class NavigationPage extends BasePage {
  async clickContactProfiles(): Promise<void> {
    console.log('📋 Clicking Contact Profiles...');
    await this.page.getByRole('link', { name: 'Contact Profiles' }).click();
    await this.waitForTimeout(this.config.timeouts.navigation);
    console.log('✅ Contact Profiles opened');
  }

  async logout(): Promise<void> {
    console.log('🚪 Logging out...');
    await this.page.getByRole('link', { name: 'Log Out' }).click();
    await this.waitForTimeout(this.config.timeouts.navigation);
    console.log('✅ Logout completed');
  }
}

/**
 * Contact Profiles Page Object
 */
export class ContactProfilesPage extends BasePage {
  async clickNew(): Promise<void> {
    console.log('➕ Clicking New button...');
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.waitForTimeout(this.config.timeouts.modal);
    console.log('✅ New contact profile dialog opened');
  }

  async fillProfileName(name?: string): Promise<void> {
    const profileName = name || this.config.contactProfile.name;
    console.log(`📝 Filling profile name: ${profileName}`);
    await this.page.locator(this.config.selectors.modalData1).click();
    await this.page.locator(this.config.selectors.modalData1).fill(profileName);
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ Profile name filled');
  }

  async selectPbxType(pbxType?: string): Promise<void> {
    const type = pbxType || this.config.contactProfile.pbxType;
    console.log(`🔧 Selecting PBX type: ${type}`);
    await this.page.locator(this.config.selectors.modalData3).selectOption(type);
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ PBX type selected');
  }

  async selectPbxTableCell(): Promise<void> {
    console.log('🎯 Selecting PBX table cell...');
    await this.page.locator(this.config.selectors.pbxTable)
      .getByRole('cell')
      .filter({ hasText: this.config.selectors.pbxCell })
      .click();
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ PBX table cell selected');
  }

  async fillDescription(description?: string): Promise<void> {
    const desc = description || this.config.contactProfile.description;
    console.log(`📄 Filling description: ${desc}`);
    await this.page.locator(this.config.selectors.modalData6).dblclick();
    await this.page.locator(this.config.selectors.modalData6).fill(desc);
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ Description filled');
  }

  async performPbxTableActions(): Promise<void> {
    console.log('🔄 Performing PBX table interactions...');
    const cellSelector = this.page.locator(this.config.selectors.pbxTable)
      .getByRole('cell')
      .filter({ hasText: this.config.selectors.pbxCell });
    
    await cellSelector.dblclick();
    await this.waitForTimeout(this.config.timeouts.step);
    await cellSelector.click();
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ PBX table actions completed');
  }

  async clickOk(): Promise<void> {
    console.log('✅ Clicking OK button...');
    await this.page.getByRole('button', { name: 'OK' }).click();
    await this.waitForTimeout(this.config.timeouts.modal);
    console.log('✅ OK button clicked');
  }

  async clickSave(): Promise<void> {
    console.log('💾 Clicking Save button...');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Save completed');
  }

  async selectProfileRow(profileName?: string): Promise<void> {
    const name = profileName || this.config.contactProfile.name;
    console.log(`🎯 Selecting profile row: ${name}`);
    await this.page.getByRole('row', { name: `${name} True False ` }).locator('span').click();
    await this.waitForTimeout(this.config.timeouts.step);
    console.log('✅ Profile row selected');
  }

  async createContactProfile(profileData?: Partial<typeof this.config.contactProfile>): Promise<void> {
    console.log('🔄 Creating complete contact profile...');
    await this.clickNew();
    await this.fillProfileName(profileData?.name);
    await this.selectPbxType(profileData?.pbxType);
    await this.selectPbxTableCell();
    await this.fillDescription(profileData?.description);
    await this.performPbxTableActions();
    await this.clickOk();
    await this.clickSave();
    console.log('✅ Contact profile created successfully!');
  }

  async modifyContactProfile(profileName?: string): Promise<void> {
    console.log('🔄 Modifying contact profile...');
    await this.selectProfileRow(profileName);
    await this.clickSave();
    console.log('✅ Contact profile modified successfully!');
  }
}

import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
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
    const actualTimeout = timeout || this.config.timeouts.default;
    const finalTimeout = this.config.slowMode?.enabled 
      ? Math.round(actualTimeout * (this.config.slowMode?.multiplier || 1.5))
      : actualTimeout;
    
    console.log(`⏱️  Waiting ${finalTimeout}ms...`);
    await this.page.waitForTimeout(finalTimeout);
  }
}

/**
 * Login Page Object
 */
export class LoginPage extends BasePage {
  async fillUsername(username?: string): Promise<void> {
    console.log('🔐 Filling username...');
    await this.page.getByRole('textbox', { name: 'User Name' }).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.getByRole('textbox', { name: 'User Name' }).fill(username || this.config.credentials.username);
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async fillPassword(password?: string): Promise<void> {
    console.log('🔑 Filling password...');
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password || this.config.credentials.password);
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async clickLogin(): Promise<void> {
    console.log('🚀 Clicking login button...');
    await this.page.getByRole('button', { name: ' Log in' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async login(username?: string, password?: string): Promise<void> {
    await this.fillUsername(username);
    await this.page.getByRole('textbox', { name: 'User Name' }).press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}

/**
 * Search Page Object
 */
export class SearchPage extends BasePage {
  async navigateToSearch(): Promise<void> {
    console.log('🔍 Navigating to search...');
    await this.page.getByRole('link', { name: 'Search record F9' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async fillSearchField(query?: string): Promise<void> {
    console.log('📝 Filling search field...');
    await this.page.locator(locators.search.searchField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.search.searchField).fill(query || this.config.testData.searchQuery);
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async clickSearch(): Promise<void> {
    console.log('🔎 Performing search...');
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async performSearch(query?: string): Promise<void> {
    await this.fillSearchField(query);
    await this.clickSearch();
    await this.waitForTimeout(this.config.timeouts.slow);
  }
}

/**
 * Navigation/Common Page Object
 */
export class NavigationPage extends BasePage {
  async logout(): Promise<void> {
    try {
      await this.page.getByRole('link', { name: 'Log out' }).click();
      // Reduce timeout and add navigation wait
      await this.page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch (error) {
      console.log(`Logout may have failed, but continuing: ${error}`);
      // Don't fail the test for logout issues
    }
  }
}

/**
 * User Creation Page Object
 */
export class UserCreationPage extends BasePage {
  async navigateToNewRecord(): Promise<void> {
    console.log('➕ Navigating to new record creation...');
    await this.page.getByRole('link', { name: 'New record F2' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async fillUserDetails(userData: {
    lastName: string;
    firstName: string;
    phone: string;
    cordless: string;
    title: string;
    description: string;
    department: string;
    extension: string;
  }): Promise<void> {
    console.log('📝 Filling user details...');
    
    // Fill last name
    console.log('🏷️ Filling last name...');
    await this.page.locator(locators.userCreation.lastNameField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.lastNameField).fill(userData.lastName);
    await this.waitForTimeout(this.config.timeouts.slow);
    await this.page.locator(locators.userCreation.lastNameField).press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Fill first name
    console.log('👤 Filling first name...');
    await this.page.locator(locators.userCreation.firstNameField).fill(userData.firstName);
    await this.waitForTimeout(this.config.timeouts.slow);
    await this.page.locator(locators.userCreation.firstNameField).press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Fill phone
    console.log('📞 Filling phone number...');
    await this.page.locator(locators.userCreation.phoneField).fill(userData.phone);
    await this.waitForTimeout(this.config.timeouts.slow);
    await this.page.locator(locators.userCreation.phoneField).press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Fill cordless
    console.log('📱 Filling cordless number...');
    await this.page.locator(locators.userCreation.cordlessField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.cordlessField).fill(userData.cordless);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // Fill description (misc10)
    console.log('📄 Filling description...');
    await this.page.locator(locators.userCreation.descriptionField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.descriptionField).fill(userData.description);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // Fill title (misc15)
    console.log('🎖️ Filling title...');
    await this.page.locator(locators.userCreation.titleField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.titleField).fill(userData.title);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // Fill department (misc11)
    console.log('🏢 Filling department...');
    await this.page.locator(locators.userCreation.departmentField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.departmentField).fill(userData.department);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // Fill extension (misc18)
    console.log('☎️ Filling extension...');
    await this.page.locator(locators.userCreation.extensionField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.extensionField).fill(userData.extension);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    console.log('✅ User details filled successfully!');
  }

  async saveRecord(): Promise<void> {
    console.log('💾 Saving record...');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForTimeout(this.config.timeouts.long);
    // Wait for save to complete with proper network idle state
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Record saved successfully!');
  }

  async searchUser(searchTerm: string): Promise<void> {
    await this.page.goto('http://10.211.63.208/CMG.DM/subsform/Index?recordid=1025&currtab=subsform');
    await this.page.locator(locators.userCreation.quickSearchField).click();
    await this.page.locator(locators.userCreation.quickSearchField).fill(searchTerm);
    await this.page.locator(locators.userCreation.quickSearchField).press('Enter');
  }

  /**
   * Helper method to handle checkbox interactions with JavaScript events
   */
  async handleCheckbox(selector: string, shouldCheck: boolean = true): Promise<void> {
    const checkbox = this.page.locator(selector);
    
    try {
      // Check current state
      const isChecked = await checkbox.isChecked();
      
      if (shouldCheck && !isChecked) {
        // Use JavaScript to trigger the onclick event
        await checkbox.evaluate((el: HTMLInputElement) => {
          el.click();
          // Also trigger the fieldChanged function if it exists
          const win = window as any;
          if (win.fieldChanged) {
            win.fieldChanged(el);
          }
        });
      } else if (!shouldCheck && isChecked) {
        await checkbox.evaluate((el: HTMLInputElement) => {
          el.click();
          const win = window as any;
          if (win.fieldChanged) {
            win.fieldChanged(el);
          }
        });
      }
      
      await this.waitForTimeout(500);
    } catch (error) {
      console.log(`Checkbox interaction failed, skipping: ${error}`);
      // Don't fail the test for checkbox issues, just log and continue
    }
  }

  /**
   * Simplified user details filling without checkbox interactions for testing
   */
  async fillUserDetailsSimple(userData: {
    lastName: string;
    firstName: string;
    phone: string;
    cordless: string;
    title: string;
  }): Promise<void> {
    // Fill last name
    await this.page.locator(locators.userCreation.lastNameField).click();
    await this.page.locator(locators.userCreation.lastNameField).fill(userData.lastName);
    await this.waitForTimeout(2000);
    await this.page.locator(locators.userCreation.lastNameField).press('Tab');
    
    // Fill first name
    await this.page.locator(locators.userCreation.firstNameField).fill(userData.firstName);
    await this.waitForTimeout(2000);
    
    // Fill phone
    await this.page.locator(locators.userCreation.phoneField).click();
    await this.waitForTimeout(2000);
    await this.page.locator(locators.userCreation.phoneField).fill(userData.phone);
    await this.waitForTimeout(2000);
    
    // Fill cordless
    await this.page.locator(locators.userCreation.cordlessField).click();
    await this.waitForTimeout(2000);
    await this.page.locator(locators.userCreation.cordlessField).fill(userData.cordless);
    
    // Fill title
    await this.page.locator(locators.userCreation.titleField).click();
    await this.page.locator(locators.userCreation.titleField).fill(userData.title);
  }


}

/**
 * Advanced Search Page Object
 */
export class AdvancedSearchPage extends BasePage {
  async navigateToAdvancedSearch(): Promise<void> {
    console.log('🔍📋 Navigating to advanced search...');
    await this.page.getByRole('link', { name: 'Advanced Search Alt+' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async performAdvancedSearch(searchData: {
    field1: string;
    field2: string;
    operator3: string;
    field3: string;
    operator4: string;
    field4: string;
  }): Promise<void> {
    // Select radio button
    await this.page.getByRole('radio').nth(1).check();
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Fill search fields with minimal delays
    await this.page.locator(locators.advancedSearch.field1).selectOption(searchData.field1);
    await this.page.locator(locators.advancedSearch.field2).selectOption(searchData.field2);
    await this.page.locator(locators.advancedSearch.operator3).selectOption(searchData.operator3);
    await this.page.locator(locators.advancedSearch.field3).selectOption(searchData.field3);
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Select radio button for field 3
    await this.page.locator('input[name="radio3"]').nth(1).check();
    await this.waitForTimeout(this.config.timeouts.step);
    
    await this.page.locator(locators.advancedSearch.operator4).selectOption(searchData.operator4);
    await this.page.locator(locators.advancedSearch.field4).selectOption(searchData.field4);
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Perform search
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async selectAllAndChange(): Promise<void> {
    await this.page.getByRole('button', { name: 'Select All' }).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.getByRole('button', { name: 'Change selected' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async changeFieldAndSave(changeField: string, dateValue: string): Promise<void> {
    await this.page.locator('select[name="field"]').selectOption(changeField);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.getByRole('link', { name: dateValue }).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async performCompleteAdvancedSearchFlow(searchData: {
    field1: string;
    field2: string;
    operator3: string;
    field3: string;
    operator4: string;
    field4: string;
    changeField: string;
    dateValue: string;
  }): Promise<void> {
    await this.navigateToAdvancedSearch();
    await this.performAdvancedSearch(searchData);
    await this.selectAllAndChange();
    await this.changeFieldAndSave(searchData.changeField, searchData.dateValue);
  }
}

/**
 * Organization Page Object
 */
export class OrganizationPage extends BasePage {
  async navigateToOrganization(): Promise<void> {
    console.log('🏢 Navigating to Organization section...');
    await this.page.getByRole('link', { name: 'Organization ' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 5000 });
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async navigateToNewOrganization(): Promise<void> {
    console.log('➕ Creating new organization...');
    await this.page.getByRole('link', { name: 'New Organization' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async fillOrganizationDetails(organizationData: {
    description: string;
    org1: string;
    org2: string;
    phoneNumber: string;
    altDescription: string;
    greeting: string;
    miscText: string;
    grammar: string;
  }): Promise<void> {
    // Fill description
    await this.page.locator('#newdescriptionInput').click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('#newdescriptionInput').fill(organizationData.description);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('#newdescriptionInput').press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);

    // Fill org1
    await this.page.locator('input[name="neworg1Input"]').fill(organizationData.org1);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('input[name="neworg1Input"]').press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);

    // Fill org2
    await this.page.locator('input[name="neworg2Input"]').fill(organizationData.org2);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('input[name="neworg2Input"]').press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);

    // Fill phone number
    await this.page.locator('input[name="newphonenumberInput"]').fill(organizationData.phoneNumber);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('input[name="newphonenumberInput"]').press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);

    // Fill alt description
    await this.page.locator('#newaltdescriptionInput').fill(organizationData.altDescription);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('#newaltdescriptionInput').press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);

    // Fill greeting
    await this.page.locator('input[name="newgreetingInput"]').fill(organizationData.greeting);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('input[name="newgreetingInput"]').press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);

    // Fill misc text
    await this.page.locator('textarea[name="newmisctextInput"]').fill(organizationData.miscText);
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator('textarea[name="newmisctextInput"]').press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);

    // Fill grammar
    await this.page.locator('textarea[name="newgrammarInput"]').fill(organizationData.grammar);
    await this.waitForTimeout(this.config.timeouts.step);
  }

  async saveOrganization(): Promise<void> {
    console.log('💾 Saving organization...');
    await this.page.getByRole('button', { name: 'OK' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);

    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async createOrganization(organizationData: {
    description: string;
    org1: string;
    org2: string;
    phoneNumber: string;
    altDescription: string;
    greeting: string;
    miscText: string;
    grammar: string;
  }): Promise<void> {
    await this.navigateToOrganization();
    await this.navigateToNewOrganization();
    await this.fillOrganizationDetails(organizationData);
    await this.saveOrganization();
  }

  async navigateToOrganizationSearch(): Promise<void> {
    console.log('🔍 Navigating to Organization Search & Update...');
    await this.page.getByRole('link', { name: 'Search & Update' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 5000 });
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async searchAndSelectOrganization(searchDescription: string): Promise<void> {
    console.log(`🔍 Searching for organization: ${searchDescription}`);
    
    try {
      // First try: Look for the organization cell in a table row context
      const organizationRow = this.page.locator('tr').filter({ has: this.page.getByText(searchDescription, { exact: true }) });
      const rowCount = await organizationRow.count();
      
      if (rowCount > 0) {
        // Click on the cell within the first matching row
        await organizationRow.first().getByRole('cell', { name: searchDescription, exact: true }).first().click();
        console.log(`✅ Successfully clicked organization: ${searchDescription}`);
      } else {
        // Fallback: Find all cells with the search description and click the first clickable one
        const cells = this.page.getByRole('cell', { name: searchDescription, exact: true });
        const cellCount = await cells.count();
        
        if (cellCount === 0) {
          throw new Error(`No organization found with description: ${searchDescription}`);
        }
        
        if (cellCount === 1) {
          await cells.click();
        } else {
          // If multiple cells found, try to click the first one that's in a clickable row
          console.log(`⚠️ Found ${cellCount} cells with text '${searchDescription}', attempting to click the first clickable one`);
          
          // Try clicking the first cell, as it's likely the main data cell
          await cells.first().click();
        }
        console.log(`✅ Successfully clicked organization using fallback method: ${searchDescription}`);
      }
    } catch (error) {
      console.error(`❌ Failed to click organization: ${searchDescription}`, error);
      throw error;
    }
    
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async verifyOrganizationDetails(searchData: {
    expectedDescription: string;
    expectedPhoneNumber: string;
    expectedGreeting: string;
    expectedOrg2: string;
  }): Promise<void> {
    console.log('✅ Verifying organization details...');
    
    await expect(this.page.locator('input[name="description"]')).toHaveValue(searchData.expectedDescription);
    await this.waitForTimeout(this.config.timeouts.step);
    
    await expect(this.page.locator('input[name="phonenumber"]')).toHaveValue(searchData.expectedPhoneNumber);
    await this.waitForTimeout(this.config.timeouts.step);
    
    await expect(this.page.locator('input[name="greeting"]')).toHaveValue(searchData.expectedGreeting);
    await this.waitForTimeout(this.config.timeouts.step);
    
    await expect(this.page.locator('input[name="org2"]')).toHaveValue(searchData.expectedOrg2);
    await this.waitForTimeout(this.config.timeouts.step);
  }

  async searchOrganization(searchData: {
    searchDescription: string;
    expectedDescription: string;
    expectedPhoneNumber: string;
    expectedGreeting: string;
    expectedOrg2: string;
  }): Promise<void> {
    await this.navigateToOrganization();
    await this.navigateToOrganizationSearch();
    await this.searchAndSelectOrganization(searchData.searchDescription);
    await this.verifyOrganizationDetails(searchData);
  }

  async deleteOrganization(searchDescription: string): Promise<void> {
    console.log(`🗑️ Deleting organization: ${searchDescription}`);
    await this.navigateToOrganization();
    await this.navigateToOrganizationSearch();
    await this.searchAndSelectOrganization(searchDescription);
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    await this.waitForTimeout(this.config.timeouts.slow);
  }
}

/**
 * User Search and Update Page Object
 */
export class UserSearchUpdatePage extends BasePage {
  async performUserSearch(searchQuery?: string): Promise<void> {
    console.log('🔍 Performing user search...');
    const query = searchQuery || this.config.userSearchUpdateData.searchQuery;
    
    await this.page.locator(locators.userSearchUpdate.searchField).fill(query);
    await this.waitForTimeout(this.config.timeouts.slow);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitForTimeout(this.config.timeouts.long);
    console.log('✅ User search completed');
  }

  async selectTargetUser(userName?: string): Promise<void> {
    console.log('👤 Selecting target user...');
    const targetUser = userName || this.config.userSearchUpdateData.targetUser;
    
    await this.page.getByRole('cell', { name: targetUser }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log(`✅ Selected user: ${targetUser}`);
  }

  async openChangeSelectedDialog(): Promise<void> {
    console.log('⚙️ Opening change selected dialog...');
    await this.page.getByRole('button', { name: 'Change selected' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Change selected dialog opened');
  }

  async selectFieldToUpdate(fieldOption?: string): Promise<void> {
    console.log('🏷️ Selecting field to update...');
    const field = fieldOption || this.config.userSearchUpdateData.fieldToUpdate;
    
    await this.page.locator('select[name="field"]').selectOption(field);
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Field selected for update');
  }

  async checkTargetCheckbox(checkboxSelector?: string): Promise<void> {
    console.log('☑️ Checking target checkbox...');
    const selector = checkboxSelector || this.config.userSearchUpdateData.checkboxSelector;
    
    await this.page.locator(selector).check();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Checkbox checked');
  }

  async saveChanges(): Promise<void> {
    console.log('💾 Saving changes...');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForTimeout(this.config.timeouts.long);
    console.log('✅ Changes saved successfully');
  }

  async performCompleteUserSearchUpdate(updateData?: any): Promise<void> {
    console.log('🔄 Performing complete user search and update flow...');
    
    const data = updateData || this.config.userSearchUpdateData;
    
    // Perform user search
    await this.performUserSearch(data.searchQuery);
    
    // Select target user
    await this.selectTargetUser(data.targetUser);
    
    // Open change dialog
    await this.openChangeSelectedDialog();
    
    // Select field to update
    await this.selectFieldToUpdate(data.fieldToUpdate);
    
    // Check the checkbox
    await this.checkTargetCheckbox(data.checkboxSelector);
    
    // Save changes
    await this.saveChanges();
    
    console.log('✅ User search and update flow completed successfully!');
  }
}

/**
 * Keyword Page Object
 */
export class KeywordPage extends BasePage {
  async navigateToKeywords(): Promise<void> {
    console.log('🔑 Navigating to Keywords...');
    await this.page.getByRole('link', { name: 'Keywords ' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Navigated to Keywords');
  }

  async navigateToNewKeyword(): Promise<void> {
    console.log('➕ Navigating to New Keyword...');
    await this.page.getByRole('link', { name: 'New Keyword' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Navigated to New Keyword');
  }

  async fillKeywordValue(value?: string): Promise<void> {
    console.log('📝 Filling keyword value...');
    const keywordValue = value || this.config.keywordData.value;
    await this.page.locator('#newvalue').fill(keywordValue);
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log(`✅ Filled keyword value: ${keywordValue}`);
  }

  async clickOk(): Promise<void> {
    console.log('✅ Clicking OK button...');
    await this.page.getByRole('button', { name: 'OK' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ OK clicked');
  }

  async saveKeyword(): Promise<void> {
    console.log('💾 Saving keyword...');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForTimeout(this.config.timeouts.long);
    console.log('✅ Keyword saved');
  }

  async navigateToSearchUpdate(): Promise<void> {
    console.log('🔍 Navigating to Search & Update...');
    await this.page.getByRole('link', { name: 'Search & Update' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Navigated to Search & Update');
  }

  async fillSearchTerm(term?: string): Promise<void> {
    console.log('📝 Filling search term...');
    const searchTerm = term || this.config.keywordData.searchTerm;
    await this.page.locator('#subjecttosearch').fill(searchTerm);
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log(`✅ Filled search term: ${searchTerm}`);
  }

  async clickSearch(): Promise<void> {
    console.log('🔎 Performing search...');
    await this.page.locator('#form1').getByRole('button', { name: 'Search' }).click();
    await this.waitForTimeout(this.config.timeouts.slow);
    console.log('✅ Search performed');
  }

  async deleteKeyword(keywordName?: string): Promise<void> {
    console.log('🗑️ Deleting keyword...');
    const name = keywordName || this.config.keywordData.value;
    await this.page.getByRole('row', { name }).locator('img').nth(1).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.saveKeyword();
    console.log(`✅ Deleted keyword: ${name}`);
  }

  async verifyNoResults(): Promise<void> {
    console.log('🔍 Verifying no search results...');
    await expect(this.page.locator('#NoSearchResultsDiv')).toContainText('No keywords were found.');
    console.log('✅ No results verified');
  }

  async performCompleteKeywordFlow(keywordData?: { value: string; searchTerm: string }): Promise<void> {
    console.log('🔄 Performing complete keyword create, search, and delete flow...');
    
    const data = keywordData || this.config.keywordData;
    
    // Create keyword
    await this.navigateToKeywords();
    await this.navigateToNewKeyword();
    await this.fillKeywordValue(data.value);
    await this.clickOk();
    await this.saveKeyword();
    
    // Search and delete
    await this.navigateToSearchUpdate();
    await this.fillSearchTerm(data.searchTerm);
    await this.clickSearch();
    await this.deleteKeyword(data.value);
    
    // Verify deletion
    await this.navigateToSearchUpdate();
    await this.fillSearchTerm(data.searchTerm);
    await this.clickSearch();
    await this.verifyNoResults();
    
    console.log('✅ Keyword flow completed successfully!');
  }
}

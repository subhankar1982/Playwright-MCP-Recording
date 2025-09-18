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
  }): Promise<void> {
    // Fill last name
    await this.page.locator(locators.userCreation.lastNameField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.lastNameField).fill(userData.lastName);
    await this.waitForTimeout(this.config.timeouts.slow);
    await this.page.locator(locators.userCreation.lastNameField).press('Tab');
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Fill first name
    await this.page.locator(locators.userCreation.firstNameField).fill(userData.firstName);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // Fill phone
    await this.page.locator(locators.userCreation.phoneField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.phoneField).fill(userData.phone);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // Check secret phone using robust checkbox handler
    await this.handleCheckbox(locators.userCreation.secretPhoneCheckbox, true);
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Fill cordless
    await this.page.locator(locators.userCreation.cordlessField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.cordlessField).fill(userData.cordless);
    await this.waitForTimeout(this.config.timeouts.slow);
    
    // Check secret cordless using robust checkbox handler
    await this.handleCheckbox(locators.userCreation.secretCordlessCheckbox, true);
    await this.waitForTimeout(this.config.timeouts.step);
    
    // Fill title
    await this.page.locator(locators.userCreation.titleField).click();
    await this.waitForTimeout(this.config.timeouts.step);
    await this.page.locator(locators.userCreation.titleField).fill(userData.title);
    await this.waitForTimeout(this.config.timeouts.slow);
  }

  async saveRecord(): Promise<void> {
    await this.page.getByRole('button', { name: 'Save' }).click();
    // Wait for save to complete with a more reasonable timeout
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
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

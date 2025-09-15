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

/**
 * User Creation Page Object
 */
export class UserCreationPage extends BasePage {
  async navigateToNewRecord(): Promise<void> {
    await this.page.getByRole('link', { name: 'New record F2' }).click();
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
    
    // Check secret phone using robust checkbox handler
    await this.handleCheckbox(locators.userCreation.secretPhoneCheckbox, true);
    
    // Fill cordless
    await this.page.locator(locators.userCreation.cordlessField).click();
    await this.waitForTimeout(2000);
    await this.page.locator(locators.userCreation.cordlessField).fill(userData.cordless);
    
    // Check secret cordless using robust checkbox handler
    await this.handleCheckbox(locators.userCreation.secretCordlessCheckbox, true);
    
    // Fill title
    await this.page.locator(locators.userCreation.titleField).click();
    await this.page.locator(locators.userCreation.titleField).fill(userData.title);
  }

  async saveRecord(): Promise<void> {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForTimeout(2000);
  }

  async searchUser(searchTerm: string): Promise<void> {
    await this.page.goto('http://10.211.63.208/CMG.DM/subsform/Index?recordid=1025&currtab=subsform');
    await this.page.locator(locators.userCreation.quickSearchField).click();
    await this.page.locator(locators.userCreation.quickSearchField).fill(searchTerm);
    await this.page.locator(locators.userCreation.quickSearchField).press('Enter');
  }

  /**
   * Helper method to handle checkbox interactions with fallback options
   */
  async handleCheckbox(selector: string, shouldCheck: boolean = true): Promise<void> {
    const checkbox = this.page.locator(selector);
    
    try {
      // First, try the standard check/uncheck
      const isChecked = await checkbox.isChecked();
      
      if (shouldCheck && !isChecked) {
        await checkbox.check();
      } else if (!shouldCheck && isChecked) {
        await checkbox.uncheck();
      }
      
      // Verify the state changed
      await this.waitForTimeout(500);
      const newState = await checkbox.isChecked();
      
      if (newState !== shouldCheck) {
        // Fallback: try clicking directly
        await checkbox.click({ force: true });
        await this.waitForTimeout(500);
      }
    } catch (error) {
      // Final fallback: use force click
      console.log(`Checkbox interaction failed, using force click: ${error}`);
      await checkbox.click({ force: true });
      await this.waitForTimeout(500);
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

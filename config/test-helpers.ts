import { Page } from '@playwright/test';
import { TestConfig } from './test-config';
import { LoginPage, SearchPage, NavigationPage, UserCreationPage } from './page-objects';

export class TestHelpers {
  public loginPage: LoginPage;
  public searchPage: SearchPage;
  public navigationPage: NavigationPage;
  public userCreationPage: UserCreationPage;

  constructor(private page: Page, private config: TestConfig) {
    this.loginPage = new LoginPage(page, config);
    this.searchPage = new SearchPage(page, config);
    this.navigationPage = new NavigationPage(page, config);
    this.userCreationPage = new UserCreationPage(page, config);
  }

  /**
   * Performs login with configured credentials
   */
  async login(): Promise<void> {
    await this.loginPage.login();
  }

  /**
   * Performs logout
   */
  async logout(): Promise<void> {
    await this.navigationPage.logout();
  }

  /**
   * Navigates to search functionality
   */
  async navigateToSearch(): Promise<void> {
    await this.searchPage.navigateToSearch();
  }

  /**
   * Performs a search with the given query
   */
  async performSearch(query?: string): Promise<void> {
    await this.searchPage.performSearch(query);
  }

  /**
   * Complete login flow - navigates to app and logs in
   */
  async loginFlow(): Promise<void> {
    await this.loginPage.goto();
    await this.login();
  }

  /**
   * Complete search flow - login, navigate to search, perform search
   */
  async searchFlow(query?: string): Promise<void> {
    await this.loginFlow();
    await this.navigateToSearch();
    await this.performSearch(query);
  }
}

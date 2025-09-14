/**
 * Page Object Locators
 * Contains all the selectors used throughout the application
 */

export interface AppLocators {
  login: {
    usernameField: string;
    passwordField: string;
    loginButton: string;
  };
  navigation: {
    searchRecordLink: string;
    logoutLink: string;
  };
  search: {
    searchField: string;
    searchButton: string;
  };
}

export const locators: AppLocators = {
  login: {
    usernameField: 'textbox[name="User Name"]',
    passwordField: 'textbox[name="Password"]',
    loginButton: 'button[name=" Log in"]'
  },
  navigation: {
    searchRecordLink: 'link[name="Search record F9"]',
    logoutLink: 'link[name="Log out"]'
  },
  search: {
    searchField: '[id="1lname"]',
    searchButton: 'button[name="Search"]'
  }
};

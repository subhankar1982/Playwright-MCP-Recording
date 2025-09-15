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
  userCreation: {
    newRecordLink: string;
    lastNameField: string;
    firstNameField: string;
    phoneField: string;
    secretPhoneCheckbox: string;
    cordlessField: string;
    secretCordlessCheckbox: string;
    titleField: string;
    saveButton: string;
    quickSearchField: string;
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
  },
  userCreation: {
    newRecordLink: 'link[name="New record F2"]',
    lastNameField: '[id="3lname"]',
    firstNameField: '[id="3fname"]',
    phoneField: '[id="3telno"]',
    secretPhoneCheckbox: 'input[name="3secret_phone"]',
    cordlessField: '[id="3cordless"]',
    secretCordlessCheckbox: 'input[name="3secret_cordless"]',
    titleField: 'input[name="3misc15"]',
    saveButton: 'button[name="Save"]',
    quickSearchField: '#txtQuickSearch'
  }
};

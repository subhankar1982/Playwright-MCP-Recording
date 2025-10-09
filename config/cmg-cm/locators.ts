/**
 * Page Object Locators for CMG Configuration Manager
 * Contains all the selectors used throughout the CMG.CM application
 */

export interface CMGCMLocators {
  login: {
    usernameField: string;
    passwordField: string;
    loginButton: string;
  };
  navigation: {
    logoutLink: string;
  };
  systemParameters: {
    option44: string;
    value224: string;
    option213: string;
    saveButton: string;
  };
}

export const locators: CMGCMLocators = {
  login: {
    usernameField: 'input[name="username"]',
    passwordField: 'input[name="password"]', 
    loginButton: 'button[type="submit"]'
  },
  navigation: {
    logoutLink: 'a[href*="logout"]'
  },
  systemParameters: {
    option44: 'select[name="option44"]',
    value224: 'input[name="value224"]',
    option213: 'select[name="option213"]',
    saveButton: 'button[name="Save"]'
  }
};

/**
 * CMG.CM Page Object Locators
 * Contains all the selectors used throughout the CMG Configuration Manager application
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
    usernameField: 'textbox[name="User Name:"]',
    passwordField: 'textbox[name="Password:"]',
    loginButton: 'button[name=" Log In"]'
  },
  navigation: {
    logoutLink: 'link[name="Log Out"]'
  },
  systemParameters: {
    option44: '[id="44"]',
    value224: '[id="224"]',
    option213: '[id="213"]',
    saveButton: 'button:has-text("Save")'
  }
};

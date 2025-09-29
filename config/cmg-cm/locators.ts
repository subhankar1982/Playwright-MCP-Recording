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
}

export const locators: CMGCMLocators = {
  login: {
    usernameField: 'textbox[name="User Name:"]',
    passwordField: 'textbox[name="Password:"]',
    loginButton: 'button[name=" Log In"]'
  },
  navigation: {
    logoutLink: 'link[name="Log Out"]'
  }
};

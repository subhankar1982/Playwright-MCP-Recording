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
    contactProfilesLink: string;
  };
  contactProfiles: {
    newButton: string;
    okButton: string;
    saveButton: string;
    modalData1: string;
    modalData3: string;
    modalData6: string;
    pbxTable: string;
    pbxCell: string;
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
    logoutLink: 'a[href*="logout"]',
    contactProfilesLink: 'a[href*="Profiles"]'
  },
  contactProfiles: {
    newButton: 'button:has-text("New")',
    okButton: 'button:has-text("OK")',
    saveButton: 'button:has-text("Save")',
    modalData1: '#modalData1',
    modalData3: '#modalData3',
    modalData6: '#modalData6',
    pbxTable: '#pbxtable',
    pbxCell: 'icp1 - Alt.ext.1misc1 -'
  },
  systemParameters: {
    option44: 'select[name="option44"]',
    value224: 'input[name="value224"]',
    option213: 'select[name="option213"]',
    saveButton: 'button[name="Save"]'
  }
};

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
    descriptionField: string;
    departmentField: string;
    extensionField: string;
    saveButton: string;
    quickSearchField: string;
  };
  advancedSearch: {
    advancedSearchLink: string;
    radioButton1: string;
    field1: string;
    field2: string;
    operator3: string;
    field3: string;
    radio3: string;
    operator4: string;
    field4: string;
    searchButton: string;
    selectAllButton: string;
    changeSelectedButton: string;
    changeFieldSelect: string;
    dateLink: string;
    saveButton: string;
  };
  userSearchUpdate: {
    searchField: string;
    searchButton: string;
    targetUserCell: string;
    changeSelectedButton: string;
    fieldSelector: string;
    checkboxSelector: string;
    saveButton: string;
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
    descriptionField: 'textarea[name="3misc10"]',
    departmentField: 'input[name="3misc11"]',
    extensionField: 'input[name="3misc18"]',
    saveButton: 'button[name="Save"]',
    quickSearchField: '#txtQuickSearch'
  },
  advancedSearch: {
    advancedSearchLink: 'link[name="Advanced Search Alt+"]',
    radioButton1: 'input[type="radio"]:nth-child(2)',
    field1: '#field1',
    field2: '#field2',
    operator3: '#operator3',
    field3: '#field3',
    radio3: 'input[name="radio3"]:nth-child(2)',
    operator4: '#operator4',
    field4: '#field4',
    searchButton: 'button[name="Search"]',
    selectAllButton: 'button[name="Select All"]',
    changeSelectedButton: 'button[name="Change selected"]',
    changeFieldSelect: 'select[name="field"]',
    dateLink: 'link',
    saveButton: 'button[name="Save"]'
  },
  userSearchUpdate: {
    searchField: '[id="1lname"]',
    searchButton: 'button[name="Search"]',
    targetUserCell: '[role="cell"]',
    changeSelectedButton: 'button[name="Change selected"]',
    fieldSelector: 'select[name="field"]',
    checkboxSelector: '#kryssbox',
    saveButton: 'button[name="Save"]'
  }
};

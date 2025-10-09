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
  userSearchUpdate: {
    searchField: string;
    searchButton: string;
    targetUserCell: string;
    changeSelectedButton: string;
    fieldSelector: string;
    checkboxSelector: string;
    saveButton: string;
  };
  keyword: {
    keywordsLink: string;
    newKeywordLink: string;
    newValueField: string;
    okButton: string;
    saveButton: string;
    searchUpdateLink: string;
    subjectToSearchField: string;
    searchButton: string;
    keywordRow: string;
    deleteButton: string;
    noResultsDiv: string;
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
  userSearchUpdate: {
    searchField: '[id="1lname"]',
    searchButton: 'button[name="Search"]',
    targetUserCell: '[role="cell"]',
    changeSelectedButton: 'button[name="Change selected"]',
    fieldSelector: 'select[name="field"]',
    checkboxSelector: '#kryssbox',
    saveButton: 'button[name="Save"]'
  },
  keyword: {
    keywordsLink: 'a:has-text("Keywords")',
    newKeywordLink: 'a:has-text("New Keyword")',
    newValueField: '#newvalue',
    okButton: 'button[name="OK"]',
    saveButton: 'button[name="Save"]',
    searchUpdateLink: 'a:has-text("Search & Update")',
    subjectToSearchField: '#subjecttosearch',
    searchButton: '#form1 button[name="Search"]',
    keywordRow: '[role="row"]',
    deleteButton: 'img[alt="Delete"]',
    noResultsDiv: '#NoSearchResultsDiv'
  }
};

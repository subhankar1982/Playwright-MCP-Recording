# Test Configuration

This directory contains configuration files for the Playwright test suite.

## Files

### `test-config.ts`
Main configuration file containing:
- **baseUrl**: Application URL
- **credentials**: Username and password for login
- **timeouts**: Default timeout values
- **slowMode**: Configuration for slow execution mode
- **testData**: Test-specific data like search queries
- **userData**: User creation form data (lastName, firstName, phone, cordless, title, description, department, extension)
- **organizationData**: Organization creation data (description, org1, org2, phoneNumber, altDescription, greeting, miscText, grammar)
- **organizationSearchData**: Organization search and verification data (searchDescription, expectedDescription, expectedPhoneNumber, expectedGreeting, expectedOrg2)
- **advancedSearchData**: Advanced search parameters (field selections, operators, change field, date value)
- **keywordData**: Keyword creation and search data (keywordValue, keywordSearchTerm)

### `locators.ts`
Contains all page element selectors organized by functionality:
- **login**: Login page selectors
- **navigation**: Navigation and common element selectors
- **search**: Search page selectors
- **keywords**: Keyword management selectors

### `page-objects.ts`
Page Object Model implementation with classes for:
- **BasePage**: Common page functionality
- **LoginPage**: Login page actions
- **SearchPage**: Search page actions  
- **NavigationPage**: Navigation and common actions
- **UserCreationPage**: User creation and management actions
- **OrganizationPage**: Organization creation, search, and verification actions
- **AdvancedSearchPage**: Advanced search and bulk update actions
- **KeywordPage**: Keyword creation and search actions

### `test-helpers.ts`
High-level test helper functions that combine page objects for common workflows

## Environment Support

The configuration supports the development environment with ability to override values via environment variables.

### Organization Data Variables
- `ORG_DESC`: Organization description
- `ORG1`, `ORG2`: Organization fields
- `ORG_PHONE_NUMBER`: Organization phone number
- `ORG_ALT_DESC`: Alternative description
- `ORG_GREETING`: Organization greeting
- `ORG_MISC_TEXT`: Miscellaneous text
- `ORG_GRAMMAR`: Grammar field

### Organization Search Variables
- `ORG_SEARCH_DESC`: Search description
- `ORG_SEARCH_EXPECTED_DESC`: Expected description in results
- `ORG_SEARCH_EXPECTED_PHONE`: Expected phone number
- `ORG_SEARCH_EXPECTED_GREETING`: Expected greeting
- `ORG_SEARCH_EXPECTED_ORG2`: Expected org2 value

### User Creation Variables
- `USER_LASTNAME`: User's last name
- `USER_FIRSTNAME`: User's first name
- `USER_PHONE`: Phone number
- `USER_CORDLESS`: Cordless phone number
- `USER_TITLE`: User's job title
- `USER_DESCRIPTION`: User description (misc10 field)
- `USER_DEPARTMENT`: Department (misc11 field)
- `USER_EXTENSION`: Extension number (misc18 field)

### Keyword Creation and Search Variables
- `KEYWORD_VALUE`: Value for the new keyword
- `KEYWORD_SEARCH_TERM`: Term to search for keywords

## Usage

### Setting Environment
Set the `TEST_ENV` environment variable:
```bash
# PowerShell
$env:TEST_ENV = "development"

# Command Prompt
set TEST_ENV=development
```

### Using Configuration in Tests
```typescript
import { getConfig } from '../config/test-config';
import { TestHelpers } from '../config/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('example test', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Use high-level helpers
  await helpers.loginFlow();
  await helpers.performSearch('custom query');
  
  // Or use page objects directly
  await helpers.loginPage.login('username', 'password');
  await helpers.searchPage.performSearch('*');
  await helpers.navigationPage.logout();
});
```

## Architecture Benefits

### Separation of Concerns
- **Configuration**: Test data and settings
- **Locators**: Element selectors
- **Page Objects**: Page-specific actions
- **Test Helpers**: High-level workflows

### Maintainability
- Locator changes only need updates in one file
- Page object methods can be reused across tests
- Configuration changes are centralized

### Scalability
- Easy to add new pages and their objects
- New test data can be added to configuration
- Environment-specific overrides supported
master

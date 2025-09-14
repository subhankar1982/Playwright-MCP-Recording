# Test Configuration

This directory contains configuration files for the Playwright test suite.

## Files

### `test-config.ts`
Main configuration file containing:
- **baseUrl**: Application URL
- **credentials**: Username and password for login
- **timeouts**: Default timeout values
- **testData**: Test-specific data like search queries

### `locators.ts`
Contains all page element selectors organized by functionality:
- **login**: Login page selectors
- **navigation**: Navigation and common element selectors
- **search**: Search page selectors

### `page-objects.ts`
Page Object Model implementation with classes for:
- **BasePage**: Common page functionality
- **LoginPage**: Login page actions
- **SearchPage**: Search page actions  
- **NavigationPage**: Navigation and common actions

### `test-helpers.ts`
High-level test helper functions that combine page objects for common workflows

## Environment Support

The configuration supports the development environment with ability to override values via environment variables.

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

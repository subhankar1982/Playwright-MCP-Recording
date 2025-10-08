# CMG Configuration Manager (CMG-CM) Test Configuration

This directory contains configuration files for the CMG Configuration Manager test suite.

## Files

### `test-config.ts`
Main configuration file containing:
- **baseUrl**: CMG-CM application URL
- **credentials**: Username and password for login
- **timeouts**: Default timeout values for different operations
- **slowMode**: Configuration for slow execution mode with multiplier
- **expectedData**: Expected text and values for verification (menu text, etc.)
- **systemParameters**: Configuration for system parameters test (option values, etc.)

### `locators.ts`
Contains all page element selectors organized by functionality:
- **login**: Login page selectors (username, password, login button)
- **navigation**: Navigation element selectors (logout link)
- **systemParameters**: System parameters page selectors (option fields, save button)

### `page-objects.ts`
Page Object Model implementation with classes for:
- **BasePage**: Common page functionality with slow mode support
- **LoginPage**: Login page actions with verification
- **NavigationPage**: Navigation and logout actions
- **SystemParametersPage**: System parameters configuration actions

### `test-helpers.ts`
High-level test helper functions that combine page objects for common workflows:
- **loginFlow()**: Complete login with navigation and verification
- **logout()**: Logout functionality
- **completeLoginLogoutFlow()**: Full login-verify-logout workflow
- **systemParametersFlow()**: Complete system parameters configuration workflow

## Environment Support

The configuration supports environment-specific overrides via environment variables.

### Base Configuration Variables
- `CMG_CM_BASE_URL`: Override base URL (default: http://172.20.115.41/cmg.cm/)
- `CMG_CM_USERNAME`: Override username (default: niceadmin)
- `CMG_CM_PASSWORD`: Override password (default: aastra)

### Expected Data Variables
- `CMG_CM_EXPECTED_MENU_TEXT`: Override expected menu text (default: "CMG Configuration Manager")

### Timeout Configuration Variables
- `CMG_CM_DEFAULT_TIMEOUT`: Override default timeout (default: 5000ms)
- `CMG_CM_LONG_TIMEOUT`: Override long timeout (default: 10000ms)
- `CMG_CM_SLOW_TIMEOUT`: Override slow timeout (default: 3000ms)
- `CMG_CM_STEP_TIMEOUT`: Override step timeout (default: 1000ms)

### Slow Mode Configuration
- `CMG_CM_SLOW_MODE`: Enable/disable slow mode (default: true)
- `CMG_CM_SLOW_MODE_MULTIPLIER`: Multiplier for slow mode delays (default: 1.5)

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
import { getConfig } from '../config/cmg-cm/test-config';
import { CMGCMTestHelpers } from '../config/cmg-cm/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('CMG-CM test', async ({ page }) => {
  const helpers = new CMGCMTestHelpers(page, config);
  
  // Complete login-verify-logout flow
  await helpers.completeLoginLogoutFlow();
  
  // Or use individual components
  await helpers.loginFlow();
  await helpers.logout();
});
```

### Environment Variable Examples
```bash
# Override base URL and credentials
CMG_CM_BASE_URL=http://192.168.1.100/cmg.cm/
CMG_CM_USERNAME=testuser
CMG_CM_PASSWORD=testpass

# Enable slow mode with custom multiplier
CMG_CM_SLOW_MODE=true
CMG_CM_SLOW_MODE_MULTIPLIER=2.0

# Custom timeouts
CMG_CM_DEFAULT_TIMEOUT=3000
CMG_CM_LONG_TIMEOUT=8000
```

## Test Features

### Slow Mode Support
- Configurable slow execution for better visibility
- Multiplier-based timeout adjustments
- Can be enabled/disabled via environment variables

### Robust Element Interactions
- Proper wait strategies with configurable timeouts
- Comprehensive error handling
- Detailed logging for debugging

### Verification Support
- Menu text verification after login
- Configurable expected values
- Proper assertions with meaningful error messages

### Maintainability
- All hardcoded values moved to configuration
- TypeScript interfaces for type safety
- Reusable page objects and helpers
- Environment-specific overrides

## Architecture Benefits

### Separation of Concerns
- **Configuration**: Test data and settings centralized
- **Locators**: Element selectors in dedicated file
- **Page Objects**: Page-specific actions and methods
- **Test Helpers**: High-level workflows

### Scalability
- Easy to add new test scenarios
- Configuration-driven test data
- Environment-specific customization
- Reusable components across tests

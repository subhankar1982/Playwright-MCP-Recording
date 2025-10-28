# Playwright Test Suite

This project contains automated test suites for multiple CMG applications using Playwright.

## Project Structure

```
tests/
├── cmg-dm/              # CMG Directory Manager tests
│   ├── delete-organization.spec.ts
│   ├── keyword-create-search-delete.spec.ts
│   ├── new-organization-ceation.spec.ts
│   ├── new-users-creation.spec.ts
│   ├── newly-created-org-search.spec.ts
│   ├── users-search.spec.ts
│   └── users-update.spec.ts
├── cmg-cm/              # CMG Configuration Manager tests
│   └── CMG-CM-login.spec.ts
└── ContactProfiles-CMGCM.spec.ts  # Contact Profiles test (fully parameterized)

config/
├── cmg-dm/              # CMG Directory Manager configuration
│   ├── locators.ts      # Element selectors
│   ├── page-objects.ts  # Page Object Model
│   ├── test-config.ts   # Test configuration and data
│   ├── test-helpers.ts  # High-level test workflows
│   └── README.md        # CMG.DM specific documentation
└── cmg-cm/              # CMG Configuration Manager configuration
    ├── locators.ts      # Element selectors (updated with Contact Profiles)
    ├── page-objects.ts  # Page Object Model
    ├── test-config.ts   # Test configuration and data
    ├── test-helpers.ts  # High-level test workflows
    ├── contact-profiles-config.ts     # Contact Profiles configuration
    ├── contact-profiles-page-objects.ts  # Contact Profiles page objects
    └── contact-profiles-test-helpers.ts  # Contact Profiles test helpers
```

## Test Suites

### CMG Directory Manager (CMG.DM)
- **URL**: `http://172.20.115.41/cmg.dm/`
- **Tests**: User management, organization management, keywords
- **Configuration**: Fully parameterized with environment variable support

### CMG Configuration Manager (CMG.CM)
- **URL**: `http://172.20.115.41/cmg.cm/`
- **Tests**: Login/logout, Contact Profiles CRUD operations
- **Configuration**: Fully parameterized with environment variable support

### Contact Profiles Test (Fully Parameterized)
- **File**: `ContactProfiles-CMGCM.spec.ts`
- **Features**: 
  - Complete CRUD workflow for Contact Profiles
  - Fully configurable via environment variables
  - Slow execution mode support
  - Environment-specific configurations
  - Robust error handling and timeouts

## Configuration & Environment Variables

### Setup Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Customize variables in `.env`:
   ```bash
   # Application URLs
   CMG_CM_BASE_URL=http://172.20.115.41/cmg.cm/
   
   # Login Credentials
   CMG_CM_USERNAME=niceadmin
   CMG_CM_PASSWORD=aastra
   
   # Timeout Configuration (ms)
   TIMEOUT_DEFAULT=5000
   TIMEOUT_SLOW=3000
   TIMEOUT_NAVIGATION=10000
   
   # Slow Mode (for debugging/demo)
   SLOW_MODE_ENABLED=true
   SLOW_MODE_MULTIPLIER=2.0
   
   # Test Data
   CONTACT_PROFILE_NAME=AI R&D
   CONTACT_PROFILE_PBX_TYPE=17
   CONTACT_PROFILE_DESCRIPTION=test
   
   # Test Environment
   TEST_ENV=development
   ```

### Environment-Specific Configurations
- **development**: Enables slow mode, uses dev URLs
- **testing**: Increases timeouts by 1.5x
- **production**: Disables slow mode, uses prod URLs

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run Contact Profiles test specifically
```bash
npx playwright test ContactProfiles-CMGCM.spec.ts
```

### Run with specific environment
```bash
TEST_ENV=production npx playwright test ContactProfiles-CMGCM.spec.ts
```

### Run in headed mode (see browser)
```bash
npx playwright test ContactProfiles-CMGCM.spec.ts --headed
```

### Run with slow mode enabled
```bash
SLOW_MODE_ENABLED=true npx playwright test ContactProfiles-CMGCM.spec.ts --headed
```

### Custom test data
```bash
CONTACT_PROFILE_NAME="Custom Profile" CONTACT_PROFILE_DESCRIPTION="Custom Description" npx playwright test ContactProfiles-CMGCM.spec.ts
```

## Environment Configuration

### CMG.DM Environment Variables
See `config/cmg-dm/README.md` for detailed configuration options.

### CMG.CM Environment Variables
- `CMG_CM_BASE_URL`: Override base URL
- `CMG_CM_USERNAME`: Override username
- `CMG_CM_PASSWORD`: Override password
- `CMG_CM_DEFAULT_TIMEOUT`: Override default timeout
- `CMG_CM_LONG_TIMEOUT`: Override long timeout
- `CMG_CM_SLOW_TIMEOUT`: Override slow timeout
- `CMG_CM_STEP_TIMEOUT`: Override step timeout

## Adding New Test Suites

1. Create a new folder under `tests/` for your application
2. Create corresponding configuration folder under `config/`
3. Follow the established patterns:
   - `test-config.ts` for configuration and test data
   - `locators.ts` for element selectors
   - `page-objects.ts` for Page Object Model
   - `test-helpers.ts` for high-level workflows

## Benefits of This Structure

- **Separation of Concerns**: Each application has its own test suite and configuration
- **Scalability**: Easy to add new applications and test suites
- **Maintainability**: Changes to one application don't affect others
- **Reusability**: Common patterns can be shared across applications
- **Environment Support**: Each suite can have its own environment variables

## Architecture

Each test suite follows the same architectural pattern:
- **Configuration Layer**: Test data and settings
- **Locator Layer**: Element selectors
- **Page Object Layer**: Page-specific actions and methods
- **Helper Layer**: High-level workflows combining multiple page objects
- **Test Layer**: Actual test scenarios

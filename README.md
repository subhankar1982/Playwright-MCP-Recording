# Playwright Test Suite

This project contains automated test suites for multiple CMG applications using Playwright.

## Project Structure

```
tests/
├── cmg-dm/              # CMG Directory Manager tests
│   ├── advanced-search.spec.ts
│   ├── delete-organization.spec.ts
│   ├── keyword-create-search-delete.spec.ts
│   ├── new-organization-ceation.spec.ts
│   ├── new-users-creation.spec.ts
│   ├── newly-created-org-search.spec.ts
│   ├── users-search.spec.ts
│   └── users-update.spec.ts
└── cmg-cm/              # CMG Configuration Manager tests
    └── test-1.spec.ts

config/
├── cmg-dm/              # CMG Directory Manager configuration
│   ├── locators.ts      # Element selectors
│   ├── page-objects.ts  # Page Object Model
│   ├── test-config.ts   # Test configuration and data
│   ├── test-helpers.ts  # High-level test workflows
│   └── README.md        # CMG.DM specific documentation
└── cmg-cm/              # CMG Configuration Manager configuration
    ├── locators.ts      # Element selectors
    ├── page-objects.ts  # Page Object Model
    ├── test-config.ts   # Test configuration and data
    └── test-helpers.ts  # High-level test workflows
```

## Test Suites

### CMG Directory Manager (CMG.DM)
- **URL**: `http://172.20.115.41/cmg.dm/`
- **Tests**: User management, organization management, advanced search, keywords
- **Configuration**: Fully parameterized with environment variable support.

### CMG Configuration Manager (CMG.CM)
- **URL**: `http://172.20.115.41/cmg.cm/`
- **Tests**: Basic login/logout functionality
- **Configuration**: Parameterized configuration structure

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test suite
```bash
# CMG Directory Manager tests
npx playwright test tests/cmg-dm/

# CMG Configuration Manager tests
npx playwright test tests/cmg-cm/
```

### Run specific test file
```bash
npx playwright test tests/cmg-dm/advanced-search.spec.ts
npx playwright test tests/cmg-cm/test-1.spec.ts
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

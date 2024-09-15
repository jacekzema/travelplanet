# Travelplanet - Simple Tests in Playwright

This Playwright test suite is designed to verify the functionality and presence of key elements on various travel-related websites. The tests are categorized into the following sections:

1. **Homepage Navigation and Element Verification**
2. **Login Functionality**
3. **Destination and Date Selection**
4. **Offer Selection and Offer Page Validation**

**Example URLs Tested**:

- `travelplanet.pl`
- `invia.cz`
- `invia.sk`
- `invia.hu`

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js**

To set up the project, clone the repository and run the following commands to download and install all dependencies:

```
npm install --force
npx playwright install --with-deps
```

## Test execution

To run all tests, use the following command:

`npx playwright test`

To run a specific test (name in command should contain real test name):

```
npx playwright test -g "Navigate to the homepage"
npx playwright test -g "Login functionality"
npx playwright test -g "and Date selection"
```

To run tests in headed mode (with the browser window visible):

`npx playwright test --project chromium --headed`

## Test report

To generate and view an HTML test report, use the following command:

`npx playwright show-report`

## Note:

Tests might be improved by add URLs and localization codes of following sited as environment variables then it will be easier to split test by market.

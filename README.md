# orange-hrm-pw

Automated end-to-end tests for the [Orange HRM](https://opensource-demo.orangehrmlive.com/) web application using [Playwright](https://playwright.dev/). This project ensures core functionality through browser automation for testing workflows, UI behavior, and data integrity.

## Table of Contents

- [Project Overview](#project-overview)
- [System Requirements](#system-requirements)
- [Setup](#setup)
- [Running tests](#running-tests)
- [Reporting](#reporting)
- [Project Structure](#project-structure)
- [Project Approach](#project-approach)

## Project Overview

This project automates testing for the Orange HRM web application using Playwright. It covers user authentication, user and attachment management, vacancies filter and dashboard chart validation to ensure application stability.

## System Requirements

- **Node.js**: Latest version of Node.js **18**, **20**, or **22**
- **Operating System**:
  - **Windows**: Windows 10+, Windows Server 2016+, or Windows Subsystem for Linux (WSL)
  - **macOS**: macOS 14 Ventura or later
  - **Linux**: Debian 12, Ubuntu 22.04 or 24.04 (x86-64 and ARM64)

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mzivanovic89/orange-hrm-pw.git
   cd orange-hrm-pw
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install Playwright browsers**:

   ```bash
   npx playwright install --with-deps
   ```

4. **Set environment variables**:

   Create a `.env` file in the root of the project (or use your shell environment) to define variables. Use `.env.example` as template.

## Running tests

To run the test suite:

```bash
npm run test
```

To run a specific group of tests (eg. auth tests):

```bash
npx playwright test --grep @auth
```

All test tags can be found in `types/enum/Tag.ts` file.

## Reporting

After running tests, Playwright automatically generates following reports:

- **HTML Report**: `playwright-report/`
- **Allure**: `allure-results/`

#### HTML Report

HTML report will open in your default browser showing detailed results including steps, traces, and screenshots if there are failing tests. If all tests pass and you still want to view the report, use the following command:

```bash
npx playwright show-report
```

Project is currently configured to only save screenshots and traces for failed tests.

## Project Structure

```
orange-hrm-pw/
├── base/
│   └── test.ts            # Base test with fixtures
├── fixtures/              # Custom test fixtures
│   ├── Actions.ts         # Common cross-page flows
│   └── Pages.ts           # Wrapper class to access all POMs
├── pages/                 # Page Object Model classes
├── resources/             # Static assets
├── tests/                 # Playwright test specs
├── types/                 # Custom TypeScript types and enums
├── util/                  # Utility functions and helpers
├── .prettierrc
├── package.json
├── playwright.config.ts
├── project.config.ts
├── README.md
└── tsconfig.json
```

## Project Approach

### Test Wrapper and Fixtures

- **Custom test wrapper**:
  `base/test.ts` extends Playwright's default `test` function by injecting custom fixtures. This enables centralized access to POM instances and shared utilities.

- **Fixtures for structure and reuse**:
  - `fixtures/Pages.ts`: Provides a single class to initialize and access all Page Object Model instances, keeping test files cleaner and more focused on logic.
  - `fixtures/Actions.ts`: Encapsulates common workflows that span across multiple pages. Single-page logic resides in the respective Page Object class.

### Page Object Model (POM) Design

- **Form helpers**:
  POM methods responsible for populating forms accept data objects with optional properties. This flexible design allows skipping certain fields by simply omitting them from the input object — ideal for partial form interactions or negative testing scenarios.

### Test Design Philosophy

- **Test isolation**:
  Each test creates and manages its own data to remain independent of other tests. This aligns with [Playwright’s testing philosophy](https://playwright.dev/docs/best-practices#testing-philosophy) and improves reliability.

- **Data-driven testing**:
  Each data-driven test consists of two files:
  - `.spec.ts` file for the test logic
  - `.scenarios.ts` file for the test data

- **Assertions in tests**:
  Assertions are written directly in test files rather than abstracted away. This keeps the test logic transparent and makes it easier to understand exactly what each test is validating.

### Teardown Strategy

- **Current teardown**:
  The teardown logic is implemented as a **separate project**, referred to as the **teardown project**. It is designed to clean up any data created during test execution. This teardown project runs **after the main test project finishes**, regardless of whether a single test or the full test suite is executed.  
  The teardown currently uses **UI actions** for cleanup due to ease of implementation and shared flows with the main test logic.

- **Ideal teardown**:
  In the future, teardown operations should use API calls wherever possible. This will make cleanup faster and decoupled from the UI.

### Limitations

- It is expected that the web application under test is always displayed in **English**. Language or localization switching is not currently supported and may cause test failures if the UI language differs from English.

- The `JobTitles` enum data is currently **hardcoded** for simplicity. In a real-world scenario, job titles would ideally be fetched dynamically from the web application or created as part of the test setup.

- The current setup supports only **desktop browsers**. With minor tweaks, the project could be extended to support mobile execution as well.

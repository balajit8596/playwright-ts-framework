# Playwright + TypeScript Test Automation Framework

A scalable UI and API test automation framework built with **Playwright**, **TypeScript**, the **Page Object Model**, and **custom fixtures**, with CI on GitHub Actions.

Targets two public demo systems so anyone can run it with no setup:
- UI: [SauceDemo](https://www.saucedemo.com)
- API: [JSONPlaceholder](https://jsonplaceholder.typicode.com)

## Highlights

- **Page Object Model** with a shared `BasePage` and `test.step` reporting for readable traces
- **Custom fixtures** inject page objects, an authenticated session, and an API client, so specs stay short
- **UI and API tests in one framework**, separated by Playwright projects
- **Multi-browser** (Chromium, Firefox), parallel execution, retries on CI
- **Typed config** via `.env` with sensible defaults
- **Rich diagnostics**: HTML report, JUnit XML, traces, screenshots and video on failure
- **Tagging** (`@smoke`) for fast subset runs
- **CI pipeline** that type-checks, runs tests, and uploads the report

## Project structure

```
├── .github/workflows/playwright.yml   CI pipeline
├── src/
│   ├── api/ApiClient.ts               typed API wrapper
│   ├── config/env.ts                  environment config
│   ├── fixtures/index.ts              custom fixtures (the glue)
│   ├── pages/                         page objects
│   └── utils/testData.ts              test data and builders
├── tests/
│   ├── api/posts.spec.ts
│   └── ui/{login,cart}.spec.ts
└── playwright.config.ts
```

## Getting started

```bash
npm install
npx playwright install
cp .env.example .env     # optional, defaults work

npm test                 # everything
npm run test:smoke       # @smoke only
npm run test:ui          # UI (chromium)
npm run test:api         # API only
npm run report           # open HTML report
```

## Design decisions

- **Fixtures over `beforeEach`**: setup is declared by what a test needs (`loggedInInventory`), which is reusable and parallel-safe.
- **Locators live only in page objects**, so a UI change is fixed in one place. Specs contain intent and assertions.
- **Web-first assertions** (`expect(locator)`) auto-wait, avoiding hard sleeps and flakiness.
- **API client wrapper** keeps request code out of specs and gives consistent reporting.

## Ideas for extension

Visual regression, `storageState` login reuse, Allure reporting, Docker image, data-driven tests from JSON/CSV.

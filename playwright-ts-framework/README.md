# Playwright TypeScript Framework

Minimal, production-oriented Playwright + TypeScript framework scaffold.

Quick commands

Install dependencies:

```bash
npm ci
```

Run tests locally (test env):

```bash
ENV=test npx playwright test
```

Run inside Docker:

```bash
docker build -t pw-ts .
docker run --rm pw-ts
```

Show HTML report:

```bash
npx playwright show-report
```

Notes
- Design pattern: Page Object Model (`src/pages`)
- HTML reporting enabled via Playwright reporter
- Environments: `.env.test`, `.env.dev`, `.env.prod` (controlled with `ENV` env var)
- Network stubbing: you can integrate `@playwright/mcp` for advanced request mocking
- CI: GitHub Actions workflow in `.github/workflows/ci.yml`

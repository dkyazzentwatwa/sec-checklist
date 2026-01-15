# Testing Guide

Rights Shield uses Vitest for unit and component tests.

## Run Tests

```bash
npm run test
```

## Run Tests With Coverage

```bash
npm run test -- --coverage
```

## Linting

```bash
npm run lint
```

## Writing Tests

- Place tests alongside source or in `__tests__` directories.
- Use `*.test.ts` or `*.test.tsx` naming.
- Keep tests focused on critical user workflows and edge cases.

## Suggested Focus Areas

- Checklist progress tracking and persistence
- AI model loading workflows and error handling
- Offline detection and fallback behavior

## CI Expectations

CI runs lint, a security audit, a production build, and test coverage on every push/PR.
Fix failures locally before opening a pull request.

# OfferingProt

## Running the tests

By default, the tests run against the `test` environment.

Start the tests by running `yarn test`.

### Using different start URLS

Configure target environment:

- by setting `INSIGHTUI_TEST_URL` environment variable (permanently)
- by providing in git bash using: `$ INSIGHTUI_TEST_URL=https://xxx.com yarn test` (only valid for one call)
- by setting in `.env` file

Or simply use the commands `yarn test:maint` or `yarn test:dev`.

## Lint

Run `yarn lint` to check code for linter errors.

## Install dependencies

Run `yarn reinstall` to install all required dependencies and updates.

## Running protractor / cucumber tests

Run `yarn test` to execute the unit tests.

## Debugging protractor / cucumber tests

To debug tests in VS Code you can use predefined `protractor` debug configuration.

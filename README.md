# Frontend Monorepo

## Collections

### Packages

| Package | Description |
| --- | --- |
| [`@loyalty-corp/superadmin`](/packages/super)| |
| [`@loyalty-corp/payments-admin`](/packages/payments) | |

### Applications

| Application | Description          |
| ----------- | -------------------- |
| super       | `yarn dev`           |
| payments    | `yarn dev payments`  |

## Getting Started

All packages with docker compose

```bash
# Clone monorepo
git clone git@github.com:loyaltycorp/manage-v2-frontend.git

# Install package dependencies
yarn clean

# Start working!
```

### Start Super with Docker Compose

```bash
docker-compose up
```

## Work Processes

1. Create branch
   - `git branch -b feature/TICKET_NUM`
2. Commit your work using conventional commit message format
   - eg. `fix(scope): my message about the work`
3. Push branch
4. Create pull request to `master`

## Commands

### General

| Command                               | Description                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `yarn bootstrap`                      | Install dependencies and symlinks local packages                                                          |
| `yarn bootstrap:ci`                   | CI specific bootstrapper                                                                                  |
| `yarn build {optional: package-name}` | Build demo-app by default, add package-name to scope build to another package                             |
| `yarn clean`                          | Removes all non-root modules and re-install dependencies                                                  |
| `yarn commit`                         | Takes you through a commit prompter - helpful for people new to conventional commit messaging             |
| `yarn dev`                            | Run demo-app locally                                                                                      |
| `yarn launch`                         | Automatically version and publish packages which have changed                                             |
| `yarn lint`                           | Test linting globally, runs lint command in each package (package scripts must be setup first)            |
| `yarn lint:fix`                       | Lint attempts fixes globally, runs lint:fix command in each package (package scripts must be setup first) |
| `yarn list-package`                   | Lists available packages in the monorepo                                                                  |
| `yarn unit`                           | Runs global unit tests                                                                                    |
| `yarn unit:watch`                     | Unit test watcher                                                                                         |
| @todo - `yarn test`                   | Run tests only on packages that have changes detected                                                     |
| @todo - `yarn e2e`                    | Run e2e tasks only on packages that have changes detected                                                 |
| @todo - `yarn deploy`                 | Build and deploy a project from your local                                                                |

### Lerna

> FYI only, use general commands above when possible

| Command                                                | Description                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| `lerna bootstrap`                                      | Installs depedencies and symlink                              |
| `lerna clean`                                          | Delete all node_modules                                       |
| `lerna import /path/to/repo --flatten --dest=packages` | Import and install an external repo as a package              |
| `lerna publish`                                        | Automatically version and publish packages which have changed |

## Troubleshooting

### I want to use packages in the monorepo in my local projects

> Link local package

```bash
cd packages/base-components
yarn link
```

> Link to repo you're working in

```bash
cd rewards-pa
yarn link @loyalty-corp/base-components
```

### Lerna commands aren't working as expected

Do not use reserved names for yarn scripts, eg. `yarn version` could interfere with `lerna publish` functions

For safety package functions of the monorepo do not use `publish, version, import, boostrap, clean` etc.

### I can't pull @loyalty-corp/ scoped packages

Copy the .npmrc file from the /etc/ folder into the root. DO not commit this file

### I can't publish my packages

1. Check that packages which ARE being published have the @loyalty-corp scope

```json
# package.json
{
    "name": "@loyalty-corp/NAME",
    ...
    "publishConfig": {
        "access": "restricted"
    },
    ...
}
```

1. Make sure your local `master` branch is up to date with the remote
1. Make sure you're signed into NPM registry `npm login` and have permission to write to the `@loyalty-corp` scope

### I don't want to package a project or package to NPM registry

Add private to your package.json

```json
# package.json
{
    ...
    "private": true,
    ...
}
```

## References

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

- [Lerna](https://github.com/lerna/lerna)

## Automations

| Name                     | Purpose                                                                                                               | URL                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| GH Auto Assign           | Automatically assigns pull requests to project leads                                                                  | [https://probot.github.io/apps/auto-assign/](https://probot.github.io/apps/auto-assign/)                             |
| GH Semantic Pull Request | Checks commit messaging before Pull requests hit the CI, adds status check for reviewers                              | [https://github.com/probot/semantic-pull-requests](https://github.com/probot/semantic-pull-requests)                 |
| Auto labeling            | Labels Pull requests per package, allows for easier identification and filtering of Pull Requests per project/package | [https://github.com/adamzolyak/monorepo-pr-labeler-action](https://github.com/adamzolyak/monorepo-pr-labeler-action) |

## Todo list

- [] NPM Publish in `master` from Jenkinsfile
- [] Create NPM token whitelisted for Jenkins

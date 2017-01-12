# Contributing

## Workflow

After cloning `ibm-design-charts`, run `yarn` to fetch its dependencies.

Then, you can run several commands:

- `yarn run bootstrap` to bootstrap the project, link dependencies, and do the initial build step for each package
- `yarn run lint` checks the code style.
- `yarn test -- --watch` runs our test suite and puts your terminal in `watch` mode
- `yarn test <pattern>` runs tests with matching filenames.

## Sending a Pull Request

- Create your own branch from `master` (`git checkout -b branch_name`)
- Add your changes with the corresponding tests/documentation
- Ensure your commit messages describe the changes made. (`git commit -m <Message Text>`)
- Ensure the test suite passes (`yarn test`)
- Make sure your code lints (`yarn run lint`)
- Push your local branch to it's remote location.(`git push origin branch_name`)
- Create your Pull Request, filling out all the details of the Pull Request template
- Make sure one or more team members give it a 🚀 (or a 👍) to sign-off on it

## Lerna

For full documentation, make sure to check out [lerna](lernajs.io).

### Process

We're currently publishing packages in Lerna's independent mode, so each package is able to have it's own version instead of bumping each one at the same time. You can see which packages have been updated since the last release by running:

```bash
yarn run lerna -- updated
```

You can also view all public packages by running:

```bash
yarn run lerna -- ls
```

### Publishing

To publish all applicable packages, and appropriately tag/release in `git`, you can run the following:

```bash
yarn run lerna -- publish
```

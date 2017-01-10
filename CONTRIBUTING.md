## Lerna

For full documentation, make sure to check out [lerna](lernajs.io).

### Process

We're currently publishing packages in Lerna's independent mode, so each package is able to have it's own version instead of bumping each one at the same time. You can see which packages have been updated since the last release by running:

```bash
npm run lerna -- updated
```

You can also view all public packages by running:

```bash
npm run lerna -- ls
```

### Publishing

To publish all applicable packages, and appropriately tag/release in `git`, you can run the following:

```bash
npm run lerna -- publish
```

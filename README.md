# `ibm-design-charts` [![Build Status](https://travis-ci.org/IBM-Design/charts.svg?branch=master)](https://travis-ci.org/IBM-Design/charts)

## Up & Running

- Clone or fork this repository
- Make sure you have the following technologies installed on your computer:
  - [node.js](https://nodejs.org/) - Requires node.js 6.0.0 or greater
  - [Watchman](https://facebook.github.io/watchman/) - A file watching service
  - [Yarn Package Manager](https://yarnpkg.com/en/docs/install)
- run `yarn` to install dependencies
- run `yarn run bootstrap` to bootstrap the project, link dependencies, and do the initial build step for each package
- run `yarn test` to run the tests that will run during PRs

## Design

You can find all Sketch files that define the visual specs of a chart in [charts-design](./packages/charts-design/).

## Structure

The project currently leverages [Lerna](https://lernajs.io/) in order to manage multiple packages contained within this project. To learn more about this, please view our [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Examples

At the moment, we only have `./examples` to show what our desired output is. This page uses inaccessible work and is only examples instead of reusable pieces. To run:

1. `git clone https://github.com/IBM-Design/charts.git`
2. `cd charts`
3. `yarn install`
4. `yarn run examples`

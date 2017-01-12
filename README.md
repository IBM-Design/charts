# `ibm-design-charts` [![Build Status](https://travis-ci.org/IBM-Design/charts.svg?branch=master)](https://travis-ci.org/IBM-Design/charts)

## Up & Running

- Clone or fork this repository
- Make sure you have the following technologies installed on your computer:
  - [node.js](https://nodejs.org/) Requires node.js 6.x, for example [node.js v6.6.0](https://nodejs.org/dist/v6.6.0/).
  - [Yarn Package Manager](https://yarnpkg.com/en/docs/install)
- run `yarn` to install dependencies
- run `yarn run bootstrap` to bootstrap the project, link dependencies, and do the initial build step for each package
- run `yarn test -- --watch` to run the test suite and place your terminal in `watch` mode
- run `yarn run lint` to lint the codebase

## Design

The project currently leverages [Lerna](https://lernajs.io/) in order to manage multiple packages contained within this project. To learn more about this, please view our [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Examples

At the moment, we only have `./examples` to show what our desired output is. This page uses inaccessible work and is only examples instead of reusable pieces. To run:

1. `git clone https://github.com/IBM-Design/charts.git`
2. `cd data-vis`
3. `yarn install`
4. `npm run examples`

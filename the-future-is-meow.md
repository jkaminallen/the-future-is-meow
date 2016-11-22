You have already written some code to represent the different kinds of [Felids][wikipedia-felid] in the world.
After seeing the new ES6 features, you have decided that the future is meow, and you feel the need to update your cat codebase to use the new JavaScript standard.

## Setup
In you `challenges` folder run:

```sh
$ et get the-future-is-meow
$ cd the-future-is-meow
$ npm install
$ webpack-dev-server
```
This will start you Webpack Dev Server.
If you go to [http://localhost:8080](http://localhost:8080), and open the console in your Chrome Developer Tools, there should be no errors being raised.
In `main.js`, there is code that will raise errors in the console if any of the code does not work as expected.

## Deliverables
1. Add Babel to your Webpack configuration, so you can write ES6. You will have to create a `.babelrc` file, update your `webpack.config.js`, and install the necessary NPM packages.
2. Update all the code in the `src` from ES5 to ES6.

## Pro Tips
* We recommend updating the files one at a time in the following order: `Felid.js`, `HouseCat.js`, `Lion.js`, and `main.js`.
* After updating a file, you should check that the refactored code works as expected by making sure that there are no new errors in the console.
* You will see `Uncaught TypeError: Object prototype may only be an Object or null: undefined`. Keep calm and carry on. The error will go away once you have finished refactoring `Felid.js`, `HouseCat.js`, and `Lion.js`.

[wikipedia-felid]: https://en.wikipedia.org/wiki/Felidae

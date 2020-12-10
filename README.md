# browsercheck

a tool to check your scripts for browser compatibility

## cli installation & usage

install the tool globally using npm

```bash
npm install -g @skratchdot/browsercheck
```

check if `bundle.js` will "work" in ie 8

```bash
browsercheck validate --targets "ie 8" bundle.js
```

### node installation & usage

save the library to your dependencies using npm

```bash
npm install --save browsercheck
```

check if some javascript is valid in ie 8

`index.js`:

```javascript
const { validate } = require('browsercheck');
const result1 = validate('const life = 42;', 'ie 8');
console.log(result1.valid); // false
const result2 = validate('var life = 42;', 'ie 8');
console.log(result2.valid); // true
```

## how does it work?

this script is pretty dumb (and slow)! it relies on other libraries to do all the heavy lifting.

all we do is take the input source code, and run it against a "bare minimum" babel transform twice.

first, we run it through a minimal babel config with no presets.
second, we run it through the same minimal babel config, but include the `@babel/preset-env` preset, passing in the provided `targets`.

now we compare the first and second transform. if `@babel/preset-env` didn't need to change anything, then the code should "work"
against your targets (there are of course caveats to this rule: for instance DOM polyfills and CSS aren't checked).

## why do you need this?

webpack recommends not transpiling node_modules (for speed- and other reasons). sometimes the libraries you depend on
do not support the same set of browsers your app does. when this happens- it's hard to detect which code in node_modules
will "break" your site. the goal of this project is to help detect that scenario.

once you discover the "culprits", you can edit your webpack config so you start transpiling those libs:
https://github.com/webpack/webpack/issues/2031#issuecomment-219040479

## see also

- https://github.com/browserslist/browserslist
- https://github.com/robatwilliams/es-compat
- https://github.com/amilajack/eslint-plugin-compat
- https://github.com/anandthakker/doiuse
- https://browserslist.dev/
- https://caniuse.com/

## ideas/todo

- auto update cli
- give a way to update the browserlist/caniuse db via cli
- command "detect" that finds the "lowest" version of each browser is supported
- should cli support globs (similar usage to eslint, prettier, etc)?
- look into preset-env, and why Promises are polyfilled in chrome 66
- improve demo site and docs
- add info about caveats and edge-cases
- browser plugins/bookmarklets to "test" files in network tab
- add debug module
-

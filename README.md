# Sqwk GUI

Please refer to the [Sqwk README](https://github.com/StudioLE/sqwk)

## Installation

Installation via [npm](https://www.npmjs.com/package/sqwk-gui)

```
npm install --save sqwk-gui
```

Or for the latest development release

```
npm install --save https://github.com/StudioLE/SqwkGUI/archive/master.tar.gz
```

## Usage

The module should be passed to Sqwk via the `gui` setting of `sqwk.init()`

```js
sqwk = require('sqwk')

// Must be called before any sqwk.write()
sqwk.init({
  gui: {
    module: require('sqwk-gui')
  }
})

// Must be called at the end of your application
sqwk.end()
```
## Options

The following GUI options can be passed along with the sqwk-gui module

```js
sqwk.init({  
  gui: {
    module: require('sqwk-gui'),

    // Options here

    port: 5678,
    address: 'localhost'
  }
})
```

- `port` `(Integer)` Server port
- `address` `(String)` Server address


## Documentation

### sqwk-gui.init(options, log)

Set options and start server

#### Arguments

- `options` `(Object)` Options
- `log` `(Object)` Logging module

### sqwk-gui.write(messages, options, callback)

Write to server

#### Arguments

- `messages` `(Array)` Messages
- `options` `(Array)` Selectable menu options
- `callback` `(function)` Write to server

### sqwk-gui.end()

Exit process on disconnect

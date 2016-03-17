## nconf-load
A very simple module to reduce the boilerplate code for loading configuration. The module uses [nconf](https://github.com/indexzero/nconf)'s hierarchical system in the following priority order:

1. Command line arguments
2. Environment variables
3. Configuration file passed to `#load([filepath])`

Once configuration has been loaded, you can use nconf as you normally would (i.e. `nconf.get('appKeyHere')`)

## Installation
nconf-load is available via [npm](https://www.npmjs.com/package/nconf-load), so to install, simply:
```shell
npm install --save nconf-load
```

## Usage
The main (only) method is `#load`. This method can be called with or without a path to a config file as an argument and returns an instance of nconf.

Without a configuration file:
```javascript
var nconf = require('nconf-load').load();
```

With a configuration file:

```javascript
var nconf = require('nconf-load').load('./path/to/config.json');
```

## Limitations
This module does not make use of nconf's other file loading methods (`nconf.file('key', 'path/to/config.json')` and `nconf.file('optional_key', { file: 'config.json', dir: 'search/from/here', search: true })`). They're on the to-do list, but have not been implemented yet.
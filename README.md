## nconf-load
A small module to automatically load configuration using [nconf](https://github.com/indexzero/nconf)'s hierarchical system in the following priority order:

1. Command line arguments
2. Environment variables
3. Configuration file passed to `.load([filepath])`

Once configuration has been loaded, you can use nconf as you normally would (i.e. `nconf.get('appKeyHere')`)

## Installation
nconf-load is available via [npm](https://www.npmjs.com/package/nconf-load), so to install, simply:
```shell
npm install --save nconf-load
```

## Usage
Without a configuration file:
```javascript
require('nconf-load').load();
```

With a configuration file:

```javascript
require('nconf-load').load('./path/to/config.json');
```

## nconf-load
nconf-load automatically loads configuration using [nconf](https://github.com/indexzero/nconf)'s hierarchical system in the following priority order:

1. Command line arguments
2. Environment variables
3. Configuration file passed to `.load()` (file is optional)

Once configuration has been loaded, you can use nconf as you normally would (i.e. `nconf.get('appKeyHere')`)

## Example
Without a configuration file:
```javascript
require('nconf-load').load();
```

With a configuration file:

```javascript
require('nconf-load').load('./path/to/config.json');
```

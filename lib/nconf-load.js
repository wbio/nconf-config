var nconf = require('nconf');
var callsite = require('callsite');
var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports.load = function(givenFilePath) {
	// First, use memory so we can override loaded values if we want to
	nconf.use('memory');

	// Second, use any command line arguments
	nconf.argv();

	// Third, load from environment variables
	nconf.env();

	// Finally, load from the file if it's provided
	if (typeof givenFilePath === 'string') {
		var filePath;
		var firstChar = givenFilePath.substring(0, 1);
		if (firstChar === '~' || firstChar === '/') {
			filePath = path.normalize(givenFilePath);
		} else {
			// The path is relative - use callsite to determine what directory this #load was called from
			var stack = callsite();
			var requestor = stack[1].getFileName();
			// Make the path relative to the requestor's directory
			filePath = path.normalize(path.dirname(requestor) + '/' + givenFilePath);
		}

		nconf.file({ file: filePath });
	}

	return nconf;
};

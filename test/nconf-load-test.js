var chai = require('chai');
var expect = chai.expect;
var nconf = require('nconf');
var fs = require('fs');
var argv = process.argv;
var filepath = './test/fixtures/config.json';

describe('#load', function () {

	// Reset nconf before each test
	beforeEach(function (done) {
		// Clear nconf's values
		nconf.reset();
		// Reset argv
		process.argv = argv.slice();
		// Tell Mocha we're finished
		done();
	});

	describe('variable loading', function () {
		it('should load variables from argv', function () {
			// Add a-setting to argv
			process.argv.push('--argv-setting', 'argv_value');
			// Load our library
			require('../lib/nconf-load.js').load();
			// Confirm that the argv variable is set in nconf
			expect(nconf.get('argv-setting')).to.equal('argv_value');
		});

		it('should load variables from env', function () {
			// Add a-setting to argv
			process.env['env-setting'] = 'env_value';
			// Load our library
			require('../lib/nconf-load.js').load();
			// Confirm that the environment variable is set in nconf
			expect(nconf.get('env-setting')).to.equal('env_value');
		});

		it('should load variables from a file', function () {
			// Load our library and the sample config
			require('../lib/nconf-load.js').load('./fixtures/config.json');
			// Confirm that the file variable is set in nconf
			expect(nconf.get('file-setting')).to.equal('file_value');
		});

		it('should be able to get values set via nconf#set', function () {
			// Load our library
			require('../lib/nconf-load.js').load();
			// Set a value
			nconf.set('set-setting', 'set_value');
			// Confirm that the file variable is set in nconf
			expect(nconf.get('set-setting')).to.equal('set_value');
		});
	});

	describe('hierarchy', function () {
		it('should use argv instead of an environment variable if the same key is provided for both', function () {
			// Add a-setting to argv
			process.argv.push('--a-setting', 'an_argv_value');
			// Add a-setting to ENV
			process.env['a-setting'] = 'an_env_value';
			// Load our library
			require('../lib/nconf-load.js').load();
			// Confirm that the argv variable is the one that's used by nconf
			expect(nconf.get('a-setting')).to.equal('an_argv_value');
		});

		it('should use an environment variable instead of a file variable if the same key is provided for both', function () {
			// Add a-setting to ENV
			process.env['a-setting'] = 'an_env_value';
			// Load our library and the sample config
			require('../lib/nconf-load.js').load('./fixtures/config.json');
			// Confirm that the "a-setting" key is in the file
			var fileJSON = fs.readFileSync(filepath);
			var fileObj = JSON.parse(fileJSON);
			expect(fileObj['a-setting']).to.equal('a_file_value');
			// Confirm that the environment variable is the one that's used by nconf
			expect(nconf.get('a-setting')).to.equal('an_env_value');
		});

		it('should use argv instead of a file variable if the same key is provided for both', function () {
			// Add a-setting to argv
			process.argv.push('--a-setting', 'an_argv_value');
			// Load our library and the sample config
			require('../lib/nconf-load.js').load('./fixtures/config.json');
			// Confirm that the "a-setting" key is in the file
			var fileJSON = fs.readFileSync(filepath);
			var fileObj = JSON.parse(fileJSON);
			expect(fileObj['a-setting']).to.equal('a_file_value');
			// Confirm that the argv variable is the one that's used by nconf
			expect(nconf.get('a-setting')).to.equal('an_argv_value');
		});

		it('should use argv instead of an environment variable or file variable if the same key is provided for all 3', function () {
			// Add a-setting to argv
			process.argv.push('--a-setting', 'an_argv_value');
			// Add a-setting to ENV
			process.env['a-setting'] = 'an_env_value';
			// Load our library and the sample config
			require('../lib/nconf-load.js').load('./fixtures/config.json');
			// Confirm that the "a-setting" key is in the file
			var fileJSON = fs.readFileSync(filepath);
			var fileObj = JSON.parse(fileJSON);
			expect(fileObj['a-setting']).to.equal('a_file_value');
			// Confirm that the argv variable is the one that's used by nconf
			expect(nconf.get('a-setting')).to.equal('an_argv_value');
		});

		it('should use values set by nconf#set over anything else', function () {
			// Add a-setting to argv
			process.argv.push('--a-setting', 'an_argv_value');
			// Add a-setting to ENV
			process.env['a-setting'] = 'an_env_value';
			// Load our library and the sample config
			require('../lib/nconf-load.js').load('./fixtures/config.json');
			// Confirm that the "a-setting" key is in the file
			var fileJSON = fs.readFileSync(filepath);
			var fileObj = JSON.parse(fileJSON);
			expect(fileObj['a-setting']).to.equal('a_file_value');
			// Set a-setting to something else
			nconf.set('a-setting', 'a_new_value');
			expect(nconf.get('a-setting')).to.equal('a_new_value');
		});
	});
});

'use strict';

// This is a JavaScript-based config file containing every Mocha option plus others.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
    extension: ['test.js'],
    file: ['routes'],
    ignore: ['node_modules/*'],
    recursive: true,
    slow: '75',
    spec: ['routes'], // the positional arguments!
    timeout: '2000', // same as "timeout: '2s'"
    ui: 'bdd',
    'v8-stack-trace-limit': 100, // V8 flags are prepended with "v8-"
    'watch-files': ['router.js', 'test/**/*.js'],
    'watch-ignore': ['node_modules'],
};

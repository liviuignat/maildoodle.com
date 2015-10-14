'use strict';

var path = require('path');
var jest = require('jest-cli');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (options) {
  options = options || {};
  return through.obj(function (file, enc, cb) {
    options.rootDir = options.rootDir || file.path;
    jest.runCLI({
      config: options
    }, options.rootDir, function (success) {
      if (!success) {
        cb(new gutil.PluginError('gulp-jest', {
          message: 'Tests Failed'
        }));
      } else {
        cb();
      }
    }.bind(this));
  });
};

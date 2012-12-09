var fs = require('fs'),
  path = require('path'),
 jsdom = require('jsdom'),
jquery = fs.readFileSync(path.join(__dirname, '../support/jquery-1.8.3.min.js'), 'utf8');

module.exports = function(grunt) {
  var task = grunt.task,
    file = grunt.file,
    log = grunt.log;

  grunt.registerTask('jquerytransform', 'Transform HTML files with jQuery', function() {
    grunt.config.requires('jquerytransform');

    var conf = grunt.config('jquerytransform'),
      files = file.expandFiles(conf.files),
      transform = conf.transform,
      cb = this.async();

    (function run(files) {
      var f = files.shift();

      if(!f) return cb();

      task.helper('jquerytransform:transform', f, transform, function(err, body) {
        if(err) return grunt.fail.warn(err);

        // Write the new content, and keep the doctype safe (innerHTML returns
        // the whole document without doctype).
        log.writeln(' • writing to output ' + f);
        
        fs.writeFileSync(f, '<!doctype html>' + body);

        log.writeln(String(' ✔ ').green + f);

        run(files);
      });
    }(files));
  });

  function processFile(file, cb) {
    fs.readFile(file, 'utf8', function(err, body) {
      if(err) return cb(err);

      jsdom.env({
        html: body,
        src: [jquery],
        done: cb
      });
    });
  }

  grunt.registerHelper('jquerytransform:transform', function(f, transform, cb) {
    log.subhead('About to transform ' + f);

    processFile(f, function(err, window) {
      if(err) return cb(err);

      var $ = window.$;

      transform($);

      cb(null, window.document.innerHTML, window);
    });
  });
};
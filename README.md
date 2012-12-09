# jQuery Transform

grunt-jquerytransform is a grunt task for transforming HTML files with jQuery, based on [Mickael Daniel](http://github.com/mklabs)'s original work in [h5bp/node-build-script](//github.com/h5bp/node-build-script).

## Installation

	npm install grunt-jquerytransform

## Use

```
grunt.initConfig({
  jquerytransform: {
    files: ['**/*.html'], // All HTML files
    transform: function($) {
      // For styling bullet separate from text
      $('.post li').wrapInner('<span />');
    }
  }
});

grunt.loadNpmTasks('grunt-jquerytransform');

```
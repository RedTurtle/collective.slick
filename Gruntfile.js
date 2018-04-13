module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      scripts: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: false,
        },
        files: {
          'bundle.min.js': ['bundle.js'],
        },
      },
    },
    requirejs: {
      scripts: {
        options: {
          baseUrl: './',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          paths: {
            'collective-slick-js': './slick.min',
            jquery: 'empty:',
          },
          wrapShim: true,
          name: './import-slick.js',
          exclude: ['jquery'],
          out: './bundle.js',
          optimize: 'none',
        },
      },
    },
    watch: {
      script: {
        files: ['*.js'],
        tasks: ['requirejs', 'uglify'],
      },
    },
  });

  // CWD to static folder
  grunt.file.setBase('./src/collective/slick/browser/static');

  grunt.registerTask('compile', ['requirejs', 'uglify']);
  grunt.registerTask('default', ['watch']);
};

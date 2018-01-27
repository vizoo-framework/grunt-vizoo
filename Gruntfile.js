/*
 * grunt-vizoo
 * https://github.com/vizoo-framework/grunt-vizoo
 *
 * Copyright (c) 2018 Wallace Rio
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({  
    vizoo: {
      main:{
        plugins:['grid','import'],
        attr:{splash:true,splashColor1:'#333',splashColor2:'#02ffe0'},
        src:'index.html',
        dest:'index2.html'
      }      
    }
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['vizoo']);

};

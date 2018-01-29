/*
 * grunt-vizoo
 * https://github.com/vizoo-framework/grunt-vizoo
 *
 * Copyright (c) 2018 Wallace Rio
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var http = require("http");

module.exports = function(grunt) {


  grunt.registerMultiTask('vizoo', 'Adiciona os vizoo e o', function() {

    var key = this.target;
    var value = this.data;
    var plugins = value.plugins;
    var attr = value.attr;
    var src = value.src;
    var dest = value.dest;



    var vizooPluginsList = plugins;
    var vizooPluginsListCurl = {};
    var concatSourceJs = [];
    var concatSourceCss = [];
    var index = 0;

    vizooPluginsListCurl[index] = {
        name:'core',
        type:'js-master',
        src:'http://vizoo.online/core/v1/vizoo.js',
      }

    for(key in vizooPluginsList){

      var plugin = vizooPluginsList[key];

      var pluginArray = plugin.split('@');
      var plugin2Js = plugin;
      var plugin2Css = plugin;
      var pluginName = plugin;

      if( pluginArray[0] == 'theme' ){
          plugin = 'theme';
          plugin2Js = 'theme';
          plugin2Css = pluginArray[1] + '/'+'theme';
      }

      index++;

      vizooPluginsListCurl[index] = {
        name:pluginName,
        type:'js',
        src:'http://vizoo.online/core/v1/plugins/'+plugin+'/'+plugin2Js+'.js',
      }

      index++;

      vizooPluginsListCurl[index] = {
        name:pluginName,
        type:'css',
        src:'http://vizoo.online/core/v1/plugins/'+plugin+'/'+plugin2Css+'.css',
      }



    }


    function step(array,index,name,body,type,attr,plugins,src,dest){



        if( index >= (Object.keys(array).length -1) ){
            var joins = masterJs+''+allJs+''+allCss;


            if(typeof src == 'object'){



                for(key in src){
                    var source = src[key];
                    var destination = dest+''+source;

                    var content = grunt.file.read(source);
                    content = content.replace(/\<\!\-\-\s?grunt-vizoo\/\s?\-\-\>[^]+(.*)\<\!\-\-\s?\/grunt-vizoo\s?\-\-\>/mgi,joins);
                    grunt.file.write(destination, content);
                }

            }else{
                var content = grunt.file.read(src);
                content = content.replace(/\<\!\-\-\s?grunt-vizoo\/\s?\-\-\>[^]+(.*)\<\!\-\-\s?\/grunt-vizoo\s?\-\-\>/mgi,joins);
                grunt.file.write(dest, content);
            }



            done();
        }
        if(type == 'js-master'){
            var attrString = JSON.stringify(attr);
            attrString = attrString.replace('{','');
            attrString = attrString.replace('}','');
            masterJs = '<script type="text/javascript" data-vizoo-core data-vizoo-attr=\''+attrString+'\'>'+"\n"+body+"\n"+'</script>';

        }
        if(type == 'js')
            allJs += '<script type="text/javascript" data-name="'+name+'">'+"\n"+body+"\n"+'</script>';
        if(type == 'css'){

            allCss += '<style type="text/css" data-name="'+name+'">'+"\n"+body+"\n"+'</style>';
        }
    }

  var masterJs = '';
  var allJs = '';
  var allCss = '';
  var done = this.async();
  var index = 0;


  var downloadScript = function(downloadScript,vizooPluginsListCurl,index){


      if( vizooPluginsListCurl[index] == undefined){
          return false;
      }


      var name = vizooPluginsListCurl[index].name;
      var type = vizooPluginsListCurl[index].type;
      var path = vizooPluginsListCurl[index].src;


        grunt.log.writeln(index+' : downloading Vizoo... '+name+' - '+type);

          request.get(path,function(error,response,body){
            if (!error && response.statusCode == 200) {
              step(vizooPluginsListCurl,index,name,body,type,attr,plugins,src,dest);
              index++;
              downloadScript(downloadScript,vizooPluginsListCurl,index);
            }else{
              grunt.log.writeln('error on download: '+name+' - '+path);
            }


          });




  }

  downloadScript(downloadScript,vizooPluginsListCurl,0);


  });

};

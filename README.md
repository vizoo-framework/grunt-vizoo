
# grunt-vizoo

> Add Vizoo script and inline plugins into HTML document

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vizoo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vizoo');
```

## The "vizoo" task

### Overview
In your project's Gruntfile, add a section named `vizoo` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  vizoo: {
      main:{
        plugins:array,
        attr:object,
        src:string,
        dest:string
      }      
    }
});
```

### Options

#### plugins

An array containing the names of the files you use

#### attr

attribute parameters **data-vizoo-attr** used in the vizu script tag

#### src

source document that will be used to replace the script

#### dest

destination document that will contain inline scripts

### Usage Examples

```js
grunt.initConfig({
  vizoo: {
      main:{
        plugins:['grid','import'],
        attr:{splash:true,splashColor1:'#333',splashColor2:'#02ffe0'},
        src:'index.html',
        dest:'index-dest.html'
      }      
    }
});
```


#### document replace

add in your document HTML the next comments:

```html
<!-- grunt-vizoo/ -->
  <script></script>
<!-- /grunt-vizoo -->
```
Content will be replaced with the vizco scripts


### Usage Examples

```html
<!DOCTYPE html>
<html>
<head>
  <title></title>

  <!-- grunt-vizoo/ -->
    <script
  type="text/javascript" data-vizoo-core
    src="http://vizoo.online/core/v1/vizoo.js"     
  data-vizoo-plugins="cards|tabs|grid|import|gallery|timeline"
    data-vizoo-attr="splash:true,splashColor1:'#333',splashColor2:'#02ffe0'"
  ></script>
    <!-- /grunt-vizoo -->
</head>
<body>
  <p>Content</p>
</body>
</html>
```
# grunt-weblint

> Simple web languages linter

## Getting Started
This plugin requires Grunt `~0.4.3`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-weblint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-weblint');
```

## The "weblint" task

### Overview
In your project's Gruntfile, add a section named `weblint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  weblint: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

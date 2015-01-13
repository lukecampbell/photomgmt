module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jst: {
      compile: {
        files: {
          "photomgmt/static/partials/compiled.js": ["photomgmt/static/partials/*.html"]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jst');

  // Default task(s).
  grunt.registerTask('default', ['jst']);

};

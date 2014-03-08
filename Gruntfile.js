module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        assemble: {
            options: {
                flatten: true,
                layout: 'default.hbs',
                layoutdir: 'src/template',
                partials: ['src/template/*.{hbs,md}']
            },
            pages: {
                options: {
                    plugins: ['./src/lib/tags-list.js']
                },
                files: [
                  {expand: true, cwd: './src/pages', src: ['*.hbs'], dest: 'web/pages/', ext: '.html'},
                  {expand: true, cwd: './src/pages/tag', src: ['*.hbs'], dest: 'web/pages/tag/', ext: '.html'}
                ]
            }
        },

        watch: {
            grunt: { files: ['Gruntfile.js'] },

            assemble: {
                files: ['Gruntfile.js', 'src/layouts/*.hbs', 'src/lib/*.js'],
                tasks: ['assemble']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('assemble');

    grunt.registerTask('build', ['assemble']);
    grunt.registerTask('default', ['build', 'watch']);
}
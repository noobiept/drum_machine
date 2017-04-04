module.exports = function( grunt )
{
var dest = '../../drum_machine_website/';


grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

            // delete the destination folder (apart from the git repository and the virtual environment)
        clean: {
            options: {
                force: true
            },
            release: [
                dest + '*',
                '!' + dest + '.git',
                '!' + dest + '.gitignore',
                '!' + dest + 'env/**'
            ]
        },

            // copy the necessary files
        copy: {
            release: {
                expand: true,
                cwd: '../',
                src: [
                    'accounts/**/*.py',
                    'drum_machine/**/*.py',
                    'static/**',
                    'templates/**',
                    'manage.py',
                    'Procfile',
                    'requirements.txt',
                    'runtime.txt'
                ],
                dest: dest
            }
        },

            // minimize the javascript
        uglify: {
            release: {
                src: [ '../static/drum_machine/scripts/*.js' ],
                dest: dest + 'static/drum_machine/scripts/min.js'
            }
        },

            // minimize the css
        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: dest + 'static/css/',
                    src: 'style.css',
                    dest: dest + 'static/css'
                }]
            },
            options: {
                advanced: false
            }
        },

            // update the html file to load the min.js file
        processhtml: {
            release: {
                files: [{
                    expand: true,
                    cwd: dest + 'templates/',
                    src: 'home.html',
                    dest: dest + 'templates/'
                }]
            }
        }
    });

    // load the plugins
grunt.loadNpmTasks( 'grunt-contrib-copy' );
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
grunt.loadNpmTasks( 'grunt-contrib-clean' );
grunt.loadNpmTasks( 'grunt-processhtml' );

    // tasks
grunt.registerTask( 'default', [ 'clean', 'copy', 'uglify', 'cssmin', 'processhtml' ] );
};
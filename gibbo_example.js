

Here’s ours:

 

module.exports = function(grunt) {

 

    'use strict';

 

    require('time-grunt')(grunt);

 

    require('jit-grunt')(grunt, {

        bower: 'grunt-bower-task',

        sass_compile_imports: 'grunt-sass-compile-imports'

    });

 

    // Project configuration.

    grunt.initConfig({

        pkg:           grunt.file.readJSON('package.json'),

        configSass:    grunt.file.readJSON('Gruntconfig/sass.json'),

        configProject: grunt.file.readJSON('Gruntconfig/project.json'),

 

        /*------------------

        |   SYSTEM TASKS

        ------------------*/

 

        // ### watch

        // NPM: grunt-contrib-watch

        //

        // Executes the listed targets on file save

        // Watches folders for file changes and then runs the specified tasks

        watch: {

            sassBase: {

                files: ['<%= configProject.dirs.styles %>**/**.scss', '<%= configProject.dirs.components %>**/**.scss'],

                tasks: ['process-css'],

                options: {

                    interrupt: true

                }

            },

            jsBase: {

                files: '<%= jshint.all %>',

                tasks: ['process-js'],

                options: {

                    interrupt: true

                }

            }

        },

 

        bowercopy: {

            options: {

                // Task-specific options go here

                runBower: true,

                clean: true

            },

            js: {

                options: {

                    destPrefix: '<%= configProject.dirs.scripts %>'

                },

                files: '<%= configProject.bower.scripts %>'

            },

            css: {

                options: {

                    destPrefix: '<%= configProject.dirs.client %>'

                },

                files: '<%= configProject.bower.styles %>'

            }

        },

 

 

        /*------------------

        |   STYLE TASKS

        ------------------*/

 

        // ### SASS

        // NPM: grunt-contrib-sass

        //

        // Builds the SASS files into CSS

        sass: {

            dev: {

                options: '<%= configSass.dev %>',

                files: {

                    '<%= configProject.dirs.styles %>screen.css': '<%= configProject.dirs.styles %>screen.scss',

                    '<%= configProject.dirs.styles %>IE8.css':    '<%= configProject.dirs.styles %>IE8.scss',

                    '<%= configProject.dirs.styles %>IE9.css':    '<%= configProject.dirs.styles %>IE9.scss'

                }

            },

            prod: {

                options: '<%= configSass.prod %>',

                files: {

                    '<%= configProject.dirs.styles %>screen.css': '<%= configProject.dirs.styles %>screen.scss',

                    '<%= configProject.dirs.styles %>IE8.css':    '<%= configProject.dirs.styles %>IE8.scss',

                    '<%= configProject.dirs.styles %>IE9.css':    '<%= configProject.dirs.styles %>IE9.scss'

                }

            }

        },

 

        // ### modernizr

        // NPM: grunt-modernizr

        //

        // Build custom Modernizr file and parse project files for features which may be

        // required then compiled into custom output file

        modernizr: {

            dist: {

                devFile: 'remote',

                outputFile: '<%= configProject.dirs.scripts %>' + 'vendor/modernizr-custom.js',

                extra: {

                    shiv:       true,

                    printshiv:  false,

                    load:       false,

                    mq:         true,

                    cssclasses: true

                },

                extensibility: {

                    addtest:      false,

                    prefixed:     false,

                    teststyles:   false,

                    testprops:    false,

                    testallprops: false,

                    hasevents:    false,

                    prefixes:     false,

                    domprefixes:  false

                },

                tests: [],

                uglify: true

            }

        },

 

        // ### Autoprefixer

        // NPM: grunt-autoprefixer

        //

        // Parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.

        autoprefixer: {

            main: {

                options: {

                    browsers: ['last 2 version']

                },

                src: '<%= configProject.dirs.styles %>screen.css',

                dest: '<%= configProject.dirs.styles %>screen.css'

            },

            IE8: {

                options: {

                    browsers: ['ie 8']

                },

                src: '<%= configProject.dirs.styles %>IE8.css',

                dest: '<%= configProject.dirs.styles %>IE8.css'

            },

            IE9: {

                options: {

                    browsers: ['ie 9']

                },

                src: '<%= configProject.dirs.styles %>IE9.css',

                dest: '<%= configProject.dirs.styles %>IE9.css'

            }

        },

 

        // ### Sass compile imports

        //

        // Generates an include file based on all of the sass files it finds within a directory.

        sass_compile_imports: {

            components: {

                target: '<%= configProject.dirs.styles %>includes/_partials.scss',

                files: [{

                    expand: true,

                    cwd   : '<%= configProject.dirs.components %>',

                    src   : ['**/*.scss']

                }]

            }

        },

 

        // ### Pixrem

        // NPM: grunt-pixrem

        //

        // Generates pixel fallbacks for rem units.

        pixrem: {

            options: {

                replace: true

            },

            parse: {

                src: '<%= configProject.dirs.styles %>IE8.css',

                dest: '<%= configProject.dirs.styles %>IE8.css'

            }

        },

 

 

        /*------------------

        |   SCRIPT TASKS

        ------------------*/

 

        // ### jshint

        // NPM: grunt-contrib-jshint

        //

        // Runs a lint and coding standards check against the Javascript using jshint

        jshint: {

            jshintrc: 'Gruntconfig/jshint.json',

            all: [

                '<%= configProject.dirs.scripts %>' + '/lib/**/*',

                '<%= configProject.dirs.scripts %>' + '/src/**/*',

                '<%= configProject.dirs.components %>' + '**/*.js'

            ],

            setup: [

                'Gruntfile.js',

                'bower.json',

                'package.json',

                'config/*.json'

            ]

        },

 

        // ### jsvalidate

        // NPM: grunt-contrib-jshint

        //

        // Runs a lint and coding standards check against the Javascript using jshint

        jsvalidate: {

            options:{

                globals: {},

                esprimaOptions: {},

                verbose: false

            },

            all: {

                files:{

                    src:['<%=jshint.all%>']

                }

            }

        },

 

        // ### strip

        // NPM: grunt-contrib-jshint

        //

        // Runs a lint and coding standards check against the Javascript using jshint

        strip: {

            main: {

                src: '<%= configProject.dirs.scripts %>/src/main.min.js',

                options: {

                    nodes:  ['console.log', 'debug', 'alert'],

                    inline: true

                }

            }

        },

 

        /*------------------

        |   IMAGE TASKS

        ------------------*/

 

        // ### SVG Min

        // NPM: grunt-svgmin

        //

        // Compresses SVG images by removing extraneous paths and minifying

        svgmin: {

            options: {

                plugins: [{

                    removeViewBox: false

                }]

            },

            prod: {

                files: [{

                    expand: true,

                    cwd   : '<%= configProject.dirs.images %>',

                    src   : ['**/*.svg'],

                    dest   : '<%= configProject.dirs.images %>',

                    ext   : '.svg'

                }]

            }

        },

 

        // ### Image Min

        // NPM: grunt-contrib-imagemin

        //

        // Compresses images to a specified level. (Will compress pngs losslessly)

        imagemin: {

            prod: {

                options: {

                    optimizationLevel: 7

                },

                files: [{

                    expand: true,

                    cwd   : '<%= configProject.dirs.images %>',

                    src   : ['**/*.{png,jpg,gif}'],

                    dest   : '<%= configProject.dirs.images %>'

                }]

            }

        },

 

 

        /*------------------

        |   REPORT TASKS

        ------------------*/

 

        // ### Plato

        // NPM: grunt-plato

        //

        // Generates a complexity report on the project JavaScript

        plato: {

            plato: {

                options : {

                  jshint : grunt.file.readJSON('Gruntconfig/jshint.json')

                },

                files: {

                    'FEReports/plato': '<%= jshint.all %>'

                }

            }

        },

 

 

    });

 

    // Load local tasks from project root.

    // // This is required if you use any options.

 

    // Default task.

    grunt.registerTask('default',     ['sass_compile_imports:components', 'process-css', 'watch']);

    grunt.registerTask('process-css', ['sass:dev', 'autoprefixer', 'pixrem:parse']);

    grunt.registerTask('process-js',  ['jshint:all', 'jsvalidate:all']);

    grunt.registerTask('process-img', ['svgmin:prod', 'imagemin:prod']);

    grunt.registerTask('team-city',   ['sass_compile_imports:components', 'sass:prod', 'autoprefixer', 'pixrem:parse', 'process-img', 'strip', 'modernizr']);

    grunt.registerTask('setup',       ['jshint:setup', 'bowercopy', 'modernizr']);

    grunt.registerTask('report',      ['plato']);

};


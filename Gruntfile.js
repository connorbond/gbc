module.exports = function(grunt){

    grunt.initConfig({
       
        pkg: grunt.file.readJSON('package.json'),

	    watch: {
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    }
		},

	    htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'head-script-disabled': true,
		            'style-disabled': true
		        },
		        src: ['index.html']
		    }
		},

		sass: {
            dev: {
                options: { 
                	style: 'expanded'
                },
                files: {
                    'screen.css': 'screen.scss'
                }
            }
        },

        autoprefixer: {
            main: {
                options: {
                    browsers: ['last 2 version']
                },
                src: 'screen.css',
                dest: 'screen.css'
            }
        }

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-htmlhint');

	//require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['watch']);

};
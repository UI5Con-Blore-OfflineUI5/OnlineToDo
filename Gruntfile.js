module.exports = function(grunt) {
      grunt.initConfig({
        dir:{
            webapp: 'UI5ConOfflineApp5',
            dist: 'dist'
        },
        clean: {
            preload: ["Component-preload.js"]
        },
        openui5_preload: {
            component: {
                options: {
                    compress: false,
                    resources: {
                        cwd: "./webapp",
                        prefix: "UI5ConOfflineApp5",
                        src: [
                            "Component.js",
                            "**/*.js",
                            "**/*.fragment.xml",
                            "**/*.view.xml",
                            "**/*.properties",
                            "manifest.json",
                            "!Component-preload.js",
                            "!test/**"
                        ]
                    },
                    dest: "./webapp"
                },
                components: "UI5ConOfflineApp5"
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-openui5");
    
    grunt.registerTask('build', ['clean', 'openui5_preload']);
    grunt.registerTask('default', ['build']);
};
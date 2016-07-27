var nunjucks = require('nunjucks');
var fs = require('fs');
nunjucks.configure('./operation/html', {
    autoescape: true,
    watch: true
});

module.exports = function(grunt) {
    //任务计时
    require('time-grunt')(grunt);

    //实现批量load task
    require('load-grunt-tasks')(grunt);
    var manifest = grunt.file.readJSON('manifest.json'),
        test = manifest.test,
        online = manifest.online,
        testReplacements = [],
        onlineReplacements = [];
    for (var key in test) {
        testReplacements.push({
            from: '@' + key + '@',
            to: test[key]
        });
    }

    for (var key in online) {
        onlineReplacements.push({
            from: '@' + key + '@',
            to: test[key]
        });
    }

    var timeStampReplacements = [{
        from: '{{timestamp}}',
        to: new Date().getTime()
    }];

    // Project configuration.
    //构建配置任务
    grunt.initConfig({
        //读取package.json的内容，形成json数据
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            basePath: './operation/',
            srcPath: './operation/static/',
            deployPath: './operation/build/',
            cssPath: './operation/static/css/',
            scssPath: './operation/static/scss/',
            jsPath: './operation/static/js/'
        },
        //banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %>*/\n',
        // Task configuration.
        //css压缩
        cssmin: {
            options: {
                compatibility: 'ie8', //设置兼容模式
                noAdvanced: true //取消高级特性
            },
            combine: {
                files: [{
                    '<%= meta.deployPath %>static/css/h5Main.css': 
                    ['<%= meta.basePath %>static/css/reset.css',
                    '<%= meta.basePath %>static/css/h5Main.css']
                }]
            }
        },

        requirejs: {
            h5: {
                options: {
                    name: "h5Main",
                    optimize: "",
                    baseUrl: "<%= meta.basePath %>static/js",
                    mainConfigFile: "<%= meta.deployPath %>static/js/h5Main.js",
                    out: "<%= meta.deployPath %>static/js/h5Main.js"
                }
            }

        },

        //压缩js
        uglify: {
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.deployPath %>static/js',
                    src: 'lib/*.js',
                    dest: '<%= meta.deployPath %>static/js'
                },{
                    expand: true,
                    cwd: '<%= meta.deployPath %>static/js',
                    src: 'h5Main.js',
                    dest: '<%= meta.deployPath %>static/js'
                }]
            }
        },

        //实现对静态资源加载md5版本号
        staticize: {
            images: {
                rev: { //校订任务（hash）
                    msite: { //任务名称
                        'files': ['<%= meta.deployPath %>static/img/**/*.{jpg,jpeg,png,gif}']
                    },
                    options: { //任务配置
                        'encoding': 'utf8',
                        'algorithm': 'md5',
                        'length': 8
                    }
                },
                rep: { //替换任务
                    msite: { //替换任务名称
                        'files': ['<%= meta.deployPath %>static/css/*.css'],
                        'assetsDirs': '<%= meta.deployPath %>static/img',
                        'patterns': /([\w\-\.]+){0,1}(\/[\w\-\.]+)*\.\w+/mg
                    }
                }
            },

            css: {
                rev: { //校订任务（hash）
                    msite: { //任务名称
                        'files': ['<%= meta.deployPath %>static/css/*.css']
                    },
                    options: { //任务配置
                        'encoding': 'utf8',
                        'algorithm': 'md5',
                        'length': 8
                    }
                },
                rep: { //替换任务
                    msite: { //替换任务名称
                        'files': ['<%= meta.deployPath %>html/*.{html,jsp}'],
                        'assetsDirs': '<%= meta.deployPath %>static',
                        'patterns': /([\w\-\.]+){0,1}(\/[\w\-\.]+)*\.\w+/mg
                    },
                    tpl: { //替换任务名称
                        'files': ['<%= meta.deployPath %>template/**/*.html'],
                        'assetsDirs': '<%= meta.deployPath %>static',
                        'patterns': /([\w\-\.]+){0,1}(\/[\w\-\.]+)*\.\w+/mg
                    }
                }
            },
            js: {
                rev: { //校订任务（hash）
                    msite: { //任务名称
                        'files': ['<%= meta.deployPath %>static/js/main.js']
                    },
                    options: { //任务配置
                        'encoding': 'utf8',
                        'algorithm': 'md5',
                        'length': 8
                    }
                },
                rep: { //替换任务
                    msite: { //替换任务名称
                        'files': ['<%= meta.deployPath %>html/*.{html,jsp}'],
                        'assetsDirs': '<%= meta.deployPath %>static',
                        'patterns': /([\w\-\.]+){0,1}(\/[\w\-\.]+)*\.\w+/mg
                    },
                    tpl: { //替换任务名称
                        'files': ['<%= meta.deployPath %>template/**/*.html'],
                        'assetsDirs': '<%= meta.deployPath %>static',
                        'patterns': /([\w\-\.]+){0,1}(\/[\w\-\.]+)*\.\w+/mg
                    }
                }
            },
        },

        //清除任务
        clean: {
            del: {
                src: ["<%= meta.deployPath %>"]
            }
        },

        mkdir: {
            build: {
                options: {
                    create: ["<%= meta.deployPath %>", "<%= meta.deployPath %>html", "<%= meta.deployPath %>static"]
                },
            },
        },

        //复制
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= meta.basePath %>static/js/lib",
                        src: '**',
                        dest: '<%= meta.deployPath %>static/js/lib'
                    },{
                        expand: true,
                        cwd: "<%= meta.basePath %>static/js/",
                        src: 'h5Main.js',
                        dest: '<%= meta.deployPath %>static/js/'
                    },{
                        expand: true,
                        cwd: "<%= meta.basePath %>static/images/",
                        src: '**',
                        dest: '<%= meta.deployPath %>static/images/'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= meta.basePath %>html/",
                        src: '*.html',
                        dest: '<%= meta.deployPath %>html/'
                    },
                    {
                        expand: true,
                        cwd: "<%= meta.basePath %>html/",
                        src: 'favicon.ico',
                        dest: '<%= meta.deployPath %>html/'
                    }
                ]
            },
            unmd5: {
                files: [{
                    expand: true,
                    cwd: "<%= meta.basePath %>static/",
                    src: 'img/uploader.png',
                    dest: '<%= meta.deployPath %>static/'
                }, {
                    expand: true,
                    cwd: "<%= meta.basePath %>static/",
                    src: 'img/uploadlimit.png',
                    dest: '<%= meta.deployPath %>static/'
                }]
            }
        },

        //js语法检查
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                force: true,
                globals: {
                    jQuery: true,
                    exports: true
                },
            },
            uses_defaults: ['<%= meta.deployPath %>static/**/*.js']
        },

        replace: {
            test: {
                src: ['<%= meta.deployPath %>html/**/*.html', '<%= meta.deployPath %>static/css/**/*.css'], // source files array (supports minimatch)            // destination directory or file
                overwrite: true,
                replacements: testReplacements
            },
            online: {
                src: ['<%= meta.deployPath %>html/**/*.html', '<%= meta.deployPath %>css/**/*.css'], // source files array (supports minimatch)            // destination directory or file
                overwrite: true,
                replacements: onlineReplacements
            },
            timestamp: {
                options: {
                    patterns: [{
                        match: 'timestamp',
                        replacement: '<%= new Date().getTime() %>'
                    },{
                        match: 'siteId',
                        replacement: 'a1f6e87b4ae3207819098c9f386ffdb5'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    overwrite: true,
                    src: ['<%= meta.deployPath %>html/*.html'],
                    dest: '<%= meta.deployPath %>html/'
                },{
                    expand: true,
                    flatten: true,
                    overwrite: true,
                    src: ['<%= meta.deployPath %>static/css/*.css'],
                    dest: '<%= meta.deployPath %>static/css/'
                }]
            },
            path_dev: {
                options: {
                    patterns: [{
                        match: '!!..',
                        replacement: ''
                    },{
                        match: '&&&',
                        replacement: ''
                    },{
                        match: 'test',
                        replacement: ''
                    },{
                        match: 'start',
                        replacement: ''
                    },{
                        match: 'start_text',
                        replacement: ''
                    },{
                        match: 'prefixUrl',
                        replacement: ''
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    overwrite: true,
                    src: ['<%= meta.basePath %>html/*.html'],
                    dest: '<%= meta.basePath %>html/'
                }]
            }
        },

        connect: {
            dev: {
                options: {
                    port: 1234,
                    base: './operation/',
                    hostname: '*',
                    livereload: true,
                    //keepalive: true,
                    debug: true,
                    directory: './operation/',
                    middleware: [
                        function(req, res, next) {     
                            var text, htmlJSON, data = {}, local = manifest['local'];
                            local['static_prefix'] = local['static_prefix'] || '/static';
                            local['img_prefix'] = local['img_prefix'] || '/static';
                            data = {};
                            data.data = {};
                            if (req.url.match(/\/(.+)\.html$/) && !/^\/static/.test(req.url)) {
                                var token = req.url.match(/\/(.+)\.html$/)[1].replace("html/", '');
                                
                                data.data._token = token;
                                text = nunjucks.render(token + '.html', data);
                                for (var key in local) {
                                    var rstr = new RegExp('@' + key + '@', "g");
                                    text = text.replace(rstr, local[key]);
                                }
                                res.writeHeader(200, {
                                    "Content-Type": "text/html"
                                });
                                res.end(text);
                            }
                            else {
                                var _file = req.url.replace(/\?.*/, '');
                                if (fs.existsSync('./operation' + _file)) {
                                    var file = fs.readFileSync('./operation' + _file);

                                    if (/\.html$/.test(_file)) {
                                        res.writeHeader(200, {
                                            "Content-Type": "text/html"
                                        });
                                    }
                                    res.end(file);
                                } else {
                                    next();
                                }
                            }
                        }

                    ]
                }
            }
        },

        sass: {
            options: {
                compress: false,
                sourcemap: 'none',
                style: 'expanded',
            },
            update: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.scssPath %>',
                    src: ['**/*.scss'],
                    dest: '<%= meta.cssPath %>',
                    ext: '.css'
                }]
            }
        },

        //监听（监测到文件改变时执行对应任务）
        watch: {
            options: {
                livereload: true
            },
            dev: {
                files: ['<%= meta.scssPath %>**/*.scss'],
                tasks: ["sass:update"]
            }
        }
    });


    grunt.loadNpmTasks('grunt-nunjucks-2-html');

    //本地调试版
    grunt.registerTask('dev', [ 'sass:update', 'replace:path_dev', 'connect:dev', 'watch']);
    //测试版
    grunt.registerTask('online', ['clean:del', 'mkdir', 'sass:update','copy:main',  'cssmin', 'requirejs:h5', 'copy:html', 'uglify:test', 'replace:timestamp', 'copy:unmd5']);
    //上线版
    grunt.registerTask('onlineMain', ['clean:del', 'mkdir', 'copy:main', 'sass:update', 'rename', 'requirejs:base', 'requirejs:main', 'cssmin', 'staticize:images', 'nunjucks', 'nunjucks', 'staticize:css', 'uglify:test', 'replace:timestamp', 'copy:unmd5', 'imagemin']);

};

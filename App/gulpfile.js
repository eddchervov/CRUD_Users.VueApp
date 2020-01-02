/// <binding ProjectOpened='plugin.min:css, plugin.min:js, fonts' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    dist: "./dist/",
    app: "./src/app/",
    webroot: "./src/app/plugins/",
    noderoot: "./node_modules/"
};


// plugins js
paths.concatPluginJsDest = paths.dist + "plugin.min.js";

paths.jqueryJs = paths.noderoot + "jquery/dist/jquery.min.js";
paths.momentJs = paths.noderoot + "moment/min/moment.min.js";
paths.momentJsLocales = paths.noderoot + "moment/min/moment-with-locales.min.js";
paths.bootstrapJs = paths.noderoot + "bootstrap/dist/js/bootstrap.min.js";
paths.bootboxJs = paths.noderoot + "bootbox/dist/bootbox.all.min.js";

paths.edLoader = paths.webroot + "ed-loader.js";

gulp.task("plugin.min:js", function () {
    return gulp.src([
        paths.jqueryJs,
        paths.momentJs,
        paths.momentJsLocales,
        paths.bootstrapJs,
        paths.bootboxJs,
        paths.edLoader
    ], { base: "." })
        .pipe(concat(paths.concatPluginJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

// plugins css
paths.concatPluginCssDest = paths.dist + "plugin.min.css";

paths.bootstrapCss = paths.noderoot + "bootstrap/dist/css/bootstrap.css";
paths.fontAwesomeCss = paths.noderoot + "font-awesome/css/font-awesome.css";

gulp.task("plugin.min:css", function () {
    return gulp.src([
        paths.bootstrapCss,
        paths.fontAwesomeCss
    ])
        .pipe(concat(paths.concatPluginCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

// fonts 
paths.fonts = paths.dist + "fonts";

paths.fontAwesomeFonts = paths.noderoot + 'font-awesome/fonts/*';

gulp.task('fonts', function () {
    return gulp.src([
        paths.fontAwesomeFonts
    ])
    .pipe(gulp.dest(paths.fonts));
});
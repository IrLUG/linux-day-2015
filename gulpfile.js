var gulp        = require('gulp') 
var buffer      = require('vinyl-buffer')
var source      = require('vinyl-source-stream')

var browserify  = require('browserify')
var sourcemaps  = require('gulp-sourcemaps')

var notify      = require('gulp-notify')
var babel       = require('gulp-babel')

var JS_CONFIG = {
    source: './js/**/*',
    entry:  './js/main.js',
    output: {
        dir: './',
        name: 'main.js'
    }
}

var BROWSERIFY_CONFIG = {
    entries: JS_CONFIG.entry,
    debug: true   
}

gulp.task('default', ['buildjs'], function() {    
    gulp.watch(JS_CONFIG.source, ['buildjs'])    
})

gulp.task('buildjs', function(){
    var b = browserify(BROWSERIFY_CONFIG)

    return b.bundle()
        .on('error', notify.onError('JS ERROR: <%= error.message %>'))        
        .pipe(source(JS_CONFIG.output.name))

        .pipe(buffer())

        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(sourcemaps.write('./'))
                
        .pipe(gulp.dest(JS_CONFIG.output.dir))
        .pipe(notify({message: 'Compiled JS', onLast:true}))            
})


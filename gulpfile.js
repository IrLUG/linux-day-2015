var gulp        = require('gulp') 
var buffer      = require('vinyl-buffer')
var source      = require('vinyl-source-stream')

var browserSync = require("browser-sync").create()

var browserify  = require('browserify')
var sourcemaps  = require('gulp-sourcemaps')

var sass            = require('gulp-sass')
var prefixer    = require('gulp-autoprefixer')

var notify      = require('gulp-notify')
var babel       = require('gulp-babel')

var plumber     = require('gulp-plumber')

var JS_CONFIG = {
    source: './js/**/*.js',
    entry:  './js/main.js',
    output: {
        dir: './',
        name: 'main.js'
    }
}

var SASS_CONFIG = {
    source: './scss/**/*.scss',
    entry:  './scss/main.scss',
    output: {
        dir: './',
        name: 'main.css'
    }
}

var BROWSERIFY_CONFIG = {
    entries: JS_CONFIG.entry,
    debug: true   
}

gulp.task('default', ['buildjs', 'sass'], function() {    
    gulp.watch(JS_CONFIG.source, ['buildjs'], browserSync.reload())
    gulp.watch(SASS_CONFIG.source, ['sass'])
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

gulp.task('sass', function () {
    gulp.src(SASS_CONFIG.entry)    
        .pipe(plumber({errorHandler: notify.onError("<%= error.message %> \n\n→ <%= error.fileName %> \n\n@ <%= error.lineNumber %>")}))
        .pipe(sourcemaps.init())
        .pipe(sass())        
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SASS_CONFIG.output.dir + SASS_CONFIG.output.name))
        .pipe(browserSync.stream())
        .pipe(notify('Compiled SASS dev'))
})

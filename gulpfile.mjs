import { createRequire } from "module";
const require = createRequire(import.meta.url);

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fs = require('fs');
const clean = require('gulp-clean');
const server = require('gulp-server-livereload');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
import changed from 'gulp-changed';
import prefixer from 'gulp-autoprefixer';

const serverConfig = {
    livereload: true,
    open: true
}

function plumberConfig (string) {
    return {
        errorHandler: notify.onError({
            title: string,
            message: 'Error <%= error.message %>',
            sound: false
        }),
    };
}

gulp.task('remove:dev', function(done) {
    return fs.existsSync('./docs')
    ?
    gulp.src('./docs').pipe(clean({force: true}))
    :
    done();
})

gulp.task('js:dev',() => {
    return gulp
    .src('./src/js/**/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(plumber(plumberConfig('JS')))
    .pipe(gulp.dest('./docs/js/'))
})

gulp.task('html:dev',() => {
    return gulp
    .src('./src/html/*.html')
    .pipe(changed('./docs/'))
    .pipe(plumber(plumberConfig('HTML')))
    .pipe(gulp.dest('./docs/'))
})

gulp.task('img:dev',() => {
    return gulp
    .src('./src/img/**/*')
    .pipe(changed('./docs/img/'))
    .pipe(gulp.dest('./docs/img/'))
})

gulp.task('sass:dev', function() {
    return gulp
        .src('./src/styles/main.scss')
        .pipe(changed('./docs/styles/'))
        .pipe(plumber(plumberConfig('SASS')))
        .pipe(prefixer())
        .pipe(sass())
        .pipe(gulp.dest('./docs/styles/'))
})

gulp.task('server:dev', () => {
    return gulp
        .src('./docs')
        .pipe(server(serverConfig))
})
  
gulp.task('watch:dev', () => {
        gulp.watch('./src/styles/**/*.scss', gulp.parallel('sass:dev'));
        gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
        gulp.watch('./src/html/*.html', gulp.parallel('html:dev'));
})



gulp.task('default', 
    gulp.series('remove:dev', gulp.parallel('sass:dev', 'html:dev', 'js:dev', 'img:dev'), 'server:dev', 'watch:dev'));



// Inicializamos gulp y sus plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');

// obtenemos el path (node.js path module)
var path = require('path');



/* Definición de tareas
----------------------------------------------------------------------------- */

// Tarea por defecto: después de ejecutar las dependencias (clean)
// corre las otras tareas
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'build-dist');
});

// Limpieza general
gulp.task('clean', function() {
  return gulp.src( ['./dist/**/*'], {read: false} )
         .pipe( clean() );
});

// Tarea para compilar, autoprefixear y comprimir el archivo .less principal
// podemos ser también +específicos usando: gulp.src('./src/less/main.less')
gulp.task('styles', function() {
  return gulp.src('src/less/**/*.less')
         .pipe( plumber() )
         .pipe( less() )
         .pipe( autoprefixer('last 2 versions', 'safari 5', 'ie 7' ) )
         .pipe( gulp.dest('./src/css') )
         .pipe( rename( {suffix: '.min'} ) )
         .pipe( minifycss() )
         .pipe( gulp.dest('./src/css') )
         .pipe( notify('Estilo compilado...') );
});

// Analizar (lint), concatenar y comprimir scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/uncompiled/**/*.js')
         .pipe( jshint('.jshintrc') )
         .pipe( jshint.reporter('default') )
         .pipe( concat('compiled.js') )
         .pipe( gulp.dest('./src/js') )
         .pipe( rename( {suffix: '.min'} ) )
         .pipe( uglify() )
         .pipe( gulp.dest('./src/js') )
         .pipe( notify('Scripts compilados...') );
});

// Optimizar imágenes
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe( cache( imagemin( { optimizationLevel: 5,
                              progressive: true,
                              interlaced: true } ) ) )
    .pipe( gulp.dest('dist/img') )
    .pipe( notify( { message: 'Imágenes optimizadas...' } ) );
});

// Monitorear cambios
gulp.task('watch', function() {
   // cambios en archivos .less
  gulp.watch( 'src/less/**/*.less', ['styles'] );
  // cambios en scripts
  gulp.watch( 'src/js/uncompiled/**/*.js', ['scripts'] );
  // cambios en imágenes
  gulp.watch( 'src/img/**/*', ['images'] );
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['src/*.html', 'src/less/**', 'src/js/**'])
      .on('change', livereload.changed);
});

// Construir todo en 'dist'
gulp.task('build-dist', function(){
  // copiamos los estilos minificados
  gulp.src('src/css/*.min.css').pipe( gulp.dest('dist/css') );
  // copiamos los scripts minificados y concatenados
  gulp.src('src/js/*.min.js').pipe( gulp.dest('dist/js') );
  // copiamos el resto de los archivos necesarios
  gulp.src('src/*.html').pipe( gulp.dest('dist/') );
});


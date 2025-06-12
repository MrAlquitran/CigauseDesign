const rename = require("gulp-rename");
const cssmin = require("gulp-cssmin");
const cssnano = require("gulp-cssnano");
const dartsass = require("gulp-dart-sass");
const useref = require("gulp-useref");

const gulp = require("gulp");
const {src, dest, series, parallel} = require("gulp");

async function min() {
    return src("./scss/main.scss")
    .pipe(dartsass())
    .pipe(cssnano())
    .pipe(rename({
        suffix: ".min",
        extname: ".css"
    }))
    .pipe(gulp.dest("./dist/css/"));
}

async function html() {
    console.log("Procesando HTML...");
    return src("*.html")
        .pipe(useref())
        .pipe(dest("dist/"));
}

async function img() {
    console.log("Copiando imágenes...");
    return src("./images/*")
        .pipe(dest("./dist/images"));
}


exports.min=min;
exports.html=html;
exports.img=img;
exports.build=parallel(min, html, img);

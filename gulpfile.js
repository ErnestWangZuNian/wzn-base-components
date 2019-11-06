const path = require("path");
const { src, dest, task, series } = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const size = require("gulp-filesize");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const { name, browserList } = require("./package.json");
const resolve = dir => path.resolve(__dirname, dir);
const DIR = {
    scss: resolve("src/components/**/*.scss"),
    lib: resolve("lib"),
    es: resolve("es"),
    dist: resolve("dist")
};

const copyScss = () => {
    return src(DIR.scss)
        .pipe(dest(DIR.lib))
        .pipe(dest(DIR.es))
};

const copyCss = () => {
    return src(DIR.scss)
        .pipe(dest(DIR.lib))
        .pipe(dest(DIR.es))
}

const dist = () => {
    return src(DIR.scss)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "compressed"
            })
        )
        .pipe(autoprefixer({ browsers: browserList }))
        .pipe(concat(`${name}.css`))
        .pipe(size())
        .pipe(dest(DIR.dist))
        .pipe(sourcemaps.write())
        .pipe(rename(`${name}.css.map`))
        .pipe(size())
        .pipe(dest(DIR.dist))

        .pipe(cssnano())
        .pipe(concat(`${name}.min.css`))
        .pipe(size())
        .pipe(dest(DIR.dist))
        .pipe(sourcemaps.write())
        .pipe(rename(`${name}.min.css.map`))
        .pipe(size())
        .pipe(dest(DIR.dist));
}


task("default", series(copyScss, copyCss, dist));
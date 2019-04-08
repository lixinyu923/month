const gulp=require("gulp");
const scss=require("gulp-sass");
const server=require("gulp-webserver");

gulp.task("devcss",()=>{
    return gulp.src("./src/scss/**/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("./src/css"))
})

gulp.task("watch",()=>{
    gulp.watch("./src/scss/**/*.scss",gulp.series("devcss"))
})

gulp.task("server",()=>{
    return gulp.src("./src")
    .pipe(server({
        port:8989,
        open:true,
        proxies:[
            {
                source:"/api/getData",
                target:"http://localhost:3000/api/getData"
            },{
                source:"/api/addData",
                target:"http://localhost:3000/api/addData"
            },{
                source:"/api/upData",
                target:"http://localhost:3000/api/upData"
            },{
                source:"/api/revData",
                target:"http://localhost:3000/api/revData"
            },
            {
                source:"/api/getDataone",
                target:"http://localhost:3000/api/getDataone"
            }
        ]
    }))
})

gulp.task("default",gulp.parallel("watch","server"))
const http = require("http");
const fs = require("fs");
const zlib = require("zlib");

//以下程序获取前台传过来的表单数据和文件数据，并且把文件数据给保存到unload文件夹内;
let server = http.createServer((req, res) => {
    res.setHeader("Content-Encoding", "gzip")  // 需添加这个头，否则浏览器无法识别，会直接给下载下来；

    let rs = fs.createReadStream(`www${req.url}`)
    let gz = zlib.createGzip();
    rs.pipe(gz).pipe(res);

    rs.on("error", err => {
        // res.setHeader("x-username", "lily");  // 添加自定义头；
        res.writeHeader(404);
        res.write("Not found!");
        res.end()
    })

})

server.listen(8080)

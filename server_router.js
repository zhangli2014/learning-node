const http = require("http");
const fs = require("fs");
const router = require("./utils/router");
const zlib = require("zlib");

let server = http.createServer((req, res) => {
    // router.emit() 返回值：true 是个接口,false不是接口
    if(!router.emit(req.url, req, res)){
         // 2.读取文件
        let rs = fs.createReadStream(`www/${req.url}`)
        let gz = zlib.createGzip()

        res.setHeader("Content-Encoding", "gzip")
        fs.pipe(gz).pipe(res)

        rs.on("error", err => {
            res.writeHeader(404);
            res.write("Not found!");
            res.end();
        })
         // 3.读取失败
    } else {
        // 1.是一个接口
    }
    

   
})

server.listen(8080)

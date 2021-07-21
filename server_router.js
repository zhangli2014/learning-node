const http = require("http");
const fs = require("fs");
const url = require("url");
const router = require("./utils/router");
const zlib = require("zlib");
const user = require("./routers/user");

let server = http.createServer((req, res) => {
    let {pathname, searchParams} = new URL(req.url, "http://localhost:8082")
    let newSearchParams = new URLSearchParams(searchParams)
    req.query = newSearchParams

    // console.log(pathname, req.query)

    res.send = function(data){
        if(!(data instanceof Buffer) && typeof data != "string"){
            data = JSON.stringify(data)
        }
        res.write(data)
    }
    // router.emit() 返回值：true 是个接口,false不是接口
    if(false == router.emit(pathname, req, res)){
         // 2.读取文件
        let rs = fs.createReadStream(`www/${req.url}`)
        let gz = zlib.createGzip()

        res.setHeader("Content-Encoding", "gzip")
        rs.pipe(gz).pipe(res)

        rs.on("error", err => {
            res.writeHeader(404);
            res.write("Not found!");
            res.end();
        })
         // 3.读取失败
    } else {
        // 1.是一个接口
        console.log("This is a interface.")
    }
    

   
})

server.listen(8082)

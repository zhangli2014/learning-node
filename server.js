const http = require("http");
const url = require("url");
const fs = require("fs");
const common = require("./utils/common");

let server = http.createServer((req, res) => {
    let {pathname, searchParams} = new URL(req.url, "http://localhost:8082")
    let newSearchParams = new URLSearchParams(searchParams)

    // console.log(newSearchParams)

    // fs.readFile(`www${req.url}`, (err, data) => {
    //     if(err) {
    //         res.writeHeader(404);
    //         res.write("Not Found!");
    //     } else {
    //         res.write(data);            
    //     }
    //     res.end();
    // })
    
    let aBuffer = [];
    req.on("data", data => {
        aBuffer.push(data)
    }),
    req.on("end", () => {
        let data = Buffer.concat(aBuffer)
        console.log(data.toString()) 

    })
})

server.listen(8082)

console.log("connection successful.")
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
    let postData = "";
    req.on("data", data => {
        aBuffer.push(data)
    }),
    req.on("end", () => {
        let data = Buffer.concat(aBuffer)
        let head = req.headers["content-type"]
        if(head.startsWith("multipart/form-data")){
            //multipart/form-data
            const boundary = "--"+head.split("; ")[1].split("=")[1];
            let arr = data.split(boundary);
            console.log(arr);
        } else {
            // x-www-form-urlencoded
            postData = data.toString()
        }
        // console.log(req.headers["content-type"])
        console.log(postData) 

    })
})

server.listen(8082)

console.log("connection successful.")
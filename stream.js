const fs = require("fs");

let rs = fs.createReadStream("www/1.html");
let ws = fs.createWriteStream("www/3.html");

rs.pipe(ws);

rs.on("error", err => {
    console.log("read error!")
})
rs.on("end", () => {
    console.log("read end!")
})

ws.on("error", err => {
    console.log("write error!")
})
ws.on("finish", () => {
    console.log("write end!")
})
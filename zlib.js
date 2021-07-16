const fs = require("fs");
const zlib = require("zlib");

let gz = zlib.createGzip()

let rs = fs.createReadStream("www/1.html");
let ws = fs.createWriteStream("www/1.gz");

rs.pipe(gz).pipe(ws);


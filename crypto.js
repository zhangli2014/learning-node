const crypto = require("crypto");

let hash = crypto.createHash("md5");
hash.update("abcdef");

console.log(hash.digest("hex"))
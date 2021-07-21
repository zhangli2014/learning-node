const dns = require("dns")

dns.lookup("www.baidu.com", (err, data) => {
    if(err) console.log(err)
    else console.log(data)
})

// let ip = "180.101.49.12"
// dns.lookupService(ip, 80, (err, data) => {
//     if(err) console.log(err)
//     else console.log(data)
// })
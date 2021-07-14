const http = require("http");
const url = require("url");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const common = require("./utils/common");
const path = require("path");

//以下程序获取前台传过来的表单数据和文件数据，并且把文件数据给保存到unload文件夹内;
let server = http.createServer((req, res) => {
    let {pathname, searchParams} = new URL(req.url, "http://localhost:8082")
    let newSearchParams = new URLSearchParams(searchParams)

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
        let head = req.headers["content-type"]
        // console.log(data.toString(), head)
		
		let postData = {};  //普通的表单name数据
        if(head.startsWith("multipart/form-data")){			
            //multipart/form-data
			//1.提取分隔符
            const boundary = "--"+head.split("; ")[1].split("=")[1];
			
			//2.用分隔符切分
            let arr = data.split(boundary);
			
			//3.去掉头尾：头部是"空格", 尾部是"--"
			arr.shift();
			arr.pop();
			
			//4.去掉每一项的头尾的"\r\n"
			arr = arr.map(item => item.slice(2, item.length-2))
			
			//5.对每一项进行处理，用"\r\n\r\n"进行切分，每一项数据格式如下：
			//Content-Disposition: form-data; name="pass"
			//
			//222222
			arr.forEach(item => {
				let n = item.indexOf("\r\n\r\n")
				let info = item.slice(0,n)  //Content-Disposition: form-data; name="pass"
				let data = item.slice(n+4)  //222222
				
				info = info.toString()
				if(info.indexOf("\r\n") == -1){
					//普通表单数据
					let key = common.parseInfo(info).name
					postData[key] = data.toString()
				}else{
					//文件，类似于下面这样：
					//Content-Disposition: form-data; name="photo"; filename="1.txt"
					//Content-Type: text/plain

					let key = common.parseInfo(info).name
					let filename = common.parseInfo(info).filename
					let filepath = `upload/${uuidv4().replace(/\-/g, '')}${path.extname(filename)}`
					
					// console.log(filepath)
					fs.writeFile(filepath, data, err => {
						if(err){
							console.log(err)
						}
					})
				}
			})
        } else {
            // x-www-form-urlencoded
            postData = data.toString()
        }
        console.log(postData) 

    })
})

server.listen(8082)

console.log("connection successful.")
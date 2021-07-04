Buffer.prototype.split = Buffer.prototype.split || function(str){
    let result = [];
    let n;
    let buffer = this;  // 这里得用一个变量保存this。this不能出现在赋值运算符的左侧。
	
    while((n = buffer.indexOf(str)) != -1){
        result.push(buffer.slice(0, n));
        buffer = buffer.slice(n+str.length)
    }
    result.push(buffer);

    return result;
}

exports.parseInfo = function (str) {
	let json = {}
	
	let myParse = function(str){	
		let arr = str.split("; ")
		arr.forEach(item => {
			let [key, value] = item.split("=")
			if(value){
				json[key] = value.substring(1,value.length-1)  //TODO:这里substring参数为何是1-value.length-1,而不是2-value.length-2?
				// console.log(json[key])
			}
			
		})
	}
	
	if(str.indexOf("\r\n") != -1){
		let arr = str.split("\r\n")
		arr.forEach(item => {
			myParse(item)
		})
	}else {
		myParse(str)
	}
	return json
}

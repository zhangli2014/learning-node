Buffer.prototype.split = Buffer.prototype.split || function(str){
    let result = [];
    let n;
    let buffer = this;  // 这里得用一个变量保存this。this不能出现在赋值运算符的左侧。
    while((n = buffer.indexOf(str)) != -1){
        result.push(buffer.slice(0, n));
        buffer = buffer.slice(n+2)
    }
    result.push(buffer);

    return result;
}
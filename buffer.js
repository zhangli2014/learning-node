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

let buffer = new Buffer("ab==cd=e==fg");

console.log(buffer)

// function split(str1, str2){
//     let result = [];
//     let n;
//     while((n = str1.indexOf(str2)) != -1){
//         result.push(str1.slice(0, n));
//         str1 = str1.slice(n+2)
//     }
//     result.push(str1);

//     return result;
// }

// split(buffer, "==");
console.log(buffer.split("=="));

// let n = buffer.indexOf("==");
// let res1 = buffer.slice(0, n);
// let res2 = buffer.slice(n+2);
// console.log(result.map(item => item.toString()));
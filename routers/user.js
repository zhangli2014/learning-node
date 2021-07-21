const router = require("../utils/router")
let users = []

router.on("/login", (req, res) => {

    let user = req.query.get("user")
    let password = req.query.get("password")

    if(!users[user]){
        res.send({code: 1, msg: "用户名不存在！"})
        res.end()
    }else if(users[user] != password){
        res.send({code: 1, msg:" 用户名或密码有误！"})
        res.end()
    }else{
        res.send({code: 0, msg: "登录成功！"})
        res.end()
    }
})

router.on("/reg", (req, res) => {
    
    let user = req.query.get("user")
    let password = req.query.get("password")

    let {user, password} = req.query
    if(users[user]){
        res.send({code: 1, msg: "用户名已存在！"})
        res.end()
    }else{
        users[user] = password
        res.send({code: 0, msg: "注册成功！"})
        res.end()
    }
})
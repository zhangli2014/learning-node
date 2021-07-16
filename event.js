const event = require("events").EventEmitter; 

let ev = new event();

ev.on("custom", (a, b) => {
    console.log("第一次：", a, b)
})

ev.on("custom", (a, b) => {
    console.log("第二次：", a, b)
})

console.log(ev.emit("custom", 12,5))
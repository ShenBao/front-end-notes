const express = require('express');

const app = express();


app.use("/report/xhr", function(req, res, next) {
    console.log("收到上报请求, from xhr");
})
app.use("/report/bean", function(req, res, next) {
    console.log("收到上报请求, from bean");
})


app.listen(3000, function(){
    console.log('listening port 3000')
})

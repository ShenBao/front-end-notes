const express = require('express');
const path =require('path')

const app = express();


app.get("*", function(req, res, next) {
    res.sendFile(path.join(__dirname, "./3.static/index.html"));
})


app.listen(8086, function() {
    console.log("listening on port 8086")
})
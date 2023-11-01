
// this
var jsonStr = `{
    "name": "牙膏",
    "count": 10, 
    "orderDetail": {
        "createTime": 1632996519781,
        "orderId": 8632996519781
    }
}`

JSON.parse(jsonStr, function(k, v){
    console.log("key:", k,  ",this:", this);
    return v;
})


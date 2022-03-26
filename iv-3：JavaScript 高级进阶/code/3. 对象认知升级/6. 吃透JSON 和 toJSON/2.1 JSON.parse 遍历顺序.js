var jsonStr = `{
    "name": "牙膏",
    "count": 10, 
    "orderDetail": {
        "createTime": 1632996519781,
        "orderId": 8632996519781,
        "more": {
            "desc": "描述"
        }
    }
}`

JSON.parse(jsonStr, function(k, v){
    console.log("key:", k);
    return v;
})

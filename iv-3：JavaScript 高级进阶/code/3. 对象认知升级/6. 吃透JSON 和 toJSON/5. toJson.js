var product = {
    "name": "牙膏",
    "count": 10, 
    "orderDetail": {
        "createTime": 1632996519781,
        "orderId": 8632996519781
    },
    toJSON(){
        return {
           name: "牙膏"
        }
    }
}

console.log(JSON.stringify(product)) // '{"name":"牙膏"}
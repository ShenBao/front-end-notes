function CheckType(type){
    return function (target, name, descriptor){
        let value = descriptor.initializer && descriptor.initializer.call(this);
        return {
            enumerable: true,
            configurable: true,
            get: function() {
                return value;
            },
            set: function(c) {
                var cType = typeof c ==type;
                if(cType){
                    value = c;
                }
            }
        }
    }
}

function SetString(){
    return function (target, name, descriptor){
        let value = descriptor.initializer && descriptor.initializer.call(this);
        return {
            enumerable: true,
            configurable: true,
            get: function() {
                return value;
            },
            set: function(c) {
                value= 8888;
            }
        }
    }
}


module.exports = {
    CheckType,
    SetString,
};
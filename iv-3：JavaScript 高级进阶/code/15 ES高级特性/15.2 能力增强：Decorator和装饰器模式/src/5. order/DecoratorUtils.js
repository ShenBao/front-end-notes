function classDecorator1() {
    console.log("classDecorator1");
    return function (target) {
        console.log("classDecorator1 执行");
    };
}


 function classDecorator2() {
    console.log("classDecorator2");
    return function (target) {
        console.log("classDecorator2 执行");
    };
}


 function methodDecorator1() {
    console.log("methodDecorator1");
    return function (target) {
        console.log("methodDecorator1 执行");
    };
}



function methodDecorator2() {
    console.log("methodDecorator2");
    return function (target, key, descriptor) {
        console.log("methodDecorator2 执行");
        return descriptor;
    }
}


function propertyDecorator1() {
    console.log("propertyDecorator1");
    return function (target, key, descriptor) {
        console.log("propertyDecorator1 执行");
        return descriptor;
    }
}

function propertyDecorator2() {
    console.log("propertyDecorator2");
    return function (target, key, descriptor) {
        console.log("propertyDecorator2 执行");
        return descriptor;
    }
}




module.exports = {
    classDecorator1,
    classDecorator2,
    methodDecorator1,
    methodDecorator2,
    propertyDecorator1,
    propertyDecorator2
};
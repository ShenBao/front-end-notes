"use strict"

var person = {
    name: "帅哥"
};

Object.defineProperty(person, "name", {
    configurable: false
});

delete person.name;
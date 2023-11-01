class Person {

    constructor(name) {
        this.name = name;
    }

    getName() {
        return {
            getName2: () => ({
                getName3: () => ({
                    getName4: () => this.name
                })
            })
        }
    }
}

var log = console.log;
var p = new Person("person的name");
log(p.getName().getName2().getName3().getName4());
  // person的name
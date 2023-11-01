Function.prototype.call = function(context) {
    context = context || window;
    context["fn"] = this;
    let arg = [...arguments].slice(1); 
    const r = context["fn"](...arg);
    delete context["fn"];
    return r;
}


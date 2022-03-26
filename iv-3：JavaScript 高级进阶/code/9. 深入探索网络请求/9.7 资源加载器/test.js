const resourcesInfo = [
    {
        key: "react-redux",
        pre: ["react", "react-dom", "redux"],
        url: "https://cdn.bootcdn.net/ajax/libs/react-redux/7.2.6/react-redux.min.js"
    },
    {
        pre: ["promise"],
        key: "axios",
        url: "https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.min.js",
        ver: "0.28.0"
    },
    {
        key: "flv",
        url: "https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.min.js"
    },
    {
        key: "promise",
        url: "https://cdn.bootcdn.net/ajax/libs/es6-promise/4.2.8/es6-promise.min.js"
    }, {
        pre: "react",
        key: "react-dom",
        url: "https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/cjs/react-dom.production.min.js"
    }, {
        url: "https://cdn.bootcdn.net/ajax/libs/react/17.0.2/cjs/react.production.min.js",
        key: "react"
    }, {
        key: "react-router",
        pre: ["react", "react-dom"],
        url: "https://cdn.bootcdn.net/ajax/libs/react-router/6.2.1/react-router.production.min.js"
    }, {
        key: "redux",
        pre: ["react", "react-dom"],
        url: "https://cdn.bootcdn.net/ajax/libs/redux/4.1.2/redux.min.js"
    }
];

const messager = {
    container: document.getElementById("messages"),
    append() {
        const msgStr = Array.from(arguments).map(msg => JSON.stringify(msg)).join("\t");
        const el = document.createElement("div");
        el.innerHTML = `<div>${msgStr}</div>`;
        this.container.appendChild(el);
    },
    clear() {
        this.container.innerHTML = "";
    }
}

function addEvent(selector, name, fn, options = false) {
    const el = document.querySelector(selector);
    if (!el) {
        return;
    }
    el.addEventListener(name, fn, options);
}

function listenConsole() {

    ["log", "info", "warn", "error"].forEach(m => {
        const originM = console[m];

        console[m] = function () {
            messager.append.apply(messager, arguments);
            originM.apply(this, arguments)
        }
    })
}

listenConsole();

let startTime;

const rl = new ResourceLoader(resourcesInfo, idb);

rl.on("progress", (progress, info) => {
    console.log("progress:", progress, info);
});

rl.on("completed", (data) => {
    console.log("completed event:", data);
    console.log("total time:", Date.now() - startTime)
});

rl.on("loaded", (data) => {
    console.log("loaded event:", data);
    console.log("total time:", Date.now() - startTime)
});

rl.on("error", (error, info) => {
    console.log("error event:", error.message, info);
});

addEvent("#btn-load", "click", () => {
    messager.clear();
    startTime = Date.now();
    rl.reset();
    rl.startLoad();
});


addEvent("#btn-clear", "click", () => {
    window.idb.clear();
});








self.addEventListener("storage", function(ev){
    console.log("worker: storage event", ev.newValue);
});

// console.log("worker:storage", localStorage)
// console.log("worker:cookie", document.cookie)




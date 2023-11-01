var gName = "global的name";

function getName() {
    var name = "name";
    let bName = "bName"
    {
        let name = "let的name"
        const bName = "const的bName"
        console.log("name:", name, ",", "otherName:", bName);
    }
    console.log("name:", name, ",", "otherName:", bName);
    console.log("gName:", gName);
}

getName()
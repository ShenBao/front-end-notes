function getXHR() {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //遍历IE中不同版本的ActiveX对象
        let version = ["Msxml2", "Microsoft"];
        for (let i = 0; i < version.length; i++) {
            try {
                xhr = new window.ActiveXObject(version[i] + ".XMLHTTP");
                return;
            } catch (e) {
                console.log(e);
            }
        }
    }
    return xhr;
}
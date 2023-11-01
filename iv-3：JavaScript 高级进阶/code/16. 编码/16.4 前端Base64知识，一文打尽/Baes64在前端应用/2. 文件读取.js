


function readAsDataURL() {
    const fileEl = document.getElementById("inputFile");
    return new Promise((resolve, reject) => {
        const fd = new FileReader();
        fd.readAsDataURL(fileEl.files[0]);
        fd.onload = function () {
            resolve(fd.result);
            // data:image/png;base64,iVBORw0KGgoAAAA.......
        }
        fd.onerror = reject;
    });
}


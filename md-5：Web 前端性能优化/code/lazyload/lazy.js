var viewHeight = document.documentElement.clientHeight; // 视图区域高度

function lazyload(){
    var eles = document.querySelectorAll("img[data-original][lazyload]"); //所有图片元素
    eles.forEach(function(item, index){
        var rect = item.getBoundingClientRect(); // 元素周边信息
        // console.log(viewHeight);
        // console.log(rect);
        // console.log(item.dataset);
        if(rect.top < viewHeight) {
            // 在可视区域
            item.src = item.dataset.original;
        }
    })
}

lazyload();

document.addEventListener("scroll", lazyload);

(function (window) {

    // 空对象
    var zepto = {}

    // 构造函数
    function Z(dom, selector) {
        var i, len = dom ? dom.length : 0
        for (i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
    zepto.Z = function (dom, selector) {
        // 出现关键字 new
        return new Z(dom, selector)
    }

    zepto.init = function (selector) {
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelectorAll(selector))
        return zepto.Z(dom, selector)
    }

    // 即使用zepto的时候的$
    var $ = function (selector) {
        return zepto.init(selector)
    }

    window.$ = $

    // 原型的扩展
    $.fn = {
        css: function (key, value) {
            
        },
        html: function (value) {
            
        }
    }
    Z.prototype = $.fn
})(window)
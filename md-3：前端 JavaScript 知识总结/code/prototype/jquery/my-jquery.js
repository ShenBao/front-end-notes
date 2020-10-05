(function (window) {

    var jQuery = function (selector) {
        // 关键字 new, 找到构造函数
        return new jQuery.fn.init(selector)
    }

    // 初始化原型 jQuery.fn
    jQuery.fn = {
        constructor: jQuery,
        css: function (key, value) {
            alert('css')
        },
        html: function (value) {
            return 'html'
        }
    }

    // 定义构造函数
    var init = jQuery.fn.init = function (selector) {
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelectorAll(selector))

        var i, len = dom ? dom.length : 0
        for (i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }

    // 定义原型
    init.prototype = jQuery.fn

    window.$ = jQuery

})(window)
/**
现有三种菜单：button 类型，select 类型，modal 类型。
- 共同特点
    - title icon 属性
    - isDisabled 方法（可直接返回 false）
    - exec 方法，执行菜单的逻辑
- 不同
    - button 类型，执行 exec 时打印 `'hello'`
    - select 类型，执行 exec 时返回一个数组 `['item1', 'item2', 'item3']`
    - modal 类型，执行 exec 时返回一个 DOM Element `<div>modal</div>`

用 ES6 语法写出这三种菜单的 class 。
 */

class BaseMenu {
    constructor(title, icon) {
        this.title = title
        this.icon = icon
    }
    isDisabled() {
        return false
    }
}

class ButtonMenu extends BaseMenu {
    constructor(title, icon) {
        super(title, icon)
    }
    exec() {
        console.log('hello')
    }
}

class SelectMenu extends BaseMenu {
    constructor(title, icon) {
        super(title, icon)
    }
    exec() {
        return ['item1', 'item2', 'item3']
    }
}

class ModalMenu extends BaseMenu {
    constructor(title, icon) {
        super(title, icon)
    }
    exec() {
        const div = document.createElement('div')
        div.innerText = 'modal'
        return div
    }
}

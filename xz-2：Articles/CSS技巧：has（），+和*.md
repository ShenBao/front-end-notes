# CSS技巧：has（），+和*

## +

```css
.layout-container .item:hover + .item {
      filter: brightness(0.6);
      transform: translateZ(150px) rotateY(40deg);
} 
```

- +的意思是：+ 这个符号是相邻兄弟选择器，选中它的兄弟节点元素。
- + .item的意义就很明了，选中相邻的并且名字叫item的元素。


## *

```css
.layout-container .item:hover + * {
    filter: brightness(0.4);
    transform: translateZ(70px) rotateY(20deg);
}
```

- `*` 是通配选择器，它可以匹配任何元素，不管它是 div、p、span 等任何 HTML 标签所对应的元素，所以这里只要它是符合前面相邻兄弟选择规则的那个元素，就会被选中并应用后续的样式规则。


## has()

:has() 是一种伪类选择器，也被称为 “关系选择器”，它允许你根据元素是否包含特定的其他元素（满足括号内指定的条件）来选择该元素本身。

```css
.box:has(.selected){
      background-color: red;
}
```

.box:has(.selected)这串代码的意思是选中box中类名为selected的元素。


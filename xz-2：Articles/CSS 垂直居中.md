# CSS 垂直居中

## 方法 1: 表格单元格

有 4 种主要布局：流（默认）、表格、flexbox、grid。如何对齐取决于容器的布局。Flexbox 和 grid 相对较晚添加，所以表格是第一种方式。

```html
<div style="display: table;">
  <div style="display: table-cell; vertical-align: middle;">
    内容。
  </div>
</div>
```

## 方法 2: 绝对定位

通过绝对定位间接的方式来实现这个效果。

```html
<div style="position: relative;">
  <div style="position: absolute; top: 50%; transform: translateY(-50%);">
    内容。
  </div>
</div>
```

这个方式通过绝对定位来绕过流式布局：

- 用 position: relative 标记参考容器。
- 用 position: absolute; top: 50% 将内容的边缘放置在中心。
- 用 transform: translateY(-50%) 将内容中心偏移到边缘。

## 方法 3: 内联内容

虽然流布局对内容对齐没有帮助。它允许在一行内进行垂直对齐。那么为什么不使一行和容器一样高呢？

```html
<div class="container">
  ::before
  <div class="content">内容。</div>
</div>
```

```css
.container::before {
  content: '';
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.content {
  display: inline-block;
  vertical-align: middle;
}
```

这个方式有一个缺陷，需要额外创建一个伪元素。

## 方法 4: 单行 flexbox

现在布局中的 Flexbox 变得广泛可用。它有两种模式：单行和多行。在单行模式（默认）中，行填充垂直空间，align-items 对齐行内的内容。

```html
<div style="display: flex; align-items: center;">
  <div>内容。</div>
</div>
```

或者调整行为列，并用 justify-content 对齐内容。

```html
<div style="display: flex; flex-flow: column; justify-content: center;">
  <div>内容。</div>
</div>
```

## 方法 5: 多行 flexbox

在多行 flexbox 中，行不再填充垂直空间，所以行（只有一个项目）可以用 align-content 对齐。

```html
<div style="display: flex; flex-flow: row wrap; align-content: center;">
  <div>内容。</div>
</div>
```

## 方法 6: grid

Grid 出来的更晚，对齐变得更简单。

```html
<div style="display: grid; align-content: center;">
  <div>内容。</div>
</div>
```

## 方法 7: grid 单元格

注意与前一个方法的微妙区别：

- align-content 将单元格居中到容器。
- align-items 将内容居中到单元格，同时单元格拉伸以适应容器。

```html
<div style="display: grid; align-items: center;">
  <div>内容。</div>
</div>
```

似乎有很多方法可以做同一件事。

## 方法 8: margin:auto

在流布局中，margin:auto 可以水平居中，但不是垂直居中。使用 margin-block: auto 可以设置垂直居中。

```html
<div style="display: grid;">
  <div style="margin-block: auto;">
    内容。
  </div>
</div>
```

## 方法 9: align-content

在 2024 年的 CSS 原生属性中允许使用 1 个 CSS 属性 align-content: center进行垂直居中。

```html
<div style="align-content: center;">
  <code>align-content</code> 就是这么简单！
</div>
```



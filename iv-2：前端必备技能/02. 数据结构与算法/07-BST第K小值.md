# 求二叉搜索树的第 K 小的值

## 题目

一个二叉搜索树，求其中的第 K 小的节点的值。
如下图，第 3 小的节点是 `4`

![](./img/二叉搜索树.png)

## 二叉树

树，大家应该都知道，如前端常见的 DOM 树、vdom 结构。

二叉树，顾名思义，就是每个节点最多能有两个子节点。

```ts
interface ITreeNode {
    value: number // 或其他类型
    left?: ITreeNode | null
    right?: ITreeNode | null
}
```

## 二叉树的遍历

- 前序遍历：root -> left -> right
- 中序遍历：left -> root -> right
- 后序遍历：left -> right -> root

## 二叉搜索树 BST (binary search tree)

- 左节点 left（包括其后代）value <= 根节点 root value
- 右节点 right（包括其后代）value >= 根节点 root value
- 可使用`二分法`进行快速查找

思考：BST 存在的意义是什么？

## 分析题目

根据 BST 的特点，中序遍历的结果，正好是按照从小到大排序的结果。<br>
所以，中序遍历，求数组的 `arr[k]` 即可。

## 答案

代码 binary-search-tree-k-value.ts

## 划重点

- 二叉树，和三种（前序、中序、后序）遍历
- 二叉搜索树的特点：left <=root; right >= root
- 二叉搜索树的价值：可使用`二分法`进行快速查找

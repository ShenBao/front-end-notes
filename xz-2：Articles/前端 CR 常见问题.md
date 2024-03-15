# 前端 CR 常见问题

## commit message

https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html

## dependencies 和 devDependencies 不分

把 react 依赖写在 devDependencies 等行为依旧很业余，如果确实不是项目直接依赖，可以看看 peerDependencies 的使用


## 包引用顺序

前端代码中用 import 一般有三种情况

- css 代码
- 项目内文件
- 三方包

虽然没有明确规定的顺序，但最好三者分类引用，业界也有非常多可以[自动调整的工具](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports)，可以配合 eslint、prettier 等工具使用

甚至 package.json 字段的顺序也可以自动调整呢 [sort-package-json](https://github.com/keithamus/sort-package-json)

## 方法名不是动词短语

这是个很基础的约定，看到 productListFetch()这样的方法名会很奇怪，不如 fetchProductList

## 遗留的 console 调试代码

eslint 还是要配置一下，最好级别不是 warning，而是 error，确实有必要可以使用 eslint-disable

## 不合理的 eslint-disable 范围

上面提到 eslint-disable，很多同学在滥用该能力，为了一行代码的某个特性，全文件禁用了 eslint，合理做法应该是只禁用某一行的某一个特性

```js
// eslint-disable-next-line no-alert
alert('foo');
```
不清楚 Dsiabling Rules 可以看看官方文档 [eslint.org/docs/latest…](https://eslint.org/docs/latest/use/configure/rules#disabling-rules)

## 大段注释代码不删除

无力吐槽，都有 git 记录了，只要好好写 commit message，想找回代码很容易，即使一定要保留，大促后就移除注释（也是很不好的处理方案），最起码加个 TODO 标识，让 IDE 提醒自己还有债没还

## 文件名用了 ts，实际代码和 ts 无关

如果不认可 TypeScript 带来的价值，大可不必如此伪装

## CSS 属性顺序

大部分代码规约对 css 属性也没有限制，但我们一般会遵从如下的约定

- 布局、定位相关 display / position / float  等
- 自身属性 width / height / margin / padding  等
- 文本属性 color / font / text-decoration / text-align 等
- 其它 cursor / border/ shadow / background 等

https://www.npmjs.com/package/prettier-plugin-style-order

## CSS 类名规范

- 都使用小写，众所周知 CSS 不区分大小写
- 单词间使用<font style="color:rgb(64, 64, 64);">-</font> 连字符，不要使用驼峰等，区块 block、元素 element、修饰符 modifier 可以参考 BEM 命名规范
- 尽量不要用单个单词，即使自己限定了作用域，防不住别人
- 在 CSS Modules 中，推荐使用驼峰命名: https://github.com/css-modules/css-modules?spm=ata.21736010.0.0.6c072846MGXjIF#naming

## 静态内联样式

```jsx
function Demo (){
  return (
    <div className="product-list-container">
      {
        list.map(product => {
          return (
            <div style={{
              width: '200px',
              height: '400px',
              backgroundColor: '#efefef'
            }}>
            </div>
          );
        })
      }
    </div>
  );
}
```

这种图省事把静态样式内联，这样有两个弊端

- 缺少语义，不知道为什么设置这样的属性
- 在 list 场景会显著增加 DOM 体积，SSR 场景影响 download 时间

## 样式反复覆盖

调整样式时候遇到这种会不会感觉头大

尽可能让样式作用的精准的作用域，不要依赖层层覆盖

```css
.container {
  margin: 0 auto;
  color: #333;

  &.mobile {
    color: #444;
  }
}
```

可以适当调整为
```css
.container {
  margin: 0 auto;
  
  &.pc {
    color: #333;
  }

  &.mobile {
    color: #444;
  }
}
```

## 前端工程问题

- 代码不合并 master，使用 gitlab Tag 功能标识
- 版本号推送不在发布流程（非常容易导致版本号先推送，然后再去法静态资源的顺序问题）
- lint 不生效
    - 代码没有配置 lint，这种没嘛好说的，给项目加上
    - 没有意识到 husky pre-commit 不生效了，可以查查 husky 最新的升级版本配置变化

## 没有价值的 README

项目的 README 不应该是脚手架生成的默认内容，不同类型的项目包含的信息可能不同，但都应该起到一个作用—— 项目需要交给其他同学，看 README 就够了，因此一般的前端项目 README 应该包含如下内容

- 项目说明
    - 项目简单介绍
    - 对应产品地址
- 工程
    - Aone、DEF 等应用地址
    - 使用框架的文档地址
- 研发流程介绍
    - 环境安装流程
    - 前后端接口约定文档
    - 埋点介绍
    - hosts 绑定
    - 开发、构建、发布等命令
- API 介绍
    - 字段介绍
    - 简单示例
    - 效果截图

## 常见方法错误使用

### 混用 forEach 和 map

可能是 React 让大家习惯了用 map，而忽略了其语义

Array.prototype.map() 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成

```js
arr.map(item => {
  item.name += '--';
})
```

### option chain 不考虑兼容

option chain 语法让我们避免了冗长的空指针检查，但大家习惯在赋值过程使用，却忽略了消费过程的兼容

```js
const children = testObj?.elements?.items;
return (
  <>
    {
      children.map(item => {
        <span>{item}</span>
      })
    }
  </>
);
```

### 多一层包裹的回调函数

```js
getList()
  .then(list => {
    console.log(list);
  });
```

### 是不是感觉这样的代码太熟悉不过？

```js
getList().then(console.log);
```

### await 带来的没必要串行调用

await 很好用，但不是所有时候都合适，可能会带来没必要串行调用

```js
const user = await getUser(userId);
const favorites = await getFavaritesByUserId(userId);

setStore(user, favorites);
```

### 各个函数之间没有前后依赖关系时候应该尽可能并行

```js
Promise.all([
  getUser(userId),
  getFavaritesByUserId(userId)
]).then(setStore);
```

## 不好的编程习惯

### 根据现象编程

```js
if (indexOf('test') >= 0) {}

// 榜单前 3 位特殊处理
if (index < 4) {}

if (ieVersion >= 9) {
  // 使用 Array.isArray 方法
}
```

上面的三个语句都是根据句表象在处理逻辑，这种代码类似双重否定的 bool 值（ notDisabled）需要人多反应一次才能理解代码表达的含义，而且在后续的维护中很容易被人误改

我们应该回归现象的本质，用最直接的方式表达逻辑

```js
if (indexOf('test') != -1) {}

if (index <= 3) {}

if (typeof Array.isArray === 'function') {
  // 使用 Array.isArray 方法
}
```

### 穷举方式写代码

这类问题其实是对“根据现象编程”的一种延伸，有一道面试题


    实现函数 compareVersion(v1, v2)，用例
    compareVersion('1.0.0', '0.9.0') // 1
    compareVersion('1.0.0', '1.0.0') // 0
    compareVersion('1.0.0', '2.0.0') // -1

会不会写出这样的代码
```js
function compareVersion (v1, v2) {
  const ver1Arr = v1.split('.').map(Number);
  const ver2Arr = v2.split('.').map(Number);

  if (ver1Arr[0] > ver2Arr[0]) {
    return 1;
  } else if (ver1Arr[0] < ver2Arr[0]) {
    return -1;
  } else {
    if (ver1Arr[1] > ver2Arr[1]) {
      return 1;
    } else if (ver1Arr[1] < ver2Arr[1]) {
      return -1;
    } else {
      if (ver1Arr[2] > ver2Arr[2]) {
        return 1;
      } else if (ver1Arr[2] < ver2Arr[2]) {
        return -1;
      } else {
        return 0;
      }
    }
  }
  
  return 0;
}
```

例子夸张了一些，不过类似的案例非常多，用代码穷举所有可能，下面的写法感觉是不是更有逻辑一点

```js
function compareVersion(v1, v2) {  
  const ver1Arr = v1.split('.').map(Number);
  const ver2Arr = v2.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (ver1Arr[i] > ver2Arr[i]) {
      return 1;
    } else if(ver1Arr[i] < ver2Arr[i]) {
      return -1;
    }
  }

  return 0;
}
```

感受下这段代码更好的写法是什么

```js
function getModalWidth(length) {
  if (length <= 10) {
    return 285;
  }
  if (length > 10 && length <= 20) {
    return 570;
  }
   if (length > 20 && length <= 30) {
    return 855;
  }
   if (length > 30 && length <= 40) {
    return 1140;
  }
   if (length > 10 && length <= 20) {
    return 1425;
  }
}
```

第一直觉是不是改成这样

```js
function getModalWidth(length) {
  if (length <= 10) {
    return 285;
  }
  if (length <= 20) {
    return 570;
  }
   if (length <= 30) {
    return 855;
  }
   if (length <= 40) {
    return 1140;
  }
   if (length <= 50) {
    return 1425;
  }
}
```

仔细分析下是不是可以改成这样

```js
function getModalWidth(length) {
  return Math.ceil(length / 10) * 285;
}
```

### Magic number & 常量抽离

```js
if (column > 7) {}
```

每个人看到其他人代码中出现 Magic number 时候都会异常气愤，但到自己代码时候会觉得表意足够清晰，忽略数字变量的命名

除了注意了数字变量命名问题，对于全局反复使用的变量要注意抽离到公共文件中，便于后续的统一维护，很多工程脚手架甚至会初始化一个 constants文件夹，使用不同的文件存放各种常量

```js
// 同时渲染模块数
export const DRIVE_MODULE_AMOUNT_ONCE = 3;

// 模块渲染失败最多重试次数
export const MODULE_RENDER_RETRY_TIMES = 2;
```

### 函数有副作用

```js
({ activeIndex1, floorArray }) => {
  let finalLiveList;
  
  if (activeIndex1 === 0) {
    floorArray[0].list[0].cardType = floorArray?.[0]?.cardType;
    finalLiveList = [...floorArray[0].list, ...floorArray[1].list];
  } else {
    finalLiveList = [...floorArray[0].list];
  }
  
  return (
    <WaterFall
    activeIndex1={activeIndex1}
list={finalLiveList}
/>
  );
}
```
函数应该避免修改入参引发副作用，尽可能保证函数是纯函数

- 如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数
- 该函数不会产生任何可观察的副作用

```js
({ activeIndex1, floorArray }) => {
  let finalLiveList;
  
  if (activeIndex1 === 0) {
    finalLiveList = [...floorArray[0].list, ...floorArray[1].list];
    finalLiveList[0].cardType = floorArray?.[0]?.cardType;
  } else {
    finalLiveList = [...floorArray[0].list];
  }
  
  return (
    <WaterFall
      activeIndex1={activeIndex1}
      list={finalLiveList}
    />
  );
}
```

### 不区分思路与实现的 render

CR React UI 逻辑，最害怕看到的就是这样的代码

```js
function Demo (){
  return (
    <div>
      <div className="demo1">
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="demo2">
        <div>
          {
            xxx && (
              <>
                <div></div>
                <div></div>
              </>
            )
          }
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
```

这种代码读起来实在是无从下手，整个 UI 的思路与实现杂糅在一起，需要了解作者的全部思路才能读懂。如果要 CR 一个解决“把大象塞进冰箱”的问题，那么我会希望首先了解到作者的整体思路是什么，可能有三步

1. 打开冰箱门
2. 把大象放进去
3. 关上冰箱门

开关冰箱门很好理解，快速看一下代码规约即可，重点放在把大象放进去的实现细节就可以了，如果又进一步做了思路的拆解，那代码读起来就更简单了

1. 实现蚁人电影中的缩小技术
2. 技术应用到大象身上
3. 拎起大象丢进去

所以对于复杂的 UI 我希望看到的写法是这样的

```js
function Component1 (){}
function Component2 (){}
function Component3 (){}
function Component4 (){}

function Demo() {
  return (
    <Component1>
      <Component2></Component2>
      <Component3>
        <Component4 />
        <Component4 />
      </Component3>
    </Component1>
  );
}
```

在处理复杂逻辑时候可以按照类似步骤处理一下

1. 画流程图
2. 每个节点定义成一个函数
3. 把函数串联起来
4. 为每个函数做实现
5. 测试

相对于面向对象，可能大部分前端代码更适合用面向过程的写法

### 违背 Dont Repeat Yourself 原则

这个感觉不用解释什么，但我们却在不停的违背，当想实现某个逻辑拿出的方案是“Copy 某段代码改改”时候，也需就已经违背了这个原则，无论什么理由，建议不要去按 Ctrl + C

### 养成好的编程习惯



上面讲的都属于知识和技巧，真正重要的是写好代码的意愿，很难想象不注重代码健壮性、可读性的工程师，会把当下的代码珍视为自己的代表作，用来流传。日常不会有那么多大事落在头上，此时、此行代码就是我。

技术素养——技术领域平素的修养。



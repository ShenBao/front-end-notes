# 何时使用 SSR

## 题目

何时使用 SSR ，何时不用？

## 分析

SSR - Server-side render 服务端渲染

SSR 历史悠久，之前的 ASP JSP PHP 就是 SSR 。

之前面试过一个候选人，问他：SSR 有何优点？他回答：SSR 好！ —— 这是完全没有技术思维的回复。<br>
那即便你能回答出 SSR 的优势，我再继续问：SSR 有什么劣势？再继续问：SSR 适用于哪些场景？

借此说明：技术要有合适的应用场景才会有价值。

## SSR 的优势

服务端直出 html
- 性能好
- 对 SEO 优化

## SSR 的劣势

前后端同构，开发成本高（学习、调试、运维等）

## 是否需要 SSR

是否能利用 SSR 的优势
- 你的项目是否需要 SEO ？—— 管理后台就不需要
- 你的项目是否在意极致的性能优化，或者会否有可能处于弱网环境（网络好，速度不会太慢的）—— 管理后台就不需要

如果急需要 SSR 的优势和价值，那就去承担 SSR 的成本。如果不需要这些优势，那 SSR 就成了一个累赘。

## SSR 的应用场景

C 端，以阅读为主的单页面，如新闻页，运营宣传广告页面，官网等。1. 需要快；2. 需要 SEO

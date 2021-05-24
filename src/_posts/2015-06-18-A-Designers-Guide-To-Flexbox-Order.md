---
layout:     post
title:      "Flexbox 设计指南4：排序"
subtitle:   "flexbox 强悍之处千千万，有一点不得不提及：你只需要一行 CSS，就可以调换页面内容的顺序，这个效果从前只能借助 JavaScript 完成呢。这个特性在响应式设计中有多大的便利，相信聪明的你马上就能想象到了。"
date:       2015-06-18
author:     "kmokidd"
header-img: "/images/Flexbox-For-Designers-Order.png"
tags:
  - CSS3
  - Flexbox
---

<style>
.roman-columns, .roman-columns li, #captioned-columns { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; padding: 0; margin: 0 auto; }
.roman-columns a { border-bottom: none; margin-top: 1rem; }
.roman-columns figure img, .roman-columns li img, #captioned-columns figure img { width: 100%; height: auto; }
.roman-columns.header-columns { width: 100%; }
.roman-columns.header-columns:hover li:last-child { -webkit-box-ordinal-group: 0; -webkit-order: -1; -ms-flex-order: -1; order: -1; }
.columns-reversed { -webkit-box-orient: horizontal; -webkit-box-direction: reverse; -webkit-flex-direction: row-reverse; -ms-flex-direction: row-reverse; flex-direction: row-reverse; }
.roman-columns li { -webkit-box-orient: vertical; -webkit-box-direction: reverse; -webkit-flex-direction: column-reverse; -ms-flex-direction: column-reverse; flex-direction: column-reverse; -webkit-box-align: center;
-webkit-align-items: center; -ms-flex-align: center; align-items: center; }
.roman-columns li:before { content: none !important; }
.columns-body-examples { width: 60%; }
#last-column { -webkit-box-ordinal-group: 0; -webkit-order: -1; -ms-flex-order: -1; order: -1; }
.roman-columns.columns-body-examples .first-to-last { -webkit-box-ordinal-group: 2; -webkit-order: 1; -ms-flex-order: 1; order: 1; }
.roman-columns { margin-bottom: 3rem; }
</style>

flexbox 强悍之处千千万，有一点不得不提及：你只需要一行 CSS，就可以调换页面内容的顺序，这个效果从前只能借助 [JavaScript](http://demosthenes.info/blog/javascript) 完成呢。这个特性在[响应式设计](http://demosthenes.info/blog/responsive-design)中有多大的便利，相信聪明的你马上就能想象到了。[移动优先的设计](http://demosthenes.info/blog/334/Turn-Web-Development-On-Its-Head-Design-For-Mobile-First)通常需要通过重新优化内容来创建不同的阅读顺序，flexbox 在这样的场景里就很好用了。

这样，设计师也可以轻易地更改设计上内容排版顺序。不过大部分 flexbox 支持文档都比较技术性，主要面向开发者的。我们所撰写的 flexbox 系列就是想尝试扭转这个情况的。

在之前的文章里，我们已经聊过了基本的 flexbox [水平布局](http://demosthenes.info/blog/780/A-Designers-Guide-To-Flexbox)和[垂直布局](http://demosthenes.info/blog/787/A-Designers-Guide-To-Flexbox-Part-2-Going-Vertical)。在今天的话题中，我会用古罗马柱作为例子：

````
<ul id="roman-columns">
	<li><a href="#">Doric</a><img src="doric-column.png" alt>
	<li><a href="#">Ionic</a><img src="ionic-column.png" alt>
	<li><a href="#">Corinthian</a><img src="corinthian-column.png" alt>
</ul>
````

按照 HTML 标签顺序呈现出来的柱子，使用默认的 flexbox 样式：

````
ul#roman-columns { display: flex; padding: 0; }
ul#roman-columns li { display: flex; flex-direction: column-reverse; align-items: center; }
ul#roman-columns li img { width: 100%; height: auto; }
ul#roman-columns li a { text-decoration: none; font-size: 1.5rem; color: #000; margin: 1rem; }
````

>请注意，在*列表项中*我也使用了 flexbox，这是为了保证图片可以在对应名字的上部出现；不过这个效果不是今天的重点，有兴趣的同学可以戳一戳[这里](http://codepen.io/dudleystorey/pen/HwdCf)看完整效果，另外 flexbox 布局会自动忽略列表的 `style-type`（比如序号和点）。

我[从前也用过的](http://demosthenes.info/blog/780/A-Designers-Guide-To-Flexbox)，下面这行代码加上去之后，布局顺序就倒过来了：

```
ul { display: flex; flex-direction: row-reverse; }
```

效果是酱紫的：

<ul class="roman-columns columns-reversed columns-body-examples">
<li><a href="#">Doric</a><img src="/images/Flexbox-For-Designers-Order/doric-column.png" alt="">
</li><li><a href="#">Ionic</a><img src="/images/Flexbox-For-Designers-Order/ionic-column.png" alt="">
</li><li><a href="#">Corinthian</a><img src="/images/Flexbox-For-Designers-Order/corinthian-column.png" alt="">
</li></ul>

要注意哦，内容呈现的顺序是不同了，但是 DOM 结构并没有发生变化。

这看起来已经很整齐了，但是比起下面要说的这个方法它还有点逊。先把我们的 CSS 还原到起始状态，然后加上这一句：

````
ul li:last-child { order: -1; }
````

`order` 为*负值*可以控制元素调整到起始位置：

<ul class="roman-columns columns-body-examples">
<li><a href="#">Doric</a><img src="/images/Flexbox-For-Designers-Order/doric-column.png" alt="">
</li><li><a href="#">Ionic</a><img src="/images/Flexbox-For-Designers-Order/ionic-column.png" alt="">
</li><li id="last-column"><a href="#">Corinthian</a><img src="/images/Flexbox-For-Designers-Order/corinthian-column.png" alt="">
</li></ul>

相对的，`order` 为*正值*会让一个元素被放在最后一个位置：

````
ul li:first-child { order: 1; }
````

<ul class="roman-columns columns-body-examples">
<li class="first-to-last"><a href="#">Doric</a><img src="/images/Flexbox-For-Designers-Order/doric-column.png" alt="">
</li><li><a href="#">Ionic</a><img src="/images/Flexbox-For-Designers-Order/ionic-column.png" alt="">
</li><li><a href="#">Corinthian</a><img src="/images/Flexbox-For-Designers-Order/corinthian-column.png" alt="">
</li></ul>

当然，任何 [CSS 选择器](http://demosthenes.info/blog/css/selectors)（class、id 或者 伪元素）都可以控制 `order` 属性。

`order` 的使用方法可能有点反人类，它的值看起来似乎是在告诉浏览器元素呈现的顺序：`order:1` 的意思居然不是“把这个元素放到第一位”而是“把这个元素放到最后一位”。你可以遵循下面这三点来理解 `order`：

+ 所有的 flex 元素默认的 `order` 值都是0

+ 默认情况下，flex 元素的呈现顺序就是 *资源顺序 (source order)*（也就是 DOM 中元素的顺序）。

+ 如果存在，元素的 `order` 值大于或者小于0，那么这样的 flex 元素就会被按照它们的 `order` 值相对大小来排列。所以才会呈现出这样的效果：

<figure id="captioned-columns" class="columns-body-examples">
<figure><img src="/images/Flexbox-For-Designers-Order/corinthian-column.png" alt=""><figcaption>order: -1</figcaption></figure>
<figure><img src="/images/Flexbox-For-Designers-Order/doric-column.png" alt=""><figcaption>order: 0</figcaption></figure>
<figure><img src="/images/Flexbox-For-Designers-Order/ionic-column.png" alt=""><figcaption>order: 1</figcaption></figure>
</figure>

所以如果有一个元素是 `order:-2`，它会出现在现有 flex-item 的“背部”：在这例子里，它会出现在最左边。

>注意：在早期的浏览器中，使用 flexbox 需要特定的[浏览器前缀](http://demosthenes.info/blog/217/CSS-Vendor-Prefixes-and-Flags)和/或者完全不同的属性名字，在例子里我使用的都是规范所定下的最新的属性和对应值。做兼容的话，建议大家使用 [Autoprefixer](https://github.com/postcss/autoprefixer)。

## 动画的使用 ##

[规范规定](http://www.w3.org/TR/css3-flexbox/#order-property)，`order` 是一个可动画的属性，这说明在调换 flebox 元素顺序时，可以使用 [CSS transitions](http://demosthenes.info/blog/css/animation) 达到 [Isotope](http://isotope.metafizzy.co/) 这样的效果。不过悲剧的是，貌似现在还没有浏览器能支持。

## 结论 ##

虽然 `order` 一开始用起来有点反人类，但它还是相当好理解和应用的。有了 `order`，在 flexbox 布局中我们可以轻松地变换元素的布局。也许在下一篇文章中，我可以给各位好好展示一下它在响应式设计当中的特殊作用。

原文：[A Designer’s Guide To Flexbox: Order](http://demosthenes.info/blog/920/A-Designers-Guide-To-Flexbox-Order)

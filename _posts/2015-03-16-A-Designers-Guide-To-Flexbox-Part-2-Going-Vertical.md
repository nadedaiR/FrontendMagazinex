---
layout:     post
title:      "Flexbox 设计指南2：垂直布局"
subtitle:   "一如之前说过的，flexbox 是一个很强大的 CSS 布局模块。它的优点之一就是，如果你想要将水平布局的 flexbox 改为垂直布局，一行 CSS 代码就能搞定，而且盒子中的元素排列顺序也能用 CSS 来更改。"
date:       2015-03-16
author:     "kmokidd"
header-img: "http://7xrvqo.com1.z0.glb.clouddn.com/images/A-Designers-Guide-To-Flexbox-Part-2-Going-Vertical.cbbb3bcb.jpg"
tags:
  - CSS3
  - Flexbox
---

<style>
.flex-container { display: flex; padding: 2rem; background: hsl(200, 30%, 90%); flex-direction: column; }
.flex-triangle { width: 0; height: 0;
border-bottom: 118px solid hsl(240, 30%, 50%);
border-left: 64px solid transparent;
border-right: 64px solid transparent;
}
.flex-square {
width: 126px;
height: 126px;
background: hsl(300, 30%, 50%);}
.flex-circle {
width: 126px;height: 126px;
border-radius: 50%;
background: hsl(340, 30%, 50%);}
.center { align-items: center; }
.vertical-reverse { flex-direction: column-reverse; align-items: center; }
.high500 { height: 500px; }
.end { justify-content: flex-end; }
.between { justify-content: space-between; }
</style>

一如之前说过的，[flexbox](http://demosthenes.info/blog/css/flexbox) 是一个很强大的 [CSS 布局模块](http://demosthenes.info/blog/css/layouts)。它的优点之一就是，如果你想要将水平布局的 flexbox 改为垂直布局，一行 CSS 代码就能搞定，而且盒子中的元素排列顺序也能用 CSS 来更改。这个特性简直就是为了现在流行的[响应式设计](http://demosthenes.info/blog/mobile/responsive-design)而存在的，我们都知道为了兼顾用户体验，在小屏幕中页面元素会被重新布局。那么在这篇文章里，我们将会讨论到设计师可以如何利用 flexbox 这一特性。

首先，先创建一个简单的布局：

````
<figure id="flex">
	<div id="triangle"></div>
	<div id="square-vert"></div>
	<div id="circle-vert"></div>
</figure>
````

再加上点样式：

````
#flex {
	display: flex;
	padding: 2rem;
}
#triangle {
	width: 0; height: 0;
	border-bottom: 114px solid hsl(240, 30%, 50%);
	border-left: 63px solid transparent;
	border-right: 63px solid transparent;
}
#square-vert {
	width: 126px; height: 126px;
	background: hsl(300, 30%, 50%);
}
#circle-vert {
	width: 126px; height: 126px;
	border-radius: 50%;
	background: hsl(340, 30%, 50%);
}
````

这么写完之后，这三个元素会水平显示。想要改变它们的显示方向，我们只需要加上一行 CSS 语句：  
````
#flex {
	flex-direction: column;
}
````  

<figure class="flex-container vertical right">
<div class="flex-triangle"></div>
<div class="flex-square"></div>
<div class="flex-circle"></div>
</figure>

注意！这三个元素现在是默认地从上向下排列，并且向左对齐。我在上一篇文章中所讨论到的属性，在这个例子里你都能看到：现在上下文是垂直的，而不是水平的。

子元素重新排列后，只要容器的高度依然能够保证其正常显示，那么把子元素放到容器的尾部也很简单。同时让元素垂直对齐，接着倒转它们的顺序。

````
#flex {
	height: 500px;
	justify-content: flex-end;
	flex-direction: column-reverse;
	align-items: center;
}
````

<figure class="flex-container vertical-reverse left high500 center">
<div class="flex-triangle"></div>
<div class="flex-square"></div>
<div class="flex-circle"></div>
</figure>

使用在水平和竖直方向上都对齐的 flexbox，Web 设计师就能实现完美的居中元素。唔，这个方法也是[使用 CSS 实现居中的7种方法](http://demosthenes.info/blog/723/Seven-Ways-of-Centering-With-CSS)之一呢。

## 移动端上的 Flexbox 基础篇 ##

使用 flexbox 布局，你能在大小屏幕之间来去自如。举个例子：

````
<header></header>
<div id=wrapper>
	<nav></nav>
	<main></main>
</div>
<footer></footer>
````

我们可以让 `<nav>` 和 [`<main>`](http://demosthenes.info/blog/648/HTML-51-and-the-main-element) 元素并排布局（水平）：

````
div#wrapper {
	display: flex;
}
````

到小屏幕上呈现上下布局：

````
@media (max-width: 400px;) {
	div#wrapper { flex-direction: column }
}
````

到目前为止，你只看到了 [flexbox](http://demosthenes.info/blog/css/flexbox) 的冰山一角，请期待后续的文章，我将展现出更多 flexbox 魔法。

原文：[A Designer’s Guide To Flexbox, Part 2: Going Vertical](http://demosthenes.info/blog/787/A-Designers-Guide-To-Flexbox-Part-2-Going-Vertical)

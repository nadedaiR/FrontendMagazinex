---
layout:     post
title:      "Flexbox 设计指南"
subtitle:   "Flexbox 是一个强大的新生 CSS 布局模块，完全脱离于传统的 web 开发实践。网上有很多相关的文章，大都关注于规范的细节，导致文章冗长，难懂，甚至有些晦涩。相反，对于设计师和开发者如何使用 flexbox 解决布局问题的讨论相当少：至此，这篇文章出现了。"
date:       2015-02-16
author:     "范洪春"
header-img: "images/a_designers_guide_to_flexbox/a_designers_guide_to_flexbox.jpg"
tags:
    - Flexbox
    - CSS3
---

<style>
.item-container {
  display: flex;
  background-color: hsl(34,88%,90%);
  margin: 1.5rem 0;
}
.square {
  background-color: hsl(50,88%,50%);
  height: 15vw;
  width: 15vw;
  max-width: 200px;
  max-height: 200px;
}
.circle {
  border-radius: 50%;
  background-color: hsl(22,88%,50%);
  width: 10vw;
  height: 10vw;
  max-width: 150px;
  max-height: 150px;
}

.end { justify-content: flex-end; }
.center-main { justify-content: center; }
.between { justify-content: space-between; }
.around { justify-content: space-around; }
.center-cross { align-items: center; }
</style>

[Flexbox](http://demosthenes.info/blog/css/flexbox) 是一个全新并且强大的 CSS 布局模块，完全脱离于传统的 web 开发实践。网上有很多相关的文章，大都关注于规范的细节，导致文章冗长，难懂，甚至有些晦涩。相反，对于**设计师和开发者如何使用 flexbox 解决布局问题**的讨论相当少：至此，这篇文章出现了。

从基础层面上来讲，**flexbox 有三个特性是设计之根本**。但也是在很长一段时间内单纯使用 CSS 很难或者不可能完成任务：对齐方式，排布和顺序。

开始之前，需要先了解下面几个事情：

- Flexbox 在最终形成今天的规范之前，历经了三次迭代。每一次迭代都伴随着不同的属性名，在不同浏览器下有着相应的[特定前缀](http://demosthenes.info/blog/217/CSS-Vendor-Prefixes-and-Flags)。而现在，我们所处在这样的时刻，所有的浏览器都支持无前缀的终极规范，但是想要兼容低版本的浏览器还有很多坑要填。正因如此，我强烈建议你**按照 flexbox 的最终规范编写代码，并且使用最新的浏览器进行测试，**然后再去实现向前兼容。想要让你编写的代码同时兼容所有的浏览器是一件很头疼的事。

- 尽管 flexbox 可以和其它的 CSS 布局系统一同工作，但是在开始使用新的系统之前，**丢掉以前在 web 布局中的假设和实践**很重要。这是一种全新的工作方式，如果坚持以前的思维，你将受到阻碍。

- 你可能偶尔听到“flexbox 是用来干啥干啥的”。诚然，其它的布局系统会很快的补充上 flexbox——比如 grids 和 regions，但这种称述并不完全准确。CSS 不是语义化的，没有哪一个 CSS 特性就是固定做某件事情的。你可以使用任意的 CSS 来完成你的需求；唯一的问题是什么样的代码才能更高效的实现目标。正如我们看到的，flexbox 解决了设计者在布局上正面临的诸多问题。

- Flexbox 以前的几个版本给现在的开发者们带来了一些风险：很可能读到一篇没有指明书写时间的文章，最后发现自己正在看 2009 年的 flexbox 规范说明（现在已经废除）。所以，时刻谨慎小心，提高警惕。

## 一个简单的 Flexbox 应用实例

将三个简单的 ``<div>`` 元素放在另一个容器内部：

````
<div id="item-container">
	<div class="circle"></div>
	<div class="square"></div>
	<div class="circle"></div>
</div>
````

现在按照内层的 ``div`` 元素的类名添加 CSS 样式，为外层容器添加 ``display: flex``：

````
#item-container {
	display: flex;
	background-color: hsl(34,88%,90%);
}
.square {
	height: 200px; width: 200px;
	background-color: hsl(50,88%,50%);
}
.circle {
	border-radius: 50%;
  width: 150px;
  height: 150px;
	background-color: hsl(22,88%,50%);
}
````
The result looks like this:

结果如下所示：

<figure class="item-container">
<div class="circle"></div>
<div class="square"></div>
<div class="circle"></div>
</figure>

此时，有几件事需要注意：

- 很多常见的 flex 相关的属性都被应用于父元素，而不是单个的子元素。这通常会引起一个疑惑，绝大多数开发者习惯于控制单个的元素，而不是通过父元素为子元素添加样式；
- Flex 容器的每个直接子元素被称为一个“flex-item”。然而，子元素里面的所有元素不会继承任何特殊的样式，并且可以添加任何你想要的 CSS。因为每个子元素是一个 flex-item，你会发现自己通过将元素包裹在一个 div 或者其它的元素中，“保护”里面的内容。使该元素成为 flex-child，而不是它里面的内容；
- “Block”，“inline”，“float” 和 “text-align” 在 flex-item 的环境下无意义；
- 默认情况，所有的 flex-item 会按照 flex 容器的 **顶部** 和 **左侧** 对齐。

## Flex 对齐方式

第一步，我们要改变 flex-item 的水平对齐方式。flex-item 默认是左对齐，对应的 CSS 样式为 ``flex-start``。我们将它改为末端。

````
#item-container { justify-content: flex-end; }
````

<figure class="item-container end">
<div class="circle"></div>
<div class="square"></div>
<div class="circle"></div>
</figure>

到目前还没什么惊艳的，但是我们再看一下其它几种可能性。

````
#item-container { justify-content: center; }
````

<figure class="item-container center-main">
<div class="circle"></div>
<div class="square"></div>
<div class="circle"></div>
</figure>

非常棒：效果与使用传统 CSS 至少一个元素以及一些额外的声明才可能完成的效果一样。实际上，远不止这个。

````
#item-container { justify-content: space-between; }
````

<figure class="item-container between">
<div class="circle"></div>
<div class="square"></div>
<div class="circle"></div>
</figure>

继续讨论。 ``space-between`` 最大化分布了容器内部的元素。不管是两个 flex-item 还是十几个，这都是成立的。

再来一个：

````
#item-container { justify-content: space-around; }
````

<figure class="item-container around">
<div class="circle"></div>
<div class="square"></div>
<div class="circle"></div>
</figure>

它很容易让人联想到“已经被用烂了的``margin: 0``”。Flex-item 默认会被均匀的分布，但是每一个都会在其给定的空间内居中显示。

你可能已经注意到，目前为止所有的变化都被限定在水平方向上。垂直呢？

````
#item-container { justify-content: space-between; align-items: center; }
````

<figure class="item-container between center-cross">
<div class="circle"></div>
<div class="square"></div>
<div class="circle"></div>
</figure>

Flex-item 会沿着 flexbox 模型指向的“十字坐标”移动。中间的正方形，没有可移动的垂直空间，在原位置保持不变。事实上，**会以它们的中心来对其所有元素，沿着 X 轴。**属性值还可能是其它的：``flex-start``（默认，等同于“align top”）， ``flex-end``（“align bottom”）以及 ``stretch``。

我还想说，flexbox 也是“首个允许你控制元素顺序的 CSS 布局系统。”为此做一个简单的尝试：将正方形放在两个圆形的前面，而不是两者之间：
````
.square { order: -1; }
````

<figure class="item-container around center-cross">
<div class="circle"></div>
<div class="square" style="order:-1"></div>
<div class="circle"></div>
</figure>

真的很炫酷。Flexbox 有效地摆脱了代码顺序对文档内容显示的束缚：按照惯例，HTML 文档中最先出现的元素往往也最先渲染在页面中。传统的 CSS 对这种改变显得很无力，这个领域也是一直被 [JavaScript](http://demosthenes.info/blog/javascript) 所占据着。需要明白，这么做不会改变原始的 HTML 代码顺序：通过在浏览器上查看源代码可以证明。

关于 [flexbox](http://demosthenes.info/blog/css/flexbox) 值得探讨的有很多，以至于它势不可挡。希望这篇文章是一个很好的开端；我会在接下来的文章中展示，使用 flexbox 实现那些曾被认为“不可能”的页面设计。

>Phillip Walton 的一个很棒的 GitHub 小站同样[以设计的观点透视了 flexbox](http://philipwalton.github.io/solved-by-flexbox)。

原文：[http://demosthenes.info/blog/780/A-Designers-Guide-To-Flexbox](http://demosthenes.info/blog/780/A-Designers-Guide-To-Flexbox)

外刊君推荐：

- [http://www.w3.org/TR/css3-flexbox/](http://www.w3.org/TR/css3-flexbox/)
- [http://demosthenes.info/blog/css/flexbox](http://demosthenes.info/blog/css/flexbox)
- [http://css-tricks.com/snippets/css/a-guide-to-flexbox/](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)

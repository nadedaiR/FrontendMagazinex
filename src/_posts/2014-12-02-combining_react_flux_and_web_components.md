---
layout:     post
title:      "结合 React，Flux & Web Components"
subtitle:   ""
date:       2014-12-02
author:     "范洪春"
header-img: "/images/combining_react_flux_and_web_components.jpg"
tags:
    - React
    - Flux
    - Web Components
---

最近，我和几个聪明的同事针对于当下的 web 前端应用中 UI 组件重用性的话题进行了一次争论。然后在一个懒散的周末下午花了几个小时，让我在关于 web 前端架构的现状以及未来的路方面，思路更加清晰。值得一提的是，我发现一件很有趣的事，短期的未来似乎和假定的长期愿景有些矛盾。

## 短期未来

React 无疑是当下的“新宠”并且似乎就是 web 前端的黎明，伴随而来的项目如雨后春笋，不是建立在 React框架自身之上，就是基于它延伸出的思想。这类思想中最重要的就是“Virtual DOM”的概念，它降低了直接操作笨重、复杂并且性能极差的数据结构，即传统 DOM 的需求。React 等已经[遍地](https://www.youtube.com/watch?v=nYkdrAPrdcw#t=1453)[开花](http://facebook.github.io/react/docs/why-react.html)，我们继续。

对于 React 存在的短板，web 前端开发未来的另一个重要的部分应运而生：Flux 框架和它的同类框架。在这点上，无论是 React 的虚拟 DOM，还是 Flux 框架，都不是同类中的翘楚，知晓这个很重要（比如 [virtual-dom](https://github.com/Matt-Esch/virtual-dom) 看起来很棒，React 简化的替代品，并且[近来](https://github.com/moreartyjs/moreartyjs)并不[缺少](http://fluxxor.com/)[类 Flux](https://github.com/spoike/refluxjs) [的](https://github.com/deloreanjs/delorean)[架构](https://github.com/swannodette/om)），但是出于讨论的目的，我们暂且把它们看成是所代表思想的代名词。

Flux 框架试图通过一个单向的数据流去简化复杂的单页面应用。关于这一点的[详细](http://facebook.github.io/flux/docs/overview.html)解释有[很多](https://www.youtube.com/watch?v=nYkdrAPrdcw#t=622)；这篇文章的中心思想就是在基于目前的 state ，简单重新渲染整个应用使事情变得更简单，并且在每次状态改变时也只是重新渲染。这让我们想起了服务端渲染的好日子，[回溯到上世纪九十年代](https://www.youtube.com/watch?v=nYkdrAPrdcw#t=1588)：你得到一坨数据（例如：请求参数，数据库里的数据），然后将这些传递到一个函数中（比如：模板的实现）并吐出 HTML。让事情变得简单（同样是与传统的浏览器端 DOM 操作最显著的区别）的是你不必去关心 DOM 中已经存在的 state，仅仅使用一个全新的覆盖之。传统的[字符串式](http://underscorejs.org/#template)[模板](http://mustache.github.io/)已经在浏览器端存在很多年，但是频繁的销毁和重绘 DOM 带来的花销让稍大的应用望而却步。Virtual DOM 改变了这个现状。

这就是我所描述的 web 前端短期未来的样子，而实际上，车轮已经在滚动。是否还有更大的手笔呢？

## 长期前景

Flux之流仍然属于本世代的前端架构——也就是说，所有这些前端架构都是基于相同的，已经存在很多年的浏览器技术平台。放眼未来，不管怎样，一个全新的模式正走向这个平台：Web Components。我还是把[详细](http://css-tricks.com/modular-future-web-components/)介绍[留给](https://developers.google.com/events/io/sessions/318907648)[高手](http://webcomponents.org/)们，不过新规范的主旨就是让开发者能创建自定义 DOM 元素。这些自定义元素和他们的兄弟节点相互[隔离](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)（以及父节点和子节点），并且它们封装了整个应用的一小部分。最典型的例子就是 &lt;video&gt; 元素：要想在你的主应用里加入一个自我可控的视频播放器“mini-application”（有进度调，播放按钮等）你只需要在页面上创建一个 &lt;video&gt; 元素。内部的逻辑，DOM 内容，样式和状态（最重要的！）完整地打包成一个标准的 DOM 元素。这里面大多的引用源自 [Justin Meyer](https://twitter.com/justinbmeyer)：[“构建大应用的秘籍就是永远不要一下子做成大应用。要将你的应用分割为小的模块。然后组装那些测试过的，很小的模块到你的大应用中“。](http://addyosmani.com/largescalejavascript/)Web Components 刚好帮你这样做了：把一个很大的应用拆分成很多个独立的小应用，使得复杂的应用更好管理。

互操作性是将那些迷你的应用抽象为一个标准 DOM 元素的另一个重要的结果。从前端开发的现状来看，在项目中以及跨项目时都可以重用 UI 元素是一个痛点。实现一个 JavaScript 模块与另一个框架中的模块同时工作确实很困难，更别说把连同它所需的 UI 资源（比如 CSS， icons, images）一并打包起来。Web Components（包括相关的 [HTML Imports](http://www.html5rocks.com/en/tutorials/webcomponents/imports/) 规范）提出了一个解决方案：在标准的浏览器中注入一个组件（包括它的所有依赖和资源），使用时就像在 DOM 中添加一个 &lt;div&gt; 一样简单。这种实现最核心的部分就是上面提到的分离：引入的自定义元素需要保证对于 DOM 中存在的同一个元素的影响最小。很多框架像 [Angular](https://angularjs.org/)，[Ember](http://emberjs.com/)，[Polymer](https://www.polymer-project.org/) 和 [X-Tags](http://www.x-tags.org/) 已经在这方面做了尝试，[实现](http://www.2ality.com/2013/05/web-components-angular-ember.html)（甚至已经有[实例](https://www.polymer-project.org/articles/demos/polymer-xtag-vanilla/example.html)）了更容易的互操作性。这个重要性不能被忽视：不同应用场景和技术实现的框架需要被相对容易地混合在一起使用。迈出了 web 前端领域最难以置信的的一步创新，实现了更换新的组件时不必要完全重写附属的应用，这非常地可取。

听起来很棒？我想是这样。我会说 Web Components 不可限量（彻底的改变了我未来的生活。我确信，就是这样）。遗憾的是，现在[还不行](http://caniuse.com/#search=web%20components)：尽管在这个领域中最具代表性的框架已经有了一部分 polyfill （[Polymer](https://www.polymer-project.org/)（背后是 Google）和 [X-Tags](http://www.x-tags.org/)（背后是 Mozilla）-对于部分规范有 polyfills，它代表了应用如何被构建以及浏览器如何工作这样一个根本性的转变，这在相当长的一段时间内不会是一帆风顺的。

## 哲学上的不相配

所以这些迟早会是前端发展的方向。然而，这些短期和长期的未来看上去和表面价值有些矛盾：准确的维护 DOM 组件带来的错综复杂性不正是 Flux 等尝试去让我们摆脱的么？如果有一个封装了内部 state 的“迷你应用”，我们不能按照我们的需要随时地重新渲染整个 DOM，因为这会潜在地遗漏一些重要的 state。或者，换一个角度，如果无法控制（哪怕是获取）每一个状态，如何保持整个 UI 层面状态的一致性？这种不匹配看上去非常的浅显，并且我还没有发现一个简单的方式可以统一这些概念。

不过，那也不是说没有任何的共同点。确实，Web Components 实现的互操作机制对于前端行业的前景非常重要。值得一提的是，Flux 自身[试图](http://facebook.github.io/flux/docs/overview.html#views-and-controller-views)达到存在于一个简单的、单向的数据流（这个领域的一个奇怪的 state）和拆分大的应用为小的、更加可控的子应用（包括它们内部的 state）之间的平衡。背后的原因我们都很熟悉：人类在同时处理很多复杂事物时的表现相当糟糕，所以它帮我们将问题分成了可操作的区块。同样，如果这两种未来终究没有相互排斥，我们又要何去何从，我们从中会得到什么呢？

## 顺便提一下松散连接的子域

假如你正在创建一个网上商店，忽略了选择前端架构这一点。应用的域应该会包括展示商品的类目，划分在那些类目下的商品，一个购物车，诸如此类。域所包含的信息（商品的价格，举个例子）不管出现在哪里，必须保证产品属性的一致性（例如：在一个清单，一个购物车或者一个愿望清单）。把这个域看成“迷你应用”，并且把它拆分更小的块可能根本不会减少整个系统的全局复杂性。反过来看，实际上，就像达成这个领域内的 state 在分布式系统上的一致性一样是微不足道的。

考虑一下，不管怎样，都有必要在商品的详情页的侧边添加一个聊天框。如你所知，如果你不能分辨出这个商品是否对你合适时，你可以和其他人讨论。今天在浏览器端实现一个实时的聊天应用比以前要容易得多，不过这也不是重点。Facebook 遇到了获取它们的权限的[问题](https://www.youtube.com/watch?v=nYkdrAPrdcw#t=882)，并且他们雇佣了非常聪明的工程师。但即便这样，chat-box 为工程师带来了一个在域上非常有趣的挑战，它仅仅松散地连接到主应用的域上。也就是说，而在另一端的销售代表可能对环境有一点兴趣（像当前的产品目录），chat-box 可能是一个相对独立的存在。

我同意。但这与结合 React，Flux 和 Web Components 有什么关系呢？

## 打包 Flux 到 Web Components

利用好每个范例的一种方式就是使用类 FLux 结构实现 Web Components 的内部。如果你已经能够在你的前端应用中辨认出一个松散关联的子域（聊天框为例）你可以在那个域内应用 Flux 的简洁化的能力。把它打包成一个 Web Component 得到一个自定义元素 - 称为&lt;chat-box&gt; - 这是一个黑盒，并且在项目内以及跨项目时都是可重用的。使用它就像添加一个 &lt;link rel="import" href="chat-box.html"&gt;到你的应用中一样简单，并且无论何时你丢掉任何其他的标签它都可以使用，比如，&lt;video&gt;。

&lt;chat-box&gt;元素看起来就像是普通的 DOM 元素，并且通过标准的 DOM API 暴漏了所有自定义的功能，换句话说所有类型的类库都知道如何使用它：

- 在实例化的过程中实现参数化，你可以在属性中传递：
&lt;chat-box product-category="bikes"&gt;
- 想要调用它所封装的功能，你需要在这个 DOM 元素上调用方法：documment.querySelector("chat-box").connect()
- 想要在 State 里对那些感兴趣的变化做出反应，你需要监听事件：chatBox.addEventListener("customer-rep-avaliable", highlightChatBox)

Web Components 真正的（提出的）能力已经实现了，就是当打包这样一个组件是如此的难懂以至于它根本不在乎哪个框架在[组件内](http://pixelscommander.com/polygon/reactive-elements/example/)（或者组件外！）。我们假定 [Angular 2.0 已经发布](http://www.reddit.com/r/programming/comments/2kl88s/angular_20_drastically_different/)并且你知道它使用了和 FLux 相比更加的优雅的方式解决了实时聊天的域问题。将其替换成 Angular 的实现就会像更换 &lt;chat-box&gt; 元素的 HTML Import一样简单。

## 在 Flux 中操作 Web Components

这两者也在其它方面发挥着作用。由于 Virtual DOM 的实现本质上允许你创建轻量的 DOM 元素（仅仅在需要的时候才会实现重量级的副本），没有什么原因关于为什么自定义元素不能得到同样的待遇。也就是说，如果我们的 React 组件的渲染方式就像这样：

```javascript
render: function() {
    return <div>
        Hello {this.props.name}!
        <chat-box />
    </div>;
}
```


然而没有必要去假设&lt;chat-box&gt;元素[被实现](http://facebook.github.io/react/docs/reconciliation.html)为一个 React 组件。实际上，当你创建一个虚拟的&lt;div&gt;，它将会被封装成一个真正的 DOM &lt;div&gt;，我们可以让 React 管理我们这个自定义&lt;chat-box&gt;元素的创建和销毁。再者，自定义元素是通过集成标准 DOM 库（像 React 或者 jQuery）已经所熟知的 API 使它成为了可能。


这种实现存在的问题是：如果想要变得更快，React 就需要频繁地[复用存在的 DOM 元素](http://facebook.github.io/react/docs/multiple-components.html#child-reconciliation)来实现尽可能低廉地更新 DOM。如果我们自定义的元素包含内部 state，它最终的结果可能是丢失或者毁坏。然而这个问题可能有点[边缘化](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children)，我们依旧需要小心不能丢了重要的内部 state 以及自定义元素的来去。

## 使用无状态的 Web Components

前面提到的两种结合 Virtual DOM 和 Web Components 的方式都与 state 的管理有关，准确地说：管理状态的一致性在一个复杂的前端应用中可能是一个很可怕的任务。如果我们忘了 Flux，state 管理和我们钟爱的“迷你应用”这一点，我们依旧有一个很有意思的东西需要考虑：没有任何内部 state 的 Web Components。

假设你已经创建了一个[清新的选项卡](https://www.polymer-project.org/components/paper-elements/demo.html#paper-tabs)作为一个 Web Component，它的标记看起来可能就像这样：

```html
<paper-tabs selected="0">
    <paper-tab>First tab</paper-tab>
    <paper-tab>Second tab</paper-tab>
    <paper-tab>Third tab</paper-tab>
</paper-tabs>
```

带有“selected”属性的选项卡当前可见。我们能很容易的让 React 管理这个选项卡的执行，没有必要对内部 state 心存畏惧，就像这样：

```javascript
render: function() {
    return <paper-tabs selected={this.props.selectedTab}>
        {tabContent}
    </paper-tabs>;
}
```

和前面提到的&lt;chat-box&gt;实例最大的区别就是在&lt;paper-tabs&gt;组件中任意一个状态都被不可更改的 props 严格的控制。[这是一件好事](http://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state)。它允许我们不必去关心 React 如何管理 DOM，只要最终的结果是我们想要的内容和属性。这也允许我们回到 Flux 那种简单的，单向的数据流，不过依旧享受着 Web Components 中很多有趣的属性，如隔离语义，以及通过简单的 HTML Imports 分发。

## 结语

我希望这个可以帮助认清 Flux 和 Web Components 这两个前端架构的情况，它们基本上是不同的，并且还能够以更有趣的方式进行组合。Flux 的精简的能力不能被忽视，即便是互操作性不是那么强大的 Web Components 也是如此。然而对 Web Components 支持提升到可接受的水平还要几年时间，如果我们按照明天将会发生的事调整今天的选择，我们的技术将在更加坚实的基础之上持续的发展，很可能以惊人的速度。作为一个软件工匠，我们想要使用那些最前沿的技术在浏览器上提供了不起的用户体验。当前，React 绝对是“新宠”，有一个类 Flux 的架构在它背后。它当然不会是前端架构的终极目标，并且大玩家们在 Web Components 上下了大的赌注。意识到这些短期和长期的未来间的相互作用非常重要，确保我们的作品经得起时间的考验。

原文：[Combining React, Flux & Web Components](http://futurice.com/blog/combining-react-flux-and-web-components)

---
layout:     post
title:      "指尖的流畅体验－－基于canvas建立移动界面"
subtitle:   "在智能手机和平板电脑的黎明时期， Flipboard 推出“移动先行”的体验,使我们可以重新思考页面中内容布局的原则，以及与触摸屏相关的，如何获得更好的用户体验的因素。"
date:       2015-03-04
author:     "姜天意"
header-img: "images/60fps-on-the-mobile-web/60fps-on-the-mobile-web.jpg"
tags:
    - canvas
    - Flipboard
    - React
---

> 在智能手机和平板电脑的黎明时期， Flipboard  推出“移动先行”的体验,使我们可以重新思考页面中内容布局的原则，以及与触摸屏相关的，如何获得更好的用户体验的因素。

为了建立完整的体验，我们将 Flipboard 带到 web 端。我们在 Flipboard 所做的，在每台用户使用的设备上都拥有独立的价值:整理那些来自你最关心的主题,来源以及人的最好的故事。因此把我们的服务带到web端，也是一个合乎逻辑的延伸。

当我们开始这个项目后,认识到我们需要把源自移动体验的思考搬到 web 端,试图提升 web 端的内容布局和交互。我们想达到原生应用般的精致和性能,且仍能感知到真实的浏览器。

早些时间，经过测试大量的产品原型后，我们决定使用滚动的方式作为 web 端体验。我们的移动应用被大家所熟知的是类似翻书般的体验，在触摸屏上这很直观。但一系列的原因表明，滚动在 web 端的体验更加自然。

为了[优化滚动的性能][1],我们知道我们需要保证页面渲染的频率低于16ms，同时限制回流(reflow)和重绘(repaints)。这在动画中尤其重要。为了避免动画中重新渲染，有两个属性你可以安全地作用于动画上: CSS transform 和 opacity。但这样选择余地太小了。

当你想实现元素上宽度动画效果怎么办？

![此处输入图片的描述][2]

一帧帧的滚动动画如何处理？

![此处输入图片的描述][3]

(注意,在上图中,顶部的图标从白色到黑色。这里使用了两个单独的元素相互覆盖，根据下面的内容来互相裁剪)。
　　
这些类型的动画一直在网上遭受[诟病][4],特别是在移动设备上,只因为一个简单的原因:

** DOM 太慢了。**

这不是慢，是非常之慢。如果你在动画过程中，使用任何方式接触 DOM 元素，都会破坏掉16ms每帧这一过程。

## 开始使用 < canvas >

大多数现代移动设备都拥有硬件加速的 canvas，我们为什么不利用起来呢？[HTML5 游戏][5]已经做到了。我们能真正在 canvas 上开发应用界面么？

### 立即模式与保留模式

Canvas 是一种立即模式的绘图 API,这意味着绘制时不保留所绘制对象的信息。与其相反的是保留模式,这是一种声明性的 API,维护所绘制对象的层次结构。

保留模式api的优点是，对于你的应用程序，他们通常更容易构建复杂的场景，例如 DOM。通常这都会带来性能成本,需要额外的内存来保存场景和更新场景，这可能会很慢。

Canvas 受益于立即模式,允许直接发送绘图命令到 GPU。但若用它来构建用户界面，需要进行一个更高层次的抽象。例如一些简单的处理,比如当绘制一个异步加载的资源到一个元素上时会出现问题,如在图片上绘制文本。在HTML中，由于元素存在顺序，以及 CSS 中存在 z-index，因此是很容易实现的。

## 在< canvas >元素中建立UI

相比 HTML＋CSS，canvas 则有些先天不足，缺少非常多在 HTML + CSS 中理所当然的特性。

### 文本

canvas有一个很简单的 API 用于绘制文字：**fillText(text, x, y [, maxWidth])**
这个函数接受三个参数：文字本身以及绘制起点的x,y坐标。但 canvas 只能一次绘制一行文字。如果你需要让文字换行，需要自己写函数。

### 图片

你可以使用**drawImage()**函数在 canvas 上绘制图片。这是个可变参数函数,你可以指定更多参数，从而控制定位和裁切。但是canvas不在乎图像是否加载，或不能确定只在图像加载事件后调用函数。

### 元素层叠

通过 DOM 元素的顺序或使用 CSS 的 z-index属性，在 HTML 和 CSS 指定一个元素是否在另一个上应该很容易。但请记住，canvas 是立即模式的绘图 API。当元素重叠或者其中一个需要重绘时,都必须以同一顺序重新绘制（或至少局部重绘）。

> 译者注 关于局部重绘提高性能的文章大家可以参考 http://www.cnblogs.com/rhcad/archive/2012/11/17/2774794.html

### 自定义字体

需要使用一个自定义 web 字体吗? canvas 的文本 API 并不在乎字体是否加载。你需要一种方法来知道一个字体是否加载，并绘制任何依赖此字体的区域。幸运的是,现代浏览器有一个[基于promise的API][6]。不幸的是, iOS WebKit (iOS 8 时)不支持它。

### canvas 的优点

鉴于所有这些缺点,人们开始质疑 canvas 来代替 DOM 这一选择。最终，我们的讨论由一个很简单的真理来决定：

** 你不能基于 dom 建立一个60 fps的滚动列表视图。 **

许多人(包括我们)已经尝试过,但都失败了。可滚动的元素可以在纯 HTML 和 CSS 中通过 **overflow:scroll** 实现：(结合 IOS 上的 **-webkit-overflow-scrolling:touch** ),但这些不能在滚动动画中给予你逐帧控制，同时移动浏览器很难处理又长又复杂的内容。

为了构建一个内含相当复杂的内容的无限滚动列表,我们需要在 web 端实现一个[UITableView][7]

> 译者注 UITableView 是 IOS 控件

与 DOM 相比,今天的大多数设备都有基于硬件加速的 canvas 实现，可以直接发送绘图命令到 GPU。这意味着我们可以非常快的渲染元素;在许多情况下,我们所说的是毫秒级的范围。

相比 HTML + CSS , canvas 也是一个非常“苗条”的 API ，这减少了界面上的 bug 或浏览器之间的不一致性。有一个理由更加直接，canvas 没有 [Can I Use?][8]。

## 更快的 DOM 抽象

如前所述,为了有点效果,我们需要一个更高层次的抽象，而不是简单地绘制矩形、文本和图像。我们构建了一个非常小的抽象,允许开发人员处理一个节点树,而不是处理一个严格的绘图命令序列。

### 渲染层

渲染层( RenderLayer )是基本节点,其他节点建立在其上。常见的属性如 top,left,width,height,backgroundColor 和 zIndex 在这个层展现。 RenderLayer 只不过是一个普通的 JavaScript 对象，包含这些属性和一个子元素数组。
　　
### 图像

我们使用图像层的附加属性来指定图像 URL 和信息。你不必担心图像加载事件的监听,图像层会处理后将一个信号发送到绘图引擎来表示图片需要更新。
　　
### 文本

文本层可以显示多行文本截断,这在 DOM 里处理成本非常高。文本层还支持自定义字体,也会处理当字体加载完毕后更新的动作。

### 合成

这些层可以合成起来以便构建复杂的界面。下面是一个渲染层树


    {
      frame: [0, 0, 320, 480],
      backgroundColor: '#fff',
      children: [
        {
          type: 'image',
          frame: [0, 0, 320, 200],
          imageUrl: 'http://lorempixel.com/360/420/cats/1/'
        },
        {
          type: 'text',
          frame: [10, 210, 300, 260],
          text: 'Lorem ipsum...',
          fontSize: 18,
          lineHeight: 24
        }
      ]
    }

### 无效层

当一个层需要重绘,例如一个图像加载后,它发送一个信号到绘图引擎表示其框架是脏( dirty )的。这些修改使用 **requestAnimationFrame**来批量处理，避免[布局抖动][9]，之后在下一帧画布重绘。
　　
## 达到60fps的滚动
　　
对于 web 端，也许我们最理所当然关注的，是浏览器如何来滚动网页。浏览器厂商已经[竭尽全力][10]提高滚动性能。

这其实是一个妥协。为了达到60 fps 的滚动指标，移动浏览器在执行滚动期间，停止 JavaScript 的执行，这是怕 DOM 修改导致回流。最近, IOS 和 Android 暴露了 **onScroll** 事件，他们的工作过程更像桌面浏览器了,但如果你试图在滚动时保持 DOM 元素的位置同步，具体的实现可能会有差别。

幸运的是,浏览器厂商已经意识到这个问题。特别是 Chrome 团队已经[开放][11]了为了改善手机端这种情况所做的工作。

回到 canvas ,简短的回答是你必须用 JavaScript 实现滚动。

你首先需要的是一种计算滚动程度的算法。如果你不想研究数学，Zynga 开源的[纯滚动实现][12],适合任何类似此布局的情况。

我们使用一个 canvas 元素来完成滚动。在每一个触摸事件时,根据当前的滚动程度去更新渲染树。之后，整个渲染树使用新的坐标来重新渲染。

这听起来令人难以置信的慢,在 canvas 上可以使用一个重要的优化技术--画布上绘图操作的结果可以在离屏层（off-screen）canvas 被缓存。离屏层（off-screen）之后可以用来重新绘制层。

这种技术不仅可以用于图像层,文本和图形也适用。两个成本最高的绘图操作是填充文本和图像。但是一旦这些层绘制一次以后,接下来使用离屏层重新绘制他们是非常快的。

![此处输入图片的描述][13]

在上面的演示中,每个页面的内容分为两层:图像层和文本层。文本层包含多个元素组合在一起。每一帧滚动动画中，这两层都使用位图缓存来重绘。
　　
### 对象池

在一个无限列表的滚动过程中,大量的 RenderLayers 会被建立和销毁。这会在内存中创建大量的垃圾,当进行垃圾收集时将停止主线程。

为了避免产生大量垃圾, RenderLayers 与相关对象汇集到一个池中。这意味着只有相对较少的层对象被创建。当不再需要时,它会被释放回池中,之后可以重用。
　　
### 极速快照

缓存复合层的特性可以带来另一个优势:能够将渲染的部分结构作为一个位图。你有没有建立部分 DOM 结构快照的需求?当你将这些结构渲染在 canvas 时，速度会快得令人难以置信。
　　
这个将一个项目放入一本杂志的界面，利用了这种特性来执行一个时间轴维度的平稳过渡。快照包含去掉顶部和底部的整个项目。

![此处输入图片的描述][14]

## 一个声明式的 API

现在我们已经拥有了构建一个应用程序的砖块。然而,通过命令来构建 RenderLayers 可能是乏味的。如果我们有个类似于DOM工作方式的声明式 API 不是很好么?
　　
### React

我们是 React 框架的忠实粉丝。它的单一定向的数据流和声明式API已经改变了人们构建应用程序的方式。react最引人注目的特征就是虚拟 DOM (virtual DOM)。呈现为HTML容器只是它在浏览器中的一个简单实现。最近引入的 React Native 证明了这一点。

如果我们将我们的 canvas 布局引擎与 react 组件结合起来会咋样?

### React Canvas简介

[React Canvas][17] 使React组件拥有了渲染到canvas的能力

第一个版本的 canvas 布局引擎看上去很像命令式的代码。如果你做过 JavaScript DOM 操作你可能会运行过这样的代码:

    // Create the parent layer
    var root = RenderLayer.getPooled();
    root.frame = [0, 0, 320, 480];

    // Add an image
    var image = RenderLayer.getPooled('image');
    image.frame = [0, 0, 320, 200];
    image.imageUrl = 'http://lorempixel.com/360/420/cats/1/';
    root.addChild(image);

    // Add some text
    var label = RenderLayer.getPooled('text');
    label.frame = [10, 210, 300, 260];
    label.text = 'Lorem ipsum...';
    label.fontSize = 18;
    label.lineHeight = 24;
    root.addChild(label);

当然,这样能完成效果，但是谁想这样写代码?除了容易出错,也很难想象出渲染结果

使用React Canvas则变成下面这样：

    var MyComponent = React.createClass({
      render: function () {
        return (
          <Group style={styles.group}>
            <Image style={styles.image} src='http://...' />
            <Text style={styles.text}>
              Lorem ipsum...
            </Text>
          </Group>
        );
      }
    });

    var styles = {
      group: {
        left: 0,
        top: 0,
        width: 320,
        height: 480
      },

      image: {
        left: 0,
        top: 0,
        width: 320,
        height: 200
      },

      text: {
        left: 10,
        top: 210,
        width: 300,
        height: 260,
        fontSize: 18,
        lineHeight: 24
      }
    };

您可能会注意到,一切都似乎是绝对定位实现的。确实是这样。我们的canvas渲染引擎的诞生，就伴随着驱动像素级布局，实现多行文本过长省略的使命。传统的CSS不能做到这一点,所以绝对定位的方式对我们来说很适合。然而,这种方法并不适合于所有应用程序。
　　
### css布局

Facebook 最近开源的[CSS的JavaScript实现][18]。他支持 CSS 的一些子集，包括 margin、padding,position 和最重要的 flexbox。

将 css 布局整合到 React Canvas 只是一个时间问题。看看[这个例子][19],看看我们是如何改变组件样式的。
　　
## 声明式的无限滚动

你如何在 React Canvas 中创建一个达到60 fps ,无限,分页的滚动列表？
　　
事实证明这实现起来非常容易,因为 react 会做虚拟 DOM 的 diff 。在**render()** 函数中只有当前可见的元素被返回，React负责更新滚动期间所需的虚拟 DOM 树。

    var ListView = React.createClass({
      getInitialState: function () {
        return {
          scrollTop: 0
        };
      },

      render: function () {
        var items = this.getVisibleItemIndexes().map(this.renderItem);
        return (
          <Group
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onTouchCancel={this.handleTouchEnd}>
            {items}
          </Group>
        );
      },

      renderItem: function (itemIndex) {
        // Wrap each item in a <Group> which is translated up/down based on
        // the current scroll offset.
        var translateY = (itemIndex * itemHeight) - this.state.scrollTop;
        var style = { translateY: translateY };
        return (
          <Group style={style} key={itemIndex}>
            <Item />
          </Group>
        );
      },

      getVisibleItemIndexes: function () {
        // Compute the visible item indexes based on `this.state.scrollTop`.
      }
    });

为了勾住（捕获）滚动,我们在列表视图组件中，调用[Scroller][20](滚动组件)的 **setState()** 方法。


    ...

    // Create the Scroller instance on mount.
    componentDidMount: function () {
      this.scroller = new Scroller(this.handleScroll);
    },

    // This is called by the Scroller at each scroll event.
    handleScroll: function (left, top) {
      this.setState({ scrollTop: top });
    },

    handleTouchStart: function (e) {
      this.scroller.doTouchStart(e.touches, e.timeStamp);
    },

    handleTouchMove: function (e) {
      e.preventDefault();
      this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    },

    handleTouchEnd: function (e) {
      this.scroller.doTouchEnd(e.timeStamp);
    }
    ...

尽管这是一个简化版本，但展示了 React 一些最优秀的特性。触摸事件被声明式绑定在 render()函数中。每个 touchmove 事件被转发到 Scroller 中来计算当前滚动的偏移。每个  Scroller 发出的滚动事件则用于更新状态列表视图组件,只对当前屏幕可见的元素进行渲染。所有这一切发生在16ms以下,因为 react 的[ diff 算法非常快][21]。

你可以查看这个[滚动列表][22]完整实现的源代码

## 实际应用

React Canvas 并不能完全取代 DOM。我们在我们的移动 web app 中，性能要求最关键的地方去使用，主要是滚动时间轴视图这部分。

当渲染性能不是问题的时候, Dom 可能是一个更好的方法。事实上,对某些元素输入字段和音频/视频等，这是唯一的方法

从某种意义上说, Flipboard 的移动 web 是一个混合( hybird )的应用程序。相比传统的原生应用和网络技术结合的方式, Flipboard 的内容全部是 web 内容。它的 UI 基于 dom 实现，并在适当的地方使用 canvas 渲染。

## 可访问性

这个领域需要进一步探索。使用降级内容( canvas 的 DOM 子树)应该允许 VoiceOver 这样的屏幕阅读器与内容交互。我们在测试的设备上看到了不同的结果。另外，关于[焦点的管理][23]也有标准，但目前暂时不被浏览器支持。

[Bespin][24]在2009年提出的一种方法,是元素渲染到 canvas 时，同时维护一个[平行Dom][25]，用于元素同步。我们正在继续研究实现可访问性的正确方法。

## 结论

在追求60 fps 的过程中，我们有时会采取极端措施。 Flipboard 为研究移动网络的局限性提供了一个案例。虽然这种方法可能并不适用于所有应用程序,我们将应用的交互和性能水平提升到可以与本地应用相竞争。我们希望通过开放我们在 [React Canvas][26] 中所做的工作,可以让其他引人注目的例子出现。

用手机访问[flipboard.com][27]，体验一下。或者如果你没有 Flipboard 账户,体验一下 Flipboard 上[一系列][28]的[杂志][29]。请让我们获得你的想法。

特别感谢 Charles, Eugene 和 Anh 的编辑和建议。

原文：http://engineering.flipboard.com/2015/02/mobile-web/

  [1]: http://www.html5rocks.com/en/tutorials/speed/scrolling/
  [2]: /images/60fps-on-the-mobile-web/follow_btn.gif
  [3]: /images/60fps-on-the-mobile-web/topbar.gif
  [4]: http://jankfree.org/
  [5]: http://chrome.angrybirds.com/
  [6]: http://dev.w3.org/csswg/css-font-loading/
  [7]: https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITableView_Class/index.html
  [8]: http://caniuse.com/
  [9]: http://wilsonpage.co.uk/preventing-layout-thrashing/
  [10]: http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome
  [11]: http://updates.html5rocks.com/2014/05/A-More-Compatible-Smoother-Touch
  [12]: https://github.com/zynga/scroller
  [13]: /images/60fps-on-the-mobile-web/scrolling.gif
  [14]: /images/60fps-on-the-mobile-web/flip_ui.gif
  [15]: http://facebook.github.io/react/
  [16]: https://www.youtube.com/watch?v=KVZ-P-ZI6W4
  [17]: https://github.com/flipboard/react-canvas
  [18]: https://github.com/facebook/css-layout
  [19]: https://github.com/flipboard/react-canvas/blob/master/examples/css-layout/app.js
  [20]: https://github.com/zynga/scroller
  [21]: http://calendar.perfplanet.com/2013/diff/
  [22]: https://github.com/flipboard/react-canvas/blob/master/lib/ListView.js
  [23]: http://www.w3.org/TR/2010/WD-2dcontext-20100304/#dom-context-2d-drawfocusring
  [24]: http://vimeo.com/3195079
  [25]: http://robertnyman.com/2009/04/03/mozilla-labs-online-code-editor-bespin/#comment-560310
  [26]: https://github.com/flipboard/react-canvas
  [27]: https://flipboard.com/
  [28]: https://flipboard.com/@flipboard/flipboard-picks-8a1uu7ngz
  [29]: https://flipboard.com/@flipboard/ten-for-today-k6ln1khuz

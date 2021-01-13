---
layout:     post
title:      "开启你的动画"
subtitle:   ""
date:       2015-12-04
author:     "kmokidd"
header-img: "/images/flip/window.73b49c22.jpg"
tags:
    - 动画
    - CSS3
---

原文地址：[FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)

网页上的动画应该要达到 60fps 的帧率，这个目标并不是那么容易实现，你需要运用各种技巧才能完成这个目标，今天我介绍的 **FLIP** 可以帮助到你。

最近我有幸参与到 [2015 Google I/0 的官方站点](https://events.google.com/io2015/)项目中，而且去年我也参与构建了 [Chrome Dev Summit 站点](https://developer.chrome.com/devsummit/)。在这两个项目中我们都使用了 **FLIP**。FLIP 不是一个框架也不是库。而是一种思考动画的方式，我们希望通过这个方式，在正常情况下，浏览器对动画的渲染都可以达到 60fps。

下面是我在 Chrome Dev Summit 上关于 FLIP （当时还没有给它一个正式的名字）的视频，视频中我详细解释了这个原则，你也可以通过视频了解 FLIP（观看该视频需要特别的姿势）。

<iframe width="560" height="315" src="https://www.youtube.com/embed/RCFQu0hK6bU" frameborder="0" allowfullscreen></iframe>

## 一个通用的方案

我们想要做的是开启动画（看，就是 flip，开启。天了噜，我也太会取名字了吧！），而不是一帧一帧地执行动画，计算每一帧太昂贵了，我们想要预计算动画，然后再执行它，这样效率会高。

FLIP 指的是 **F**irst（起始）、**L**ast（终止）、**I**nvert（翻转）还有 **P**lay（播放）。

现在让我们一个个来看：

+ **起始**: 元素的初始状态。
+ **结束**: 元素的结束状态。
+ **翻转**: 有趣的来了，现在你已经知道了元素要如何从初始状态转变到结束状态，比如它的宽、高或者透明度要如何变化。下一步你将 ```transform``` 和 ```opacity``` 运用到反转元素上。举个例子，如果现在元素处在初始状态向结束状态的动画过程中的向下移动的 90px，那你需要在 Y 轴平移 -90px 才能在视觉上让元素看起来还是在起始位置。但事实是，它们的真实位置其实并不在那。
+ **播放**: 在你改变了的属性上开启过渡（```transition```），然后移除反转。因为元素（们）在结束状态时的 ```opacity``` 和 ```transform``` 都会被改变（从假的初始状态到结束状态）。

Ta daaaaa!

## 使用代码如何实现？

来看看下面的代码：

```
  // 获取到元素的初始状态。
  var first = el.getBoundingClientRect();

  // 现在，让元素变到终止状态
  el.classList.add('totes-at-the-end');

  // 注意，这里是强行同步了布局，要小心使用
  var last = el.getBoundingClientRect();

  // 如果需要的话，你可以在其他需要计算的样式上应用这个方法。
  // 但要保证是在复合层上使用，比如被触发了 transform、opacity 这样的属性的元素
  var invert = first.top - last.top;

  // 翻转
  el.style.transform = 'translateY(' + invert + 'px)';

  // 下一帧渲染的时候，我们可以保证所有的属性已经发生了改变。
  requestAnimationFrame(function() {

    // 开启动画
    el.classList.add('animate-on-transforms');

    // 动画执行
    el.style.transform = '';
  });

  // 通过 'transitioned' 捕捉到结束点
  el.addEventListener('transitionend', tidyUpAnimations);
```

不过，你也可以使用最新的 [Web Animations API](http://w3c.github.io/web-animations/)，代码将会更简洁易懂一些：

```
  // Get the first position.
  // 获取初始状态。
  var first = el.getBoundingClientRect();

  // Move it to the end.
  // 改变到结束状态
  el.classList.add('totes-at-the-end');

  // Get the last position.
  // 获取结束状态
  var last = el.getBoundingClientRect();

  // Invert.
  // 翻转
  var invert = first.top - last.top;

  // Go from the inverted position to last.
  // 从翻转的位置到结束位置
  var player = el.animate([
    { transform: 'translateY(' + invert + 'px)' },
    { transform: 'translateY(0)' }
  ], {
    duration: 300,
    easing: 'cubic-bezier(0,0,0.32,1)',
  });

  // Do any tidy up at the end of the animation.
  // 在动画结束时做点整理
  player.addEventListener('finish', tidyUpAnimations);
```

不过现在如果你要使用 Web Animations API 的话，还需要结合 [polyfill](https://github.com/web-animations/web-animations-js) 使用，让自己的人生轻松一点！

如果你想要一个更“像生产环境”的 FLIP 代码，可以看看 [Chrome Dev Summit 上的代码](https://github.com/GoogleChrome/devsummit/blob/master/src/static/scripts/components/card.js#L263-296)。

## 这有什么好处？

如果你能够用动画来响应用户输入那自然是极好的。比如在 Chrome Dev Summit 的网站上，当用户点击了卡片，卡片将会展开。通常元素的起始和终止状态的尺寸是未知的。因为站点是响应式的，页面上的元素都是环绕在一块。用 FLIP 这个方法，可以显式地处理元素，在运行时元素的当前值可以被计算出来。

你之所以能做这样相对昂贵的预计算，是因为当用户与站点发生交互的时候，存在一个 100ms 的时窗，用户是不会察觉到在这 100ms 之内完成的动作的，只要在 100ms 之内，用户都会认为你的站点是很快的！只有当元素在移动的时候，你要保证帧率达到 60fps。

![](/images/flip/window.73b49c22.jpg)

我们可以利用这段时窗完成``` getBoundingClientRect ```（或者是``` getComputedStyle  ```），接着我们就能又快又好地执行动画，这么做对浏览器排版友好，也减少了 ```transform``` 和 ```opacity``` 引起的重绘（想知道为什么只有这两个？请阅读[这篇](https://aerotwist.com/blog/pixels-are-expensive/)）。

只要动画可以映射到 transform 和 opacity 上，那就完美了。如果已经这么做了，那就说明你已经准备好了；这项技术在你想要改变布局属性的时候最好用，它可以把本来很昂贵的操作映射到对性能相对友好的属性上。

有时，你需要反复思考你的动画是否能套用到这个模型上。很多时候，我都先将动画分解，然后一个个地作用到元素上，防止出现形变，并且尽可能地触发 FLIP。你可能觉得这么做太过了，但我认为并非如此：

1. **这是用户想要看到的。** Paul Kinlan 最近做了一个[调查](http://paul.kinlan.me/what-news-readers-want/)，想知道当人们使用一个新闻客户端时，他们在想些什么。**流畅**，既不是离线支持，也不是同步，更不是通知，而是**流畅**（在我看来，这就是**性能**问题）。
2. **原生应用就是这么开发的** 好吧，这么说是有点夸大还带点主观色彩，但是我确实听过原生应用的开发者抱怨过一百遍关于调整动画的事。那些“小触碰”就是区分器，当我们借助 Service Worker 让站点加载地更快之后，我们也将面临这个问题。人们将会根据操作时的感受，来判定我们的站点。

## 几点忠告

当在使用 FLIP 的时候，你要注意：

1. **不要忘了 100ms 的限制。** 千万不要超过这个时窗，不然用户会以为应用失去响应了。开发的时候，盯紧 DevTools 中的时间线。
2. **控制好动画的时间线。** 假设，当前有一个 y 轴上的动画正在执行，此时你想要执行另一个动画了，那么浏览器就会进行大量的预计算，这样就会打断正在执行的 y 轴上的动画，这样做很不好。要避免这个问题，就要保证预计算是在理想状况下进行的，或者在上文中我所说的 100ms 时窗中完成了。两个独立的动画不应该相互影响。
3. **元素可能发生形变。** 当你在使用 scale 之类的属性时，元素可能会被扭曲。我的经验就是，要调整 html 结构。不过为了 FLIP 而调整结构，这一点其实还颇有争议。

## 结束，大家开始使用 FLIP 吧！

现在我都是用 FLIP 的思维来思考动画这件事情的，我认为这是一个 JS 和 CSS 完美结合的例子。用 JS 完成计算，让 CSS 处理动画。你不再仅仅依靠 CSS 来执行动画，使用 Web Animations API 或者 JavaScript 会把事情变得简单。关键是，你减少了每一帧的复杂程度和计算成本（指的是 ```transform``` 和 ```opacity``` 的计算），用户体验更好了。

关于 FLIP 的话题，还有对性能的探讨，我还有很多想说，不过还是留到下篇博文见了！

所以，快开启你们的 FLIP 之路吧。

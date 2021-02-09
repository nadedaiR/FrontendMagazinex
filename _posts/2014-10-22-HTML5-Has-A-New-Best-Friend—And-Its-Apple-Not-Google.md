---
layout:     post
title:      "HTML5 最好的新朋友，是 Apple 不是 Google"
subtitle:   ""
date:       2014-10-22
author:     "寸志"
header-img: "http://7xrvqo.com1.z0.glb.clouddn.com/images/HTML5-Has-A-New-Best-Friend—And-Its-Apple-Not-Google.b1307bde.jpg"
tags:
    - HTML5
    - Apple
    - Google
    - Adobe
    - iOS
---

Google 本应该是 HTML5 开发的领头羊，[但并非如此](http://readwrite.com/2014/03/10/google-html5-strategy)。获此殊荣的应当是 Apple，一个比起其他任何公司做得都多，鼓吹原生应用优点的公司。

Apple 一直都不被看做开源或开放标准的带头人，但 iOS 8 为其正了名。除了大量的面向用户方面的性能和用户体验的提升，Apple 同时也显著地提升了应用开发者的开发体验，其中就包括 WKWebView，一个新的浏览器引擎，承诺让 hybrid 应用在 iOS 8上蓬勃发展！

讽刺的是，Adobe 可能是最大受益者，虽然 Apple 一度都反对 Flash。

# 目前的构建方式

回望过去，无论是在 iOS 还是 Android上，性能上的要求一直在把移动开发者推向原生应用。HTML5 仅仅是大家的二手准备。从 [VisionMobile illustrates](http://www.visionmobile.com/product/developer-economics-q1-2014-state-developer-nation/) 的季度开发者生态报告就能看出来：

![Developer Economics quarterly report](http://a1.files.readwrite.com/image/upload/c_fit,dpr_1.0,q_80,w_620/MTI0OTU2MDIxNTk5ODE1Njkw.jpg)

但是在移动开发领域确实在发生这一些变化。尽管原生应用还是宠儿，但当开发者需要跨平台重用代码或者在自己的应用中内嵌 Web 代码时，HTML5 就进入到他们工具箱中显眼的位置。如 Masa Tanaka [所说](http://sdtimes.com/guest-view-hybrid-app-developers-love-new-ios-8/)，在应用中内嵌 Web 代码“对于大部分应用来说都是一个核心的功能”，Masa Tanaka 来自Tokyo，是 PhoneGap 开发平台的 CEO 和创始人。

如 [VisionMobile 另一个调研所示](http://www.visionmobile.com/product/developer-economics-q3-2013-state-of-the-developer-nation/)，有很大一部分应用通常是原生代码和 HTML5 的合体：

![not ture native](http://a5.files.readwrite.com/image/upload/c_fit,dpr_1.0,q_80,w_620/MTI0OTU1OTMzMjg0NTUwNjY2.jpg)

尽管 HTML5 已经设法制造出了一个与原生代码并存的空间，但随着 iOS 8 的发布，Apple 给 HTML5 了一张头等舱的票。

# Apple 让 HTML5 歌唱

有些人已经察觉到了 iOS 8 提升了对 HTML5 的支持，但是没有人更加深入地从特性和性能去看，除了 [Sencha 的 Ross Gerbasi](http://www.sencha.com/blog/apple-shows-love-for-html5-with-ios-8)。在众多的提升中，Gerbasi 展示了其中几个最重要的：

![caniuse.com](http://a2.files.readwrite.com/image/upload/c_fit,w_620/MTI0OTU2NTczNTAzMTAxNDA2.png)

*来源：caniuse.com via Sencha*

作为 UIWebView 的替代，WKWebView 包含 Nitro JavaScript 引擎，Gerbasi 表示“经过测试计算，它至少性能是 UIWebView 的四倍。”，毫无疑问，“这对于 hybrid 应用来说是一个巨大的胜利。”

这并没什么奇怪的，“原生为首”的 Apple 如此努力工作提升 HTML5 的体验。如上面提到的，开发者希望可以把 Web 嵌入到应用中，而 Apple 则是希望开发者有完美的 iOS 体验。因此，任何让自己设备提升的事情，Apple 都支持。

# Adobe 拥抱 Jobs 的洞察力

尤其是当对 Flash 不利时。支持 HTML5 ，就是 Apple 对 Steve Jobs 期望的实践——埋葬 Flash，使用 HTML5 替代之。在他的 “[Thoughts on Flash](https://www.apple.com/hotnews/thoughts-on-flash/)”中，Jobs 嘲笑 Flash 的专断并鼓吹 HTML5 的开放：

> 在移动领域，出现了很多新的开放标准，比如 HTML5，最终会在移动领域上胜出（PC 也是如此）。Adobe 也许应该把注意力放在为将来打造最好的 HTML5 工具上，而在苹果放弃过时东西的问题上少加批评。

自然，Adobe 照办了，而且，非常热情地拥抱 HTML5。2011 年末，[Adobe 收购了 Nitobi](http://www.adobe.com/aboutadobe/pressroom/pressreleases/201110/AdobeAcquiresNitobi.html)，著名框架 PhoneGap 的开发者，PhoneGap 是一个流行的 HTML5 和 JavaScript 应用的开发平台。收购以后，Adobe 一直都在投入 PhoneGap。

但是，可以证明，Apple 能够对 PhoneGap 做的比起 Adobe 更加多。通常，iOS 8 对 HTML5 越有利，也就是对 PhoneGap 越有利。[Scirra 上](https://www.scirra.com/blog/150/html5-game-performance-on-ios-8)的细节：

![iPad 2](http://a4.files.readwrite.com/image/upload/c_fit,w_620/MTI0OTU2NDQxOTY5NzM5Nzg2.png)

虽然这张图表显示了在 iOS 8 上 PhoneGap 的性能有明显的提高，但并没有显示下一个版本发布（如它[所写](http://shazronatadobe.wordpress.com/2014/09/18/cordova-ios-and-ios-8/)，Adobe 一直在尝试，但是目前还存在一个 bug 而不能使用 WKWebView），PhoneGap 适配 WKWebView 之后其还能提升多少。一旦成功适配 WKWebView，PhoneGap 将“填补这个性能的间隙，达到 Safari 一样的水平。”

所有这一切都将有益于 Apple，因为这意味着开发者将更多的方式来开发好的 iOS 8 应用。这对 Adobe 来说也是好事，PhoneGap 获得了不成比例的好处。

原文：[http://readwrite.com/2014/10/02/html5-apple-ios-8-wkwebview](http://readwrite.com/2014/10/02/html5-apple-ios-8-wkwebview)

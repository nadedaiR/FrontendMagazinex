---
layout:     post
title:      "图解 Flux"
subtitle:   "在如今的 Web 开发领域，Flux 最流行也最容易被大家所误解的技术之一。本教程打算以一种大家都能理解方式图解 Flux。"
date:       2015-10-11
author:     "寸志"
header-img: "/images/A-cartoon-guide-to-Flux/1-rNyINoYDbC53QNgHuTwriA.png"
tags:
    - Flux
    - React
---

在如今的 Web 开发领域，Flux 最流行也最容易被大家所误解的技术之一。本教程打算以一种大家都能理解方式图解 Flux。

## 问题

首先我必须先解释一下 Flux 到底解决什么问题。Flux 是一种应用处理的数据的模式。虽然 Flux 和 React 一同在 Facebook 成长起来的，很多人把它们合到一起来理解，但你可以单独使用它们。它们是被设计来解决一些 Facebook 碰到的一系列问题的。

一个众所周知的例子就是关于通知的 Bug。当你登录 Facebook 后，可能会看到在消息 icon 上有一个通知。当你点击消息 icon，却发现并没有新的消息，然后通知不见了。几分钟之后，你在网页上做了一些交互，通知又回来了，你再一次点击消息 icon……但并没有新消息。然后就进入周而复始的循环。

![](/images/A-cartoon-guide-to-Flux/1-EfeNEshl8-uwZSuUw275Ag.png)

这种循环不仅仅影响了网站的用户，还包含 Facebook 的开发团队。他们修复这个问题，一段时间内是 OK 的，但这个 Bug 过段时间又会出现。周而复始，一下被解决了，一下又有问题。

![](/images/A-cartoon-guide-to-Flux/1-4xc1FzIHWiyAvb1iAQKSqQ.png)

因此 Facebook 试图寻找解决方案来跳出这个怪圈，而不是一次次地修复它。他们希望可以打造一个确定的系统，以此确保这个问题不会反复出现。

## 深层问题

Facebook 的工程师发现，更深层次的问题来自应用的数据传递问题。

注意：我是从他们简化版的分享中了推测出来的。我确定真实的架构可能是不一样的。

![Model 传递数据给 View 层](/images/A-cartoon-guide-to-Flux/1-OcTeAqv8AU_z-O2HuucmeA.png)

他们用 Model 保存数据，并把数据传递一个 View 层，把这些数据渲染出来。

由于用户通过 View 层来交互，View 有时需要根据用户的数据更新 Model。还有时 Model 需要更新其他的 Model。

在这种情况下，有时候有些操作会触发一连串的变化。我把这想象成一种激动人心的乒乓游戏——很难判断球的落点在哪里（或者是跑到了屏幕之外。）

还有一个这样的事实，有些变化可能是异步的。一个变化会引起多个其他的变化。我想象下就像在乒乓游戏了直接撒了一袋子乒乓球，它们散落在各个地方，并互相穿梭。

总而言之，这使得数据流变得很难调试。

## 解决方案：单向数据流

因此 Facebook 决定尝试另外一种架构，即单向数据流——就一个方向——当你需要插入新的数据，流完全重新开始。他们把这种架构称为 Flux。

![The diagram you’ll find in Facebook’s Flux docs. It is way cooler than it looks.](/images/A-cartoon-guide-to-Flux/1-lZM0yU9ExEMd7DggVxXkxA.png)

在 Facebook 的 Flux 文档中也可以找到这张图，本身要比看起来更酷，真的，非常酷……但光看上面这张图可能无法完全明白。

一旦你理解了 Flux，这张图看起来就比较清晰了。可问题是，你刚看到文档，对 Flux 完全是陌生的，我就不信这张图有助于你对它的立即……但这确实是图需要做的事情。它应该给你一个大的概念，在深入进去搞清楚各个细节之前。

帮助我更好理解 Flux 的并不是像这样的一张图，而是把这个系统想象成多个不同的角色一起协作实现一个共同的目标。因此我想给大家介绍一下我大脑中的演职表。

## 演职表

在我解释这些角色间如何交互前，先逐个介绍下它们。

### Action Creator

第一个角色是 Action Creator。它负责创建 Aaction，作为全部改变和交互的入口。当需要改变应用的状态或有 View 需要更新时，你需要触发一个 Action。

![Action Creator 就像一个电报员，它帮助你制作消息。](/images/A-cartoon-guide-to-Flux/1-DATbW4s4Ls6UPieavtdB7w.png)

我认为 Action Creator 就像电报员。你拿着你想要寄出的消息，找到 Action Creator，它就把消息格式化成系统其他部分可以理解的形式。

Action Creator 把 type 和 payload（载荷）封装成一个 Action。type 是你预定义的多个 type （通常是一个常量列表）之一，代表系统特定的 action。举个例子的话就像 `MESSAGE_CREATE` 和 `MESSAGE_READ` 这样的。

系统的某个部分知道所有可能的 action，这或许存在副作用。一个新来的工程师，打开 Action Creator 文件，看到全部的 API——所有可能改变的状态——它们都是你的系统提供的。

一旦 action 消息创建好了，Action Creator 就会把它传递给 Dispatcher。

### Dispatcher

Dispatcher 就是一个巨大的回调函数登记表。就好比一个坐在电话总机前的接线员。它保存着所有需要发送 action 的 store 列表。当 Action Creator 给过来一个 action，它会把这个 action 传递给各个 store。

![The dispatcher is like a switchboard operator. It knows all the callbacks for the different stores.](/images/A-cartoon-guide-to-Flux/1-R5XHVGZfkPkmL7BcN5jMqg.png)

Dispatcher  的行为是同步的，这对我之前讲的多个乒乓球游戏有所帮助。如果想要在 store 之间实现依赖，有的更新完了其他的才能更新，你可以使用 Dispatcher 提供的 `waitFor()` 来实现。

Flux 的 Dispatcher 不同于其他大部分架构中的 dispatcher。它会把 action 传递给所有登记在册的 store，而不在 action 的类型。也就是说 store 并不是订阅某些 action，而是聆听每一个 action，从中过滤它关心的。

### Store

轮到说 store 了。store 保存了整个程序的状态，而且状态变化的逻辑都在 store 里。

![store 是一个充满控制欲的长官，所有的变化都必须进过它](/images/A-cartoon-guide-to-Flux/1-17MbK8jz94ynP-NFfL0rfw.png)

我觉得 store 就是一个充满控制欲的长官。所有所有的状态变化都必须由它来亲自操作的。而且你不能直接通过 store 来更改状态。在 store 上并没有 setter API。要更新一次状态，你必须经过正当的手续——必须通过 Action Creator/Dispatcher 通道。

上面说了，如果 store 在 dispatcher 中注册了，那所有的 action 都会发给它。在 store 中，通常会使用一个 switch 语句来判断 action 的类型，决定是否最这个 action 做出相应。如果 store 关心这个 action，就会根据 action 找出需要变化的部分，更新 state。

只要 store 对 state 做出了变更，就会出发 change 事件，通知视图控制器状态已经变化了。

### Controller View 和 View

View 层负责将 state 渲染给用户，并接受用户的输入。

![Controller View 是一个中间管理者，从 store 中获得通知，并把数据传递给它所负责的 View，View 将数据渲染给用户。](/images/A-cartoon-guide-to-Flux/1-MY5xNk_JeKvGsGdywYD4EA.png)

View 就像一个主持。它对应用一无所知，只懂该如何把交到它们手中的数据渲染格式化成用户能够理解的输出（HTML）。

Controller View 是一个中间管理者。store 在 state 变化时通知它，它收集新的状态，并将更新后的状态传递给所有大管辖的 View。

## 它们如何在一起工作？

接下来看看这些角色是如何在一起工作的。

### 开始

首先在应用启动时：启动只有一次。

1. Store 告知 Dispatcher 只要有 action 产生就通知它。

![](/images/A-cartoon-guide-to-Flux/1-WTufEd_jfuGyMGCeg85GuA.png)

2. Controller View 从 Store 中获取最新的 state。

3. 当 Controller View 接到来自 store 的 state，就将其传递给它所管辖的子 View 去渲染。

![](/images/A-cartoon-guide-to-Flux/1-h2tP5ojNDPy5YyXrA19N4A.png)

4. Controller View 同时让 store 在 state 变化的时候通知自己。

![](/images/A-cartoon-guide-to-Flux/1-I3zHW9FAIZwnr1yCXMGBHA.png)

### 数据流

应用启动后，就准备好接受用户的输入了。现在我们让用户做一些操作，触发一个 action。

用户交互我们就产生一次数据流。

![](/images/A-cartoon-guide-to-Flux/1-SusQ7Aip2fSWg6raQtPSnA.png)

1. View 告知 Action Creator 准备一个 action。

  ![](/images/A-cartoon-guide-to-Flux/1-dkm9qsWuD9DtXzH-u-DjJQ.png)

2. Action Creator 做好 action 并将其发送给 Dispatcher。

  ![](/images/A-cartoon-guide-to-Flux/1-fJwvtpq0XQhB4mUZwh7YOQ.png)

3. Dispatcher 按照顺序将 action 传递给 store。每一个 store 都会受到所有的 action 通知，然后自行觉得是否对这个 action 做出响应，更新 state。

  ![](/images/A-cartoon-guide-to-Flux/1-RLrImTDeArSMoA4kZsajLQ.png)

4. 一旦 store 更新 state 完毕，就会告知订阅了该 store 的 controller view。

5. 这些 controller view 就会向 store 请求更新了的 state。

![](/images/A-cartoon-guide-to-Flux/1-5SXO2eftdQveFqImGDVB9A.png)

6. 从 store 中获得 state 之后，view controller 将会让它所管辖的子 view 渲染新的 state。

![](/images/A-cartoon-guide-to-Flux/1-fWBaUg9-_1-V5M2YQBWhWg.png)

好了，这些就是我对 Flux 的理解，希望能够帮助到你！

## 资源

- [Flux documentation](https://facebook.github.io/flux/docs/overview.html)
- [Fluxxor documentation](http://fluxxor.com/what-is-flux.html)
- [The Case for Flux](https://medium.com/@dan_abramov/the-case-for-flux-379b7d1982c6)

原文：[https://medium.com/code-cartoons/a-cartoon-guide-to-flux-6157355ab207](https://medium.com/code-cartoons/a-cartoon-guide-to-flux-6157355ab207)

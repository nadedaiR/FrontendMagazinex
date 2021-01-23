# An introduction to the Web Bluetooth API

# Web Bluetooth API 初探

> 译者注：翻译为 “Web 蓝牙 API” 看着都不顺，所以选择不翻译了。原文链接是:[An introduction to the Web Bluetooth API](https://dev.opera.com/articles/web-bluetooth-intro/)

## Introduction

## 概览

There is an explosion of electronic devices nowadays, and with many of them, it’s possible to interact with them via [Bluetooth Low Energy](https://en.wikipedia.org/wiki/Bluetooth_low_energy), or BLE. However, installing a separate app for interacting with every single bluetooth gadget is impractical. What if we could communicate with them through a web browser? The Web Bluetooth API aims to do exactly that with a promise-based API, which allows you to interact with many BLE enabled devices. This is also great for companies intending to launch new gadgets, as instead of spending time and money on developing a separate app for multiple platforms, they can offer interaction with their gadget in a cross-platform manner, as it could be controlled directly from a web page.



借助[低功耗的蓝牙（或称之为 BLE）](https://en.wikipedia.org/wiki/Bluetooth_low_energy)，我们能在电子设备上玩出各种各样的花样。不过……为了能和各种不同的硬件设备交互，难道我们就要在手机上安装各个设备对应的 app 吗？如果……我们可以用浏览器统一管理所有的硬件设备，那世界得多美好啊。Web Bluetooth API（Web 蓝牙 API 太奇怪了，还是用全英文吧）在努力实现这个目标，这是一个基于 promise 规范的API。这个 API 的推动不仅是造福用户，还节省了开发者/发行商的成本 -- 不需要为新的硬件产品开发至少一个独立的 app 来控制，统一用**还能跨平台**的网页端就行了。

[demo 视频](https://dev.opera.com/articles/web-bluetooth-intro/video.mp4)



## The Web Bluetooth API

So far, the ability to communicate with BLE devices has been possible only for native apps. The Web Bluetooth API aims to change that and brings this to web browsers as well. The [specification for the Web Bluetooth API](https://webbluetoothcg.github.io/web-bluetooth/) is not final yet, and you’re free to [share your feedback](https://github.com/WebBluetoothCG/web-bluetooth/issues) on what you would want in it as well.

到目前为止，要在移动设备上做 BLE 方面的交互都要通过原声 app。Web Bluetooth API 要改变这样的现状。现在 [Web Bluetooth API](https://webbluetoothcg.github.io/web-bluetooth/) 尚未定稿，在使用过程中遇到任何问题，请[不要客气地吐槽](https://github.com/WebBluetoothCG/web-bluetooth/issues)吧。



Right now, the Web Bluetooth API is in [Opera for Android beta](https://play.google.com/store/apps/details?id=com.opera.browser.beta). You can activate it by going to `opera://flags` and enabling Web Bluetooth in the options provided on that page.

你可以下一个 [Opera for Android beta 版](https://play.google.com/store/apps/details?id=com.opera.browser.beta) 体验 Web Bluetooth API：在 ```opera://flags``` 设置中开启 'Web Bluetooth'。
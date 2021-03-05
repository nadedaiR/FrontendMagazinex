---
layout:     post
title:      "Web Bluetooth API 初探"
subtitle:   ""
date:       2016-03-18
author:     "kmokidd"
header-img: "/images/web-bluetooth-api.jpg"
tags:
  - JavaScript
  - 前端开发
---

## 概览

借助 [BLE（低功耗蓝牙）](https://en.wikipedia.org/wiki/Bluetooth_low_energy)，我们能在电子设备上玩出各种各样的花样。不过为了能和各种不同的硬件设备交互，难道我们就要在手机上安装各个设备对应的 app 吗？如果我们可以用浏览器统一管理所有的硬件设备，那世界得多美好啊。Web Bluetooth API 正在努力实现这个目标，这是一个基于 promise 规范的API。这个 API 的出现不仅是造福用户（的手机空间），还节省了开发者/发行商的成本 -- 不需要为新的硬件产品开发至少一个独立的 app 来控制，统一用**还能跨平台**的网页端就行了。

[demo 视频](https://dev.opera.com/articles/web-bluetooth-intro/video.mp4)

## Web Bluetooth API

到目前为止，要在移动设备上做 BLE 方面的交互都要通过原生 app。Web Bluetooth API 想要改变这样的现状。现在 [Web Bluetooth API](https://webbluetoothcg.github.io/web-bluetooth/) 尚未定稿，在使用过程中遇到任何问题，请[不要客气地吐槽](https://github.com/WebBluetoothCG/web-bluetooth/issues)吧。

你可以下一个 [Opera for Android beta 版](https://play.google.com/store/apps/details?id=com.opera.browser.beta) 体验 Web Bluetooth API：在 ```opera://flags``` 设置中开启 'Web Bluetooth'。

### 首先你要知道：

+ **仅限HTTPS**：Web Bluetooth API 只支持基于 https 的页面。现在大部分信息敏感的 web API 都必须基于 HTTPS 的服务，蓝牙传输有这个要求也不奇怪。
+ **通过用户操作触发**：需要确保这个 API 不会在用户未知的情况下偷偷再后台运行，所以会有一个提示，询问用户要通过蓝牙连接哪一个设备。不过我们也不希望用户什么都没有做，站点就直接弹出一个提示吓到用户。于是，就像 ```click``` 一样，只有当用户作出了操作，这个方法才会被调用。


### 获取设备基本信息

接下来就是代码环节，你很快会知道如何获取到一台 BLE 设备的基本信息。

下面这段代码……就是一个按钮：

``` html
<button id="the-button">Try it</button>
```

当然还有对应的 JS 代码：

``` javascript
const button = document.querySelector('#the-button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({
		filters: [{
			services: ['battery_service']
		}]
	}).then(device => {
		console.log('Got device:', device.name);
		console.log('id:', device.id);
	});
});
```

```navigator.bluetooth.requestDevice()``` 就是上文说到的“用户没有召唤，就不能随随便便出现”的方法。也就是说，按照例子中的代码逻辑，只有当用户点击了按钮，这个方法才会被调用。它将会呼出一个对话窗（dialog box），窗口中会显示符合**筛选条件**的 BLE 设备列表。像上面例子里的筛选条件就是“GATT 服务是 ‘battery_service’ 的 BLE 设备”。（不要惊慌，下一节我们会讲到“GATT 服务”的）

这边要注意的一点是，要想使用 Web Bluetooth API，那**必须至少要设定一个筛选条件**。

当用户选择成功连接上某一台设备之后，设备名和 ID 会被打印到控制台上。

### 什么是 GATT 服务？

GATT 全称是 [Generic Attribute Profile](https://developer.bluetooth.org/TechnologyOverview/Pages/GATT.aspx)（通用属性配置文件），这份文件制定了一个蓝牙设备所能提供的服务，广而告之天下的标准。手机的电池情况就是通过 GATT 来确认的，同理，你的运动手环也在使用相同的服务来评估电池情况还有计算你的心率。GATT 提供了[很多服务](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx)，我们可以根据服务所暴露出的设备对象，来坚挺服务。

一些设备可能不会把它们的服务罗列在 GATT 的标准服务中，这种情况下，你需要使用设备完整的蓝牙 UUID，也就是一串 16 bits 或者 32 bits 长度的 ID（如下文）。当然，如果设备文档中压根没有提到标准之外的服务，也谈不上使用什么 UUID 了。

``` javascript
navigator.bluetooth.requestDevice({
	filters: [{
		services: ['0009180d-0000-1000-8000-00705f9b34fb']
	}]
});
```

### GATT 服务的读写

一旦我们连接上了设备，那自然而然，下一步就是从设备中读取点数据出来。要实现这个，需要用 ```gatt.connect()``` 方法连接上设备的 GATT 服务器。就让我们接着上面的例子往下写一个[电量demo](https://googlechrome.github.io/samples/web-bluetooth/battery-level.html)，不过请注意，demo 中使用到的 ```connectGATT()``` 方法在 Chromium 50 及以上版本已经弃用了。

``` javascript
navigator.bluetooth.requestDevice({
	filters: [{
		services: ['battery_service']
	}]
}).then(device => {
	console.log('Got device:', device.name);
	console.log('id:', device.id);
    // Chromium 49 及以下版本请使用 connectGATT()
    // Chromium 50 之后版本请使用 gatt.connect()
	return device.gatt.connect();
})
.then(server => {
	console.log('Getting Battery Service…');
	return server.getPrimaryService('battery_service');
})
.then(service => {
	console.log('Getting Battery Characteristic…');
	return service.getCharacteristic('battery_level');
})
.then(characteristic => {
	console.log('Reading battery level…');
	return characteristic.readValue();
})
.then(value => {
	value = value.buffer ? value : new DataView(value);
	console.log('Battery percentage:', value.getUint8(0));
})
.catch(exception => {
	console.log(exception);
});
```

到目前为止，我们都是按照[标准的 GATT 电量 ```characteristic``` 属性](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml)来写代码的。用这种写法，返回值是一个  [`DataView`](https://docs.webplatform.org/wiki/javascript/DataView) 对象，要解析这个对象才能得到最后的值。

需要以 ```BufferSource``` 的形态写入值，可以是 ```ArrayBuffer``` 也可以是 ```ArrayBuffer``` 的视图 (view)，比如一个  `DataView`  对象。具体的 buffer source 类型可以查看[这张清单](https://heycam.github.io/webidl/#idl-buffer-source-types)。再举一个例子，如果想要重置一台心率仪的 ```enerygyExpended``` 字段，我们可以使用 [`writeValue()`](https://webbluetoothcg.github.io/web-bluetooth/#dom-bluetoothremotegattcharacteristic-writevalue) 方法：

``` javascript
navigator.bluetooth.requestDevice({
	filters: [{
		services: ['heart_rate']
	}]
}).then(device => {
	console.log('Got device:', device.name);
	console.log('id:', device.id);
	return device.gatt.connect();
})
.then(server => server.getPrimaryService('heart_rate'))
.then(service => service.getCharacteristic('heart_rate_control_point'))
.then(characteristic => {
	const resetEnergyExpended = new Uint8Array([1]);
	// resetEnergyExpended 的值是'1'，表示重置
	return characteristic.writeValue(resetEnergyExpended);
})
.then(value => {
	console.log('Reset value of energy expended field');
})
.catch(exception => {
	console.log(exception);
});
```

介绍到现在，知道你一定手痒了，就算手上没有支持 GATT 服务的设备，也可以试试[这个安卓 app](https://github.com/WebBluetoothCG/ble-test-peripheral-android)，它提供了各种新奇的 Web Bluetooth API 供用户测试。

### 高级魔法

不同的设备会有不同的服务，通常会有文档帮助开发者使用这些服务。比如 Sphero 出品的 BB-8 就有一些[特别的服务](https://github.com/orbotix/DeveloperResources/blob/master/docs/Sphero_API_1.50.pdf)。

这样，我们就能开发一个 [web app](https://operasoftware.github.io/bb8/) 控制 BB-8 了！具体代码请访问[这个链接](https://github.com/operasoftware/bb8)。

开发者们写出了各种应用，比如 [control drones](https://github.com/poshaughnessy/web-bluetooth-parrot-drone)、[heart-rate sensors](https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor)……

### 下一步？

Chrominum 中的 Web Bluetooth API 还在持续更新中，若想要知道最新进展，请关注这个 [issues 列表](https://github.com/WebBluetoothCG/web-bluetooth/issues)。目前看来，利用这个 API 能做到的最靠谱的事，就是搜索周边的 [BLE 设备广播](https://github.com/WebBluetoothCG/web-bluetooth/issues/191)。

更进一步的话，获取到 RSSI （接收信号强度指示器）当前的状态、功率值，不需要单点连接设备，借助 [Eddystone protocol](https://en.wikipedia.org/wiki/Eddystone_%28Google%29) 共享资源等等功能的实现都是指日可待的。

你可以[在这里](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md)查看 Web Bluetooth API 在各个平台上的进展以及硬件兼容情况。如果你使用的是 Android，我们推荐使用最新的 Android 稳定版本。

### 扩展阅读

- [The Web Bluetooth Specification](https://webbluetoothcg.github.io/web-bluetooth)
- [A collection of Web Bluetooth API Demos](https://github.com/WebBluetoothCG/demos)
- [Opera’s BB-8 Demo](https://github.com/operasoftware/bb8)
- [BLE Peripheral Simulator App](https://github.com/WebBluetoothCG/ble-test-peripheral-android)



原文链接: [An introduction to the Web Bluetooth API](https://dev.opera.com/articles/web-bluetooth-intro/)














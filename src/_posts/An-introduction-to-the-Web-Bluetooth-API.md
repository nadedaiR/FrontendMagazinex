# An introduction to the Web Bluetooth API

# Web Bluetooth API 初探

> 译者注：翻译为 “Web 蓝牙 API” 看着都不顺，所以选择不翻译了。原文链接是: [An introduction to the Web Bluetooth API](https://dev.opera.com/articles/web-bluetooth-intro/)

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

### Some prerequisites

### 首先你要知道：

+ **HTTPS only**: The API only works on pages served over HTTPS. Most privacy-sensitive web APIs are now switching over to the HTTPS-only model, and this one is no exception.
+ **仅限HTTPS**：Web Bluetooth API 只支持基于 https 的页面。现在大部分信息敏感的 web API 都必须基于 HTTPS 的服务，蓝牙传输有这个要求也不奇怪。
+ **Requires user action**: We want to make sure that the API doesn’t work in the background without the user knowing about it, which is why there is a prompt shown to user to choose which device to pair with. Additionally, we also don’t want sites to show up this prompt straightaway without any user interaction. That is why methods in this API only work when called in response to a user action (like responding to a`click` event).
+ **通过用户操作触发**：需要确保这个 API 不会在用户未知的情况下偷偷再后台运行，所以会有一个提示，询问用户要通过蓝牙连接哪一个设备。不过我们也不希望用户什么都没有做，站点就直接弹出一个提示吓到用户。于是，就像 ```click``` 一样，只有当用户作出了操作，这个方法才会被调用。



### Getting Basic Device Information

### 获取设备基本信息

Let’s take a look at some code to figure out how to use this API to get some basic information regarding a BLE device.

接下来就是代码环节，你很快会知道如何获取到一台 BLE 设备的基本信息。

Here is a very simple example, showing a button:

下面这段代码……就是一个按钮：

``` html
<button id="the-button">Try it</button>
```

…and the following JavaScript:

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

As mentioned earlier, the method `navigator.bluetooth.requestDevice()` can only be called in response to a user action like a button click. This method calls up a dialog box showing the list of available BLE devices matching the query filter. In our case, the filter we have set pertains to BLE devices which expose a so-called “GATT service” called `battery_service`. We’ll find out more about GATT services in the next section.

```navigator.bluetooth.requestDevice()``` 就是上文说到的“用户没有召唤，就不能随随便便出现”的方法。也就是说，按照例子中的代码逻辑，只有当用户点击了按钮，这个方法才会被调用。它将会呼出一个对话窗（dialog box），窗口中会显示符合**筛选条件**的 BLE 设备列表。像上面例子里的筛选条件就是“GATT 服务是‘battery_service’的 BLE 设备”。（不要惊慌，下一节我们会讲到“GATT 服务”的）

Keep in mind that it is necessary to include at least one filter when requesting device access using the Web Bluetooth API.

这边要注意的一点是，要想使用 Web Bluetooth API，那**必须至少要设定一个筛选条件**。

Once the user selects the device and connects to it, it can then print out the device name and its ID.

当用户选择成功连接上某一台设备之后，控制台中会打印出设备名和 ID。

### What are GATT services?

### 什么是 GATT 服务？

GATT stands for [Generic Attribute Profile](https://developer.bluetooth.org/TechnologyOverview/Pages/GATT.aspx) and provides a standard way for Bluetooth devices to advertise their services to the outside world. Your cell phone might provide a GATT service to show the current battery level. Your fitness band might provide a service that too, along with another one showing the current heart rate count. There are a [number of services which are exposed through GATT](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx), and we can listen to those services depending on which of those services are exposed by the device.

GATT 全称是 [Generic Attribute Profile](https://developer.bluetooth.org/TechnologyOverview/Pages/GATT.aspx)（通用属性配置文件），这份文件制定了一个蓝牙设备所能提供的服务，广而告之天下的标准。手机的电池情况就是通过 GATT 来确认的，同理，你的运动手环也在使用相同的服务来评估电池情况还有计算你的心率。GATT 提供了[很多服务](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx)，我们可以根据服务所暴露出的设备对象，来坚挺服务。

Some devices may not list their services in the standardized list of GATT services, in which case you could use their full Bluetooth UUID or a short 16- or 32-bit ID instead. Of course, this depends on whether the device has any documentation mentioning these UUIDs and what they are for.

一些设备可能不会把它们的服务罗列在 GATT 的标准服务中，这种情况下，你需要使用设备完整的蓝牙 UUID，也就是一串 16 bits 或者 32 bits 长度的 ID（如下文）。当然，如果设备文档中压根没有提到标准之外的服务，也谈不上使用什么 UUID 了。

``` javascript
navigator.bluetooth.requestDevice({
	filters: [{
		services: ['0009180d-0000-1000-8000-00705f9b34fb']
	}]
});
```



### Reading and writing GATT services

### GATT 服务的读写

Once we have connected to a device, the next step is of course, to read some useful data from it. To do that, we need to connect to the device’s GATT server by using the method `gatt.connect()`. Let’s take our previous code sample and extend it. This is based on the [Battery Level Sample Code](https://googlechrome.github.io/samples/web-bluetooth/battery-level.html) demo, which you can also check out (Note however that it uses the `connectGATT()` method which is deprecated from Chromium 50 onwards).

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



Here we are reading the [standardized battery level GATT characteristic](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml). Keep in mind that the value in the end is given as a [`DataView`](https://docs.webplatform.org/wiki/javascript/DataView)object which then needs to be parsed correctly to get the final value.

到目前为止，我们都是按照[标准的 GATT 电量 ```characteristic``` 属性](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml)来写代码的。用这种写法，返回值是一个  [`DataView`](https://docs.webplatform.org/wiki/javascript/DataView) 对象，要解析这个对象才能得到最后的值。



Writing values would typically require entering the appropriate values to be parsed as a `BufferSource`, which are either an `ArrayBuffer` or a view onto an `ArrayBuffer` like a `DataView` object (You can see a[list of buffer source types](https://heycam.github.io/webidl/#idl-buffer-source-types)). For example, for resetting the `enerygyExpended` field in a heart rate monitor, we can use the [`writeValue()`](https://webbluetoothcg.github.io/web-bluetooth/#dom-bluetoothremotegattcharacteristic-writevalue)method like so:

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



If you don’t have a device which exposes GATT services but still want to play with the API, try out the [BLE Peripheral Simulator App](https://github.com/WebBluetoothCG/ble-test-peripheral-android).

介绍道现在，知道你一定手痒了，就算手上没有支持 GATT 服务的设备，也可以试试[这个安卓 app](https://github.com/WebBluetoothCG/ble-test-peripheral-android)，它提供了各种新奇的 Web Bluetooth API 供用户测试。



### Advanced uses

### 高级魔法


























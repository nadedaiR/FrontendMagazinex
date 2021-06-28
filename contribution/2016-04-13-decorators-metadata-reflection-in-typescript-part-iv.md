---
layout:     post
title:      TypeScript 中的 Decorator & 元数据反射：从小白到专家（部分 IV）
subtitle:   ""
date:       2016-04-13
author:     "龙逸楠"
header-img: "/images/decorators-metadata-reflection-in-typescript.png"
tags:
  - JavaScript
  - ECMAScript 6
  - MoHa
---

本文译自：[Decorators & metadata reflection in TypeScript: From Novice to Expert (Part IV)](http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4)

深入探寻 TypeScript 的装饰器实现，发现它们是如何为 JavaScript 添加令人兴奋的特性，比如反射和依赖注入。

*An in-depth look to the TypeScript implementation of decorators and how they make possible new exciting JavaScript features like reflection or dependency injection.*

这个系列包含4篇文章：

- 部分 I：方法装饰器
- 部分 II：属性注解与类装饰器
- 部分 III：参数装饰器与装饰器工厂
- 部分 IV：类型的序列化与元数据反射 API

*This article is the fourth part of a series:*

- PART I: Method decorators
- PART II: Property decorators & Class decorators
- PART III: Parameter decorators & Decorator factory
- PART IV: Types serialization & The metadata reflection API

我会假设你已经读过了这个系列的前几篇文章。

*I will assume that you have already read all the previous posts of these series.*

在前面的文章中我们已经知道了什么是装饰器和 TypeScript 是怎么实现装饰器的。我们知道了如何在类、方法、属性和参数上使用装饰器，如何创建一个装饰器工厂，如何使用一个装饰器工厂，如何实现一个可配置的装饰器工厂。

*In the previous post in this series we learned what are decorators and how they are implemented in TypeScript. We know how to work with class, method, property and parameter decorators, how to create a decorator factory and how to use a decorator factory to implement configurable decorators.*

在本篇文章中，我们将会了解到：

1. `我们为什么需要 JavaScript 中的反射`
2. `元数据反射 API`
3. `基本类型序列`
4. `复杂类型序列`

*In this post we will learn about:*

1. Why we need reflection in JavaScript?
2. The metadata reflection API
3. Basic type serialization
4. Complex type serialization

让我们从学习为什么需要 Javascript 中的反射开始。

*Let’s start by learning why we need reflection in JavaScript.*

### 1. 我们为什么需要 JavaScript 中的反射
*Why we need reflection in JavaScript?*

反射这个词用来描述那些可以检查同一个系统中其它代码(或自己)的代码。

*The name reflection is used to describe code which is able to inspect other code in the same system (or itself).*

反射在一些用例下非常有用(组合/依赖注入，运行时类型检查，测试)。

*Reflection is useful for a number of use cases (Composition/Dependency Injection, Run-time Type Assertions, Testing).*

我们的 Javascript 应用变得越来越大，我们开始需要一些工具(比如控制反转容器)和功能(运行时类型检测)来管理不断增长的复杂度。问题在于如果 Javascript 没有反射，一些工具和功能就无法实现，或者至少它们不能实现得像它们在 C# 或者 Java 中的那么强大。

*Our JavaScript applications are getting bigger and bigger and we are starting to need some tools (like inversion of control containers) and features like (run-time type assertions) to manage this increasing complexity. The problem is that because there is not reflection in JavaScript some of this tools and features cannot be implemented, or at least they can not be implemented to be as powerful as they are in programming languages like C# or Java.*

一个强大的反射 API 可以让我们在运行时检测一个未知的对象并且得到它的所有信息。我们要能通过反射得到以下的信息:

- 这个实例的名字
- 这个实例的类型
- 这个实例实现了哪个接口
- 这个实例的属性的名字和类型
- 这个实例构造函数的参数名和类型

*A powerful reflection API should allow us to examine an unknown object at run-time and find out everything about it. We should be able to find things like:*

- The name of the entity.
- The type of the entity.
- Which interfaces are implemented by the entity.
- The name and types of the properties of the entity.
- The name and types of the constructor arguments of the entity.

在 JavaScript 中我们可以通过 [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 或 [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 函数获取一些实例的信息，但是我们还需要反射来实现更加强大的开发工具。

*In JavaScript we can use functions like Object.getOwnPropertyDescriptor() or Object.keys() to find some information about an entity but we need reflection to implement more powerful development tools.*

然而事情有所转机，因为 TypeScript 已经开始支持一些反射的功能。让我们看一下这些功能:

*However, things are about to change because TypeScript is starting to support some Reflection features. Let’s take a look to this features:*

### 2. 元数据反射 API

*The metadata reflection API*

原生 Javascript 对元数据反射的支持处于早期的开发阶段。这里是线上的[装饰器与元数据装饰器需要的 ES7 反射 API 原型的提案](http://rbuckton.github.io/ReflectDecorators/)。

*The native JavaScript support for a metadata reflection API is in an early stage of development. There is a proposal to add Decorators to ES7, along with a prototype for an ES7 Reflection API for Decorator Metadata, which is available online.*

Typescript 团队的一些人已经开始实现 [ES7 反射 API 原型的兼容版本](https://www.npmjs.com/package/reflect-metadata)，Typescript 的编译器已经可以[将一些设计时类型元数据序列化给装饰器](https://github.com/Microsoft/TypeScript/issues/2577)。

*Some of the guys from the TypeScript team have been working on a Polyfill for the prototype of the ES7 Reflection API and the TypeScript compiler is now able to emit some serialized design-time type metadata for decorators.*

我们可以引入 [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) 库来使用元数据反射 API:

```bash
npm install reflect-metadata
```

*We can use this metadata reflection API polyfill by using the reflect-metadata package:*
```bash
npm install reflect-metadata;
```

我们必须随 TypeScript 1.5+ 一起使用这个库并且将编译参数 emitDecoratorMetadata 设为 true。我们也必须包含对 reflect-metadata.d.ts 的引用并加载 Reflect.js 文件。

*We must use it with TypeScript 1.5 and the compiler flag emitDecoratorMetadata set to true. We also need to including a reference to reflect-metadata.d.ts. and load the Reflect.js file.*

随后我们可以实现我们自己的装饰器并且使用一个可用的`元数据设计键`。到目前为止，只有三个可用的键:

- `类型元数据`使用元数据键```"design:type"```
- `参数类型元数据`使用元数据键```"design:paramtypes"```
- `返回值类型元数据`使用元数据键```"design:returntype"```

*We then need to implement our own decorators and use one of the available reflect metadata design keys. For the moment there are only three available:*

- Type metadata uses the metadata key "design:type".
- Parameter type metadata uses the metadata key "design:paramtypes".
- Return type metadata uses the metadata key "design:returntype".

让我们来看一组例子：

*Let’s see a couple of examples.*

#### A) 使用元数据反射 API 获取类型元数据

*A) Obtaining type metadata using the reflect metadata API*

让我们声明下面的属性装饰器 :
*Let’s declare the following property decorator:*

```ts
function logType(target : any, key : string) {
  var t = Reflect.getMetadata("design:type", target, key);
  console.log(`${key} type: ${t.name}`);
}
```

然后我们可以将它应用到类的一个属性上来获取它的类型 :
*We can then apply it to one of the properties of a class to obtain its type:*
```ts
class Demo{
  @logType // apply property decorator
  public attr1 : string;
}
```

上面例子在控制台的输出 :
*The example above logs the following in console:*
```ts
attr1 type: String
```

#### B) 使用元数据反射 API 获取参数类型元数据
*B) Obtaining Parameter type metadata using the reflect metadata API*

让我们声明如下的参数装饰器 :
*Let’s declare the following parameter decorator:*

```ts
function logParamTypes(target : any, key : string) {
  var types = Reflect.getMetadata("design:paramtypes", target, key);
  var s = types.map(a => a.name).join();
  console.log(`${key} param types: ${s}`);
}
```

然后我们将它应用到类里面的一个方法上来获取它的参数的类型信息：
*We can then apply it to one of the method of a class to obtain information about the types of its arguments:*

```ts
class Foo {}
interface IFoo {}

class Demo{
  @logParameters // apply parameter decorator
  doSomething(
    param1 : string,
    param2 : number,
    param3 : Foo,
    param4 : { test : string },
    param5 : IFoo,
    param6 : Function,
    param7 : (a : number) => void,
  ) : number {
      return 1
  }
}
```

上面例子在控制台的输出 :
*The example above logs the following in console:*


```ts
doSomething param types: String, Number, Foo, Object, Object, Function, Function
```

#### C) 使用元数据反射 API 获取返回类型元数据
*C) Obtaining return type metadata using the reflect metadata API*

我们也可以使用 ```"design:returntype"``` 元数据键来获取一个方法上的返回类型信息：
*We can also get information about the return type of a method using the "design:returntype" metadata key:*

```ts
Reflect.getMetadata("design:returntype", target, key);
```

### 3. 基本类型序列化
*3. Basic type serialization*

让我们再来看一次上面的 design:paramtypes 例子。我们注意到接口 IFoo 和字面量对象 ```{ test : string}``` 都序列化为 Object。这是因为 TypeScript 只支持基础类型的序列化。基础类型的序列化规则是：

- number 序列化为 ```Number```
- string 序列化为 ```String```
- boolean 序列化为 ```Boolean```
- any 序列化为 ```Object```
- void 序列化为 ```undefined```
- Array 序列化为 ```Array```
- 如果是一个多元组，序列化为 ```Array```
- 如果是一个类，序列化为 ```class constructor```
- 如果是一个枚举，序列化为 ```Number```
- 如果至少有一个调用签名，序列化为 ```Function```
- 其它的序列化为 ```Object``` (包括接口)

*Let’s take a look to the "design:paramtypes" example above again. Notice the that interfaces IFoo and object literal { test : string} are serialized as Object. This is because TypeScript only supports basic type serialization. The basic type serialization rules are:*

- number serialized as Number
- string serialized as String
- boolean serialized as Boolean
- any serialized as Object
- void serializes as undefined
- Array serialized as Array
- If a Tuple, serialized as Array
- If a class serialized it as the class constructor
- If an Enum serialized it as Number
- If has at least one call signature, serialized as Function
- Otherwise serialized as Object (Including interfaces)

接口和字面量对象在未来可能会被序列化为`复杂类型序列`，但是这个特性现在还不能用。

*Interfaces and object literals may be serialize in the future via complex type serialization but this feature is not available at this time.*

### 4. 复杂类型序列
*4. Complex types serialization*

TypeScript 团队正致力于一个能让我们生成复杂类型元数据的提案。
*The TypeScript team is working on a proposal that will allow us to generate metadata for complex types.*

这个提案描述了一些复杂的类型如何被序列化。上面的那些序列化规则依然会被用于基本类型序列化，但是复杂的类型序列化使用的是不同的序列化逻辑。这是提案中的一个基本类型用来描述所有可能的类型：
*They proposal describes how some complex types will be serialized. The serialization rules above will still be used for basic type but a different serialization logic will be used for complex types. In the proposal there is a base type that is used to describe all the possible types:*

```ts
/**
  * Basic shape for a type.
  */
interface _Type {
  /**
    * Describes the specific shape of the type.
    * @remarks
    * One of: "typeparameter", "typereference", "interface", "tuple", "union",
    * or "function".
    */
  kind: string;
}
```

我们也可以找到一些用来描述所有可能类型的类。比如，我们可以找到序列化范性接口 ```interface foo<bar> { /* ... */}``` 的类：
*We can also find the classes that will be used to describe each of the possible types. For example, we can find the class proposed to be used to serialize genetic interfaces interface foo<bar> { /* ... */}:*

```ts
/**
  * Describes a generic interface.
  */
interface InterfaceType extends _Type {
  kind: string; // "interface"

  /**
    * Generic type parameters for the type. May be undefined.
    */
  typeParameters?: TypeParameter[];

  /**
    * Implemented interfaces.
    */
  implements?: Type[];

  /**
    * Members for the type. May be undefined.
    * @remarks Contains property, accessor, and method declarations.
    */
  members?: { [key: string | symbol | number]: Type; };

  /**
    * Call signatures for the type. May be undefined.
    */
  call?: Signature[];

  /**
    * Construct signatures for the type. May be undefined.
    */
  construct?: Signature[];

  /**
    * Index signatures for the type. May be undefined.
    */
  index?: Signature[];
}
```

如同我们在上面看到的，这里有一个属性指出实现了哪些接口：
*As we can see above there will be an attribute which indicates the implemented interfaces:*

```ts
/**
  * Implemented interfaces.
  */
implements?: Type[];
```

这种信息可以用来在运行时验证一个实例是否实现了特定的接口，而这个功能对于一个 IoC 容器特别的有用。
*That information could be used to do things like validate if an entity implements certain interface at run-time, which could be really useful for an IoC container.*

我们不知道对复杂类型序列的支持什么时候会被加入到 TypeScript 的功能中，但我们已经迫不及待了因为我们计划用它为我们的 JavaScript IoC 容器：[InversifyJS](http://blog.wolksoftware.com/introducing-inversifyjs) 增加一些碉堡的特性。
*We don’t know when complex type serialization support will be added to TypeScript but we cannot wait because we have plans to use it to add some cool features to our awesome IoC container for JavaScript: InversifyJS.*

### 5. 结论
*5. Conclusion*

在本系列中，我们深入浅出的学习了4种可用的装饰器、如何创建一个装饰器工厂和如何使用装饰器工厂实现一个可配置的装饰器。
*In this series we have learned in-depth 4 out of the 4 available types of decorators, how to create a decorator factory and how to use a decorator factory to implement configurable decorators.*

我们也学会了如何使用元数据反射 API。
*We also know how to work with the metadata reflection API.*

我们会保持这个博客的更新并在未来写更多关于元数据反射 API 的文章。如果不想错过，请不要忘了[订阅我们](http://blog.wolksoftware.com/feed)。
*We will keep this blog updated and write more about the metadata reflection API in the future. Don’t forget to subscribe if you don’t want to miss it out!*

你可以通过 [@OweR_ReLoaDeD](https://twitter.com/OweR_ReLoaDeD) 和 [@WolkSoftwareLtd](https://twitter.com/WolkSoftwareLtd) 随意与我们谈论这篇文章。
*Please feel free to talk about this article with us via @OweR_ReLoaDeD and @WolkSoftwareLtd.*

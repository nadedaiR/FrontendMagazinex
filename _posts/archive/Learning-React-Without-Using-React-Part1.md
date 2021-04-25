---
layout:     post
title:     「译」Learning React Without Using React Part 1
subtitle:   ""
date:       2016-03-26
author:     "追客"
header-img: "http://7xrvqo.com1.z0.glb.clouddn.com/images/learning-react-without-using-react/banner.044e8949.png"
tags:
  - React
  - Redux
  - 组件化
  - 单向数据流
  - jQuery
---


*原文链接：[Learning React Without Using React Part 1](https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.femmquo5d)*

There’s a lot of confusion when it comes to React. The following is a lightweight introduction into React and its underlying principles.

当我们谈起 React 的时候总是有很多疑惑。下面简单地介绍了 React 以及他的一些底层原理。

What will you learn when you are finished with part 1 and 2? A high level understanding of why you might need React and maybe Redux or another state container.

当你完成 Part1 和 Part2 之后，你会学到什么呢？你也许就会知道你为什么需要 React 以及 Redux 类似的 state container （状态管理器）。

What you will not need: No need for JSX, ES6/ES*, Webpack, Hot Reloading, understanding of how the virtual DOM functions not even React itself.

然而，**你并不需要学习**: JSX，ES6/ES*，Webpack，Hot Reloading，也不需要理解 Virtual DOM，甚至不需要 React 本身。

First things first:

那么，我们首先要做的是：

Let’s take a look at the TodoMVC code for jQuery.

阅读 [Jquery 实现的 TodoMVC](https://github.com/tastejs/todomvc/blob/gh-pages/examples/jquery/js/app.js) 的代码。

You will notice there is a method render() which gets called every time an event is triggered or data is updated. Let’s build a naive example, where changing the value of an input, triggers a render function that updates the DOM element.

也许你会注意到有一个叫 `render` 的方法，他会在某个事件触发或者数据更新的时候被调用。现在，我们从头来实现一个例子：当 `input` 的值改变时，调用 `render` 函数，并且更新 DOM 元素。（[点击这里可查看完整的代码](http://plnkr.co/edit/fjQbQwZpQlhd5wXoc9J8?p=preview)）

```javascript
var state = {value: null}

$('#input').on('keyup', function () {
  state.value = $(this).val().trim()
  render()
})

function render () {
  $('#output').html(state.value)
}

render()
```

We’re keeping everything in sync by using a global state variable. This means that an input update does two things: 1. it updates the app state and 2. calls the render function. The render function updates the DOM according to the app state now.

我们使用一个全局变量 `state` 来同步所有的东西。也就是说，当 *input* 的值改变时会更新两样东西：

1. 更新整个应用的 `state`
2. 更新 DOM（根据应用当前的 `state` 来调用 `render` 函数）

Keep this example in mind. We will get back to it in a moment.

先记住这些，我们等一下就会返回来。

Here’s another idea to consider:

现在，我们有了一个新想法：

```javascript
function output(text) {
  return '<div>' + text + '</div>'
}
```

Calling output(‘foo’) will return `<div>foo</div>`.

显然，调用 `output(foo)` 就会返回 `'<div>foo</div>'`。

And now consider the following example:

那么接下来：

```javascript
function h2 (text) {
  return '<h2>' + text + '</h2>'
}

function div (text) {
  return '<div>' + text + '</div>'
}

function header (text) {
  return div(h2(text))
}

console.log(header('foo') === '<div><h2>foo</h2></div>') // true
```
We’re writing functions that return a string based on an input. Calling header with the same argument will always return the same string. If you have ever wondered about stateless functions in React, well this is a simplified version. Stateless functions return a React element representation not a simple string. But you get the idea.

上面的函数都是基于一个 *text(input)* 然后返回一个 *string(text)* 。调用 `header` 的时候传入相同的参数（*input*），都会得到相同的字符串（*output*）。如果你在想思考 React 中的 **stateless functions** 的话，那么这个其实就是一个简化版。只是 Stateless functions 会返回一个 React Element 而不是一个简单的 string，但是思路是一样的。

So we know that we can create functions that return strings now. Let’s get back to our original example and expand it to display an add button as well as an items list.

既然这样，我们就把这个想法应用到我们之前的例子中。我们添加了一个 `button`，用来添加 todo item 。

```javascript
var state = {items: [], id: 0}

$('#add').on('click', function (e) {
  var value = $('#input').val().trim()
  $('#input').val('')

  state.items.push({
    id: state.id++,
    text: value,
    completed: false
  })

  render()
})

$('#list').on('click', function () {
  var toggleId = parseInt($(this).attr('id'))

  state.items.forEach(function (el) {
    el.id === toggleId && (el.completed = !el.completed)
  })

  render()
})

function render () {
  var items = state.items.map(function (item) {
    var completed = item.completed ? 'completed' : ''

    return '<li class="item + ' + completed + '" id="' + item.id + '">(' +
      item.id + ') ' + item.text + '</li>'
  }).join('')

  var html = '<ul>' + items = '</ul>'

  $('#list').html(html)
}

render()
```
This is the visual output for now. We have a simple todo list including the ability to toggle an items state (active or finished).

效果图如下。我们的应用现在可以显示所有的 todo，也可以改变每个 todo 的状态（进行中或者完成）。

![simple todo lsit](http://7xrvqo.com1.z0.glb.clouddn.com/images/learning-react-without-using-react/todo-list.b96ad942.png)

A set of defined events updated the state and then called our render function. render then created the item list and added the string to the list element. We added state to simplify the interaction between events and elements. Instead of having to define every event and element and their respective relationship, we always update as soon as an action has been triggered. It simplifies handling complex interactions. We always call render when state has changed.

在上面，我们定义了两个 `click` 事件，当他们触发时就会更新我们的 `state` 以及调用 `render` 函数。而 `render` 函数会创建一个 todo list 。 `state` 作为中间媒介，简化了事件和 DOM 元素之间的交互，而不是** 通过事件来直接操作 DOM ** （不需要定义每个 DOM 元素和每个事件以及他们之间的关系）。当某个 *action*（如 click 事件） 触发之后，`state` 就会更新，接着调用 `render` 函数，最后我们的应用就会更新。这样一来，就简化了好多复杂的交互。

This works quite well already. We can add items to the list by entering a title via input box and we can toggle the items state by clicking on the item itself.

上面的例子是很好的，我们可以通过填输入框来增加一个 todo，当点击 todo 的时候，能够改变他的状态。但，我们不妨再来重构他。

The render function looks quite messy. Let’s try to create a function that expects a input and returns a string based on that input.

可以看到，`render` 函数有一点乱。我们不妨创建一个函数，他接收一个参数（input），然后基于这个参数返回一个字符串（output）。

```javascript
function ItemRow (props) {
  var className = props.completed ? ' item completed' : 'item'
  return '<li className="' + className +' ">' + props.text + '</li>'
}
```

```javascript
function ItemsList (props) {
  return '<ul>' + props.items.map(ItemRow).join('') + '</ul>'
}
```

We’ve cleaned up the render function.

看，现在我们的 `render` 函数优美多了：

```javascript
function render () {
  $('#list').html(ItemsList({
    items: state.items
  }))
}
```
What if render didn’t know about the state, and would expect an input instead? Well this is easy to achieve now, we can simply refactor the render method to expect props (this is what a React Component expects).

如果 `render` 函数并不知道 `state` 是什么，而是期望一个 *input* 作为参数呢？好吧，现在我们可以重构一下 `render` 函数，他期望接收一个 `props` 对象（这其实就是 React Component 所期望的。

```javascript
function render (props) {
  $('#list').html(ItemsList({
    items: props.items
  }))
}
```
render doesn’t need to know about the external state. This enables us to simply call render with any given input. Which also means that re rendering the application will return the same results again and again. We should also keep in mind that the Dom is a side effect, but let’s neglect the fact for a moment.

现在，`render` 函数并不依赖外部的状态（state），这使得我们在调用 `render` 时可以随便传入一个 *input* ，也就意味着我们的应用重新渲染时，相同的 *input* 会有相同的 *output* 。需要注意的是，DOM 操作其实是一个 side effect，但是现在我们暂时忽略他。

By separating explicit state from the rendering part we can easily achieve Undo/Redo for example. Which means we are able to create a history and save the current state every time this changes.

把 `state` 从 `render` 函数中分离出来，可以使得我们很容易实现 `Undo/Redo`。这也意味着每当 * 当前的 state * 改变时，我们能够创建一个 history ，保存这个当前的 state 。

Another optimization is to pass in the root node instead having to explicitly define the node inside the render function.

另外一个优化就是传一个 root node 作为参数，而不是写死在 `render` 函数里面：

```javascript
function render (props, node) {
  node.html(ItemsList({
    items: props.items
  }))
}
```

So we can simply call render with a defined state and a root node now.

因此，我们可以这样调用 `render` 函数：

```javascript
render(state, $('#list'))
```

But how can we re-render without having to explicitly call the render method after updating the state?

我们会很容易想到：当 `state` 改变的时候，能不能自动地更新应用？也就是，不用手动地调用 `render` 函数。

Let’s build a store that simply calls our render method as soon as the state has updated from anywhere in our application. Here’s a first try. While this implementation is very basic, it’s a good starting point for creating a more advanced state container.

现在，我们来创建一个 *store* ，他的作用是当 `state` 改变之后，就立马调用 `render` 函数。下面的实现虽然简单，但也是一个 advanced state container 的雏形。

```javascript
function createStore (initialState) {
  var _state = initialState || {},
    _listeners = []

  function updateListeners (state) {
    _listeners.forEach(function (listener) {
      listener.cb(state)
    })
  }

  return {
    setState: function (state) {
      _state = state
      updateListeners(state)
    },

    getState: function () {
      return _state
    },

    onUpdate: function (name, cb) {
      _listeners.push({name: name, cb: cb})
    }
  }
}
```

And we can simply update the state via the store setState method. Our render function gets called as soon as the state changes.

现在，我们更新 `state` 只需要简单地调用 `setState` 方法。只要 `state` 一改变，我们的 `render` 函数就会被调用：

```javascript
var store = createStore(store)

store.onUpdate('rootRender', function (state) {
  render(state, $('#list'))
})
```

Here is a link to the current working example.

[点击这里可查看完整的代码](http://plnkr.co/edit/fjQbQwZpQlhd5wXoc9J8?p=preview)

What have we seen now? We have seen the simple principle of one-way data flow. We pass in the state to the render function and the state trickles down the function hierarchy. ItemsList for example passes on the appropriate props to the ItemRow function. We have created components and we have composed those components to something even bigger. Remember the header example, where we composed div and h2 function into header. We’re dealing with pure functions here. This makes all our updates predictable. We also have a clear idea about our state now.

**现在我们学会了什么？** 我们知道了简单的单向数据流（one-way data flow）的原则。我们给 `render` 函数传了一个 `state` 参数，然后 `state` 就会像流水一样，流到 `render` 函数的每个层次中。比如，`ItemRow` 函数需要 `ItemsList` 给他传进正确的参数。

我们已经创建了多个组件（component），并且我们把这些组件组合（compose）在一起。回想一下前面的 `header` 例子，我们把 `div` 和 `h2` 函数组合成了一个 `header` 函数。并且，这些函数都是 *pure function* ，这使得所有更新都是可预测的。

并且，我们使用了 *store* 来管理我们的 `state`。

React does all this and more in a very efficient manner. Composition , optimized rendering by implementing the virtual DOM, unidirectional data flow etc.

而，React 会用更好更优美的方法来实现上面这些东西。组件（组合），使用 Virtual DOM 优化渲染，单向数据流等等。

> …we can focus on examining React’s true strengths: composition, unidirectional data flow, freedom from DSLs, explicit mutation and static mental model.

From [Dan Abramov - you're missing the point of react](https://medium.com/@dan_abramov/youre-missing-the-point-of-react-a20e34a51e1a)

There is still a lot more we can do, including building an improved state container, refactoring our listeners, implementing undo/redo and more nice features. All this in part 2.

我们可以优化的东西还有很多，比如继续优化 state container，重构我们的 listeners，实现 undo/redo，以及更多更好的 feature。**这些东西我们都会在 Part 2 呈现**。

*原文链接：[Learning React Without Using React Part 1](https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.femmquo5d)*

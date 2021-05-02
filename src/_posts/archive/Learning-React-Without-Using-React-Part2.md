---
layout:     post
title:     「译」Learning React Without Using React Part 2
subtitle:   ""
date:       2016-03-26
author:     "追客"
header-img: "/images/learning-react-without-using-react/banner2.png"
tags:
  - React
  - Redux
  - 组件化
  - 单向数据流
  - jQuery
---

*原文链接：[Learning React Without Using React Part 2](https://medium.com/javascript-inside/learning-react-without-using-react-part-2-703621a89432#.x3b88sqrx)*

Read part 1 if you haven’t yet.

请阅读 Part 1 如果你还没有的话。

Part 2 will continue where we left off the last time. The post will focus on improving our simple todo list. The current implementation consists of a composition of functions that render the complete app and includes a naive store that manages our state. There are a number of things we need to do to improve our application though. Here is a link to the current example and code.

让我们继续 Part 1 没讲到的东西。
这次的文章主要是专注于如何重构我们的 todo list。现在，我们实现了可以渲染整个应用的函数（组合），还有管理我们状态（state）的 *store*。然而，我们还有很多方法去优化我们的应用。[完整代码请查看这里](http://plnkr.co/edit/fjQbQwZpQlhd5wXoc9J8?p=preview)。

First of all we haven’t taken care of handling our events in a proper way. Our components don’t handle any events. In React data flows down while events move up. This means our functions should trigger events up the chain as soon as they occur. For example our ItemRow function should call a function that has been passed down via props. How do we achieve this? Here’s an initial try.

首先，我们还没有正确地处理事件。现在，我们的组件根本就没有绑定任何事件。在 React 里面，数据流是从上往下，而事件流则是从下往上（In React data flows down while events move up）。也就是说，当事件触发的时候，我们应该沿着组件链，从下往上找其对应的回调函数。比如，我们的 `ItemRow` 函数应该调用一个从 `props` 传递下来的函数。

那么，我们怎么实现呢？下面是一个小尝试：

```javascript
function ItemRow (props) {
  var className = props.completed ? 'item completed' : 'item'

  return $('<li>')
    .on('click', props.onUpdate.bind(null, props.id))
    .addClass(className)
    .attr('id', props.id)
    .html(props.text)
}
```
We added an event listener on our list element which fires an onClick function as soon as the item is clicked. The onUpdate function is passed down via props.

在上面，我们给 `list` 元素绑定了一个事件。当点击他们的时候，`onUpdate` 函数就会被调用。可以看到, `onUpdate` 函数是从 `props` 传递下来的。

Now what if we could create a function that handles creating the elements for us?

现在，我们不妨定义一个函数，他可以在创建元素的同时为其绑定事件。

```javascript
function createElement (tag, attrs, children) {
  var elem = $('<', + tag + '>')

  for (var key in attrs) {
    var val = attrs[key]

    if (key.indexOf('on') === 0) {
      var event = key.substr(2).toLowerCase()
      elem.on(event, val)
    } else {
      elem.attr(key, val)
    }
  }

  return elem.html(children)
}
```
By implementing our createElement function we can refactor our ItemRow function to something like this:

这样一来，我们的 `ItemRow` 函数可以写成这样：

```javascript
function ItemRow (props) {
  var className = props.completed ? 'item completed' : 'item'

  return createElement('li', {
    id: props.id,
    class: props.className,
    onClick: props.onUpdate.bind(null, props.id)
  }, props.text)
}
```
It is important to note that in React createElement creates a javaScript objects that is a representation of a Dom Element not an element itself. On a side note let’s take a look at what really happens when you write JSX in React.

需要注意的是，React 中的 `createElement` 函数是创建了一个 JavaScript 对象来表示 DOM 元素。还有一点，让我们来看看 React 中的 JSX 语法到底是怎样子的。

The following JSX example

下面就是一个 JSX 例子：

```JavaScript
return ( <div id='el' className='entry'> Hello </div>)
```

is converted to

接着会转换成：

```javascript
var SomeElement = React.createElement('div', {
  id: 'el',
  className: 'entry'
}, 'Hello')
```

calling SomeElement() would return an object like this

然后调用 `SomeElement` 函数会返回一个像下面差不多的 JavaScript 对象：

```javascript
{
  // ...
  type: 'div',
  key: null,
  ref: null,
  props: {
    children: 'Hello',
    className: 'entry',
    id: 'el'
  }
}
```

For a more detailed insight read React Components, Elements, and Instances.

想要了解更多的话，请阅读 [React Components, Elements, and Instances](https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca#.x2b1qra2o)。

Back to our example. Where does onUpdate come from?

回到我们的例子中，`onUpdate` 函数是从哪里来的？

Let’s take a look at our initial render function. Our render defined a updateState function and passed it on to the ItemList component via props.

首先来看看我们的 `render` 函数。他定义了一个 `updateState` 函数，然后通过 `props` 把这个函数传给 `ItemList` 组件。

```javascript
function render (props, node) {
  function updateState (toggleId) {
    state.items.forEach(function (el) {
      if (el.id === toggleId) {
        el.completed = !el.completed
      }
    })
    store.setState(state)
  }

  node.empty().append([ItemList({
    items: props.items,
    onUpdate: updateState
  })])
}
```

ItemsList function itself passes onUpdate to every single ItemRow.

然后，`ItemList` 函数会把 `onUpdate` 传递到每个 `ItemRow`。

```javascript
function extending (base, item) {
  return $.extend({}, item, base)
}

function ItemsList (props) {
  return createElement('ul', {}, props.items
    .map(extending.bind(null, {
      onUpdate: props.onUpdate
    }))
    .map(ItemRow))
}
```
By taking this approach we achieved the following: data flows down the component hierarchy and events flow up the tree. This also means that we can remove the global listener we previously defined to listen on item clicks, toggling the state accordingly. We moved the function into render, which is now the aforementioned updateState.

通过以上我们实现了：数据流是沿着组件链从上往下流，而事件流是从下往上。这就意味着我们可以把定义在全局的监听器移除掉（用来监听点击 item 的时候改变其状态的监听器）。那么，我们把这个函数移到了 `render` 函数里面，也就是前面所讲的 `updateState`。

More improvements.

**我们还可以重构。**

Let’s refactor the input and button elements from the markup into a function. So eventually our markup will only consist of a div.

现在我们把 `input` 和 `button` 从 HTML 标签变成了函数。因此，我们整个 HTML 文件就只剩下一个 `div`。

```HTML
<div id="app"></app>
```

For example a input element can be easily created like this

因此，我们可以很简便地创建 `input` 元素，就这样：

```javascript
var input = createElement('input', {id: 'input'})
```

We can also move the global listener function that listened on button clicks into our SearchBar function. SearchBar returns an input and button element and handles click events by triggering a callback function passed in via props.

同样地，我们也可以把监听 *searchBar button* 点击事件的全局函数放在我们的 `SearchBar` 函数里面。`SearchBar` 函数会返回一个 `input` 和一个 `button` 元素，他会通过 `props` 传进来的回调函数来处理点击事件。

```javascript
function SearchBar(props) {
  function onButtonClick (e) {
    var val = $('#input').val()
    $('#input').val('')
    props.update(val)
    e.preventDefault()
  }

  var input = createElement('input', {id: 'input'})

  // move listener to here
  var button = createElement('button', {
    id: 'add',
    onClick: onButtonClick.bind(null)
  }, 'Add')

  return createElement('div', {}, {input, button})
}
```
Our render function needs to call SearchBar and pass in the appropriate props now. Before we update the render function, let’s take a second to get an idea on how a re-render should take place. Let’s neglect our store for a moment and take care of handling state in a high level component. Up until now, all functions were stateless, we’ll create a function that handles state and updates the children functions when suitable.

在上面，我们的 `render` 函数在调用 `SearchBar` 的同时需要传递正确的 `props` 参数。

在我们重构 `render` 函数之前，让我们想想 *re-render* 应该在哪里调用才是正确的。首先，忽略我们的 `store`，把注意力集中在如何在一个 high level component 中处理 *state*。

目前为止，所有的函数都是 *stateless* 的。接下来我们会创建一个函数，他会处理 *state*，以及在适当的时候更新子组件（children）。

Container Component

**Container Component**

Let’s create the high level container. Also read Presentational and Container Components for a clearer understanding. The following should give you a high level idea.

让我们来创建一个 high level container 吧。与此同时，为了更好理解，你可以阅读 [Presentational and Container Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.iy4tfncwt)。

So let’s call our container component App. All it does is call the SearchBar and ItemList functions and returns an array of elements. We are going to refactor our render function again. Most of the code will simply move into App.

首先，我们给这个 container component 取名为 `App`。他所做的事情就是调用 `SearchBar` 和 `ItemList` 函数。现在，我们继续重构 `render` 函数。其实就是把代码移到 `App` 里面去而已。

Before taking a look at the App function, let’s have a quick look at our render:

我们不妨先来看看 `render` 现在是怎样子的：

```javascript
function render (component, node) {
  node.empty().append(component)
}

render(App(state), $('#app'))
```

render only takes care of rendering the application to a defined node now. React is more complicated than this trivial implementation. We’re only appending an element tree into a defined root element, but it should suffice to give a high level idea of the concept.

我们的 `render` 函数只是简单地把整个应用渲染到某个 HTML 节点。但是，React 的实现会比这个复杂一点，而我们仅仅把一棵 element tree 添加到指定的节点中而已。但是抽象起来理解的话，这个已经足够了。

Our App function is now our old render function sans the DOM handling.

现在，我们的 `App` 函数其实就是我们旧的 `render` 函数，除了 DOM 操作被删掉。

```javascript
function App (props) {
  function updateSearchBar (value) {
    state.items.push({
      id: state.id++,
      text: value,
      completed: false
    })
  }

  function updateState (toggleId) {
    state.items.forEach(function (el) {
      if (el.id === toggleId) {
        el.completed = !el.completed
      }
    })
    store.setState(state)
  }

  return [
    SearchBar({update: updateSearchBar}),
    ItemsList({items: props.items, onUpdate: updateState})
  ]
}
```

We still need to fix one more thing. We are accessing a global store and calling setState to enable a re-render.

我们还需要改进一样东西：我们访问的 `store` 是全局的，并且重新渲染的话需要调用 `setState` 函数。

Let’s refactor the App function to re-render it’s children components without having to call the store. How do we achieve this?

我们现在来重构 `App` 函数，使得他的子组件重新渲染的是不需要调用 `store`。那么应该要怎么实现呢？

First of all let’s neglect the store and figure out how calling a setState function would re-render the component and it’s children elements.

首先我们暂时不考虑 `store`，而是想想怎么调用 `setState` 函数，使得组件和他的子组件重新渲染。

We will need to keep track of the current state inside this high level component and also take care of re-rendering the DOM as soon as setState has changed. Here’s a very primitive approach:

我们需要跟踪这个 high level component 当前的状态，并且只要 `setState` 一调用，就立马重新渲染。下面是一个简单的实现：

```javascript
function App (props) {
  function getInitialState (props) {
    return {
      items: [],
      id: 0
    }
  }

  var _state = getInitialState(),
    _node = null

  function setState (state) {
    _state = state
    render()
  }

  // ..
}
```

We initialize our state by calling getInitialState and we call the App render function as soon as we update the state via setState.

我们通过调用 `getInitialState` 来初始化我们的 `state`，然后每当使用 `setState` 来更新状态的时候，我们会调用 `render` 函数。

render either creates a node or simply updates the node when state changes.

而 `render` 函数要么创建一个 node，要么简单地更新 node，只要 `state` 发生改变。

```javascript
// naive implement of render

function render () {
  var children = [
    SearchBar({update: updateSearchState}),
    ItemList({
      items: _state.items,
      onUpdate: updateState
    })
  ]

  if (!_node) {
    return _node = createElement('div', {class: 'top'}, children)
  } else {
    return _node.html(children)
  }
}
```

In no way is this efficient, it should only highlight the fact, that calling setState inside a React Component, does not render the complete Application, only the Component and its children.

很显然，这对性能来说是不好的。需要知道的是，React 中的 `setState` 不会渲染整个应用，而是组件和他的子组件。

Here is the updated render call. We’re calling App without any arguments, simply relying on getInitialState to return the initial state.

下面是 `render` 函数的最新代码，我们调用 `App` 时不需要带任何参数，只是需要在 `App` 里面简单地调用 `getInitialState` 来初始化 `state`。

```javascript
function render(component, node) {
  node.empty().append(component)
}
render(App(), $('#app'))
```

Check the functioning example including the complete code.

[查看的所有的代码请点击这里](http://plnkr.co/edit/ISi8AiVuYSfFIfMy9z6t?p=preview)

Refinements

**继续改进**

What if we had a generic function that would return an object with a setState function and be able to differentiate between props being passed in and the component state itself?

如果有一个函数，他会返回一个对象。这个对象包含了 `setState` 函数，还能够区分传进来 `props` 和 组件本身自己的 `state`。

Something like this f.e.

差不多就像下面这样：

```javascript
var App = createClass({
  updateSearchState: function (string) { /*...*/ },

  updateState: function (obj) { /*... */ },

  render: function () {
    var children = [
      SearchBar({
        updateSearchState: this.updateSearchState
      }),
      ItemsList({
        items: this.state.items,
        onUpdate: this.updateState
      })
    ]

    return createElement('div', {class: 'top'}, children)
  }
})
```

The good news is that React offers you multiple options to create Components including using React.createClass. Other options include ES6 classes and stateless functions for more information consult the docs.

很幸运的是，在 React 中，你可以通过调用 `React.createClass` 来创建这样的组件。他还提供了很多选择，比如 ES6 Class ，stateless function 等，[更多请查看文档](https://facebook.github.io/react/docs/reusable-components.html)。

Our example app covered how data flows down and events flow up the component hierarchy. We’ve all seen how to handle state inside a component. There is a lot more to know and learn about React. The following links should help with continuing from here on.

综上，我们讲解了数据流如何从上往下，而事件流从下往上。我们也看到了如何处理一个组件的状态。关于 React 的东西，还有很多要学习。下面的链接也许可以帮助到你。

**扩展阅读**

- [Thnking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
- [Getting Start React](https://facebook.github.io/react/docs/getting-started.html)
- [JSX](https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#.59q26eqe0)
- [React How to](https://github.com/petehunt/react-howto)
- [Removing User Interface Complexity, or Why React is Awesome](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome)
- [Presentational and Container Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.kcyewm6ab)
- [React Component, Elements, and Instances](https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca#.xis6z3p1z)

**结尾语**

The plan was also to create an advanced state container, implementing undo/redo and more for part 2, but I think it would be out of scope for this post actually.

本来打算在这篇文章讲解如何创建一个 *advanced state container*，实现 *undo/redo* 以及更多 feature，但是我认为已经超出了这篇文章的范围。

I might write a part 2.1 if there is some interest.

如果大家有兴趣的话，我也许会写 Part 2.1。

*原文链接：[Learning React Without Using React Part 2](https://medium.com/javascript-inside/learning-react-without-using-react-part-2-703621a89432#.x3b88sqrx)*

**译者注**

TL;DR:

- 把事件处理放在组件（`createElement`）里面，事件处理程序可通过 `props` 委托到父组件中。
- 创建一个 container component，他包含了整个应用的状态，并且可以传递给其他组件。

看完这两篇文章后，我根据这种思路，实现了一个二叉树的遍历。（[CODE](https://github.com/FrontEnd-Addiction/Baidu-IFE/blob/master/stage02%2Ftask22%2Ftree-traversal-react-like%2FREADME.md)，[DEMO](http://frontend-addiction.github.io/Baidu-IFE/stage02/task22/tree-traversal-react-like/index.html)）

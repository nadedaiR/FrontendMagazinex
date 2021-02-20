---
layout:     post
title:      "使用 React 和 Flux 创建一个记事本应用"
subtitle:   ""
date:       2015-01-14
author:     "范洪春"
header-img: "http://7xrvqo.com1.z0.glb.clouddn.com/images/creating_a_note_taking_app_with_react_and_flux.d1f01479.jpg"
tags:
  - React
  - Flux
---

React，来自 Facebook，是一个用来创建用户界面的非常优秀的类库。唯一的问题是 React 不会关注于你的应用如何处理数据。大多数人把 React 当做 MV* 中的 V。所以，Facebook 引入了一种称作 Flux 的模式，提供了一个功能上的通道，可用于应用内的数据处理。这个教程简短的介绍了 Flux 模式并且展示了如何使用 React 和 Flux 架构搭建一个记事本应用。

## Flux 入门

Flux 依赖于一个单项的数据流。在这个 Flux 模式中有两个关键的组件：

1. __Stores__ ：一个 store 组件，恰如其名，存储这应用的数据。
2. __Actions__ ：新的数据通过 actions 流入 stores。当 actions 被调用时， Stores 监听 actions 并且会做一些反馈（比如修改数据）。这保证了数据的单向性。

为了增强这个概念，我们做一个实实在在的例子。比如，在一个记事本应用中你可能会有下面的安排：

1. 一个叫做 ``NoteStore`` 的 store 用来存储日记列表。
2. 要有一个叫做 ``createNote`` 的 action。``NoteStore`` 监听到 ``createNode`` 的 action 然后当 action 被调用的时候用一个新的日记来更新列表。数据仅仅能通过 action 流入到 store 中。
3. 每次数据发生变化时 ``NoteStore`` 触发一个事件。你的 React 组件，假如叫做 ``NodeListComponent``，监听这个事件然后更新存在于 view 层中日记的列表。这就是从 store 流出的数据的流动方式。所以，数据流可以形象化的看做下面这样：

![Data Flow Diagram](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/10/1413000877IMG_001.png)

Flux 模式最大的优势就是它保证了应用中数据的平缓。比如，任何数据的变化只能通过 action 发生，这也就更加容易理解如何做到一旦数据变化就会影响整个应用了。

#### 注意：

如果你看过了 Facebook 关于 [Flux](http://facebook.github.io/flux/docs/overview.html) 的指南，你一定会注意到 Dispatcher 的概念。Dispatcher 是一个注册到 store 中的一个回调函数。当 action 被调用，Dispatcher 会响应它并且把相关的数据发送到所有注册的 store 中。Store 然后检查 action 的类型并且作出相应的反应。

上面的过程被一个叫做 ``Reflux`` 的类库很好的简化了。它通过使 actions 可监听去掉了 Dispatcher 的概念。所以，在 Reflux 中 store 可以直接监听 action 并且对他们想要的内容做出响应。

为了更好地理解 Flux 模式，我们使用 Reflux，React 和 Node.js 共同创建一个记事本应用。

## 搭建开发环境

我们会使用 React 和 Reflux 作为 Node 模块并且使用 Browserify 让它们在客户端同样可用。下面就介绍如何搭建环境：

1. 我们会使用 Browserify 打包我们的 React 组件，Actions 和 Stores 被打包成一个客户端 ``.js`` 包。
2. 我们会使用 ``grunt watch`` 监控上面的组件中的变化并且每次发生变化时都会重新运行 Browserify。
3. ``grunt nodemon`` 被用于重启服务每当任何 ``.jsx`` 或者 ``.js`` 文件发生变化时，所以你不需要手动控制。

你可以从 [GitHub](https://github.com/jsprodotcom/source/blob/master/react-note-app.zip) 下载相关代码然后打开 Gruntfile.js 查看相关的任务。当你你的机器上有了这个库，你仅仅需要运行 ``npm install`` 来安装所以来的所有 node 模块。运行下面的命令，然后开始开发：

````
grunt watch
grunt nodemon
````

这个应用可以在 ``http://localhost:8000`` 访问到。

## 使用这个应用

我们从这个应用不同的组件开始。下面是我们如何将我们的 UI 分成不同的组件：

![Application Components](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/10/1413000875IMG_002.png)

下面是每个组件的功能：

1. ``NoteApp``：这是根组件，包含了两个子组件：``NoteListBox`` 和 ``NoteCreationBox``。
2. ``NoteListBox``：有一个子组件 ``NoteList``。它会得到一个日记列表从 Flux Store 并且把它们传递到 ``NoteList``。
3. ``NoteList``：负责渲染每个 ``Note`` 组件。传递一个 note 对象到每个 ``Note`` 组件中。
4. ``Note``：为一个单独的 note 项呈现具体内容。在这个例子中仅仅展示 ``title``。你可以轻易的进入并且展示其他的细节像 ``date``，``subtitle`` 等。
5. ``NoteCreationBox``：这个组件渲染了一个 ``TextArea`` 组件，并且如果存在一个当前正在编辑的 日记 id，则传递给它。
6. ``TextArea``：提供一个 ``textarea`` 用于用户输入。传递日记的文本到 ``NoteCreationBox`` 中保存。

## 创建 Actions

我们使用 Reflux 创建一个 action。如果你打开了 ``actions/NoteActions.js``，你会看到 action 是如何被创建的。下面是代码片段：

````
var Reflux = require('reflux');

var NoteActions = Reflux.createActions([
  'createNote',
  'editNote'
]);

module.exports = NoteActions;
````

`Reflux.createActions` 被用作创建 Action。我们导出这些 Action ，在组件中方便使用它们。

## 创建 Store

我们创建了一个叫做 `NoteStore` 的 store，用来维护日记队列。下面的代码用于创建 store（``stores/NoteStore.js``）：

```javascript
var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');

var _notes = []; //This is private notes array

var NoteStore = Reflux.createStore({
  init: function() {
    // Here we listen to actions and register callbacks
    this.listenTo(NoteActions.createNote, this.onCreate);
    this.listenTo(NoteActions.editNote, this.onEdit);
  },
  onCreate: function(note) {
    _notes.push(note); //create a new note

    // Trigger an event once done so that our components can update. Also pass the modified list of notes.
    this.trigger(_notes);
  },
  onEdit: function(note) {
    // Update the particular note item with new text.
    for (var i = 0; i < _notes.length; i++) {
      if(_notes[i]._id === note._id) {
        _notes[i].text = note.text;
        this.trigger(_notes);
        break;
      }
    }
  },

  //getter for notes
  getNotes: function() {
    return _notes;
  },

  //getter for finding a single note by id
  getNote: function(id) {
    for (var i = 0; i < _notes.length; i++) {
      if(_notes[i]._id === id) {
        return _notes[i];
      }
    }
  }
});

module.exports = NoteStore; //Finally, export the Store
```


可以看到，我们监听两个 action，``createNote`` 和 ``editNote``，在 ``init`` 方法中。同样，我们注册了回调函数当 action 被调用时。添加/更新日记的代码很简单。我们暴漏了 getter 用来获取日记列表。最后，store 被暴漏以便它可以在我们组件中使用。

## 创建组件

我们所有的 React 组件都位于 react/components 目录下。我已经展示了 UI 的所有结构。你可以看看下载的源代码，详细了解每个组件。这里我展示看最关键的一部分（例：我们的组件如何调用 action 以及如何与 store 交互）

#### NoteListBox:

这个组件从 ``NoteStore`` 获得了日记列表，并且把它们吐给 ``NoteList`` 组件然后渲染日记。这个组件看起来像下面这样：

```javascript
var React = require('react');
var NoteList = require('./NoteList.jsx');
var NoteStore = require('../../stores/NoteStore');

var NoteListBox = React.createClass({
  getInitialState: function() {
    return { notes: NoteStore.getNotes() };
  },
  onChange: function(notes) {
    this.setState({
      notes: notes
    });
  },
  componentDidMount: function() {
    this.unsubscribe = NoteStore.listen(this.onChange);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    return (
        <div className="col-md-4">
            <div className="centered"><a href="" onClick={this.onAdd}>Add New</a></div>
            <NoteList ref="noteList" notes={this.state.notes} onEdit={this.props.onEdit} />
        </div>
    );
  }
});

module.exports = NoteListBox;
```

当这个组件开始工作，我们就可以开始监听  ``NoteStore`` 的 ``change`` 事件。无论何时在这个日记列表中有变化时都会去广播。我们的组件监听这个事件以便它可以重新渲染这个日记当有任何的变化时。下面这行代码注册一个监听器：

```javascript
this.unsubscribe = NoteStore.listen(this.onChange);
```

因此，无论什么时候发生了变化，组件的 ``onChange`` 方法都会被调用。这个方法接收到一个更新的日记列表然后改变 state。


```javascript
this.setState({
  notes: notes //state changes
});
```

由于 ``this.state.notes`` 是作为一个 ``prop`` 被传递到 ``NoteList`` 中，只要 state 发生了变化 ``NoteList`` 都会重新渲染自己。

最后，我们在 componentWillUnmount 中添加了 ``this.unsubscribe()`` 用来移除监听器。

因此，这就是 ``NoteList`` 如何通过监听 Store 的 change 事件一直处于最新的原因。现在我们看一下一个日记如何被创建/编辑。

#### NoteCreationBox:

仔细看一下 NoteCreationBox 方法：


```javascript
handleSave: function(noteText, id) {
  if (id) {
    NoteActions.editNote({ _id: id, text: noteText });
  } else {
    NoteActions.createNote({ _id: Date.now(), text: noteText });
  }
}
```

每当保存按钮被点击时这个方法都会被调用。它接受 ``noteText`` 作为它的第一个参数。如果 ``id`` 作为第二个参数被传递，我们知道这是一个编辑操作并且调用 ``NoteActions.editNote()``。否则我们会为新的日记生成一个 id 并且调用 ``NoteActions.createNote()`` 方法。记住 ``NoteStore`` 监听了这些 action。根据这个 action，正确的 store 回调被执行。一旦数据发生了更改，store 会触发一个 change 事件并且我们的 ``NoteList`` 组件会更新自己。

这就是在 Flux 应用中数据如何流入系统并且随后流出的。

## 为什么在服务端使用 React

你可能好奇为什么在服务端使用 React 和 Reflux。React 最酷的一个特性就是可以在客户端和服务端渲染。使用这种技术，你可以创建同构的应用，在服务端渲染并且表现的和单页面应用一样。然而这对一个记事本应用不是很必要，你可以轻松地使用这个方案创建一个复杂的同构的应用。

我建议你通读项目源码并且进一步地改造它，因为这里还有很大的提升空间。如果有任何的问题，可以在评论里告诉我。

感谢阅读！

原文：[Creating a Note Taking App with React and Flux](http://www.sitepoint.com/creating-note-taking-app-react-flux/)

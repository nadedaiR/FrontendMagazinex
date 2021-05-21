---
layout:     post
title:      "React 带给 Backbone 开发者的福利"
subtitle:   ""
date:       2015-10-07
author:     "范洪春"
header-img: "/images/lessons_backbone_developers_can_learn_from_react.png"
tags:
    - React
    - Backbone.js
    - ECMAScript6
---

从我开始从事编程职业以来，我一直在整理一个自己想要学习的非正式技术清单。内容一般是对我职业有益处的、能够启发思想的或者仅仅是很酷。我花费了很多劳动节的假期时间一点点地完成这个清单，比如学习 [React](http://facebook.github.io/react/)，来自 Facebook 的 JavaScript 视图层类库。React 是令人痴迷的技术，并且由强大的工具和类库生态正在依附着它生长。对于 2015 年开始的前端项目，React 是我所推荐的两个类库之一，另一个是 [Ember](http://emberjs.com/)。尽管很多开发者可能并不会启动新项目。我们在维护已有的代码，或者使用已有的组件来搭建一个新项目。还好，React 不仅仅是一门技术，更是一种思想。对此，我有很多关于 React 的想法并且找出三点可用于其他框架中（尤其是 [Backbone](http://backbonejs.org/)）。针对于 React 以及它的社区远不止这三点，所以我也在文章底部提供了额外的资源共有兴趣的同学学习。

## 观点 1：界面应该是一个组合起来的组件树


React 界面由很多小的组件构成，每一个组件又可以通过其他更小的组件组合而成。最终，一个常见的 React 界面就像是一个树，最顶层的组件包含了整个应用，并且会有小的自检嵌套其中。这种模式一点都不陌生，浏览器 DOM 就是这样工作的。


以这种方式创建界面使得你能够复用代码，同样让你的代码职责更加清晰。由于你是在组合组件而不是使用继承或者一个庞大的页面对象来创建页面，你可以为每个功能编写通用的代码，比如按钮、日期选择器并且可以做到一次编写，随处可用。甚至是使用多个小组件来创建一个大组件，比如使用 `button`、`input` 和 `overlay` 创建一个 `dialog`。正因为组件很小并且针对性强，就可以更加深入地了解其本质。因为 React 组件的这种构建方式，使得你可以清晰地知道 UI 被哪个组件所控制，不会有其他的代码改变它。


Backbone 没有强制你以特定的方式组织 UI 代码。你可以为整个页面创建一个单独的 Backbone 视图，可以是不同的非嵌套视图来控制页面的不同部分，或者使用嵌套模式。对于简单的站点或者应用，选哪一种都无所谓。对于一个只有一两个交互行为的简单页面来说，你可能不需要检讨的组件树。不过对于大型富应用来说，小的组合视图（或者其他构造块）会更易用，允许你通过组合和匹配来构建多种多样的页面，不会因代码而不知所措。


在 Backbone 中创建这类的树形系统是 [Marionette](http://marionettejs.com/) 的卖点之一，它是 Backbone 架构上最流行的几个类库之一。Marionette 提供了视图集合以及视图排版[方便开发者创建复杂的视图树](http://benmccormick.org/2014/12/22/building-complex-layouts-with-marionette-js/)，在架构上与 React 应用非常类似，同时保持与 Backbone 代码以及 Backbone 社区兼容。它很容易将应用的接口与 Backbone 或者其他“组件”相结合；比如使用 [web components](http://webcomponents.org/)、React 组件甚至 jQuery UI 组件来完成应用中独立的功能模块，然后使用 Backbone 的视图将它们聚合在一起。


但这并不是说没办法使用 Backbone 来实现这种方式。一方面，当嵌套一个 Backbone 视图到另一个中，Backbone 并没有为子视图提供封装。因为 Backbone 视图直接表现为 HTML，当父视图监听到时间或者直接修改 HTML 时，对应的子视图是可以监听到元素上的事件甚至直接修改这些元素。那就可能会导致一些副作用，在一个深度嵌套的视图树中，这意味着一个事件在很多不同的视图中被处罚，并且这些 DOM 的状态可能同时影响到多个区域。在 Backbone 中，这些问题必须通过开发者的约定来解决，对于深度嵌套的 UI 来说有点困难，但是可行。

## 观点 2：全新的 JavaScript 带来更整洁的代码


使用全新的 JavaScript 不仅仅是 React 的想法，更是其社区的努力。在研究 React 时，我发现的几乎所有的代码都是 [ES6 的编码方式](https://babeljs.io/docs/learn-es2015/)，外加一个最新的模块系统（commonJS 或者 ES6 模块借助 [webpack](https://webpack.github.io/) 或者 [browserify](http://browserify.org/)）。很多激进的 React 开发者甚至看准了今天最新的浏览器，在代码中使用了很多标准的以及草案中的 ES7 新特性。我从没有见过以同样的方式来开发 Backbone。他们主要停留在 ES5 方式或者 [CoffeeScript](http://coffeescript.org/)，使用 AMD 模块或者命名空间方式来组织代码。这也许是一个自然的周期：大多数 Backbone 代码示例都是在 3-4 年以前它很流行的时候编写的，而 React 示例基本都是现在写的。而事实是，今天使用 Backbone 的开发者们可以使用新的方式以及工具。就比如 JavaScript API 以及模块加载器就可以用在他们的框架体系之中，这是一个从其他地方借鉴新思想的一种举措，而不是放弃 Backbone。


以下面的实例代码为例。使用了 3 种不同的方式来书写视图层：ES5 命名空间、ES6 和 ES7。可以比较一下每种方式的可读性和易用性。示例仅仅是一个简单的视图，当它被创建时取模板并且会输出一段日志信息，点击两个按钮会展示出不同的弹层，并且在弹层被关闭时调用回调函数。

```javascript
// ES5 命名空间
(function(App, Backbone, Modal, _) {

    App.ExampleView = Backbone.View.extend({

        template: App.templates['exampleview'],

        events: function() {
            'click .example-button': 'showSuccess',
            'click .example-button2': 'showError',
        },

        constructor: function() {
            Backbone.View.apply(this, [].slice.call(arguments));
            console.log('Created a Example View');
        },

        render: function() {
            this.$el.html(_.template(this.template)(this.model.attributes));
        },

        showSuccess: function() {
            this.showModal('You did it');
        },

        showError: function() {
            this.showModal('You failed', 'Error');
        },

        showModal: function(message, title) {
            if (typeof title === 'undefined') {
                title = 'Alert';
            }
            Modal.show(message, title, this.onModalClose.bind(this));
        },

        onModalClose: function() {
            console.log('re-rendering after modal closes to capture any changes');
            this.render();
        },
    })

})(App || {}, Backbone, Modal, _);
```


很明显，这个场景有一点牵强（我们不会在构造函数中添加任何日志信息，并且我们需要监听模型的变化来重新渲染视图而不是简单的丢给回调函数）。但是请注意这些奇怪的做法对于代码的功能来说是至关重要的。这个示例中的很多东西都适合 JavaScript 初学者。为什么文件回一个函数包裹？Backbone 和 Modal 从哪来？`Backbone.View.apply(this, [].slice.call(arguments));`有什么用？甚至于使用这种模块方式时，文件的加载顺序是什么样的。我们其实可以做的更好。

```js
// ES6
import {View} from Backbone;  
import * as Modal from 'utils/modal';  
import {template} from 'lodash';  
import * as ExampleViewTemplate from 'templates/exampleview';

export const ExampleView = View.extend({

    template: ExampleViewTemplate,

    events() {
        'click .example-button': 'showSuccess',
        'click .example-button2': 'showError',
    },

    constructor(...args) {
        View.apply(this, args));
        console.log('Created a Example View');
    },

    render() {
        this.$el.html(template(this.template)(this.model.attributes));
    },

    showSuccess() {
        this.showModal('You did it');
    },

    showError() {
        this.showModal('You failed', 'Error');
    },

    showModal(message, title='Alert') {
        Modal.show(message, title, () => this.onModalClose());
    },

    onModalClose() {
        console.log('re-rendering after modal closes to capture any changes');
        this.render();
    },
});
```


ES6 可以让我们更加简洁地完成上个示例。我们可以去掉最外层包裹的函数，取而代之在文件的顶部直接声明依赖。更清晰的模块加载方式能让开发者更容易发现引用了哪些代码。换言之，我们清理了原有代码中的很多麻烦。我们不在需要切分参数，而使用 `rest` 操作符将所有的参数放到数组中直接传给构造器。类似的，我们不必在 `showModal` 函数中显式地检查 undefined，因为我们使用了默认参数。最后，我们摆脱了 `function`，从对象的方法中彻底移除了这个关键字，使用 ES6 的 lambda 函数取代了 `bind(this)`。所有的这些都是有用的，并且现在在生产环境下表现的也非常稳定。不过，如果我们想先一步使用 ES7 的话，就可以让代码更进一步的整洁。

```js
// ES7
import {View} from Backbone;  
import * as Modal from 'utils/modal';  
import {template} from 'lodash';  
import * as ExampleViewTemplate from 'templates/exampleview';

export class ExampleView extends View {

    template = ExampleViewTemplate;

    constructor(...args) {
        super(args);
        console.log('Created a Example View');
    }

    render() {
        this.$el.html(template(this.template)(this.model.attributes));
    }

    @on('click .example-button')
    showSuccess() {
        this.showModal('You did it');
    }

    @on('click .example-button2')
    showError() {
        this.showModal('You failed', 'Error');
    }

    showModal(message, title='Alert') {
        Modal.show(message, title, ::this.onModalClose);
    }

    onModalClose() {
        console.log('re-rendering after modal closes to capture any changes');
        this.render();
    }
}
```


ES7 的新特性让我们的代码更加整洁，类、静态属性以及用于函数绑定的特定缩写 `::`。同样，也允许我们改进 Backbone 自身的接口。上面的示例使用了 decorator 为视图的方法定义了额外的行为。这个示例中，decorator 允许我们在上下文中为[视图添加事件监听器](http://benmccormick.org/2015/07/06/backbone-and-es6-classes-revisited/)，改善 Backbone 默认提供的事件机制。有很多类似的技巧已经在 React 社区中成为标配。Backbone 开发者们可以通过阅读 React 代码获得很多灵感。React 组件子语法上与 Backbone 的视图很像（尽管底层的模型不同），开发者很容易学习到很多可用于 Backbone 开发中的新的 JavaScript 技术。


## 观点3：不要把 DOM 当做数据的状态


最后一个观点是，Backbone 开发者们可以从 React 中学习到的是坚决抵制使用 DOM 作为数据的状态。React 提倡一个编程模型理论，在任何时候只要数据发生改变，组件就会重新渲染。这意味着所有的 UI 状态一定要在代码中捕获，而不是在 UI 中。这是另一个 Backbone 开发者需要学习的。它意味着取代了 `this.$('.main-content').addClass('highlighted')` 的做法，当需要修改 `contentIsHighlighted` 变量时，你可以重新渲染视图或者基于状态来更新结构。这样一来，应用的状态会存储在代码中，而不是在读取 DOM 后获取的。这会让代码更加好测试，在 HTML 结构发生变化时出现的边界情况也更少。


这个观点对于 Backbone 应用比 jQuery 应用更加奏效。不过事实是，Backbone 在借助模型和集合向代码中拉取应用数据时工作的很好，使得借助 jQuery 帮助函数编码 DOM 中的 UI 状态变得很诱人，而不是提供特有的方式来存储视图状态。尽管如此，这些规范也很重要。通过使用一个分离的 Backbone 模型作为 view-model 或者仅仅将状态作为属性存储到对象上，你可以从 DOM 中拿到状态，并且在你调试或者重构代码时更容易审查。


或许你并不认同将 React 用于 Backbone 的全部观点。React 的哲学是将组件作为无状态的函数，可以获取应用的数据和 UI 状态作为参数，然后返回 UI 层的 HTML 视图。这意味着 React 可以可以实现在任何数据发生改变后完整地重绘而不会丢失信息。React 做到了通过“虚拟 DOM”在数据或者状态发生变化时与现有的 HTML 对比后生成新的 HTML，并且仅仅会修改 DOM 中发生变化的那部分。由于每个组件的职责都很明确，使得这种机制工作的很好。就像上面提到的，Backbone 并没有强耦合视图，使得应用 React 的虚拟 DOM 会很复杂。所以，想方法将视图中的状态抽离出来更加实际一些，然后基于 Backbone 的事件系统（通常的 Backbone 方式）控制重绘。如果你需要一个纯粹的函数成编程方式，将 Backbone 与 React、[cycle.js](http://cycle.js.org/)、[Om](https://github.com/omcljs/om) 或者 [rxjs](https://github.com/Reactive-Extensions/RxJS) 结合会更好。不过，即便在项目中不使用函数式 UI 编程，理解使用 DOM 管理 state 的问题将会帮助你编写更好的 Backbone 应用。

## React 资源汇总


如果你有兴趣学习更多 React 知识，现在已经有很多资源被整理在一起。下面是我发现的一些有用的资源汇总。

### 基础

- The React documentation is also exceptionally well-written and accessible. This blurb on thinking in react is a good place to start.

- 如果你想对 React 做一个大体的任职，我会推荐你从 React 团队在 [2013 年的讨论会视频](https://www.youtube.com/watch?v=x7cQ3mrcKaY)开始，其中一些评论揭示了这个类库背后的设计思想。尽管有一些细节已经发生了改变，但是大体上还是一致的。
- React 的文档同样是写的非常好并且容易理解。这里提供的 [thinking in react](http://facebook.github.io/react/docs/thinking-in-react.html) 是一个很好的入门教程。


### 讲座

- 如果你想知道关于 React 很棒很有潜力的一方面，那么 Redux 创始人 Dan Abramov 的[这个讲座](https://www.youtube.com/watch?v=xsSnOQynTHs)很适合你，主要展示了一个在编写代码时能够显著提升反馈机制以及编写体验的开发者工具。
- [React Europe 的 keynote](https://www.youtube.com/watch?v=PAA9O4E1IM4) 让我们对 React 周围生态的感觉非常好。


### 文章

- Guillermo Rauch 的 [Pure UI]() 是我读过关于 React 所鼓励的 UI 模型的最好阐述，尽管它并不是专门针对 React 的。
- 开发者们最难接受的一个就是当他们第一次在同一个文件中见到混合了 JavaScript 和 HTML 语法的 JSX 的 React 代码。[Eric Elliot 在 meduim 中有一篇很棒的文章](https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918)对这些质疑给予了回复并且解释了 JSX 的意义。

### 项目

- [Flux](https://facebook.github.io/flux/) 是 Facebook 和 React 团队所推荐与 React 一同使用的2个数据管理框架中的一个。另外一个比较新，[Relay](https://facebook.github.io/relay/) 有一些激进，它需要后端 API 返回特定类型的数据。如果你对 Flux 有兴趣，可以去尝试下 [Redux](https://github.com/rackt/redux)，一个聚焦于纯正的函数式编程的 Flux 实现。
- [React Router](https://github.com/rackt/react-router) 是 React 应用的路由，基于 Ember 的路由实现。它提供了很棒的声明式语法，可以基于 JSX 来定义路由。JSX 是 React 中的 JS 语法的扩展，由Facebook 创建的。
- [Babel](https://babeljs.io/) 并不是一个 React 专有的技术，不过如果你想要理解大多数 React 示例或者自己创建一个 React 应用，Babel 非常重要。因为它现在已经是书写 React 代码的标配。


原文： [http://benmccormick.org/2015/09/09/what-can-backbone-developers-learn-from-react](http://benmccormick.org/2015/09/09/what-can-backbone-developers-learn-from-react)

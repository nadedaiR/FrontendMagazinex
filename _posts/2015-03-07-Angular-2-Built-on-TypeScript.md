---
layout:     post
title:      "Angular 2：基于 TypeScript"
subtitle:   "非常兴奋地为大家揭开我们与 Angular 团队合作数月之久的成果！这次合作不但硕果累累，还馈赠给我们非常多的经验。作为合作的一方，我们非常愉快地宣布 Angular2 将基于 TypeScript 来开发。我们期待基于新工具会产生怎样的火花，并且将会持续地与 Angular 团队协作，提升 Angular 开发者的开发体验。"
date:       2015-03-07
author:     "寸志"
header-img: "http://7xrvqo.com1.z0.glb.clouddn.com/images/Angular-2-Built-on-TypeScript.60e69a32.jpg"
tags:
    - Angular2
    - TypeScript
    - Angular
---

非常兴奋地为大家揭开我们与 Angular 团队合作数月之久的成果！

这次合作不但硕果累累，还馈赠给我们非常多的经验。作为合作的一方，我们非常愉快地宣布 Angular2 将基于 TypeScript 来开发。我们期待基于新工具会产生怎样的火花，并且将会持续地与 Angular 团队协作，提升 Angular 开发者的开发体验。

合作的第一个成果将在出现在即将发布的 TypeScript 1.5 中。

我们与 Angular 团队共同设计出了一系列的新的特性，这些特性有助于你在使用类似 Angular2 这样的动态类库时，保持代码清晰。还包含一种新方式，使用元数据来注解类的声明。类库和应用的开发者可以使用这些元数据注释来把代码信息和代码清晰地分开，比如配置信息或者条件检查等等。

我们还添加了一种在运行时中获取类型信息的方式。开启时，开发者可以非常方便地做类型检测。利用额外的运行时检查验证代码的正确性。它还允许像 Angular 中这样的类库使用类型信息来设置依赖注入。

## 基于 TypeScript 的 Angular 2 版 TodoMVC

在 ng-conf 中，我们已经通过一个 TodoMVC 例子预览过这些工作了，这个例子基于 [David East 的 Angular 2 TodoMVC](https://github.com/davideast/ng2do)。你可以自己试试这个例子。如果不熟悉 TypeScript，你可以通过我们交互式的[练操场]((http://www.typescriptlang.org/Playground))学习 TypeScript。

期待你的反馈！

![TypeScript autocomplete in Sublime 3 for Angular 2](http://blogs.msdn.com/resized-image.ashx/__size/550x0/__key/communityserver-blogs-components-weblogfiles/00-00-01-56-67/0820.Sublime_5F00_Intellisense.png)

*Sublime 3 中，TypeScript 针对 Angular 2 的自动补全效果*

期待就在几周内发布 TypeScript 1.5 的 beta 版，随之而来的，还有更多的 TypeScript 工具支持，包含更多的开发模式和环境。非常感谢来自 Angular 团队的 Brad、Igor 和 Miško，非常棒的合作伙伴。特别感谢 Yehuda Katz，它协助我们设计了注解装饰范式，让这些特性成为可能。

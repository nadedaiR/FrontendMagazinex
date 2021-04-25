#NPM 与 left-pad事件：我们是不是早已忘记该如何好好地编程？
[原文](http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/)
*NPM & left-pad: Have We Forgotten How To Program?*

开发者朋友们，我们该谈一谈这个问题了。你们应该知道本周的 `left-pad` 事件：`React`、`Babel` 和许多流行的npm模块都受到波及，无法正常运行。这一事件的起因十分令人诧异。
*Okay developers, time to have a serious talk. As you are probably already aware, this week React, Babel, and a bunch of other high-profile packages on NPM broke. The reason they broke is rather astounding.*

这些受到影响的模块都引入了一个叫做`left-pad`的模块。截至此时，`left-pad`这个模块在Github上也只有寥寥十一个star。在整个模块中，作者只用十一行代码实现了一个简单的字符串处理函数。以下就是这十一行代码：
*A simple NPM package called left-pad that was a dependency of React, Babel, and other packages. One that, at the time of writing this, has 11 stars on GitHub. The entire package is 11 simple lines that implement a basic left-pad string function. In case those links ever die, here is the entire code of left-pad:*


```Javascript
module.exports = leftpad;
function leftpad (str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}
```

让我感到有意思的是，社区中许多的模块都选择引入这个十一行的模块，而不是花上两分钟的时间自己去实现这个简单的字符串填充功能。
*What concerns me here is that so many packages took on a dependency for a simple left padding string function, rather than taking 2 minutes to write such a basic function themselves.*

事件发生之后，我开始仔细研究npm生态系统。以下是一些有趣的发现：
*As a result of learning about the left-pad disaster, I started investigating the NPM ecosystem. Here are some things that I observed:*

- npm上有个叫做`isArray`的模块。今天一天之内，它就被下载了八十八万份；光是今年二月，它就被下载了接近一千八百万份。模块本身只有一行代码：`
  return toString.call(arr) == '[object Array]'`
- 还有一个模块叫做`is-positive-integer`。这个只有四行代码的小模块，竟然还要依赖另外三个模块。事件之后作者把那三个依赖去掉了；但我还是弄不明白作者为什么不早这样做。
- 装一次`babel`模块就要引入四万一千多个文件。
- 随便一个以`npm/jspm`为核心的项目模板就要引入超过两万八千个文件。

*There’s a package called isArray that has 880,000 downloads a day, and 18 million downloads in February of 2016. It has 72 dependent NPM packages. Here’s its entire 1 line of code:*
*return toString.call(arr) == '[object Array]';*
*There’s a package called is-positive-integer (GitHub) that is 4 lines long and as of yesterday required 3 dependencies to use. The author has since refactored it to require 0 dependencies, but I have to wonder why it wasn’t that way in the first place.*
*A fresh install of the Babel package includes 41,000 files*
*A blank jspm/npm-based app template now starts with 28,000+ files*
*All of this leads me to wonder…*

以上这些事实让我觉得，  
##我们是不是早已忘记该如何好好地编程？
*Have We Forgotten How To Program?*

这种过度依赖其他npm模块的做法是不是解决问题的正确方式呢？现在，一个空白项目模板一装好就要引入两万八千多个文件、依赖成百上千个其他的npm模块。这太疯狂了、而且过度复杂。
*On what possible plane of existence is this a better solution to past problems? How are hundreds of dependencies and 28,000 files for a blank project template anything but overly complicated and insane?*

我觉得npm生态系统中，开发者有一种不良的、对微型模块的热衷。相对于自己实现一些小函数，开发者们更愿意去依赖其他人写好的模块。我甚至觉得npm生态系统中的开发者只想尽可能地少写代码，大量引入别人写的模块，拼拼凑凑、串起来交差。
*I get the impression that the NPM ecosystem participants have created a fetish for micro-packages. Rather than write any functions or code, it seems that they prefer to depend on something that someone else has written. It feels to me as if the entire job of an NPM-participating developer is writing the smallest amount of code possible to string existing library calls together in order to create something new that functions uniquely for their personal or business need.*

##一个函数并不能被称为模块
*Functions Are Not Packages*

函数本身太小了，不应该被做成一个模块并被别的项目引入。一个函数本身并没有什么整体意义，只是随便一小段代码而已。假如我们现在要求一个角度的余弦值。我们肯定不会专门为求余弦值引入一个「cosine」模块。如果要算cosine的值，我们更想要一个功能完整、带有其他三角函数的「三角」模块。`.NET`与其他许多框架都选择提供这样一个功能统一又完整的「核心」模块。大部分语言的设计者都会很仔细地编写语言自带的「核心模块」：这部分基本上是很安全没有bug的。
*Functions are too small to make into a package and dependency. Pure functions don’t have cohesion; they are random snippets of code and nothing more. Who really wants a “cosine” dependency? We’d all really like a “trigonometry” dependency instead which encompasses many “tricky” functions that we don’t want to have to write ourselves. This is much more akin to how .NET and other frameworks create a “core” library of basic functionality. Such a library is vetted by the creators of the language and pretty much guaranteed to be correct and bug-free.*

##第三方依赖带来的问题
*Third Party Problems*

首先，没有人能肯定别人写的依赖是不是完全正确的。也许它们都不能正常工作。退一步说，就算这些东西都写对了，它们的实现就是最高效的吗？如果你选择不用依赖自己去写，你至少可以自己fix你能看到的问题、还能去尝试把它写得更高效。这不只是依赖写得对不对的问题。
*There’s absolutely no guarantee that what someone else has written is correct, or even works well. Even if correct, is it the most optimal solution possible? At least when you write the code yourself, you can easily modify it to fix bugs and improve its efficiency. Not that there should be many bugs in 1 line functions.*

其次，就算这些模块的逻辑正确也十分高效，我还是感到十分吃惊：开发者们竟然懒得自己写这些一两行就能实现的功能，选择去依赖别人写的模块；这些功能明明闭着眼睛都能写对。在我看来，如果你连上面提到的`left-pad`、`is-positive-integer`或者`isArray`都不能五分钟内边搜索边调试着写完，你其实根本就不会写代码。哎，这些小功能真应该被当作面试题：写不出来的话，只能说候选人不会写代码。
*Second, even if the package’s logic is correct, I can’t help but be amazed by the fact that developers are taking on dependencies for single line functions that they should be able to write with their eyes closed. In my opinion, if you cannot write a left-pad, is-positive-integer, or isArray function in 5 minutes flat (including the time you spend Googling), then you don’t actually know how to code. Hell, any of these would make a great code screening interview question to determine whether or not a candidate can code.*

最后，我觉得把这些API串到一起、拿别人的模块七拼八凑的做法根本就不叫编程。这只不过是某种七拼八凑、过度设计、把事情复杂化的行为。
*Finally, stringing APIs together and calling it programming doesn’t make it programming. It’s some crazy form of dependency hacking that involves the cloud, over-engineering things, and complexity far beyond what’s actually needed.*

更糟糕的是，如果你的代码或者你引入的代码出了问题或者有些bug，你又不懂得如何真正「编程」，你就无法解决问题。
*What’s worse is that if any of your code (or the 3rd party library code) has a bug or breaks, you won’t know how to debug or fix it if you don’t know how to program.*

##我们应该尽可能减少依赖的模块
*Strive For Few Dependencies*

每个你依赖的模块都会引入其他的模块。这些依赖，顾名思义，是一些你不得不需要的东西。你越多地依赖别人的模块，你的项目就会有越多崩溃的隐患。同时，你的项目出错的机率更大：你根本就不知道这些第三方模块的作者是否靠谱。
*Every package that you use adds yet another dependency to your project. Dependencies, by their very name, are things you need in order for your code to function. The more dependencies you take on, the more points of failure you have. Not to mention the more chance for error: have you vetted any of the programmers who have written these functions that you depend on daily?*

只有在遇到非常复杂，自己解决起来需要花很多时间、金钱的问题时才应该考虑依赖其他模块。比如，当需要一个数据库中间件（ORM）或者一个做客户端缓存的组件时，你应该选择引入一个依赖而不是自己去写，因为这些活儿太耗时、太复杂了。引入这些组件可以省下很多时间；相比之下，它们出问题的风险也变得可以接受。
*Take on a dependency for any complex functionality that would take a lot of time, money, and/or debugging to write yourself. Things like a database access layer (ORM) or caching client should be dependencies because they’re complicated and the risk of the dependency is well worth the savings and efficiency.*

但是除此之外，就算是因为对「编程」这件事的执念，你都应该去写这些基本的小函数。为了一个一两行就能实现的功能多引入一个依赖是一件很蠢的事情。你不信么？尽管想想`left-pad`事件之后`React`团队的感受。现在，他们肯定宁愿自己去实现那个十一行的字符串填充函数。
*But, for the love of all that is programming, write your own bloody basic programming functions. Taking on dependencies for these one-liners is just nuts. Don’t believe me? Just ask the React team how well their week has been going, and whether they wish they had written those 11 lines for left-padding a string themselves.*

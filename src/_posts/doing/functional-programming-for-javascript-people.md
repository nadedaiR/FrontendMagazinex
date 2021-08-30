# Functional Programming for JavaScript People
# 给 JavaScript 开发者讲讲函数式编程

Like many of you, I started hearing a lot about functional programming several months ago and I had no idea what it was. It was just a buzzword to me. Since then, I’ve explored the depths of functional programming and I thought I’d try to help demystify the newcomer who keeps hearing about all this stuff but doesn’t know what to make of it.

和大多数人一样，我在几个月前听到了很多关于函数式编程的东西，不过并没有更深入的了解。于我而言，可能只是一个流行词罢了。从那时起，我开始更深地了解函数式编程并且我觉得应该为那些总能听到它但不知道究竟是什么的新人做一点事情。

When talking about functional programming languages, there tends to be a few flavors: Haskell and Lisp, with plenty of debate over which is better. Although they are both functional languages, they are in fact quite different, each with their own trade-offs. By the end of this article, I hope you have a better idea of what those are. Both have their share of descendant languages as well. Two such languages that you may have heard of are Elm and Clojurescript, both of which compile into JavaScript. But before I get into the specifics of each language, my real goal is to instill in you some of the core concepts and patterns behind functional programming.

谈及函数式编程，你可能会想到它们：Haskell 和 Lisp，以及很多关于哪个更好的讨论。尽管它们都是函数式语言，不过的确有很大的不同，可以说各有各的卖点。在文章的结尾处，我希望你能够对这些有一个更加清晰的认识。它们都在某些更加现代的语言上留下了自己的影子。你可能听说过这样两种语言：Elm 和 Clojurescript，它们两个都可以编译为 JavaScript。不过在我深入了解语言的规范之前，我更想让你们深入了解函数式语言中的一些核心概念和模式。

>I highly recommend having at least one cup of coffee on hand before diving into this rabbit hole.
>强烈推荐在迈入这个函数式编程的新世界之前，在你的桌上摆一杯咖啡。

## Pure Functions
## 纯函数

At the heart of functional programming is the formal mathematics of describing logic: lambda calculus. Mathematicians like to describe programs as transformations of data which leads to the first concept — pure functions. Pure functions are functions without side-effects. Pure functions depend only on the inputs of the function, and the output should be the exact same for the same input. Here’s an example:

函数式编程的核心就是借助形式化数学来描述逻辑：lambda 运算。数学家们喜欢将程序描述为数据的变换，这也引入了第一个概念：纯函数。纯函数无副作用，仅仅依赖于函数的输入，并且当输入相同时输出保持一致。看下面一个例子：

```
// 纯函数
const add10 = (a) => a + 10
// 依赖于外部变量的非纯函数
let x = 10
const addx = (a) => a + x
// 会产生副作用的非纯函数
const setx = (v) => x = v
```

The impure function indirectly depends on x. If you were to change x, then addx would output a different value for the same inputs. This makes it hard to statically analyze and optimize programs at compile-time. But more pragmatically for JavaScript developers, pure functions bound the congnitive load of programming. When you’re writing a pure function, you only need to concern yourself with the body of the function. You don’t need to worry about externalities that could cause problems, like anything that could change x while when you’re writing the addx function.

非纯函数间接地依赖于参数 x。如果你改变了 x 的值，对于相同的 x，addx 会输出不同的结果。这就使得在编译时很难去静态分析和优化程序。不过对 JavaScript 开发者来说更加有用的是，纯函数降低了程序的认知难度。写纯函数时，你仅仅需要关注函数体本身。不必去担心一些外部因素所带来的问题，比如在 addx 函数中的 x 被改变。

## Function Composition
## 函数组合

One nice thing about pure functions is that you can compose them into new functions. One special operator used to describe programs in lambda calculus is compose. Compose takes two functions and “composes” them into a new function. Check it out:

函数式编程中还有一个很棒的东西就是你可以在新的函数中组合它们。一个用于在 lambda 运算中描述程序的很特殊的运算符就是组合。组合将两个函数在一个新的函数中『组合』到一起。如下：

```
const add1 = (a) => a + 1
const times2 = (a) => a * 2
const compose = (a, b) => (c) => a(b(c))
const add1OfTimes2 = compose(add1, times2)
add1OfTimes2(5) // => 11
```

The compose is analogous to the preposition “of”. Notice the order of the arguments and how they’re evaluated: add one of times two — the second function is evaluated first. Compose is the opposite of perhaps a more intuitive function you might be familiar with from unix called pipe, which accepts an array of functions.

组合与介词『of』很像。注意参数的顺序以及它们是如何被计算的：两倍后加一：第二个函数会被先调用。组合与 unix 中的 pipe 函数是刚好相反的，它会接收一个由函数组成的数组作为参数。

```
const pipe = (fns) => (x) => fns.reduce((v, f) => f(v), x)
const times2add1 = pipe([times2, add1])
times2add1(5) // => 11
```

With function composition, we can now build more complicated data transformations by joining together (composing) smaller functions. This article does a great job of showing you how function composition can help you process data in a clean and concise way.

借助函数组合，我们可以通过将多个小函数结合在一起来构建更复杂的数据变化。[这篇文章](http://fr.umio.us/why-ramda/)详细地展示了函数组合是如何帮助你以更加干净简洁的方式来处理数据。

Pragmatically speaking, composition is a better alternative to object oriented inheritance. Here’s a contrived, but real-world example for you. Suppose you need to create a greeting for your users.

从实际来讲，组合可以更好地替代面向对象中的继承。下面是一个有点牵强但很实际的示例。假如你需要为你的用户创建一个问候语。

```
const greeting = (name) => `Hello ${name}`
```

Great! A simple, pure function. Then, your project manager says you now have some more data about your users and wants you to add prefixes to the names. So you go ahead and write this code:

很棒！一个简单的纯函数。突然，你的项目经理说你现在需要为用户展示更多的信息，在名字前添加前缀。所以你可能把代码改成下面这样：

```
const greeting = (name, male=false, female=false) =>
  `Hello ${male ? ‘Mr. ‘ : female ? ‘Ms. ‘ : ‘’} ${name}`
```

This code isn’t terrible, but what if we start adding more and more booleans for other categories such as “Dr.” or “Sir”? What if we add suffixes as well such as “MD” or “PhD”? And what if we want to have a casual greeting that says “Sup” instead of “Hello”? Well now things have really gotten out of hand.
Adding booleans like this to a function isn’t exactly object oriented inheritance, but its a similar situation to when objects have properties and methods that get extended and overridden as they inherit. So as opposed to adding boolean options, lets try to use function composition:

代码并不是很糟糕，不过如果我们又要添加越来越多的判断逻辑，比如『Dr.』或『Sir』呢？如果我们要添加『MD』或者『PhD』前缀呢？又或者我们要变更下问候的方式，用『Sup』替代『Hello』呢？现在事情已然变得很棘手。像这样为函数添加判断逻辑并不是面向对象中的继承，不过与继承并且重写对象的属性和方法的情况有些类似。既然反对添加判断逻辑，那我们就来试试函数组合的方式：

```
const formalGreeting = (name) => `Hello ${name}`
const casualGreeting = (name) => `Sup ${name}`
const male = (name) => `Mr. ${name}`
const female = (name) => `Mrs. ${name}`
const doctor = (name) => `Dr. ${name}`
const phd = (name) => `${name} PhD`
const md = (name) => `${name} M.D.`
formalGreeting(male(phd("Chet"))) // => "Hello Mr. Chet PhD"
```

This is much more manageable and easier to reason about. Each function does a one simple thing and we’re able to compose them together easily. Now, we haven’t handled all the cases here, and for that we can use our handy pipe function!

这就是更加可维护和一读的原因。每个函数仅完成了[一个简单的事情](https://en.wikipedia.org/wiki/Unix_philosophy)，我们很容易就可以将它们组合在一起。现在，我们还没有完成整个实例，接下来使用 pipe 函数！

```
const identity = (x) => x
const greet = (name, options) => {
  return pipe([
    // greeting    
    options.formal ? formalGreeting :
    casualGreeting,
    // prefix
    options.doctor ? doctor :
    options.male ? male :
    options.female ? female :
    identity,
    // suffix
    options.phd ? phd :
    options.md ?md :
    identity
  ])(name)
}
```

Another benefit of using pure functions and function composition is its much easier to trace errors. Whenever you get an error, you should be able to see a stack trace through every function down to the source of the bug. In object oriented programming, its often quite confusing because you don’t always know the state of the rest of the object which led to the bug.

另外一个使用纯函数和函数组合的好处是更加容易追踪错误。无论在什么时候出现一个错误，你都能够通过每个函数追溯到问题的缘由。在面向对象编程中，这通常会相当的复杂，因为你一般情况下并不知道引发改问题的对象的其他状态。

Function Currying
函数柯里化

Function currying was invented by the same guy who invented Haskell — his name: Haskell Curry (correction: named after Haskell Curry). Function currying is when you call a function with fewer arguments than it wants and that function returns another function to accept the rest of the arguments. This is a good article that explains it in more detail, but here’s a simple example using the Ramda.js curry function.

函数柯里化的发明者与 Haskell 的发明者是同一个人-他的名字是：[Haskell Curry](https://en.wikipedia.org/wiki/Haskell_Curry)（以 Haskell Curry 命名）。函数柯里化的本质是，可以在调用一个函数的时候传入更少的参数，而这个函数会返回另外一个函数并且能够接收其他参数。[有一篇非常棒的文章](https://hughfdjackson.com/javascript/why-curry-helps/)非常详细地做了解释，下面是一个使用了 Ramda.js 完成柯里化的简单示例。

In the example below, we create a curried function “add”, which takes in two arguments. When we pass one argument, we get back a partially applied function we call “add1” which only takes one argument.

下面的示例中，我们创建了一个柯里化函数『add』，接收两个参数。当我们传递一个参数时，会得到一个中间函数『add1』，它仅仅会接收一个参数。

```
const add = R.curry((a, b) => a + b)
add(1, 2) // => 3
const add1 = add(1)
add1(2) // => 3
add1(10) // => 11
```

In Haskell, all functions are automatically curried. There are no optional or default arguments.
Pragmatically, function currying is really convenient when using functions with map, compose and pipe. For example:

在 Haskell 中，所有的函数会自动柯里化。没有可选或者默认参数。

通俗地讲，函数柯里化非常适用于在 map、compose 和 pipe 中使用。比如：

```
const users = [{name: 'chet', age:25}, {name:'joe', age:24}]
R.pipe(
  R.sortBy(R.prop('age')), // 通过 age 属性排序
  R.map(R.prop('name')),   // 得到每个 age 属性
  R.join(', '),            // 使用逗号分隔每个 name
)(users)
// => "joe, chet"
```

This makes data processing feel very declarative. Notice how the code reads just like the comments!

这使得数据处理更显声明式。代码就像注释中所描述的一样！

## Monads, Functors, and Fancy Words

Monads and functors are just fancy words for things you already know. If you want to get a firm understanding, I’d highly suggest reading this article which does a great job of explaining with awesome graphics. But this stuff really isn’t all that complicated.

[Monads](https://en.wikipedia.org/wiki/Monad_%28functional_programming%29) 和 [functors](https://en.wikipedia.org/wiki/Functor)可能只是你所知道的两个流行词。如果你想更深层次地理解它们，我强烈推荐[这篇文章](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)，使用了非常棒的图形来做解释。不过这东西并没有那么的复杂。

Monads are pretty interesting though. Monads can be thought of as a container for a value, and to open up the container and do something to the value, you need to map over it. Here’s a simple example:

尽管 Monads 是非常有趣的。Monads 可以看成是 value 的一个容器，可以打开这个容器并对 value 做一些处理，你需要对它进行一个 map 操作。看下面这个简单示例：

```
// monad
list = [-1,0,1]
list.map(inc) // => [0,1,2]
list.map(isZero) // => [false, true, false]
```

The important thing about monads and functors is that mathematicians have been researching these ideas in category theory. This provides us not only a framework for understanding programs, but algebraic theorems and proofs we can use to statically analyze and optimize our code when it’s compiled. This is one of the main benefits of Haskell — the Glasgow Haskell Compiler is a feat of human ingenuity.

关于 monads 和 functors 有一件很重要的事情，就是数学家们也在[分类理论](https://en.wikipedia.org/wiki/Category_theory)中研究这些观点。这不仅帮助我们理解程序的框架，而且提供了可用于在编译时静态分析和优化我们的代码[代数定理和证明](https://en.wikipedia.org/wiki/Monad_%28category_theory%29#Algebras_for_a_monad)。这是 Haskell 的好处之一-[Glasgow Haskell 编译器](https://en.wikipedia.org/wiki/Glasgow_Haskell_Compiler) 是人类智慧的壮举。

There are all kinds of theorems and identities expressed in category theory. For example, here’s a simple identity:

有很多种定理和特征存在于分类理论中。比如，下面是一个简单的特征：

```
list.map(inc).map(isZero) // => [true, false, false]
list.map(compose(isZero, inc)) // => [true, false, false]
```

When map is compiled, it uses an efficient while loop. In general this is a O(n) operation (linear time), but there is still overhead associated with incrementing the pointer to the next item in the list. So the second version is actually twice as performant. These are the kind of transformations that Haskell does to your code at compile-time to make it blazingly fast — and there’s a really cool trick to doing this that I’ll explain later.

在 map 被编译后，它会使用一个更加高效的方式进行循环。通常是一个 [O(n) 操作（线性时间）](https://en.wikipedia.org/wiki/Computational_complexity_theory)，不过它依然强依赖于列表中下一项指针的增长。所以第二种在性能上是前一种的2倍。这些也是 Haskell 在编译时对你的代码所做的转化，使它变得非常快-有一个很酷的技巧可以做到这个，我一会儿解释。

To expand on monads just a little, there’s a very interesting monad called the Maybe monad (sometimes called Option or Optional in Swift). In Haskell, theres no such thing as null or undefined. To express something as being potentially null, you need to wrap it in a monad so the Haskell compiler knows what to do with it.

为了对 monads 做一点扩展，出现了一个很有趣的 monad 被称作 『Maybe monad』（在 Swift 中通常叫做 Option 或者 Optional）。在 Haskell，并没有类似 null 或者 undefined 的东西。为了方便表示潜在为 null 的变量，你可以将它包在 monad 中，Haskell 编译器会知道如何处理。   

The Maybe monad is a union type that’s either Nothing or Just something. In Haskell you’d define a Maybe like this:

Maybe monad 是一种组合类型，就像 Nothing 或者 Just something。在 Haskell 可以如下定义 Maybe：  

```
type Maybe = Nothing | Just x
```

The lowercase x just means any other type.

小写的 x 仅仅意味着任何其他类型。

Being a monad, you can .map() over a Maybe to change the value it contains! When you map over a Maybe, if it of type Just, then we apply the function to the value and returns a new Just with that new value. If a the Maybe is of type Nothing, then we return Nothing. In Haskell, the syntax is quite elegant and uses pattern matching, but in JavaScript you might use a Maybe like this:

作为一个 monad，你可以在 Maybe 上使用 `.map()` 来改变它所包含的值！当你对一个 Maybe 进行 map 时，如果是 Just 类型，将值应用于函数并且返回一个带有新 value 的新的 Just。如果 Maybe 是 Nothing 类型，则返回 Nothing。在 Haskell 中，语法相当的优雅并且使用了模式匹配，不过在 JavaScript 中你可能需要这样使用 Maybe：

```
const x = Maybe.Just(10)
const n = x.map(inc)
n.isJust() // true
n.value() // 11
const x= Maybe.Nothing
const n = x.map(inc) // no error!
n.isNothing // true
```

This monad may not seem terribly useful in your Javascript code, but its interesting to see why it’s so useful in Haskell. Haskell requires you to define what to do in every edge-case of your program, otherwise it won’t compile. When you make an HTTP request, you get back a Maybe type because the request may fail and return nothing. And if you didn’t handle the case in which the request failed, then your program won’t compile. This basically means that it’s impossible to get runtime errors. Maybe your code does the wrong thing, but it doesn’t just magically break like things tend to do in Javascript.

这个 monad 在 JavaScript 代码中可能不是非常的有用，不过搞懂为何在 Haskell 中这么有用可能更有趣。Haskell 要求必须定义程序中每一种边界情况的处理方法，否则它就不会编译。当你发送一个 HTTP 请求，你会得到一个 Maybe 类型，因为请求可能失败并且什么都不会返回。如果你没有处理请求失败的情况，程序也不会编译。这就意味着程序不可能产生运行时错误。或许你的代码出错了，不过它不会像 JavaScript 中那样直接中断执行。

>This is a big selling point for using Elm. The type system and compiler enforces that your program will run without runtime errors.

>这也是 Elm 的一个大卖点。类型系统和编译器强制你的程序在没有运行时错误的情况下才能运行。

Thinking about code in the context of monads and algebraic structures will help you define and understand your problem in a structured way. For example, an interesting extention of Maybe is the Railway-Oriented Programming concept for error handling. And observable streams are monads as well for dealing with asynchronous events.

分析一下上下文中的 monads 和代数结构中的代码将有助于你以一种结构化的方式来定义和理解你的问题。比如，Maybe 一个有趣的扩展就是用于错误处理的面向轨道编程的概念。值得注意，monads 也适用于处理异步事件。

There are all kinds of fancy monads and many other words that I don’t myself fully understand. But to keep all the lingo consistent, there are specifications like fantasy-land and the typeclassopedia which try to unify different concepts in category theory for the purpose of writing idiomatic functional code.  

有很多种有趣的 monads 以及很多我自己也没能完全理解的词语。不过为了保证术语的一致性，已经有类似于 [fantasy-land](https://github.com/fantasyland/fantasy-land) 的规范和 [typeclassopedia](https://wiki.haskell.org/Typeclassopedia) 尝试在分类理论中统一不同的概念来达到书写符合规范的代码。

## Referential Transparency and Immutability
## 引用的透明性和不可变

Another implication of leveraging all this category theory and lambda calculus stuff is referential transparency. Its really hard for mathematicians to analyze logical programs when two things that are the same aren’t equal to each other. This is an issue all over the place in Javascript.

另一种可能影响到整个分类理论和 lambda 计算的东西就是引用的透明性。当完全一样的两个东西彼此却不相等时，让数学家来分析逻辑程序同样是非常困难的。这也是 JavaScript 中普遍存在的一个问题。

```
{} == {} // false
[] == [] // false
[1,2] == [1,2] // false
```

Now imagine having to do math in a world without referential transparency. You wouldn’t be able to write proofs that say that an empty array is the same things as an empty array. What should matter is only the value of the array, not the reference pointer to the array. And so functional programming languages resort to using deep-equals to compare values. But this isn’t terribly performant, so there are some neat tricks to make this comparison quicker that leverages references.

现在假设在一个不存在引用透明性的世界来进行运算。你根本不需要任何证据就可以确信一个空数组与另一个空数组相等。这里面起作用的仅仅是数组的值，而不是数组所引用的指针。所以函数式编程语言最终使用了深比较来对比两个值。不过性能上并不完美，所以有几个小技巧可以让这个比较更加快速。

Before moving on, I just want to make one thing clear: in functional programming, you cannot mutate a variable without changing its reference. Otherwise, the function performing the mutation would be impure! Thus, you can assure that if two variables are referentially equal, their values must be equal as well. And since we can’t mutate variables in-place, then we have to copy those values into a new memory location every time we want to transform it. This is a huge performance loss and results in garbage thrashing. But the solution is using structural sharing (persistent data structures).

在继续讨论之前，我需要澄清一件事情：在函数式编程中，不能够在没有改变引用的情况下来改变一个变量。否则，函数表现出的变化可能不纯！因而，你能够确保如果两个变量的引用相同，它们的值也一定相等。同样因为我们不能直接更改变量，所以每当我们想要改变它的时候，都需要那些值拷贝到一个新的存储空间上。这是一种巨大的性能损失并且可能导致垃圾抖动。不过解决方案就是使用结构共享（持久化数据结构）。

A simple example of structural sharing is a linked list. Suppose you only keep a reference to the end of the list. When comparing two lists, you can first start by seeing if the ends are referentially equal. This is a nice shortcut because if they are equal, then you’re done — the two lists are the same! Otherwise, you’ll have to start iterating through the items in each list to see if their values are equal. To efficiently add a value to this list, rather than copying entire the list into a new set of memory, you can simply add a link to a new node and keep track of the reference at the new tip. Thus, we’ve structurally shared the previous data structure in a new data structure with a new reference and we’ve persisted the previous data structure as well.

一个结构共享的简单示例就是链表。假如你仅仅保持对链表尾部的一个引用。当比较两个链表时，你可以先比较尾部的引用是否相同。这是一个很棒的捷径，因为如果相等，就结束了比较——两个链表相同！否则，你就需要递归表中的每个元素来判断它们的值是否相等。可以高效地将某个值添加到表中，而不是复制整个表到一个新的内存中，你可以简单地向一个新的节点上添加一个链接，然后记录这个引用。这样，我们通过一个新的引用在一个新的数据结构中已经在结构上共享了上一个数据结构，并且也对前一个数据结构进行了持久化。

The generalized data structure for doing these immutable data transformations is called a hash array mapped trie (HAMT). This is exactly what Immutable.js and Mori.js do. Both Clojurescript and Haskell have this built into the compiler, although I’m not sure it’s implemented in Elm yet.

用于改变这些不可变数据的数据结构被称为哈希映射的数组索引（HAMT）。这也是 Immutable.js 和 Mori.js 主要做的。Clojurescript 和 Haskell 已经在编译器中完成了这一步，虽然我还不确定 Elm 中是否实现。

Using immutable data structures can give you performance gains, and help keep your sanity. React assumes props and state are always immutable so it can do an efficient check to see if the previous props and state are referentially equal to the next props and state before unnecessarily re-rendering. And in other circumstance, using immutable data simply helps to ensure that values aren’t changing without you realizing it.

使用不可变数据结构会给你带来性能上的改善，并且有助于你保持理智。React 假定 props 和 state 是不可变的，这样它就能够有效地检测出前一个 props 和 state 和下一个 props 和 state 在引用上是否相等，来减少不必要的重绘。在其他情况下，使用不可变数据很便捷地帮助你确保值不会在毫无征兆的情况下发生改变。

## Lazy Evaluation
## 延迟计算

Lazy evaluation is sort of a general term that covers more specific concepts like thunks and generators. Lazy evaluation means exactly what you think it does: don’t do something until you absolutely have to, be lazy and procrastinate as long as possible. One analogy is to suppose you have a large, possibly infinite, amount of dishes to wash. Rather than put all the dishes in the sink and wash them at once, let’s be lazy and just take one dish at a time.

延迟计算是一类包含了很多类似 thunk 和 generator 规范概念的通用术语。延迟计算就和你所想的一样：不会在必须做某件事情之前做任何事，尽可能长时间的延后。一个类比就是假如你有无限量的盘子要洗。你就不会将所有的盘子都放到水池中然后一次性清洗它们，我们可以偷懒一下，一次仅仅洗一个盘子。

In Haskell, the true essence lazy evaluation is a little easier to understand, so I’m going to start there. First, we need to understand how programs evaluate. Pretty much every language you’re used to uses innermost reduction. Innermost reduction looks like this:

在 Haskell 中，延迟计算的本质更加容易理解，所以我会从它说起。首先，我们需要理解程序是如何计算的。我们所使用的大部分语言使用的都是由内而外的规约，就像下面这样：

```
square(3 + 4)
square(7) // 计算最内层的表达式
7 * 7
49
```

This is a sane and reasonable way of evaluating programs. But now, let’s consider outermost reduction:

这也是比较明智的程序计算方式。不过我们先来看一下向外而内的规约。

```
square(3 + 4)
(3 + 4) * (3 + 4) // 计算最外层的表达式
7 * (3 + 4)
7 * 7
49
```

Outermost is clearly less efficient — we’ve had to compute 3 + 4 twice, so the program took 5 steps instead of 4. This is no good. But Haskell keeps a reference to each expression and shares these references as they’re passed down to parent expressions through the outermost reduction. Thus, when 3 + 4 is evaluated the first time, the reference to this expression now points to the expression, 7. Thus we get to skip the duplicate step.

显然，由外而内规约的方式不够明智——我们需要计算两次 `3 + 4`，所以程序共花费了 5 步。这有点糟糕。不过 Haskell 保留了对每个表达式的引用并且在它们由外而内规约时传递共享的引用。这样，当 `3 + 4` 被首次计算后，这个表达式的引用会指向新的表达式 `7`。这样我们就跳过了重复的步骤。

```
square(3 + 4)
(3 + 4) * (3 + 4) // 计算最外面的表达式
7 * 7 // 由于引用共享的存在，计算此时减少了一步
49
```

>Fundamentally, lazy evaluation is outermost evaluation with reference sharing.

>本质上，延迟计算就是引用共享的由外而内计算。

Haskell does all this stuff under the hood for you, and what that means is you can define things like infinite lists. For example, you can recursively define an infinite list of ones as 1 joined with itself.

Haskell 在内部为你做了很多事情，并且这也意味着你可以像无限的列表一样定义东西。比如，你可以递归地定义一个无限的列表。


```
ones = 1 : ones
```

Suppose you have a function take(n, list) which takes the first n elements of a list. If we used innermost reduction, we’d recursively evaluate list forever, because it’s infinite. But instead, with outermost reduction, we lazily evaluate ones for just as many ones as we need!

假设现在有一个 `take(n, list)` 函数，它的第一个参数是一个 n 元素的列表。如果我们使用由内而外的规约，可能会出现无限递归计算一个列表，因为它是无限的。不过，借助由外而内计算，我们可以实现按需延迟计算！

However, since JavaScript and most other programming languages use innermost reduction, the only way we can replicate these constructs is by treating arrays as functions. For example:

然而，由于 JavaScript 和大多数编程语言都使用了由内而外的规约，我们复制这种架构的唯一方式就是将数组看成是函数，如下示例：

```
const makeOnes = () => {next: () => 1}
ones = makeOnes()
ones.next() // => 1
ones.next() // => 1
```

Now we’ve effectively created a lazily evaluated infinite list based on the same recursive definition. Lets create an infinite list of natural numbers:

现在，我们已经基于相同的递归定义创建了一个延时计算无限列表的表达式。现在我们创建一个自然数的无限列表：

```
const makeNumbers = () => {
  let n = 0
  return {next: () => {
    n += 1
    return n
  }
}
numbers = makeNumbers()
numbers.next() // 1
numbers.next() // 2
numbers.next() // 3
```

In ES2015, there’s actually a standard for this and they’re called function generators.

在 ES2015 中，确实为此实现了一个标准，并且称为函数 generator。

```
function* numbers() {
  let n = 0
  while(true) {
    n += 1
    yield n
  }
}
```

Laziness can give you huge performance gains. For example, check out Lazy.js operations per second compared to Underscore and Lodash:

延迟可以带来巨大的性能效益。比如，你可以对比一下每秒钟 Lazy.js 计算与 Underscore 和 Lodash 的区别：

![](https://cdn-images-1.medium.com/max/2000/1*gmsdj0qNqAbgxIlqO089dw.png)

Here’s a great example of why that is (given by the Lazy.js website). Suppose you have a huge array of people and you want to perform some transformations on it:

下面是解释它的原理的一个很好的示例（Lazy.js 网站给出的）。假定你现在有一个巨大的数组（元素是人），并且你想对它执行某些转换：

```
const results = _.chain(people)
  .pluck('lastName')
  .filter((name) => name.startsWith('Smith'))
  .take(5)
  .value()
```

The naïve way of doing this would be to pluck all the lastNames off, filter the entire array, and then take just the first 5. This is what Underscore.js and most other libraries do. But with generators, we can lazily evaluate the expression by going one value at a time until we have 5 last names that start with “Smith”.

完成这件事最原始的方式就是将所有的名字拣出来，过滤整个数组，然后使用前 5 个。这就是 Underscore.js 以及绝大多数类库的做法。不过使用 generator，我们可以使用延迟计算 每次仅计算一个值，直到我们拿到了以 『Smith』开头的名字。

What’s amazing about Haskell is that this is all baked into the language by using outermost reduction and reference sharing. Every list is inherently lazy. In Javascript, you should probably just use Lazy.js, but if you wanted to create something like this of your own, you just need to understand that each step above returns a new generator. To get values out of a generator, you need to ask for them by calling .next(). The chain method turns the people array into a generator, and each transformation accepts a generator and returns another generator. Then, when you call .value() it simply calls .next() repetitively until there are no more values left. And .take(5) will make sure that you aren’t processing more values than you need to!

Haskell 给我们最大的惊喜就是所有的这些都在语言内部借助由外而内规约和引用共享实现了。在 JavaScript 中，我们能够借助于 Lazy.js，不过如果你想要自己创建这类东西，你就需要理解上述的每一步，返回一个新的 generator。想要拿到一个 generator 中的所有值，你就需要为它们调用 `.next()`。这个链方法会将数组编程一个 generator。然后，当你调用 `.value()` 时，它就会反复的调用 `next()` 方法，直到没有更多的值存在时。并且 `.take(5)` 可以确保不会去计算比你需要的更多的的计算！

Now remember that theorem earlier:

现在回忆一下之前提到的定理：

```
list.map(inc).map(isZero) // => [false, true, false]
list.map(compose(isZero, inc)) // => [false, true, false]
```

Lazy evaluation, inherently does these kind of optimizations for you.

延迟计算，在内部帮你完成了这类优化。

## Clojure Patterns and Features
## Clojure 模式和特性

I’ve talked a lot about Haskell so I want to explain where Clojure fits in to all of this. Clojure has referential transparency, immutable data types, and you cannot mutate variables in-place except for special transactional types called atoms. This is incredibly convenient sometimes when compared to Haskell, where you would be forced to scan values over a stream simply to record values in an associative array to recall elsewhere. Clojure also does not have a strong type system or an insanely powerful compiler like the Glasgow Haskell Compiler. And there is such thing as null in Clojure. That said, functional patterns are strongly encouraged and hard not to use in Clojure.

我已经讨论了很多关于 Haskell 的问题，现在我想解释一下 Clojure 在哪些方面也完全符合这个。Clojure 具有引用透明性、不可变数据类型，并且你不能任意更改一个变量，除特殊的原子类型外。这使得在 Haskell 中作对比计算时难以置信的方便，它会强制去扫描数组中的每个元素，并且将所有值记录到一个关联数组中，然后随处都可调用。Clojure 也同样没有强类型系统，也没有类似 Glasgow Haskell 这样强大的编译器。并且在 Clojure 中没有 null 这种东西。也就是说，函数式模式被强烈地推荐并且在 Clojure 中很难不使用到它。

There are two things about Clojure that really stand out to me though: Everything is a primative data type in Clojure, called EDN — the Clojure version of JSON. Rather than having objects and types, everything is just some primitive data structure that’s interpreted however you want. For example, in JavaScript, we have native Date objects. But what happens when you want to serialize a date to JSON? Well you need to create your own custom serializer/deserializer. In Clojure, you might express a date as an associative array with a timestamp and a timezone (unless you’re using the Java implementation). Any string formatting functions just assume the same data structure. So in Clojure, there’s a strong emphasis on data, data transformations, and data processing. Everything is data.

关于 Clojure 有两件事情给我留下很深的印象：在 Clojure 中所有的东西都是一个私有数据类型，叫做 EDN——Clojure 版本的 JSON。替换了对象和类型，所有东西都只是一些私有数据结构，可用于表示你想要的所有东西。比如，在 JavaScript 中，我们有原生的 Date 对象。不过当你想要将 date 序列化为一个 JSON 时发生了什么呢？你需要创建你自己的自定义 serializer 或 deserializer。在 Clojure 中，你可能需要将一个日期表示为一个有时间戳和时区组成的关联数组（除非你使用 Java 实现）。任何字符串格式的函数仅仅假定为相同的数据结构。所以在 Clojure 中，数据很重要，数据转换，以及数据加工。一切皆数据。

The other really cool thing about Clojure is that code is data. Clojure is a Lisp which stands for list processing. The language is just an interpretation of lists where the first item in a list is a function and the rest of the items are arguments — which is why they like to say there’s a Lisp in every language. What’s so cool about Lisps, though, is you can create insanely powerful macros. The macros most people are used to are text substitution macros, where you generate code using some kind of string template. And there’s a cool library for doing this in Javascript called Sweetjs. But in Clojure, since the code itself is just a list, you can inspect the code as a list at compile-time, transform the code, and then evaluate it! This is really convenient for wiring up repetitive boilerplate and allows you to essentially create whatever syntax you want to express something. To do the same thing in JavaScript, you’d need to get very familiar with Babel Plugins and the JavaScript Abstract Syntax Tree (AST) and create your own transpiler. But in Clojure, the AST is just a list!

Clojure 另外一个非常酷的地方就是代码即数据。Clojure 是一个表处理语言，它就是一个列表的解释器，第一项是一组函数，其余的是参数——这也就是为什么很多人都会说在每种语言中都存在一个 Lisp 的原因。不过 Lisp 更酷的一点就是它能够创建异常强大的宏。大多数人所用的宏仅限于文本替换宏，你可以使用某种字符串模板来生成代码。并且在 JavaScript 中有一个称为 `Sweetjs` 的强大类库。不过在 Clojure 中，由于代码本身就是一个列表，你可以在编译时审查代码，转换代码，最后计算！这对于编写连续重复的东西很方便，最大限度的允许你创建你想要表达的语法。如果在 JavaScript 中做这件事，你需要有一个类似 Babel 的插件以及 JavaScript 抽象语法树（AST）并且要创建你自己的编译器。不过在 Clojure 中，AST 仅仅是一个列表！

One of the big features of Clojure is the core.async library for handling asynchronous communication, and it has a beautiful way of using macros. In the following example, we create a channel, and the go function is actually a macro.

Clojure 最大的特性之一就是用于处理异步通信的 `core.async` 库，并且用一个非常优雅的方式来使用宏。在下面的示例中，我们创建了一个 channel，里面的 go 函数实际上就是一个宏。

```
(def echo-chan (chan))
(go (println (<! echo-chan)))
(>!! echo-chan "ketchup")
; prints ketchup
```

What’s amazing here is that go is actually interpretting its argument as a list to generate a bunch of nasty async code that nobody wants to write. It’s looking for `<!` which is a symbol for essentially subscribing to the channel. Then it generates some code that does the job. Look at all this nasty code that we don’t have to write or deal with:

这里更为惊奇的是 go 把它的参数理解为一个列表，然后生成了没有人愿意去写的异步代码。代码中的 `<!` 就是一个用于订阅 channel 的符号。然后它生成了一些代码来完成这项工作。下面就是我们不用去写或者处理的恶心代码：

```
user=> (macroexpand ‘(go (println (<! echo-chan))))
(let* [c__6888__auto__ (clojure.core.async/chan 1) captured-bindings__6889__auto__ (clojure.lang.Var/getThreadBindingFrame)] (clojure.core.async.impl.dispatch/run (clojure.core/fn [] (clojure.core/let [f__6890__auto__ (clojure.core/fn state-machine__6712__auto__ ([] (clojure.core.async.impl.ioc-macros/aset-all! (java.util.concurrent.atomic.AtomicReferenceArray. 8) 0 state-machine__6712__auto__ 1 1)) ([state_8650] (clojure.core/let [old-frame__6713__auto__ (clojure.lang.Var/getThreadBindingFrame) ret-value__6714__auto__ (try (clojure.lang.Var/resetThreadBindingFrame (clojure.core.async.impl.ioc-macros/aget-object state_8650 3)) (clojure.core/loop [] (clojure.core/let [result__6715__auto__ (clojure.core/case (clojure.core/int (clojure.core.async.impl.ioc-macros/aget-object state_8650 1)) 1 (clojure.core/let [inst_8644 println inst_8645 echo-chan state_8650 (clojure.core.async.impl.ioc-macros/aset-all! state_8650 7 inst_8644)] (clojure.core.async.impl.ioc-macros/take! state_8650 2 inst_8645)) 2 (clojure.core/let [inst_8644 (clojure.core.async.impl.ioc-macros/aget-object state_8650 7) inst_8647 (clojure.core.async.impl.ioc-macros/aget-object state_8650 2) inst_8648 (inst_8644 inst_8647)] (clojure.core.async.impl.ioc-macros/return-chan state_8650 inst_8648)))] (if (clojure.core/identical? result__6715__auto__ :recur) (recur) result__6715__auto__))) (catch java.lang.Throwable ex__6716__auto__ (clojure.core.async.impl.ioc-macros/aset-all! state_8650 clojure.core.async.impl.ioc-macros/CURRENT-EXCEPTION ex__6716__auto__) (clojure.core.async.impl.ioc-macros/process-exception state_8650) :recur) (finally (clojure.lang.Var/resetThreadBindingFrame old-frame__6713__auto__)))] (if (clojure.core/identical? ret-value__6714__auto__ :recur) (recur state_8650) ret-value__6714__auto__)))) state__6891__auto__ (clojure.core/-> (f__6890__auto__) (clojure.core.async.impl.ioc-macros/aset-all! clojure.core.async.impl.ioc-macros/USER-START-IDX c__6888__auto__ clojure.core.async.impl.ioc-macros/BINDINGS-IDX captured-bindings__6889__auto__))] (clojure.core.async.impl.ioc-macros/run-state-machine-wrapped state__6891__auto__)))) c__6888__auto__)
```

## Conclusion
## 结论

That’s basically everything I’ve learned about functional programming in the last few months. I hope that really helps people, especially the JavaScript community, write better code and inevitably create even more awesome things!

这基本是我近几个月所学习到关于函数式编程的全部内容。我很希望能帮助到他人（尤其是 JavaScript 社区中的）编写更好的代码带来更加经验的东西！

As for the never-ending debate on Haskell vs Clojure, I think it’s impossible to say which is better because they’re different. Haskell is the the fundamentals of functional programming. Haskell people literally call themselves programming fundamentalists. Haskell is rigid, specific, bulletproof, and ridiculously fast and compact. Clojure is malleable, abstract, and empowering. You can do anything in Clojure because its written on the JVM (and you can do pretty much anything in Java). In Clojure you can build off decades of work in tried and tested Java algorithms. Clojure also has a unique culture of creative programmers behind it with really cool libraries like Overtone and Quill.

就像关于 Haskell 和 Clojure 永无休止的争论一样，我认为很难说哪一个更好，因为它们是不同的。Haskell 是函数式编程的根本。使用 Haskell 的人会直接称自己是编程的基要派。Haskell 是苛严的、明确的、坚不可摧的，并且不可思议的快和可靠。Clojure 更具延展性、抽象和赋权使能的。你可以在 Clojure 中做任何事情，因为它写在 JVM 上（做你能够在 Java 中做的任何事）。在 Clojure 中，你可以构建 Java 这十多年来留下的所有东西以及检测 Java 算法。Clojure 具备了独特的开发者文化，在它背后有很酷的类库，像 Overtone 和 Quill。

As far as the Javascript world, I would love to see things moving more into the realm of pure functions. I don’t ever want to see this again. And let’s also get in the habit of only using const types rather than the mutable var or let.

在 JavaScript 世界，我很期待让事情朝向纯函数的领域发展。我再也不想看到 「this」了。还有让我们养成值使用 const 类型的习惯，而不是使用可变的 var 或者 let。

Two of my absolute favorite JavaScript libraries are Ramda and Flyd. But Ramda isn’t lazy and doesn’t play nice with Immutable.js. I’d really like to see a library that combines all of these concepts — persistent / shared / immutable data structures with curried, lazily evaluated, composable utility functions.

我非常喜欢的2个 JavaScript 库是 Ramda 和 Flyd。不过 Ramda 不是延时计算的并且对 Immutable.js 不友好。我很期待看到一个结合了所有这些概念的类库——持久化、共享、不可变数据结构，并且柯里化、延时运算，有很多有用的功能。

And I’d also like to see libraries using a more consistent language for describing things — the new ES2015 Promises API, for example, uses .then as opposed to .map even though a Promise is totally a monad! This means, that you can’t use Ramda for processing data inside native promises because R.map won’t work. I think the aptly named Fantasyland specification is a grand ideal because it tries to unify the language that all programming data structures speak. If all these libraries like Ramda, Lodash, Lazy.js, Immutable.js, and even the native data primitives like promises use this common language, we can use reuse way more code. You could swap out your native Javascript arrays for Immutable.js lists without having to rewrite all the data processing code you’re using in Ramda or Lazy.js.

当然，我更希望能够看到一个类库使用一个更加连续的语言来阐述这些东西——新的 ES2015 API，比如，使用 `.then()` 而不是 `.map()`，尽管 Promise 本质上就是一个 monad！也就是说，你没法在原生的 promise 中使用 Ramda 来处理数据，因为 `R.map` 不会生效。我认为恰当的命名 Fantasyland 规范很有必要，因为它尝试将所有的编程语言的数据结构统一。如果所有的这些类库，比如 Ramda、Lodash、Lazy.js、Immutable.js，甚至像 promise 这样的原生数据，都使用了这种语言，我们将能够复用更多的代码。你就可以将我们原生的 JavaScript 数组使用 Immutable.js 列表来包裹，而不必去重写 Ramda 或者 Lazy.js 中所有的数据处理代码。

Anyways, I hope you enjoyed reading this. Please let me know if you didn’t understand something or if something made a lot of sense to you so I can improve my writing/mind-barfing — ccorcos@gmail.com.

不管怎样，我希望你能够喜欢这篇文章。如果你没有理解某些东西或者有什么自己的想法请发邮件 ccorcos@gmail.com 告诉我，同样帮助我提升写作能力。

Happy Hacking

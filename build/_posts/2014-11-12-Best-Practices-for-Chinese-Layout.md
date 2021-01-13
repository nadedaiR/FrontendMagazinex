---
layout:     post
title:      "中文排版的最佳实践——使得长篇文章更易读的十条法则"
subtitle:   "使得长篇文章更易读的十条法则"
date:       2014-11-12
author:     "寸志"
header-img: "/images/Best-Practices-for-Chinese-Layout.34375a73.jpg"
tags:
    - 中文排版
    - CSS3
---

如果你想把你的业务扩展到亚洲，首先会碰到的是语言壁垒（然后是GFW）。中日韩三国使用不一样的排版规则。[Requirements for Japanese Text Layout](http://www.w3.org/TR/jlreq/) 是一个不错的参考，不过就是太长，读也读不完。[Requirements for Hangul Text Layout and Typography](http://www.w3.org/TR/klreq/) 倒还好。我本人还在编写 Requirement for Chinese Text Layout 的草稿。

在我完成这个文档之前，先给大家十条法则，帮助你更好地做中文排版。

## 1. 不一样的标点符号

由于某些原因，台湾和香港的繁体中文阅读者一点都不喜欢阅读简体中文，反过来，大陆的中国人阅读起繁体也很吃力。

中文字体非常多，作为一个设计师的你，该如何区分字体是繁体的还是简体的？

很简单，输入全角的逗号和句号，如果字符是居中的，那就是繁体中文；如果和日文一样位于左下角的话，那就是简体中文。

千万别忘了，所有的符号都要是全角的。

![不一样的标点符号](https://d262ilb51hltx0.cloudfront.net/max/1330/1*DtVIIeWgKPokUywK1ecxZg.png)

## 2. 使用正确的字体

一旦掌握了如何区别简体和繁体，你就可以继续学习如何正确地在 CSS 或者 App l10n 中使用字体了。我有时候看到有人只做了日文的 l10n，比方说，使用 OS X/iOS [Hiragino Mincho](http://en.wikipedia.org/wiki/Hiragino) 作为 body 文本的字体，这是很有问题的。

- 标点符号与繁体中文不符；
- 有一些繁体字体没有包含在 Adobe Japan 1-6 中，很多都是简体的；降级后你的文章看起来就像是一封加密的邮件；
- 漢字(Hanzi/Kanji) 在日本、中国、台湾/香港以及越南都有用，但是它们是不一样的。

![繁体和简体的字形是不一样的](https://d262ilb51hltx0.cloudfront.net/max/1400/1*1ad4PdIm7HLJg7i_SCO6fQ.png)

我把 OS X / iOS / Windows 以及 Android 的系统字体列在下面，方便你选择正确的字体，某些字体在老版的系统或者 iOS App 中并没有，你需要做一些[额外的工作](https://developer.apple.com/Library/ios/samplecode/DownloadFont/Listings/DownloadFont_ViewController_m.html#//apple_ref/doc/uid/DTS40013404-DownloadFont_ViewController_m-DontLinkElementID_6)，从 Apple 下载它们。

![最新系统中默认的中文字体](https://d262ilb51hltx0.cloudfront.net/max/1362/1*54sLzm-OMOJ6OCt1GWkPEw.png)

说到 Android，Droid Sans Fallback 对于 CJK 来说就是满满的痛。如果你希望字体好看些，[Noto Sans](https://www.google.com/get/noto/#/) 是一个不错的方案。不好的地方在于 CJK 字体体积很大，你必须抽取其中的子集来减少加载的时间。你也可以尝试下像 [iFontCloud](http://webfont.arphic.com/index/index.jsp#&panel1-1) 这样的动态 webfont 子集服务。或者干脆忽略 Android 的叹息声。

## 3. 合适的 line-height

除了 line-height，字体大小也有关系。但是我很难告诉你字体到底该多大合适。在活字印刷时代，合适的中文字体大小应该是 10.5pt （请[折算](http://en.wikipedia.org/wiki/Point_%28typography%29)成实际大小，不能用在 CSS 中），不能低于 9pt。与你的设计风格有关。但是要记住，人们不喜欢阅读小的字，尤其是在屏幕上。

但是 line-height 有合适的数字，通常在 1.5 到 2.0em 之间，你只需要：

    p { line-height: 1.7em; }

这就行。

## 4. justify 是万能的

![justify 是万能的](https://d262ilb51hltx0.cloudfront.net/max/600/1*irE1haGZXnmpiAkdCOfBIw.jpeg)

这是一种古老的中文或自印刷（木制的）！暗示了中文排版的重要原则：所有的字符都是方形的。

但是到了 20 世纪，标点符号被用在出版业中。而且现代的桌面出版工具采用了源自日本的“prohibition rules(禁則處理)”，不允许句号、逗号等等出现在行首。而且要求英文单词不可以截断。因此我们无法保证所有东西都是横竖对齐的。但是至少，我们可以保证行的开始和结束可以对齐。这也是为什么 justify 对于电子书或者长文重要的原因。

在 CSS 中，你可以试试：

    p { text-align: justify; text-justify: ideographic;}

中文的排版立马更漂亮了一些。

#  5. 不使用斜体

在中国，用毛笔书写的习惯持续了上千年。中文的“草书”并不是像拉丁文一样使用斜体，而直接就是[弯曲](http://en.wikipedia.org/wiki/Cursive_script_%28East_Asia%29)的。有好些草书字体，比如 Kai，Xing（[行书](http://en.wikipedia.org/wiki/Semi-cursive_script)），cao（[草书](http://en.wikipedia.org/wiki/Cursive_script_%28East_Asia%29)）等。

![中文草书](https://d262ilb51hltx0.cloudfront.net/max/800/1*S36jcxu6LFqd7o9ZOpcxaA.gif)

数字时代之前，你找不到使用斜体的中文。而且也不应该存在。在某些情况下，像 em、blockquote 这样的标记默认对中文字符使用斜体，请使用 CSS 修正它：

    em { font-style: normal; }

em 可以加粗、可以无衬线，但不能是斜体的。

## 6. 段的分隔

有两种方式来分隔段落：

### 1. 书本式

在中文书籍中，段落之间是没有额外间隙的，需要使用两个字符的缩进，即：

    p { margin: 0; text-indent: 2em;}

你也可以使用日文的处理方法，使用 U+3000（表意空格）代替 text-indent。在某些情况下尤其有用，比如 Safari 的阅读工具可能会强制覆盖你的样式，这么做可以保留缩进。

这种样式同样适用于电子书。

### 2. 网页式

但是在人们浏览网页时，书本式的排版会让他们感到压力。你可以直接添加 margin-after 或者 margin-bottom 来分隔段落：

    p { margin-after: 0.5em;}

记住，别留太多的空白，0.5 - 1em 之间最佳。

## 7. Kai 更靠近书本式

Ming (明體)/Sung(宋體) 这样的衬线字体通常用在正文中。而非衬线字体则过于现代，很少在印刷业中使用。

![中文诗集中使用 Kai 作为引用文本的字体](https://d262ilb51hltx0.cloudfront.net/max/931/1*cOGBNMfLiKLDfbSFRIGJRA.png)

通常，在引用、对话或者独白中，我们常常使用 Kai（楷書）。大多数的桌面操作系统都包含 Kai，如果你希望让读者感觉上更书本式一点，可以用这个字体。

不然的话，非衬线字体也是可以接受的。

## 8. break-all vs 禁则策略

齐行是解决中文排版的数字方法，但是不是最好的。而且问题很容易重现：

![夹杂着长拉丁词的中文齐行的效果](https://d262ilb51hltx0.cloudfront.net/max/600/1*u3sZ629YPObfU1kXpKVFvw.png)

- 杂志排版窄栏，手机上；
- 中文字符中插入了一个较长的拉丁词（或者多个）；
- 使用了齐行。

上图中，由于齐行字间距被拉大的，甚至超过了 1em！在排版软件和浏览器中都存在这个问题。

一种快捷的解决方案，就添加：

    p { word-break: break-all; }

效果很好。但是偶尔，break-all 会违反标点符号的规则，会导致逗号、句号出现在行首。在简体中文中有这样的问题，但在繁体中文中不存在。

![使用 word-break:break-all，效果不错，只是打破了某些规则](https://d262ilb51hltx0.cloudfront.net/max/800/1*HK0JvZ96H1-VUuj_WIGiKQ.png)

这是为什么呢？因为简体中文中的标点符号就像日文一样，放在左下角，当它们出现在行首时，感觉很奇怪。

## 9. 谨慎使用 letter-spacing

对于中文正文，你不需要处理 letter-spacing。在香港有一些网站，它们使用了字符间距，但这不是好的做法。

![这这这](https://d262ilb51hltx0.cloudfront.net/max/761/1*IB234kBb1yOt9o6CHYIdSg.png)

这是怎么回事？这是无法分清横竖的问题。中文可以横排也可以竖排。line-height 是唯一的提示该如何阅读。如果你添加了 letter-spacing，你应该使用更大的 line-height、最终，这文章就是没法读了，因此：

> 无需调整字间距，在标题中使用 letter-spacing，在正文中不使用。

## 10. 简体不能转成繁体，但是可以繁体转简体

![简体不能转成繁体，但是可以繁体转简体](https://d262ilb51hltx0.cloudfront.net/max/1156/1*4_9XIsMJ7vnggHYNnCCmNQ.png)

在这个表格中，你可以看到常用的中文繁体和简体字符。这存在一些问题，一些文字有不同的编码，简体的编码是这个，但繁体的编码是另外一个。只不过大多数的工具使用一个映射表来做转换。

但是有 267 个繁体中文如果通过简转繁的结果不一致。举两个例子：

    TC→SC：皇后、後世→皇后、后世
    SC→TC：皇后、后世→皇后、后世
    TC→SC：呂布→呂布
    SC→TC：呂布→呂佈

所以如果你想做一个简单的转换，你必须使用一个基于字典的转换器。或者做一些校对。

就这么多，并没什么难点，记得用就行。

原文：[https://medium.com/@bobtung/best-practice-in-chinese-layout-f933aff1728f](https://medium.com/@bobtung/best-practice-in-chinese-layout-f933aff1728f)

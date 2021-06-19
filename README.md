# 前端外刊评论

关注前端前沿技术，探寻业界深邃思想.

> 本项目基于 `jekyll`，在本地运行时，请安装相应的工具。

## 本地

```bash
$npm run dev
```

## 发布

- 构建：

  ```bash
  $npm run build
  ```

- 上传静态文件到七牛，上传 `HTML` 到 Digital Ocean：

  ```bash
  $npm run pub
  ```
  > `qiniu.json`  `digitalocean.json` 文件私下找我获取

## 欢迎投稿

本专栏欢迎各位大大投稿，原创译文均可。

### 投稿被使用的范围

前端外刊评论目前在多个媒体上运营——知乎专栏、微信公众号、[qianduan.guru](http://qianduan.guru/)、微博等。还会在稀土掘金等媒体上推广文章。如果你给本专栏投稿就意味着我们可以在上面提到的媒体上使用传播你的文章，文章中保留你的著名、出处以及任何你觉得需要添加的信息。

### 投稿方式

1. PR 你的文章到本项目，将你的大作放到 `contribution/` 目录下，文章中使用到的图片放到 `contribution/images/` 下，文章格式为 Markdown；
2. 为你的文章寻找或者制作一张头图，用来作为在这些媒体上发布时需要的头图资源；
3. 在 `src/_config.yml` 文件中，在 `authors` 字段中添加你的个人资料，例如：
4. 
  寸志:
    name: 寸志
    display_name: 寸志
    avatar: /images/avatars/cunzhi.jpg
    email: island205@gmail.com
    web: http://island205.github.io
    twitter: island205
    company: 陆金所
    position: 前端架构师
    github: island205
    weibo: chromeappsstore

3. PR 通过后，我们通知你发稿时间，届时请使用你的知乎账号，向我们的[知乎专栏](http://zhuanlan.zhihu.com/FrontendMagazine)投稿；
4. [qianduan.guru](http://qianduan.guru/) 等其他地方都由外刊君来发。

### 格式建议

1. 区分好 “的” “地” “得”；
2. 英文单词的首位要加一个空格，主要是单词出现在中文内容时；
3. 除了引用的英文外，文中不要出现英文标点；
4. 中文的出现英文名词复数格式改为单数；
5. 英文出现在句首大写；
6. 英文中貌似没有“、”，按照语义将英文逗号改为中文顿号；
7. 避免文中出现错别字；
8. 如果是译文，译稿有中英文对照；
9. 文件名中只能包含大小写字母以及下划线。

### 回馈

- 文前添加个人介绍，外链等，让更多人认识你；
- 文章在公众号中的`赞赏`收入的80%会给到你；
- 混个脸熟，和我们一起翻译、写书，干更多有趣的事情；
- 得到我们的认可，加入到我们的核心编辑行列！

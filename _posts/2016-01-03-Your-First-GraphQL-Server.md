---
layout:     post
title:      "搭建你的第一个 GraphQL 服务器"
subtitle:   ""
date:       2016-01-03
author:     "寸志"
header-img: "http://7xrvqo.com1.z0.glb.clouddn.com/images/Your-First-GraphQL-Server.20d16e52.png"
tags:
    - GraphQL
    - React
    - Facebook
---

原文：[https://medium.com/@clayallsopp/your-first-graphql-server-3c766ab4f0a2](https://medium.com/@clayallsopp/your-first-graphql-server-3c766ab4f0a2)

没错，我今天就是要带着大家搭建一个简单的 GraphQL 服务器。我并不是想要说服你推翻原来所有代码拥抱 GraphQL——目的只是为了满足大家对它的好奇心，如果想要了解它是如何工作的，请继续往下读。

## 搭建 HTTP 服务器

我们需要创建一个服务器用来接收 GraphQL 查询。虽然 GraphQL 规范里并没有要求需要必须基于 HTTP 协议来实现，但是既然 GraphQL 可以参考的实现是基于 JavaScript 的，所以使用  Express 快速搭建一个 HTTP 服务器是比较合适的。

    $ mkdir graphql-intro && cd ./graphql-intro
    $ npm install express --save
    $ npm install babel --save
    $ touch ./server.js
    $ touch ./index.js

创建项目目录 `graphql-intro`，并安装 Express 和 Babel 依赖。Babel 不是 GraphQL 必须要用的，只是用 Babel 就可以使用 ES2015 的特性，这样生活会美好很多。

最终代码如下：

    // index.js
    // by requiring `babel/register`, all of our successive `require`s will be Babel'd
    require('babel/register');
    require('./server.js');

    // server.js
    import express from 'express';

    let app  = express();
    let PORT = 3000;

    app.post('/graphql', (req, res) => {
      res.send('Hello!');
    });

    let server = app.listen(PORT, function () {
      let host = server.address().address;
      let port = server.address().port;

      console.log('GraphQL listening at http://%s:%s', host, port);
    });

启动服务器：

    $ node index.js
    GraphQL listening at http://0.0.0.0:3000

测试服务器是否正常工作：

    $ curl -XPOST http://localhost:3000/graphql
    Hello!

这里我们在 `/graphql` 路径上提供服务，支持 HTTP POST 调用。但这并不是定死的——GraphQL 规范里并没有指定通过何种方式来与 GraphSQL 服务器通信。

## 创建 GraphQL Schema

服务器已经好了，这个时候就可以“添加一些 GraphQL”了。怎么理解这句话？

我们先回忆一下单个 GraphQL 请求的样子：

    query getHighScore { score }

在这个请求中，GraphQL 客户端请求顶级字段 `getHighScore` 下面的 `score` 子字段。字段（Field）就是我们需要 GraphQL 服务器返回的内容。字段本身可以携带参数，例如：

    query getHighScores(limit: 10) { score }

多的略去不表，我们继续：

我们需要配置 GraphQL 服务器来响应这样的请求——如何配置？使用 Schema。

构造一个 Schema 就相当于构造一棵 RESTful 的路由树。Schema 描述服务器可以返回的字段，以及返回字段所包含的类型。类型信息对于 GraphQL 来说是非常重要的，客户端可以安全地认为服务端返回的字段类型与配置的是一致的（如果不一致，就会返回错误信息）。

可以预见的是，Schema 可以定义得非常复杂。不过对我们手上这个简单 GraphQL 服务器而言，仅仅只有一个字段 `count`。

继续运行如下命令：

    $ npm install graphql --save
    $ npm install body-parser --save
    $ touch ./schema.js

这很容易理解对吧？GraphQL 模块包含了 GraphQL 『预览』技术，我们可以用来构建服务器上的 Schema，在 Schema 上进行 GraphQL 查询。body-parser 是一个简单的 Express 中间件，用来获取 GraphQL 请求中的信息。

编写 Schema：

    // schema.js
    import {
      GraphQLObjectType,
      GraphQLSchema,
      GraphQLInt
    } from 'graphql/lib/type';

    let count = 0;

    let schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          count: {
            type: GraphQLInt,
            resolve: function() {
              return count;
            }
          }
        }
      })
    });

    export default schema;

上面的代码就是创建了一个 `GraphQLSchema` 实例，这个构造函数接受一个巨大的配置对象。事实上 GraphQL 类库的其他部分会来消费这个 Schema 对象，但把这个消费这个过程放在其他的文件里更加合适。

把 Schema 转成通俗的语言来讲就是：

顶级查询对象会返回一个 `RootQueryType` 对象，有一个 `count` 字段，这个字段的类型是整数。

可想而知，GraphQL 还支持其他的基础类型（字符串、列表等等），而且你可以深度嵌套自定义的复杂类型。

## 连接 Schema

如果不对 Schema 进行查询，它写得再漂亮也不会产生任何用处。接下来我们把 Schema 和 HTTP 服务器联系到一起：

    import express from 'express';
    import schema from './schema';
    // new dependencies
    import { graphql } from 'graphql';
    import bodyParser from 'body-parser';

    let app  = express();
    let PORT = 3000;

    // parse POST body as text
    app.use(bodyParser.text({ type: 'application/graphql' }));

    app.post('/graphql', (req, res) => {
      // execute GraphQL!
      graphql(schema, req.body)
      .then((result) => {
        res.send(JSON.stringify(result, null, 2));
      });
    });

    let server = app.listen(PORT, function () {
      var host = server.address().address;
      var port = server.address().port;

      console.log('GraphQL listening at http://%s:%s', host, port);
    });

任何发送给 `/graphql` 的 POST 的请求都会触发 GraphQL Schema 的查询。针对 GraphQL 请求我们强制采用了一种新的 content type——这并不是 GraphQL 规范的内容，但这对于那些混了 GraphQL 和老代码的服务器来说是一种好的模式。

重启服务器，访问：

    $ node ./index.js // restart your server
    // in another shell
    $ curl -XPOST -H "Content-Type:application/graphql"  -d 'query RootQueryType { count }' http://localhost:3000/graphql
    {
      "data": {
        "count": 0
      }
    }

正确！GraphQL 还允许省略掉 `query RootQueryType` 前缀，不过我想尽量少展示一些 『魔法』，比如像下面这样是可行的：

    $ curl -XPOST -H 'Content-Type:application/graphql'  -d '{ count }' http://localhost:3000/graphql
    {
      "data": {
        "count": 0
      }
    }

现在我们终于整了点可以运行的 GraphQL，接下来让我花点时间讨论一下自省特性。

## 让服务器是自省的

> 一个有意思的事实：可以编写 GraphQL 查询来询问 GraphQL 服务器都有哪些字段。这非常 meta 化。

听起来有些疯狂，你可以试试：

    $ curl -XPOST -H 'Content-Type:application/graphql'  -d '{__schema { queryType { name, fields { name, description} }}}' http://localhost:3000/graphql
    {
      "data": {
        "__schema": {
          "queryType": {
            "name": "RootQueryType",
            "fields": [
              {
                "name": "count",
                "description": null
              }
            ]
          }
        }
      }
    }

下面是我们发出的查询，格式化了一下：

    {
      __schema {
        queryType {
          name,
          fields {
            name,
            description
          }
        }
      }
    }

一般的，每一个 GraphQL 根字段都会自动包含一个 `__schema` 字段，该字段也提供了一些字段供我们查询——比如 `queryType` 字段。可以查到每一个字段的 meta 信息，比如字段名称等。

更有趣的是，你还可以添加更多的供人阅读的元信息，比如为字段添加  `description`、`isDeprecated` 和 `deprecationReason`。Facebook 表示它们的工具可以使用这些元数据为开发者提供更好的开发体验（例如，如果你使用的字段已经废弃，会有一条红色的波浪线在它下面）。

给当前的 schema 添加一个 `description`，大家可以看得更明白一些：

    let schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          count: {
            type: GraphQLInt,
            // add the description
            description: 'The count!',
            resolve: function() {
              return count;
            }
          }
        }
      })
    });

重启服务器就可以看到新加的元数据：

    $ curl -XPOST -H 'Content-Type:application/graphql'  -d '{__schema { queryType { name, fields { name, description} }}}' http://localhost:3000/graphql
    {
      "data": {
        "__schema": {
          "queryType": {
            "name": "RootQueryType",
            "fields": [
              {
                "name": "count",
                "description": "The count!"
              }
            ]
          }
        }
      }
    }

我们旋风式的 GraphQL 介绍马上就要结束了——还差最后一个，我将给大家讲讲 mutation（修改）。

## 添加一个 Mutation

这一节是给那些不是只读读数据的人准备的。对于大部分程序来说，我们需要修改数据。GraphQL 把这些操作称为 Mutation。

Mutation 也是一种字段，只不过是有副作用的字段，因此在语法上并没什么不同。Mutation 字段必须指定返回值类型——意思也就是说，如果你修改了某个字段，也必须返回修改后的值。

如何在 Schema 中添加 Mutation？和顶级的 `query` 定义类似，需要定义一个顶级的 `mutation` 字段。

    let schema = new GraphQLSchema({
      query: ...
      mutation: // todo
    )}

除了添加的地方不一样，Mutation 还有什么不同的地方？我们本可以让 `count` 字段函数更新我们的计数器，或者做一些其他的修改操作，GraphQL 也全然不知的呀。

Mutation 与 Query 不同地方就在于 GraphQL 对前者的操作更为严格，而对于 Query 并没有这种保证（实际上，GraphQL 鼓励服务器利用内在的独立的并行查询）。下面的例子来自 GraphQL 规范，一系列 Mutation 查询在服务器上必须串行执行。

    {
      first: changeTheNumber(newNumber: 1) {
        theNumber
      },
      second: changeTheNumber(newNumber: 3) {
        theNumber
      },
      third: changeTheNumber(newNumber: 2) {
        theNumber
      }
    }

因此，这个请求结束，`theNumber` 字段的值一定是 `2`。接下来给我们的计数器加上一个简单的 mutation，返回计数器的值：

    let schema = new GraphQLSchema({
      query
      mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
          updateCount: {
            type: GraphQLInt,
            description: 'Updates the count',
            resolve: function() {
              count += 1;
              return count;
            }
          }
        }
      })
    });

重启服务器试运行：

    $ curl -XPOST -H 'Content-Type:application/graphql' -d 'mutation RootMutationType { updateCount }' http://localhost:3000/graphql
    {
      "data": {
        "updateCount": 1
      }
    }

轰——数据已经更新了！你可以通过下面的查询来确认：

    $ curl -XPOST -H 'Content-Type:application/graphql' -d '{ count }' http://localhost:3000/graphql
    {
      "data": {
        "count": 1
      }
    }

你想查询多少次都可以——可变的状态很有趣！

从 GraphQL 来讲，我们还可以编写更好的实现，可以把计数器封装成一个语义化的类型（比如 `CountValue`），Query 和 Mutation 的时候都返回这个类型，这样更有意义。

## 总结

这是一篇快速入门的文章，介绍如何借助于 Facebook GraphQL 的 JavaScript 实现进行 GraphQL 开发。并没有涉及更多强大的特性——带参数的字段、Promise、Fragment 和指令等等，在 GraphQL 规范里包含了很多有趣的东西。我们的服务器还可以使用更多 Schema 的 API，还可以实现更多东西。你可以试着想象，一个使用像 Java 这样的强类型语言编写的 GraphQL 服务器，很可能看起来和 JavaScript 写的完全不一样。


本文出自我 48 小时的 GraphQL 使用经验——如果哪里说得不对，希望你可以不吝指出。源代码可以在这里 https://github.com/clayallsopp/graphql-intro 看到（每一个提交都是一个小的进步）。还要感谢 RisingStack 的伙计们，他们关于 GraphQL 的文章和例子都很棒。

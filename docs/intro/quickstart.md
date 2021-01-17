# 快速开始

本项目使用 [lerna] 搭配 **yarn** 的 [workspaces][yarn workspaces] 进行管理，另外 [nestjs] 支持 [Monorepo] 风格的仓库，所以目录结构按照 **nestjs** 的 [monorepo-mode][monorepo-mode] 的进行了一定的优化。

如果你被上面的文字给吓到了，那就直接忘记它们吧，其实开发也就那样，只要按照顺序来，开发时候也不会有什么特别大的区别，只是麻烦些而已。

但强烈推荐去学习下 [lerna] 和 **yarn** 的 [workspaces][yarn workspaces] 的使用。

## 启动项目

### 1. 全局安装 lerna 和 yarn 模块

**lerna** 配置的包管理器就是 **yarn**，所以 **yarn** 不能省略。

```bash
# 如果已经安装过的，可以跳过
$ npm install lerna yarn -g
```

### 2. 安装依赖关系并链接任何交叉依赖关系

应用与应用之间肯定会存在很多重复性的代码，目前流行的是通过发布一个 **npm** 包解决。

但对于开发来说，不可能先发布依赖包，再进行应用开发，这就是为什么要引入 **lerna** 这个模块。

```bash
# 在项目根目录执行
$ lerna bootstrap
```

### 3. 编译依赖的本地模块

编译的是 `packages` 下的模块，这些模块后期会发布到 **npm** 上。

但开发中，`lerna` 会帮助我们在任何需要的地方进行 `软链接` 处理，我们只要编译好代码就可以使用了。

```bash
# 在项目根目录执行
$ yarn dev
```

### 4. 安装 redis 服务

微服务的注册与发现目前使用的是 `redis` 进行管理的，[nestjs] 也支持其他方式，如果你懂的话，也可以直接修改代码，具体操作请查看官方文档：[microservices]。

> 如果已经安装过 `redis` 或有在线服务的，可以跳过

**windows 系统**

进入 [redis-windows](https://github.com/ServiceStack/redis-windows) 这个项目，按提示下载对应的可执行文件进行安装，然后启动服务。

**Mac 系统**

可参考他人写的教程安装：[mac os 安装 redis](https://www.jianshu.com/p/3bdfda703552)

### 5. 配置 redis 服务

将根目录的 `.env.example` 重命名为 `.env`，修改里面的内容为你的服务地址。

### 6. 启动项目

注意这步需要你先全局安装 [@nestjs/cli](https://www.npmjs.com/package/@nestjs/cli) 这个模块，更多信息请参考 [monorepo-mode]。

启动微服务和应用的命令是一样的，都是在根目录下执行：

```bash
# appName 为下方的应用列表的名称
$ nest start <appName> --watch
```

目前可用的应用列表

- api         - api 网关
- passport    - 通行证模块
- config      - 配置中心
- wechat      - 微信公众号对接

**注意:** 启动的顺序并没有强制性的要求，但 `wechat` 依赖 `config`，因为公众号的配置目前放在哪里。




[lerna]: https://github.com/lerna/lerna
[nestjs]: https://nestjs.com/
[monorepo-mode]: https://docs.nestjs.com/cli/monorepo#monorepo-mode
[yarn]: https://classic.yarnpkg.com/
[yarn workspaces]: https://classic.yarnpkg.com/en/docs/workspaces/
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[microservices]: https://docs.nestjs.com/microservices/basics

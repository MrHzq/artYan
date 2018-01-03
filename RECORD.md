# 零
## 起因
项目开始时间为2017年12月1日。<br>
当时的情况为：公司没事可做，自己准备换工作，发现缺少拿的出手的项目，又想检验下自己的技术能力，等等...才决定写一个能找工作的项目。
## 开始
### 前端技术选择
<!-- 1. CSS <br>
自己写代码一直使用[CSS](http://www.w3school.com.cn/css/index.asp)，现在想换一种方式，网上找了下，最后决定使用[Sass](https://www.sass.hk/)<br> -->
* [Vue.js](https://cn.vuejs.org/v2/guide/)<br>
因为公司在使用vue，并且自己对于vue也很熟悉了，所以决定使用vue的单页面应用来搭建项目。接下来讲述下如何搭建vue单页面应用。<br>
**vue单页面开发环境搭建**
    1. 安装npm包管理器
    * 下载nodejs开发环境，https://nodejs.org/en/。
    * 安装好后，以管理员的身份进入cmd命令行，输入 `npm -v`,可以看到返回当前版本号。
    * 因为国外的网络原因，将npm包的资源库改为淘宝的资源库。
    输入 `npm config set registry https://registry.npm.taobao.org`
    2. 建立VUE项目
    * 在喜欢的路径下建立一个项目文件夹，比如 **C:\myvue** ，并通过cmd打开命令行，进入到该文件夹路径。
    * 输入 `npm install -g vue-cli`，安装vue脚手架工具vue-cli。
    * 创建vue单页面应用<br>
    vue-cli 安装完成后，再次输入命令 `vue init webpack myproject`（myproject是项目名，可随意取名）。则创建了一个vue单页面应用。<br>
    然后会有以下提示出来<br>
    **Project name（myproject）** 项目名称，可自己输入也可以直接回车采用括号里面的默认值<br>
    **Project description (A Vue.js project)** 项目描述，可自己输入也可以直接回车采用括号里面的默认值<br>
    **Author (hzq <***@163.com>)** 作者，可自己输入也可以直接回车采用括号里面的默认值<br>
    **Vue build (Use arrow keys)**
    vue构建方式，默认选中运行加编译，直接回车即可（Runtime + Compiler 运行加编译；Runtime-only 仅运行）       
    **Install vue-router?(Y/n)** 是否安装路由，单页面应用需要使用路由，输入y或Y，回车。官方路由[vue-router](https://router.vuejs.org/zh-cn/)学习。<br>
    **Use ESLint to lint your code? (Y/n)** 是否使用ESLint管理代码，[ESLint](http://eslint.cn/)可以用来统一代码风格的，这个是否使用请依据个人情况而定，是否使用不影响代码运行。我这没用，输入n，回车。<br>
    **Set up unit tests? (Y/n)** 是否使用单元测试，我这不需要，输入n，回车。<br>
    **Setup e2e tests with Nightwatch? (Y/n)** 是否安装e2e测试，我不需要，输入n，回车。<br>
    **Should we run `npm install` for you after the project has been created? (reco
mmended) (Use arrow keys)** <br>
    * 当项目创建时，是否需要通过`npm install`运行，默认选择第一个。我这需要，直接回车即可。
    * Yes, use NPM
    * Yes, use Yarn
    * No, I will handle that myself
    3. 以上**单页面应用**创建就完成，在当前文件下面有个**myproject**文件夹，那就是你的单页面应用了。
    




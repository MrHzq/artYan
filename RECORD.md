# 零
## 起因
项目开始时间为2017年12月1日。<br>
当时的情况为：公司没事可做，自己准备换工作，发现缺少拿的出手的项目，又想检验下自己的技术能力，等等...才决定写一个能找工作的项目。
## 开始
### 前端
* **[Vue.js](https://cn.vuejs.org/v2/guide/)**<br>
因为公司在使用vue，并且自己对于vue也很熟悉了，所以决定使用vue的单页面应用来搭建项目。接下来讲述下如何搭建vue单页面应用。<br>
**vue单页面开发环境搭建**
    1. **安装npm包管理器**
    * 下载nodejs开发环境，https://nodejs.org/en/。
    * 安装好后，以管理员的身份进入cmd命令行，输入 `npm -v`,可以看到返回当前版本号。
    * 因为国外的网络原因，将npm包的资源库改为淘宝的资源库。
    输入 `npm config set registry https://registry.npm.taobao.org`
    2. **建立VUE项目**
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
    4. 输入 `cd myproject`，进入项目文件，再次输入 `npm run dev`，会在你的默认浏览器里面打开一个页面，有Vue logo的页面，那说明你的单页面应用就成功了。
    5. 如果你的浏览器没反应，并且命令行里面提示 `Your application is running here: http://localhost:8082`，那你将 `http://localhost:8082`复制，然后在浏览器里面访问，如果也能打开一个有Vue Logo的页面，那单页面应用也成功了。
* **[Sass](https://www.sass.hk/)**<br>
因为之前一直使用的是css，现在想换一个方式，上网搜索下，决定选择sass。<br>
在单页面中使用Sass，需要安装2个sass的依赖包<br>sass-loader依赖于node-sass<br> 
`npm install --save-dev node-sass`<br> 
`npm install --save-dev sass-loader` <br> 
然后在 *.vue文件里面<br>
`<style lang="scss" scoped> 你的sass代码写在这 </style>`
就可以使用了。
* **[Axios](https://www.kancloud.cn/yunye/axios/234845)**<br>
axios简单来说，类似ajax，可以用来发送post、get请求。可以配合vue-axios插件一起使用<br>
**安装**  `npm install --save axios vue-axios`<br>
**配置**  <br>
在 **main.js** 里面<br>
`import Vue from 'vue'`<br>
`import axios from 'axios'`<br>
`import VueAxios from 'vue-axios'`<br>
`Vue.use(VueAxios, axios) `<br>
**使用**
    * get：`this.$http.get(请求地址).then((data) => {
    console.log("返回数据"+data)
    })`
    * post：`this.$http.post(请求地址,参数对象).then((data) => {
    console.log("返回数据"+data)
    })`
* **[Vuex](https://vuex.vuejs.org/zh-cn/intro.html)**<br>
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。简单理解为：一个全局的变量，在任何.vue文件里面都可以操作。
* **[JavaScript](http://www.w3school.com.cn/js/)**<br>
js方面就使用了些[ES6](http://es6.ruanyifeng.com/)的语法，然后这个单页面应用自带将ES6编译为ES5的功能，所以直接使用ES6语法即可。
### 后端
* **[Node.js](https://nodejs.org/zh-cn/)**<br>
因为我目前接触到的后端技术就2个：PHP、Node，所以就选 Node了。
* **[Express](http://www.expressjs.com.cn/)**<br>
Express 基于 Node.js 的 web 应用开发框架。因为用它来搭建服务器只需三步，所以就选择了它。<br>    
    * **创建项目文件**<br>
    先创建一个文件夹，可命名为**server**，它与单页面应用文件(myproject)是**同级并列**关系。<br>
    然后通过命令行进入到**server**文件夹里面去，输入`npm init`，初始化一个node项目，之后一直enter到结束。<br>
    现在**server**文件夹里面就有一个**package.json**文件了。
    * **安装** 命令行输入`npm install express --save`，我这就会自动生成一个**node_modulesh**文件夹和**package-lock.json**。
    * **搭建服务器** 在**server**里面新建一个index.js文件，然后编辑index.js。
    * **编辑 index.js**<br>
    引入Express依赖：`const express = require("express");`<br>
    实例Express：`const app = express();`<br>
    监听端口：`app.listen(9500);` 9500为端口号，可自定义的。<br>
    `console.log("**********【服务器启动成功】**********");`<br>
    * **启动服务器** 在命令行输入 `node index`，即可启动成功，并且会打印 `**********【服务器启动成功】**********`<br>
    so 服务器也弄好了。
### 数据库
* **[MongoDB](http://www.runoob.com/mongodb/mongodb-tutorial.html)**<br>
对于我而言，数据库方面仅接触过MySQL，所以一开始要使用MongoDB，我是拒绝的。但我在网上看了看，发现这个MongoDB有JSON存储的功能，觉得很符合我自己的需求，所以就从零开始摸索使用了。<br>
下载与安装，均可参考此[文档](http://blog.csdn.net/sophie_u/article/details/53088891)<br>
再推荐一个MongoDB的可视化操作软件mongobooster,可在这[下载](https://pan.baidu.com/s/1dEUUyCL)，密码：q8ox，按需下载即可。


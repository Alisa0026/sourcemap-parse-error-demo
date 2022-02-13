# sourcemap-parse-error-demo
> 版权声明：本文为博主原创文章，未经博主允许不得转载。 欢迎Issues留言。

# 背景
我们页面开发上线后，混淆后的前端js代码很不易定义错误位置，这样就不容易排查异常，基于这样的需求，本文根据已上报的错误信息，利用sourcemap将代码反解，然后最终将错误代码定位出来进行显示可以更好的排查错误。

本文主要使用[mozilla/source-map库](https://github.com/mozilla/source-map/blob/master/README.md)对打包后的js代码进行定位。至于sourcemap文件的原理在此不再赘述，网上已经有很多很好的教程文章，比如阮一峰老师的[JavaScript Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)与joeyguo的[脚本错误量极致优化-让脚本错误一目了然](https://github.com/joeyguo/blog/issues/14)。

# 一、准备demo，生成sourceMap
为了节省时间，这段主要摘自文章[利用sourceMap定位错误实践](https://juejin.cn/post/6882265367251517447)可以从作者git仓库下载demo代码自己本地跑跑看哦。

配置一个简单的webpack:

```js
//webpack.config.js
const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```
在**src**文件夹下创建**index.js**与**demo.js**

```js
// demo.js
const demo = "demo";

module.exports = demo;
```

```js
// index.js
const demo = require("./demo");
console.log(demo);
if (true) {
  console.log(a);
}
```
接下来用webpack打包，因为我们的webpack中配置了**devtool: "source-map"** ，所以会生成**main.js**与**main.js.map**。


```js
// main.js，一串压缩后的代码，末尾指向对应的sourceMap
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1);console.log(a)},function(e,t){e.exports="demo"}]);
//# sourceMappingURL=main.js.map
```


```json
// main.js.map sourceMap内容，让我们把他格式化出来看看吧
{"version":3,"sources":["webpack:///webpack/bootstrap","webpack:///./src/index.js","webpack:///./src/demo.js"],"names":["installedModules","__webpack_require__","moduleId","exports","module","i","l","modules","call","m","c","d","name","getter","o","Object","defineProperty","enumerable","get","r","Symbol","toStringTag","value","t","mode","__esModule","ns","create","key","bind","n","object","property","prototype","hasOwnProperty","p","s","console","log","a"],"mappings":"aACE,IAAIA,EAAmB,GAGvB,SAASC,EAAoBC,GAG5B,GAAGF,EAAiBE,GACnB,OAAOF,EAAiBE,GAAUC,QAGnC,IAAIC,EAASJ,EAAiBE,GAAY,CACzCG,EAAGH,EACHI,GAAG,EACHH,QAAS,IAUV,OANAI,EAAQL,GAAUM,KAAKJ,EAAOD,QAASC,EAAQA,EAAOD,QAASF,GAG/DG,EAAOE,GAAI,EAGJF,EAAOD,QAKfF,EAAoBQ,EAAIF,EAGxBN,EAAoBS,EAAIV,EAGxBC,EAAoBU,EAAI,SAASR,EAASS,EAAMC,GAC3CZ,EAAoBa,EAAEX,EAASS,IAClCG,OAAOC,eAAeb,EAASS,EAAM,CAAEK,YAAY,EAAMC,IAAKL,KAKhEZ,EAAoBkB,EAAI,SAAShB,GACX,oBAAXiB,QAA0BA,OAAOC,aAC1CN,OAAOC,eAAeb,EAASiB,OAAOC,YAAa,CAAEC,MAAO,WAE7DP,OAAOC,eAAeb,EAAS,aAAc,CAAEmB,OAAO,KAQvDrB,EAAoBsB,EAAI,SAASD,EAAOE,GAEvC,GADU,EAAPA,IAAUF,EAAQrB,EAAoBqB,IAC/B,EAAPE,EAAU,OAAOF,EACpB,GAAW,EAAPE,GAA8B,iBAAVF,GAAsBA,GAASA,EAAMG,WAAY,OAAOH,EAChF,IAAII,EAAKX,OAAOY,OAAO,MAGvB,GAFA1B,EAAoBkB,EAAEO,GACtBX,OAAOC,eAAeU,EAAI,UAAW,CAAET,YAAY,EAAMK,MAAOA,IACtD,EAAPE,GAA4B,iBAATF,EAAmB,IAAI,IAAIM,KAAON,EAAOrB,EAAoBU,EAAEe,EAAIE,EAAK,SAASA,GAAO,OAAON,EAAMM,IAAQC,KAAK,KAAMD,IAC9I,OAAOF,GAIRzB,EAAoB6B,EAAI,SAAS1B,GAChC,IAAIS,EAAST,GAAUA,EAAOqB,WAC7B,WAAwB,OAAOrB,EAAgB,SAC/C,WAA8B,OAAOA,GAEtC,OADAH,EAAoBU,EAAEE,EAAQ,IAAKA,GAC5BA,GAIRZ,EAAoBa,EAAI,SAASiB,EAAQC,GAAY,OAAOjB,OAAOkB,UAAUC,eAAe1B,KAAKuB,EAAQC,IAGzG/B,EAAoBkC,EAAI,GAIjBlC,EAAoBA,EAAoBmC,EAAI,G,kBClFxC,EAAQ,GAGnBC,QAAQC,IAAIC,I,cCDdnC,EAAOD,QAFM","file":"main.js","sourcesContent":[" \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"\";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = 0);\n","const demo = require(\"./demo\");\n\nif (true) {\n  console.log(a);\n}\n","const demo = \"demo\";\n\nmodule.exports = demo;\n"],"sourceRoot":""}
```

利用json格式化工具，看看sourceMap的内容：

![json格式化sourcemap.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e6a4908f0874d9e8183b6a40f913a50~tplv-k3u1fbpfcp-watermark.image?)

**sources**数组下是转换前的文件，其内容与**sourcesContent**下标一一对应。通过查看**sourcesContent**，可以发现**webpack/bootstrap**即webpack在浏览器端对require的模拟。其他属性在阮一峰老师的文章里有很详细的解释，此处就不再赘述了。

json格式化工具我用的是chrome插件`FEHelper`很好用哦，安利！

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19ed606737634f689c1bf60e9aab2dbf~tplv-k3u1fbpfcp-watermark.image?)

demo准备完后接下来可以根据sourceMap定位错误了。

# 二、利用[mozilla/source-map](https://github.com/mozilla/source-map)定位错误
模拟外网环境出错，把**main.js**中的**//# sourceMappingURL=main.js.map**去掉，在dist/index.html中添加错误监听:

```js
    <script>
      window.onerror = function (msg, url, row, col, error) {
        const obj = {
          msg,
          url,
          row,
          col,
        };
        console.log(obj);
      };
    </script>
```
打开html可看见：

![打包报错位置.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/596c499fe71140df8d94dae79fb8cf37~tplv-k3u1fbpfcp-watermark.image?)

有了**row**与**col**之后接下来使用[mozilla/source-map](https://github.com/mozilla/source-map) 获取源文件的位置：

1) 在index.html中引入 **source-map**
![index。html中引入source-map插件.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa6988af0f1349a49783090ce23bcda7~tplv-k3u1fbpfcp-watermark.image?)

2) 在项目下新建**sourcemap.js**文件
把刚才生成的main.js.map格式化后放这里并导出，模拟获取的map文件

![sourcemap文件.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ed7e64f4ef5411a922f0b5eda394edd~tplv-k3u1fbpfcp-watermark.image?)

3) 在项目下新建**trySourceMap.js**文件

```js
import { rawSourceMap } from "./sourcemap.js";
//压缩后代码错误位置
const pos = {
  row: 1,
  column: 946
};
// 保留错误代码片段前后行数
export const snippetNum = 10;

export const analysisFun = async () => {
  const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
  // 传入要查找的行列数，查找到压缩前的源文件及行列数
  const sourcemapData = consumer.originalPositionFor({
    line: pos.row, // 压缩后的行数
    column: pos.column // 压缩后的列数
  });

  if (!sourcemapData.source) return;

  const sources = consumer.sources;
  // 根据查到的source，到源文件列表中查找索引位置
  const index = sources.indexOf(sourcemapData.source);
  // 到源码列表中查到源代码
  const content = consumer.sourcesContent[index];

  // 将源代码串按"行结束标记"拆分为数组形式
  const rawLines = content.split(/\r?\n/g);
  
  // 截取报错行前后代码片段，因为数组索引从0开始，故行数需要-1
  let code = [];
  for (
    let i = sourcemapData.line - snippetNum;
    i < sourcemapData.line + snippetNum;
    i++
  ) {
    if (i >= 0) {
      code.push(rawLines[i]);
    }
  }
  // 最后将解析结果和代码片段返回
  return { sourcemapData, code: code.join("\n") };
};
```
# 三、显示具体代码片段，并对代码进行高亮处理
通过网上查询很多代码高亮的方案推荐的都是 [highlight.js](https://highlightjs.org/)，不过缺点就是没有办法显示行号，需要自己再封装或者借用其他第三方库。

我这里查询到的行号相关内容文章可以作为参考：
- [Highlight.js 行号插件](https://www.highlightjs-line.cn/)
- [highlightjs-line-numbers.js](https://github.com/wcoder/highlightjs-line-numbers.js)
- [自己写 highlight.js 行号插件](http://www.voycn.com/article/zijixie-highlightjs-xinghaochajian)

我最后使用的 [react-syntax-highlighte](https://github.com/react-syntax-highlighter/react-syntax-highlighter)，这个不仅可以随意选择代码主题，同时也支持行号显示，一举两得。

可参考文章：[react-syntax-highlighter代码高亮](https://www.jianshu.com/p/c74591c28b49)


```js
import React from "react";
// 使用代码高亮插件
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// 选择主题
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";
// 引用解析方法
import { analysisFun, snippetNum } from "./demo/trySourceMap.js";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      sourcemapData: {}
    };
  }

  async componentDidMount() {
    let res = await analysisFun();
    this.setState({
      code: res.code,
      sourcemapData: res.sourcemapData
    });
  }

  render() {
    let { code, sourcemapData } = this.state;
    let lineNum = sourcemapData ? sourcemapData.line - snippetNum + 1 : 1;
    return (
      <div>
        <SyntaxHighlighter
          language="javascript"
          style={base16AteliersulphurpoolLight}
          showLineNumbers
          startingLineNumber={lineNum > 0 ? lineNum : 1}
          wrapLines={true}
          lineProps={(num) =>
             // 对错误行和普通行做样式设置
            num == sourcemapData.line
              ? { class: "mark-line" }
              : { class: "line" }
          }
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default App;
```

```css
/* 样式 */
.line,
.mark-line {
  display: block;
  min-width: 100%;
  width: max-content;
}

.mark-line {
  background: red;
}
```

到此为止我们就可以成功的在页面上把错误代码显示出来了：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e658ef2853cb4ade9fee4526b9b41129~tplv-k3u1fbpfcp-watermark.image?)

**查看上面代码[demo地址](https://codesandbox.io/s/sourcemapjie-xi-7yfjn)**

# 参考文献
1. [利用sourceMap定位错误实践](https://juejin.cn/post/6882265367251517447)
2. [mozilla/source-map](https://github.com/mozilla/source-map)
3. [webpack source-map问题定位](https://www.jianshu.com/p/c43f05275d77)
4. [你知道source map如何帮你定位源码么](https://blog.csdn.net/u012384510/article/details/118215020)
5. [react-syntax-highlighter代码高亮](https://www.jianshu.com/p/c74591c28b49)
6. [react-syntax-highlighte](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

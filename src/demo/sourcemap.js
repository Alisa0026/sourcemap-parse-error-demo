export const rawSourceMap = {
  version: 3,
  sources: [
    "webpack:///webpack/bootstrap",
    "webpack:///./src/index.js",
    "webpack:///./src/demo.js"
  ],
  names: [
    "installedModules",
    "__webpack_require__",
    "moduleId",
    "exports",
    "module",
    "i",
    "l",
    "modules",
    "call",
    "m",
    "c",
    "d",
    "name",
    "getter",
    "o",
    "Object",
    "defineProperty",
    "enumerable",
    "get",
    "r",
    "Symbol",
    "toStringTag",
    "value",
    "t",
    "mode",
    "__esModule",
    "ns",
    "create",
    "key",
    "bind",
    "n",
    "object",
    "property",
    "prototype",
    "hasOwnProperty",
    "p",
    "s",
    "console",
    "log",
    "a"
  ],
  mappings:
    "aACE,IAAIA,EAAmB,GAGvB,SAASC,EAAoBC,GAG5B,GAAGF,EAAiBE,GACnB,OAAOF,EAAiBE,GAAUC,QAGnC,IAAIC,EAASJ,EAAiBE,GAAY,CACzCG,EAAGH,EACHI,GAAG,EACHH,QAAS,IAUV,OANAI,EAAQL,GAAUM,KAAKJ,EAAOD,QAASC,EAAQA,EAAOD,QAASF,GAG/DG,EAAOE,GAAI,EAGJF,EAAOD,QAKfF,EAAoBQ,EAAIF,EAGxBN,EAAoBS,EAAIV,EAGxBC,EAAoBU,EAAI,SAASR,EAASS,EAAMC,GAC3CZ,EAAoBa,EAAEX,EAASS,IAClCG,OAAOC,eAAeb,EAASS,EAAM,CAAEK,YAAY,EAAMC,IAAKL,KAKhEZ,EAAoBkB,EAAI,SAAShB,GACX,oBAAXiB,QAA0BA,OAAOC,aAC1CN,OAAOC,eAAeb,EAASiB,OAAOC,YAAa,CAAEC,MAAO,WAE7DP,OAAOC,eAAeb,EAAS,aAAc,CAAEmB,OAAO,KAQvDrB,EAAoBsB,EAAI,SAASD,EAAOE,GAEvC,GADU,EAAPA,IAAUF,EAAQrB,EAAoBqB,IAC/B,EAAPE,EAAU,OAAOF,EACpB,GAAW,EAAPE,GAA8B,iBAAVF,GAAsBA,GAASA,EAAMG,WAAY,OAAOH,EAChF,IAAII,EAAKX,OAAOY,OAAO,MAGvB,GAFA1B,EAAoBkB,EAAEO,GACtBX,OAAOC,eAAeU,EAAI,UAAW,CAAET,YAAY,EAAMK,MAAOA,IACtD,EAAPE,GAA4B,iBAATF,EAAmB,IAAI,IAAIM,KAAON,EAAOrB,EAAoBU,EAAEe,EAAIE,EAAK,SAASA,GAAO,OAAON,EAAMM,IAAQC,KAAK,KAAMD,IAC9I,OAAOF,GAIRzB,EAAoB6B,EAAI,SAAS1B,GAChC,IAAIS,EAAST,GAAUA,EAAOqB,WAC7B,WAAwB,OAAOrB,EAAgB,SAC/C,WAA8B,OAAOA,GAEtC,OADAH,EAAoBU,EAAEE,EAAQ,IAAKA,GAC5BA,GAIRZ,EAAoBa,EAAI,SAASiB,EAAQC,GAAY,OAAOjB,OAAOkB,UAAUC,eAAe1B,KAAKuB,EAAQC,IAGzG/B,EAAoBkC,EAAI,GAIjBlC,EAAoBA,EAAoBmC,EAAI,G,kBClFxC,EAAQ,GAGnBC,QAAQC,IAAIC,I,cCDdnC,EAAOD,QAFM",
  file: "main.js",
  sourcesContent: [
    " \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"\";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = 0);\n",
    'const demo = require("./demo");\n\nif (true) {\n console.log(a);\n}\n',
    'const demo = "demo";\n\nmodule.exports = demo;\n'
  ],
  sourceRoot: ""
};
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

require("./plugins/element.js");

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true;
_axios["default"].defaults.baseURL = 'http://localhost:3000/users';
_vue["default"].prototype.$request = _axios["default"];

_axios["default"].interceptors.request.use(function (config) {
  // 这里的config包含每次请求的内容
  //   if(window.localStorage.getItem('clearToken')) {
  //       window.localStorage.removeItem('token')
  //   }
  var token = window.localStorage.getItem('token');

  if (token) {
    // 添加headers
    config.headers.Authorization = "".concat(token); // config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  } else {}

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');
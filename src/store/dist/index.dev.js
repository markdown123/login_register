"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    checkedStatus: false,
    status: 1
  },
  mutations: {
    changeStatus: function changeStatus(state, str, status) {
      state.checkedStatus = str;
      state.status = status;
      console.log(state.checkedStatus);
      console.log(state.status);
    }
  },
  actions: {},
  modules: {}
});

exports["default"] = _default;
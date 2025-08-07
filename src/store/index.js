import { createStore } from 'vuex'
export default createStore({
  state: {
    inputValue: '', //插入模式下 输入
    iframeCursorPosition: 0, //输入框的光标
    svgCode: '', //存放svg代码
    svgFontSize: '17', //svg体大小
    svgColor: 'inherit', //svg字体颜色
    svgBgColor: 'transparent', //svg背景颜色
    svgDisplayMode: false,
  },
  mutations: {
    //组件修改仓库的值
    SET_INPUT_VALUE(state, value) {
      state.inputValue = value
    },
    SET_CURSOR_POSITION(state, value) {
      state.iframeCursorPosition = value
    },
    SET_SVGCODE(state, value) {
      state.svgCode = value
    },
    SET_SVGFONTSIZE(state, value) {
      state.svgFontSize = value
    },
    SET_SVGCOLOR(state, value) {
      state.svgColor = value
    },
    SET_SVGBGCOLOR(state, value) {
      state.svgBgColor = value
    },
    SET_SVGDISPLAYMODE(state, value) {
      state.svgDisplayMode = value
    },
  },
  getters: {
    //组件获取仓库的值
    getInputValue: (state) => state.inputValue,
    getIframeCursorPosition: (state) => state.iframeCursorPosition,
    getSvgCode: (state) => state.svgCode,
    getSvgFontSize: (state) => state.svgFontSize,
    getSvgColor: (state) => state.svgColor,
    getSvgBgColor: (state) => state.svgBgColor,
    getSvgDisplayMode: (state) => state.svgDisplayMode,
  },
})

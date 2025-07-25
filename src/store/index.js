import { createStore } from 'vuex'
export default createStore({
  state: {
    inputValue: '', //插入模式下 输入
    iframeCursorPosition: 0, //输入框的光标
    svgCode: '', //存放svg代码
    displayStyle: true, //svg单起一行or跟在文本后
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
    SET_DISPLAY_STYLE(state, value) {
      state.displayStyle = value
    },
  },
  getters: {
    //组件获取仓库的值
    getInputValue: (state) => state.inputValue,
    getIframeCursorPosition: (state) => state.iframeCursorPosition,
    getDisplayStyle: (state) => state.displayStyle,
    getSvgCode: (state) => state.svgCode,
  },
})

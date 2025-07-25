/* eslint-disable no-undef */
// 创建iframe容器 否则mathjax会受主页面影响
const iframe = document.createElement('iframe')
iframe.id = 'vue-note-container'
iframe.style =
  'position:fixed; top:0; left:0; z-index:9999; width:300px; height:500px; border:none;'
iframe.sandbox = 'allow-scripts allow-same-origin'
iframe.allowTransparency = true
document.body.appendChild(iframe)
const iframeDoc = iframe.contentDocument

// 注入CSS到iframe中
const styleLink = iframeDoc.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href = chrome.runtime.getURL('assets/css/main.css')
iframeDoc.head.appendChild(styleLink)

// 注入JS到iframe中
const scriptMain = iframeDoc.createElement('script')
scriptMain.src = chrome.runtime.getURL('assets/js/main.js')
iframeDoc.body.appendChild(scriptMain)

// 动态加载扩展内的 MathJax 脚本
const scriptMathJax = iframeDoc.createElement('script')
// 加载扩展本地的 MathJax 资源
scriptMathJax.src = chrome.runtime.getURL('mathjax/es5/tex-svg-full.js')
// 添加到页面
iframeDoc.body.appendChild(scriptMathJax)

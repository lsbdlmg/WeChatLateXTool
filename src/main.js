import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
// 获取当前环境的document（在iframe内就是iframe的document）
const currentDocument = typeof window !== 'undefined' ? window.document : document
// 在iframe内部创建一个专门的应用容器
let container = currentDocument.getElementById('app-container')
// 如果容器不存在，则创建它
if (!container) {
  container = currentDocument.createElement('div')
  container.id = 'app-container'
  currentDocument.body.appendChild(container)
}
// 创建Vue应用并挂载到容器
const app = createApp(App)
app.use(store) // 初始化仓库
app.mount(container)

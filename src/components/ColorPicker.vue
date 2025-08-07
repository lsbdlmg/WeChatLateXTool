<script setup>
import { ref, onMounted, defineProps, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const paletteRef = ref(null)
// 组件属性
const props = defineProps({
  isBgColor: {
    type: Boolean,
  },
  colorTitle: {
    type: String,
  },
})
const defaultColor = props.isBgColor ? 'transparent' : 'inherit'
const svgCodeColor = props.isBgColor
  ? computed({
      get() {
        return store.getters.getSvgBgColor
      },
      set(value) {
        store.commit('SET_SVGBGCOLOR', value)
      },
    })
  : computed({
      get() {
        return store.getters.getSvgColor
      },
      set(value) {
        store.commit('SET_SVGCOLOR', value)
      },
    })

// 状态管理
const isOpen = ref(false)
const recentColors = ref([])

// 临时状态
const tempInputColor = ref('#000000')
const isValidTempInput = ref('false')

// 基本颜色集合（精简以适应高度）
const basicColors = [
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#CCCCCC',
  '#EEEEEE',
  '#FFFFFF',
  '#FF0000',
  '#FF9900',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#9900FF',
  '#FF00FF',
  '#FF5252',
  '#FF8A80',
  '#FFCCBC',
  '#FFF9C4',
  '#DCEDC8',
  '#B2EBF2',
  '#BBDEFB',
  '#C8E6C9',
]

// 验证颜色格式是否有效
const isValidColorFormat = (color) => {
  if (!color) return false
  // 匹配 #RRGGBB 或 #RGB 格式
  const hexRegex = /^#([0-9A-F]{6}){1,2}$/i
  return hexRegex.test(color)
}

// 选择颜色（从最近使用或基本色）
const selectColor = (color) => {
  if (isValidColorFormat(color)) {
    // 直接应用并添加到最近使用
    svgCodeColor.value = color
    addToRecentColors(color)
    isOpen.value = false
  }
}

// 验证临时输入的颜色
const validateTempInputColor = () => {
  // 自动添加#前缀
  if (tempInputColor.value && !tempInputColor.value.startsWith('#')) {
    tempInputColor.value = '#' + tempInputColor.value
  }
  // 验证格式
  isValidTempInput.value = isValidColorFormat(tempInputColor.value)
}

// 确认输入框的颜色（仅点击按钮时应用）
const confirmInputColor = () => {
  if (isValidTempInput.value && tempInputColor.value) {
    svgCodeColor.value = tempInputColor.value
    addToRecentColors(tempInputColor.value)
    isOpen.value = false
  }
}

// 消除颜色
const handleClearColor = () => {
  svgCodeColor.value = defaultColor
  isOpen.value = false
}

// 添加到最近使用颜色
const addToRecentColors = (color) => {
  // 移除已存在的相同颜色（避免重复）
  const newRecentColors = recentColors.value.filter((c) => c !== color)
  // 添加新颜色到开头
  newRecentColors.unshift(color)
  // 限制数量
  if (newRecentColors.length > 10) {
    newRecentColors.pop()
  }
  recentColors.value = newRecentColors
  // 存储到localStorage，持久化保存
  localStorage.setItem('recentColors', JSON.stringify(newRecentColors))
}

// 从localStorage加载最近使用颜色
const loadRecentColors = () => {
  const saved = localStorage.getItem('recentColors')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        recentColors.value = parsed.slice(0, props.maxRecentColors)
      }
    } catch (e) {
      console.error('加载最近颜色失败:', e)
    }
  }
}

// 修复点击外部关闭逻辑
const handleClickOutside = (event) => {
  // 使用当前组件的 ref 而非全局查询
  const palette = paletteRef.value
  if (palette && !palette.contains(event.target)) {
    isOpen.value = false
  }
}

// 组件挂载时加载最近使用颜色并添加点击监听
onMounted(() => {
  loadRecentColors()
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="color-palette" ref="paletteRef">
    <!-- 颜色选择器触发器/当前选中颜色 -->
    <div
      class="current-color"
      :style="{
        color: props.isBgColor ? '' : svgCodeColor,
        backgroundColor: props.isBgColor ? svgCodeColor : '',
        border: svgCodeColor ? '1px solid #ddd' : '1px dashed #999',
      }"
      @click="isOpen = !isOpen"
      :title="`${props.isBgColor ? '背景颜色' : '字体颜色'}:${svgCodeColor ? svgCodeColor : '无'}`"
    >
      {{ props.colorTitle }}
    </div>
    <!-- 调色板面板 -->
    <div class="palette-panel" v-show="isOpen" @click.stop>
      <!-- 最近使用颜色（包含消除颜色） -->
      <div class="section recent-colors">
        <h3 class="section-title">最近使用-- {{ props.colorTitle }}</h3>
        <div class="color-grid">
          <!-- 固定添加消除颜色选项 -->
          <div class="color-item clear-color" title="消除颜色" @click="handleClearColor">
            <span class="clear-icon">×</span>
          </div>

          <div
            v-for="(color, index) in recentColors"
            :key="index"
            class="color-item"
            :style="{ backgroundColor: color }"
            :title="color"
            @click="selectColor(color)"
          ></div>
        </div>
      </div>

      <!-- 基本颜色 -->
      <div class="section basic-colors">
        <h3 class="section-title">基本色</h3>
        <div class="color-grid">
          <div
            v-for="color in basicColors"
            :key="color"
            class="color-item"
            :style="{ backgroundColor: color }"
            :title="color"
            @click="selectColor(color)"
          ></div>
        </div>
      </div>

      <!-- 更多颜色（取色板） -->
      <div class="section more-colors">
        <h3 class="section-title">更多颜色</h3>
        <div class="color-picker-container">
          <input type="color" v-model="tempInputColor" class="native-color-picker" />

          <input
            type="text"
            v-model="tempInputColor"
            class="color-text-input"
            placeholder="#RRGGBB"
            @input="validateTempInputColor"
          />

          <!-- 仅作用于输入框的确认按钮 -->
          <button
            class="input-confirm-btn"
            @click="confirmInputColor"
            :disabled="!isValidTempInput"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 变量定义
@panel-width: 282px;
@panel-height: 280px;
@spacing-sm: 2px;
@spacing-md: 8px;
@spacing-lg: 2px;
@color-item-size: 22px;
@border-radius: 4px;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
@primary-color: #42b983;
@primary-dark: #359e6d;

.color-palette {
  margin-left: 3px;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// 当前选中颜色
.current-color {
  width: 25px;
  height: 25px;
  border-radius: @border-radius;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: 700;
}

// 调色板面板
.palette-panel {
  position: fixed;
  top: 253px;
  left: 10px;
  background: white;
  border-bottom-right-radius: @border-radius;
  border-bottom-left-radius: @border-radius;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: @spacing-lg;
  width: @panel-width;
  max-height: @panel-height;
  overflow-y: auto;
  z-index: 1000;
  box-sizing: border-box;

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;

    &:hover {
      background: #bbb;
    }
  }
}

// 面板分区
.section {
  margin-bottom: @spacing-lg;

  &:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 12px;
    color: #666;
    margin: 0 0 @spacing-sm 0;
    padding: 0;
    font-weight: 500;
  }
}

// 颜色网格
.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: @spacing-sm;

  .color-item {
    width: @color-item-size;
    height: @color-item-size;
    border-radius: @border-radius;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      transform: scale(1.1);
    }
  }

  // 消除颜色按钮样式
  .clear-color {
    position: relative;
    background-color: transparent;
    border: 1px dashed #999;

    .clear-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 14px;
      line-height: 1;
    }

    &:hover {
      border-color: #ff4444;

      .clear-icon {
        color: #ff4444;
      }
    }
  }
}

// 原生取色板
.color-picker-container {
  padding: @spacing-sm 0;
  display: flex;
  gap: @spacing-lg;
  .native-color-picker {
    width: 90px;
    height: 33px;
    padding: 0;
    border: none;
    cursor: pointer;
    background: transparent;
  }

  .color-text-input {
    width: 100px;
    padding: 5px 7px;
    border: 1px solid #ddd;
    border-radius: @border-radius;
    font-size: 12px;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: @primary-color;
      box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
    }
  }

  .input-color-preview {
    width: 25px;
    height: 25px;
    border-radius: @border-radius;
  }

  .input-confirm-btn {
    padding: 5px 10px;
    background-color: @primary-color;
    color: white;
    border: none;
    border-radius: @border-radius;
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: @primary-dark;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
}
</style>

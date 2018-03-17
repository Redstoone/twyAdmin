<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'normalize.css'; // normalize.css 样式格式化
@import 'src/assets/styles/index.scss'; // 全局自定义的css样式
</style>

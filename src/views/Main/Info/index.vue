<!--
* @description scss
* @fileName index
* @author yq
* @date 2020/10/19 13:07:24
!-->
<template>
  <div class="info-wrap">
    <div class="avatar">
      <img class="avatar-img" src="../../../assets/img/logo.jpg" alt="头像" srcset="">
    </div>
    <div class="name">NinJa 的博客</div>
    <div class="tags">
      <a-tooltip placement="bottom">
        <template v-slot:title>
          <span
            >https://gitee.com/yq770770</span
          >
        </template>
        <a-tag class="tag" color="#c01a20" @click="go('https://gitee.com/yq770770')">Gitee</a-tag>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template v-slot:title>
          <span>niko731391599</span>
        </template>
        <a-tag class="tag" color="#75ce30">WX</a-tag>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template v-slot:title>
          <span>17398081021@163.com</span>
        </template>
        <a-tag class="tag" color="#6096ff">E-mail</a-tag>
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "info-wrap",
  setup() {
    const go = (path: string): void => {
      window.open(path, "_blank");
    };
    return {
      go,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

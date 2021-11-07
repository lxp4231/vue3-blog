<!--
* @fileName index
* @author yq
* @date 2020/10/19 14:03:12
!-->
<template>
  <a-carousel dot-position="left" autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "Ad",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<!--
* @description
* @fileName Main
* @directory C:\Users\Administrator\Desktop\vue3.0-type-script-antd\src\views
* @author yq
* @date 2020/10/18 19:27:31
!-->
<template>
  <div class="main-wrap">
    <Info class="info" />
    <Ad class="ad" />
    <Marjo class="marjo" />
    <Statistics class="statistics" />
    <Comment class="comment" />
    <Articles class="articles" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import Articles from "./Articles/index.vue";
import Info from "./Info/index.vue";
import Marjo from "./Major/index.vue";
import Ad from "./Ad/index.vue";
import Statistics from "./Statistics/index.vue";
import Comment from "./Comment/index.vue";
import server from "@/utils/axios";
import api from '@/utils/api';
export default defineComponent({
  name: "Main",
  components: {
    Articles,
    Info,
    Marjo,
    Ad,
    Statistics,
    Comment,
  },
  setup() {
    
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "./Main.scss";
</style>

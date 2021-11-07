<!--
* @description 登录模块
* @fileName index
* @directory C:\Users\Administrator\Desktop\blog\src\views\login
* @author yq
* @date 2020/10/11 16:29:46
!-->
<template>
  <div class="wrap center">
    <div class="form-wrap">
      <div class="form-box">
        <div class="form-box-left">
          占位
        </div>
        <div class="form-box-right">
          <Tabs
            height="30"
            width="350"
            v-model:activeIndex="activeIndex"
            :list="list"
          />
          <Login v-if="activeIndex === 0" class="login" />
          <Register v-else v-model:activeIndex="activeIndex" class="register" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Tabs from "@/components/Tabs.vue";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    Login,
    Register,
    Tabs,
  },
  setup() {
    const route = useRoute();
    let activeIndex = ref(0);
    return {
      activeIndex,
      list: ["登陆", "注册"],
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

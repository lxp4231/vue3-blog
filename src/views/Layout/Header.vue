<!--
* @description
* @fileName Header
* @directory C:\Users\Administrator\Desktop\vue3.0-type-script-antd\src\components\Layout
* @author yq
* @date 2020/10/18 18:51:49
!-->
<template>
  <div class="header-wrap">
    <div class="logo">
      <img class="logo-img" :src="logo" alt="logo" />
      <div class="logo-text">
        Ninja的博客
      </div>
    </div>
    <div class="info">
      <Menu
        v-for="nav in navList.list"
        :key="nav.id"
        class="menu"
        :title="nav.name"
        :list="nav.children"
      />
      <div class="login-btns" v-if="!isLogin">
        <a-button type="link" size="large" ghost @click="login">
          登录
        </a-button>
      </div>
      <div class="user-info" v-else>
        <a-popover class="user-box">
          <template v-slot:content>
            <span @click="goTo('./center')" style="cursor: pointer;"
              >个人中心</span
            >
          </template>
          <img
            class="avatar"
            src="../../assets/img/avatar.png"
            alt="用户头像"
            srcset=""
          />
          <div class="user-name">
            {{ userInfo.user }}
          </div>
        </a-popover>
        <LogoutOutlined :style="{ fontSize: '30px' }" @click="logout" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { LogoutOutlined } from "@ant-design/icons-vue";
import useGetNav from "@/hooks/GetData/useGetNav";
import Menu from "@/components/Menu.vue";
import { Router, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import { message } from "ant-design-vue";
import { Order } from '@/types/getData';

export default defineComponent({
  name: "Header",
  components: {
    Menu,
    LogoutOutlined,
  },
  setup() {
    const { navList, getNavData } = useGetNav(Order.reverse);
    const router: Router = useRouter();
    const store: Store<any> = useStore();
    const login = (): void => {
      goTo("./login");
    };
    const logout = (): void => {
      message.success("登出成功");
      store.dispatch("SET_USERINFO");
      goTo("./main");
    };
    const goTo = (url: string): void => {
      router.push(url);
    };
    const logo = ref(require("../../assets/img/logo.jpg"));
    const userInfo = ref(computed(() => store.getters.GET_USERINFO));
    const isLogin = ref(computed(() => store.getters.GET_ISLOGING));
    watch(
      () => {
        return isLogin.value;
      },
      (value) => {
        getNavData();
      }
    );
    return {
      navList,
      logo,
      login,
      logout,
      goTo,
      isLogin,
      userInfo,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>

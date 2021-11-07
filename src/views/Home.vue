<template>
  <div class="home-wrap">
    <Header class="header" />
    <div class="content" id="main">
      <!-- <a-button type="primary" @click="login"> 登录跳转 </a-button> -->
      <!-- <img id="background" src="../assets/img/bg.jpg" alt="" srcset="" /> -->
      <!-- <img id="kobe" src="../assets/img/kobe.png" alt="" srcset="" /> -->
      <router-view :key="key" />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Main from "./Main/Main.vue";
import Header from "./Layout/Header.vue";
import Footer from "./Layout/Footer.vue";

export default defineComponent({
  name: "Home",
  components: {
    Main,
    Header,
    Footer,
  },
  setup() {
    onMounted: {
      // Parallax效果
      // nextTick(() => {
      //   let main = document.querySelector("#main") as HTMLElement;
      //   main.addEventListener("mousemove", function(e: MouseEvent) {
      //     let w = e.clientX;
      //     let horizontal =
      //       e.clientX / parseInt(getComputedStyle(main).width, 10);
      //     let vertical =
      //       e.clientY / parseInt(getComputedStyle(main).height, 10);
      //     let kobe = document.querySelector("#kobe") as HTMLElement;
      //     kobe.style.transform = `translate(${(horizontal * 10) /
      //       0.5}px,${(vertical * 10) / 0.5}px)`;
      //   });
      // });
    }
    const router = useRouter();
    const route = useRoute();
    const login = function() {
      router.push("/login");
    };
    const key = computed(() =>
      route.name ? String(route.name) + new Date() : String(route) + new Date()
    );
    return {
      login,
      key,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>

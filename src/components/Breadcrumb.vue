<!--
* @fileName Breadcrumb
* @author yq
* @date 2020/10/19 18:12:24
!-->
<template>
  <a-breadcrumb>
    <a-breadcrumb-item style="cursor: pointer;" @click="goHome">
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      {{ label }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { HomeOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Breadcrumb",
  props: {
    label: {
      type: String,
      default: "示例",
    },
  },
  components: {
    HomeOutlined,
  },
  setup() {
    const router = useRouter();
    const goHome = () => {
      router.push("./main");
    };
    return {
      goHome,
    };
  },
});
</script>

<style scoped lang="scss"></style>

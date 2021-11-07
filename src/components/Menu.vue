<!--
* @fileName Menu
* @author yq
* @date 2020/10/20 15:03:17
!-->
<template>
  <a-dropdown>
    <span class="menu-item" @click="(e) => e.preventDefault()">
      {{ title }} <DownOutlined />
    </span>
    <template v-slot:overlay>
      <a-menu>
        <a-menu-item v-for="menu in list" :key="menu.id">
          <a href="javascript:;" @click="go(menu.path)">{{ menu.name }}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
interface listItem {
  id?: string;
  label: string;
  path?: string;
}
export default defineComponent({
  name: "Menu",
  components: {
    DownOutlined,
  },
  props: {
    list: {
      type: Array,
      default: (): Array<listItem> => [
        {
          label: "菜单1",
        },
        {
          label: "菜单2",
        },
        {
          label: "菜单3",
        },
      ],
    },
    title: {
      type: String,
      default: "导航",
    },
  },
  setup() {
    const router = useRouter();
    const go = (path: string): void => {
      router.push(path);
    };
    return {
      go,
    };
  },
});
</script>

<style scoped lang="scss">
.menu-item {
  cursor: pointer;
}
</style>

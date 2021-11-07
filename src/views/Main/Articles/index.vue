<!--
* @description scss
* @fileName index
* @author yq
* @date 2020/10/19 13:05:12
!-->
<template>
  <div class="articles-wrap">
    <div class="title">
      <div class="title-text">最近发布</div>
      <div class="all">
        <span>查看全部</span>
        <MoreOutlined />
      </div>
    </div>
    <div class="info">
      <div class="total">
        <FolderOutlined />
        <span>文章总数</span>
        <span>12 篇</span>
      </div>
    </div>
    <a-divider />
    <Article v-for="(n, index) in 10" :key="index" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Article from "./components/Article.vue";
import {
  FolderOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  MoreOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "Articles",
  components: {
    Article,
    FolderOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
    MoreOutlined
  },
  setup() {
    const sortList = reactive([
      { id: "sort0", label: "时间最近", active: 0 },
      { id: "sort1", label: "点赞最多", active: 1 },
      { id: "sort2", label: "观看最多", active: 1 },
      { id: "sort3", label: "评论最多", active: 1 },
    ]);
    return {
      sortList,
    };
  },
});
</script>

<style scoped lang="scss">
@import "index.scss";
</style>

<!--
* @fileName Article
* @author yq
* @date 2020/10/19 15:18:32
!-->
<template>
  <div class="article-wrap">
    <div class="title">
     内容 模拟 第一篇文章 JavaScript基础 内容 模拟 第一篇文章 JavaScript基础 
    </div>
    <div class="info">
      <div class="article-date">
        <CalendarOutlined />
        <span>2020年10月19日</span>
      </div>
      <div class="article-cate">
        <AppstoreOutlined />
        <a-tag color="#7ece45">JavaScript基础</a-tag>
      </div>
    </div>
    <div class="info-more">
      <div class="article-view">
        <EyeOutlined />
        <span>94811</span>
      </div>
      <div class="article-like">
        <LikeOutlined />
        <span>123</span>
      </div>
      <div class="article-comment">
        <CommentOutlined />
        <span>4213</span>
      </div>
    </div>
    <a-divider />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  CalendarOutlined,
  AppstoreOutlined,
  EyeOutlined,
  MoreOutlined,
  LikeOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "Article",
  components: {
    CalendarOutlined,
    AppstoreOutlined,
    EyeOutlined,
    MoreOutlined,
    LikeOutlined,
    CommentOutlined,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "./Article.scss";
</style>

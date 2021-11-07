<!--
* @fileName index
* @author yq
* @date 2020/10/19 13:56:04
!-->
<template>
  <div class="major-wrap">
    <a-tooltip placement="bottom">
      <template v-slot:title>
        <span>
          {{ title }}
        </span>
      </template>
      <div class="title">
        {{ title }}
      </div>
    </a-tooltip>
    <div class="major-info">
      <a-tag color="#c01a20">置顶</a-tag>
      <div class="major-date">
        <CalendarOutlined />
        <span>{{ create_time }}</span>
      </div>
      <div class="major-cate">
        <AppstoreOutlined />
        <span>{{ category_name }}</span>
      </div>
      <div class="major-tags">
        <a-tag v-for="(item, index) in tags" :key="index" :color="item.color">{{
          item.name
        }}</a-tag>
      </div>
      <div class="major-view">
        <EyeOutlined />
        <span>94811</span>
      </div>
    </div>
    <a-divider />
    <p class="content">
      <MarkDown v-model:source="content" :height="120" :breaks="true" :html="true" />
    </p>
    <a-divider />
    <div class="all" @click="goTo">
      <span>查看全部</span>
      <MoreOutlined />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import {
  CalendarOutlined,
  AppstoreOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons-vue";
import useGetTopArticle from "@/hooks/GetData/useGetTopArticle";
import MarkDown from '@/components/Markdown.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "Major",
  components: {
    CalendarOutlined,
    AppstoreOutlined,
    EyeOutlined,
    MoreOutlined,
    MarkDown,
  },
  setup() {
    const router = useRouter()
    const { topArticle } = useGetTopArticle();
    const goTo = ()=>{
      if(topArticle.id){
        router.push(`/article?id=${topArticle.id}`)
      }
    }
    return { ...toRefs(topArticle),goTo };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

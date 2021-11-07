<!--
* @fileName Article
* @author yq
* @date 2020/10/20 15:34:33
!-->
<template>
  <div class="article-wrap">
    <Breadcrumb :label="article.title" />
    <MarkDown class="markdown" :source="article.content" />
    <div class="next_prev">
      <div :class="prevArticle.id != -1 ? 'prev' : ''" @click="goto('prev')">
        上一篇 <span class="prev-title">{{ prevArticle.title }}</span>
      </div>
      <div :class="nextArticle.id != -1 ? 'next' : ''" @click="goto('next')">
        下一篇 <span class="next-title">{{ nextArticle.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useGetArticle from "@/hooks/GetData/useGetArticle";
import MarkDown from "@/components/Markdown.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default defineComponent({
  name: "Article",
  components: {
    MarkDown,
    Breadcrumb,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let id = ref(route.query.id || "");
    (function processingError() {
      if (!id) {
        message.error("数据出错");
        router.go(-1);
        return;
      }
    })();
    const { article, prevArticle, nextArticle } = useGetArticle(id.value as string);
    const goto = (type: string): void => {
      if (type === "next" && nextArticle.id !== -1) {
        id.value = nextArticle.id + "";
      } else if (type === "prev" && prevArticle.id !== -1) {
        id.value = prevArticle.id + "";
      }
    };
    watch(
      () => {
        return id.value;
      },
      (val) => {
        router.push(`/article?id=${val}`)
      }
    );
    return {
      id,
      article,
      prevArticle,
      nextArticle,
      goto,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

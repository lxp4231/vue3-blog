<!--
* @fileName ArticleList
* @author yq
* @date 2020/10/20 16:20:05
!-->
<template>
  <div class="articleList-wrap">
    <div class="table-top">
      <a-button type="primary" @click="add">添加</a-button>
    </div>
    <div class="table">
      <a-table
        :data-source="articles.list"
        rowKey="id"
        bordered
        :pagination="false"
      >
        <a-table-column key="id" title="id" data-index="id" :width="80" />
        <a-table-column
          key="title"
          title="标题"
          data-index="title"
          :width="200"
        />
        <a-table-column key="tags" title="标签">
          <template v-slot="{ record }">
            <a-tag v-for="tag in record.tags" :key="tag" :color="tag.color">
              {{ tag.name }}
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column
          key="category_name"
          title="类别"
          data-index="category_name"
          :width="100"
        />
        <a-table-column
          key="create_time"
          title="添加时间"
          data-index="create_time"
        />
        <a-table-column
          key="update_time"
          title="更新时间"
          data-index="update_time"
        />
        <a-table-column key="action" title="操作">
          <template v-slot="{ record }">
            <a-button
              class="btn"
              type="info"
              size="small"
              @click="edit(record)"
            >
              编辑
            </a-button>
            <a-button
              class="btn"
              type="danger"
              size="small"
              @click="remove(record)"
            >
              删除
            </a-button>
            <a-checkbox class="btn" name="type" v-model:checked="record.top" @change="toTop(record)">
              是否置顶
            </a-checkbox>
          </template>
        </a-table-column>
      </a-table>
      <div class="paging">
        <a-pagination
          :total="articles.pagination.total"
          :showTotal="() => `Total ${articles.pagination.total}`"
          show-quick-jumper
          v-model:current="current"
          @change="jump"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useGetArticles from "@/hooks/GetData/useGetArticles";
import { IArticle } from "@/types/getData";
import server from "@/utils/axios";
import api from "@/utils/api";
export default defineComponent({
  name: "ArticleList",
  setup() {
    const router = useRouter();
    const { articles, getArticlesData } = useGetArticles();
    const current = ref<Number>(1);
    const jump = (curr: number) => {
      getArticlesData(curr);
      current.value = curr;
    };
    const add = () => {
      router.push("/addArticle");
    };
    const edit = (item: IArticle) => {
      router.push(`/addArticle?id=${item.id}`);
    };
    const remove = async (item: IArticle) => {
      await server.request({
        url: api.deleteArticle,
        method: "post",
        data: {
          id: item.id,
        },
      });
      jump(1);
    };
    const toTop = async (item:IArticle) => {
      await server.request({
        url: api.topArticle,
        method: "post",
        data: {
          id: item.id,
          top:item.top
        },
      });
      jump(1);
    }
    return {
      current,
      articles,
      add,
      edit,
      remove,
      jump,
      toTop
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

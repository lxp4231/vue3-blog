<!--
* @fileName AddArticle
* @author yq
* @date 2020/10/20 16:20:44
!-->
<template>
  <div class="addArticle-wrap">
    <div class="form">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="标题">
          <a-input v-model:value="title" />
        </a-form-item>
        <a-form-item label="分类">
          <a-select v-model:value="category" placeholder="请选择分类">
            <a-select-option
              :value="item.id"
              v-for="(item, index) in articles.list"
              :key="index"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="技术栈">
          <div>
            <a-tag
              v-for="(tag, index) in tags"
              :color="tag.color"
              :key="index"
              closable
              @close="handleClose(tag)"
            >
              {{ tag.name }}
            </a-tag>
            <a-input
              v-if="tagList.inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              v-model:value="tagList.inputValue"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag
              v-else
              @click="showInput"
              style="background: #fff; borderStyle: dashed;"
            >
              <plus-outlined /> New Tag
            </a-tag>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <Editor v-model:source="source" :breaks="true" :html="true" />
    <div class="btn">
      <a-button type="primary" @click="add">{{
        id ? "修改" : "添加"
      }}</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, Ref, ref, toRefs } from "vue";
import server from "@/utils/axios";
import api from "@/utils/api";
import Editor from "@/components/Editor.vue";
import { message } from "ant-design-vue";
import { randomColor } from "@/utils/utils";
import { useRoute } from "vue-router";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons-vue";
import useGetEditArticle from "@/hooks/GetData/useGetEditArticle";
import useGetArtCate from "@/hooks/GetData/useGetArtCate";
import useArticleBtn from "@/hooks/Articles/useArticleBtn";
import { TagList, Tag, IArticleForm } from "@/types/category";

export default defineComponent({
  name: "AddArticle",
  components: {
    UploadOutlined,
    Editor,
    PlusOutlined,
  },
  setup() {
    const route = useRoute();
    const { id } = route.query;
    const input = ref<string | null>(null);
    const tagList = reactive<TagList>({
      list: [],
      inputVisible: false,
      inputValue: "",
    });
    const { form } = useGetEditArticle(id as string);
    // 文章分类 根据接口获取
    const { articles, getArtCateData } = useGetArtCate(999);
    const handleClose = (removedTag: string) => {
      form.tags = (form.tags as Array<Tag>).filter(
        (tag) => tag.name !== removedTag
      );
    };
    const showInput = () => {
      tagList.inputVisible = true;
      nextTick(() => {
        input.value && (input as Ref).value.focus();
      });
    };
    const handleInputConfirm = () => {
      if (tagList.inputValue) {
        if (
          (form.tags as Array<Tag>).every((tag) => {
            return tag.name != tagList.inputValue;
          })
        ) {
          let newTag = { name: tagList.inputValue, color: randomColor() };
          (form.tags as Array<Tag>).push(newTag);
        }
      }
      tagList.inputVisible = false;
      tagList.inputValue = "";
    };
    const { addBtn } = useArticleBtn();
    const add = () => {
      id ? addBtn(form, id as string) : addBtn(form);
    };
    return {
      id,
      articles,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ...toRefs(form),
      tagList,
      handleClose,
      showInput,
      handleInputConfirm,
      input,
      add,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

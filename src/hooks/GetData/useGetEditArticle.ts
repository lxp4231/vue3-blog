import { IArticleForm } from '@/types/category';
import api from "@/utils/api";
import server from "@/utils/axios";
import { onMounted, reactive } from "vue";

interface IuseGetArticle {
  form: IArticleForm;
  getArticleData: (id?: string) => Promise<void>;
}
export default function useGetEditArticle(id?: string): IuseGetArticle {
  const form = reactive<IArticleForm>({
    title: "",
    category: undefined,
    tags: [],
    source: "",
  });
  async function getArticleData(): Promise<void> {
    let res = await server.request({
      url: api.findArticle,
      method: "post",
      data: {
        id,
      },
    });
    if (res.data.code === 1000) {
      let data = res.data.data;
      form.title = data.title;
      form.category = data.category;
      form.tags = JSON.parse(data.tags);
      form.source = data.source;
    }
  }
  onMounted(() => {
    id && getArticleData();
  });
  return { form, getArticleData };
}

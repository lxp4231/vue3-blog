import { IArticle } from "@/types/getData";
import api from "@/utils/api";
import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { formatDate } from '@/utils/utils' 
interface IuseGetTopArticle {
  topArticle: IArticle;
}
export default function useGetTopArticle(): IuseGetTopArticle {
  let topArticle = reactive<IArticle>({
    id: 0,
    title: "",
    tags: [],
    category_name: "",
    content: "",
    create_time: "",
    update_time: "",
  });
  async function getTopArticleData() {
    let res = await server.request({
      url: api.home,
      method: "post",
    });
    if (res.data.code === 1000) {
      let data = res.data.data;
      let tags = data.tags || '[]'
      topArticle.id = data.id;
      topArticle.title = data.title;
      topArticle.tags = JSON.parse(tags);
      topArticle.category_name = data.category_name;
      topArticle.content = data.source;
      topArticle.create_time = formatDate(data.create_time,'yyyy年MM月dd日');
      topArticle.update_time = formatDate(data.update_time,'yyyy年MM月dd日');
    }
  }
  onMounted(() => {
    getTopArticleData();
  });

  return { topArticle };
}

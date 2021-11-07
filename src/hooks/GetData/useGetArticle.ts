import { IArticle, IPrveNext } from "@/types/getData";
import api from "@/utils/api";
import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { formatDate } from "@/utils/utils";
interface IuseGetArticle {
  article: IArticle;
  nextArticle: IPrveNext;
  prevArticle: IPrveNext;
}
export default function useGetArticle(id: string): IuseGetArticle {
  let article = reactive<IArticle>({
      id: 0,
      title: "",
      tags: [],
      category_name: "",
      content: "",
      create_time: "",
      update_time: "",
    }),
    prevArticle = reactive<IPrveNext>({
      id: -1,
      title: "",
    }),
    nextArticle = reactive<IPrveNext>({
      id: -1,
      title: "",
    });
  async function getArticleData(id: string) {
    let res = await server.request({
      url: api.article,
      method: "post",
      data: {
        id,
      },
    });
    if (res.data.code === 1000) {
      let data = res.data.data.thisData,
        nextData = res.data.data.nextData,
        prevData = res.data.data.prevData,
        tags = data.tags || "[]";
      article.id = data.id;
      article.title = data.title;
      article.tags = JSON.parse(tags);
      article.category_name = data.category_name;
      article.content = data.source;
      article.create_time = formatDate(data.create_time, "yyyy年MM月dd日");
      article.update_time = formatDate(data.update_time, "yyyy年MM月dd日");
      if (nextData) {
        nextArticle.id = nextData.id;
        nextArticle.title = nextData.title;
      } else {
        nextArticle.title = "没有下一篇了";
      }
      if (prevData) {
        prevArticle.id = prevData.id;
        prevArticle.title = prevData.title;
      } else {
        prevArticle.title = "没有上一篇了";
      }
    }
  }
  onMounted(() => {
    getArticleData(id);
  });

  return { article, prevArticle, nextArticle };
}

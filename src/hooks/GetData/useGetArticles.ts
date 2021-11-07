import { IArticle, IArticles } from "@/types/getData";
import api from "@/utils/api";
import server from "@/utils/axios";
import { formatDate } from "@/utils/utils";
import { onMounted, reactive } from "vue";

interface IUseGetArticles {
  articles: IArticles;
  getArticlesData: (pageNum: number) => Promise<void>;
}
export default function useGetArticles(pageSize:number = 10): IUseGetArticles {
  let articles: IArticles = reactive({ list: [], pagination: {} });
  async function getArticlesData(pageNum: number) {
    let res = await server.request({
      url: api.articleList,
      method: "post",
      data: {
        pageNum,
        pageSize
      },
    });
    let list = res.data.data.list;
    list.map((item: IArticle) => {
      item.create_time = formatDate(item.create_time);
      item.update_time = formatDate(item.update_time);
      item.content = item.content;
      item.tags = JSON.parse(item.tags as string);
      return item;
    });
    articles.list = list;
    articles.pagination.total = res.data.data.total;
    articles.pagination.hasNextPage = res.data.data.hasNextPage;
    articles.pagination.totalPage = res.data.data.totalPage;
  }
  onMounted(() => {
    getArticlesData(1);
  });
  return { articles, getArticlesData };
}

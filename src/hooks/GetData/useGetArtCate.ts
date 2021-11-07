import { IArtCate, IArtCateItem, Pagination } from "@/types/getData";
import api from "@/utils/api";
import server from "@/utils/axios";
import { formatDate } from "@/utils/utils";
import { onMounted, reactive } from "vue";
interface IuseGetArtCate {
  articles: IArtCate;
  getArtCateData: (pageNum:number) => Promise<void>;
}
export default function useGetArtCate(pageSize:number = 10): IuseGetArtCate {
  let articles: IArtCate = reactive({ list: [], pagination: {} });
  async function getArtCateData(pageNum: number):Promise<void> {
    let res = await server.request({
      url: api.artList,
      method: "post",
      data: {
        pageNum,
        pageSize
      },
    });
    let list = res.data.data.list;
    list.map((item: IArtCateItem) => {
      item.create_time = formatDate(item.create_time as string);
      item.update_time = formatDate(item.update_time as string);
      return item;
    });
    (articles.list as Array<IArtCateItem>) = res.data.data.list || [];
    (articles.pagination as Pagination) = {
      total: res.data.data.total || 0,
      hasNextPage: res.data.data.hasNextPage || false,
      totalPage: res.data.data.totalPage || 0,
    };
  }
  onMounted(() => {
    getArtCateData(1);
  });
  return { articles, getArtCateData };
}

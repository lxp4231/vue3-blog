import { IArticleForm } from "@/types/category";
import api from "@/utils/api";
import server from "@/utils/axios";

export default function useArticleBtn() {
  async function addBtn(form: IArticleForm, id?: string) {
    if (!id) {
      await server.request({
        url: api.addArticle,
        method: "post",
        data: {
          title: form.title,
          category: form.category,
          tags: form.tags,
          source: form.source,
        },
      });
    } else if (id) {
      await server.request({
        url: api.editArticle,
        method: "post",
        data: {
          id,
          title: form.title,
          category: form.category,
          tags: form.tags,
          source: form.source,
        },
      });
    }
  }

  return {
    addBtn,
  };
}

import server from "@/utils/axios";
import api from "@/utils/api";
import { getStorage } from "@/utils/storage.ts";
import { onMounted, reactive } from "vue";
import { INav, Order } from "@/types/getData";

interface IUseGetNav {
  navList: INav;
  getNavData: () => Promise<void>;
}

export default function UseGetNav(order:Order): IUseGetNav {
  let navList: INav = reactive({ list: [] });

  async function getNavData(): Promise<void> {
    let data = {};
    if (getStorage("userInfo")) {
      data = getStorage("userInfo");
    }
    let res = await server.request({
      url: api.nav,
      method: "post",
      data,
    });
    if (res.data.code === 1000) {
      if(order === 0){
        navList.list = res.data.data || []
      }else if (order === 1){
        navList.list = res.data.data.reverse() || []
      }
    }
  }

  onMounted(() => {
    getNavData();
  });

  return { navList, getNavData };
}

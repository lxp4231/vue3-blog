<!--
* @fileName NavCategories
* @author yq
* @date 2020/10/26 19:01:50
!-->
<template>
  <div class="nav-categories-wrap">
    <div class="table">
      <a-table :data-source="navList.list" :pagination="false" rowKey="id" bordered>
        <a-table-column key="id" title="id" data-index="id" :width="200" />
        <a-table-column
          key="name"
          title="分类名"
          data-index="name"
          :width="200"
        />
        <a-table-column
          key="path"
          title="路由"
          data-index="path"
          :width="200"
        />
        <a-table-column key="action" title="操作">
          <template v-slot="{ record }">
            <a-button
              class="btn"
              type="primary"
              size="small"
              v-if="record.pid === 0"
              @click="add(record, 1)"
            >
              增加一级分类
            </a-button>
            <a-button class="btn" size="small" @click="add(record, 2)">
              增加二级分类
            </a-button>
            <a-button
              class="btn"
              type="dashed"
              size="small"
              @click="edit(record)"
            >
              修改
            </a-button>
            <a-button
              class="btn"
              type="danger"
              size="small"
              v-if="record.pid !== 0"
              @click="remove(record)"
            >
              删除
            </a-button>
          </template>
        </a-table-column>
      </a-table>
    </div>

    <a-modal
      :title="dialogConfig.title"
      v-model:visible="dialogConfig.visible"
      @ok="submit"
    >
      <a-form ref="ruleForm" :model="formData" :rules="navRules">
        <a-form-item label="导航名称" name="name" required has-feedback>
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item label="导航级别" name="pid" required has-feedback>
          <a-select v-model:value="formData.pid">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in pidSelect"
              :key="index"
              disabled
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="导航路由" name="path" required has-feedback>
          <a-input v-model:value="formData.path" :disabled="disabled" />
        </a-form-item>
        <a-form-item label="权限等级" name="role_id" required has-feedback>
          <a-select v-model:value="formData.role_id">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in roleSelect"
              :key="index"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, toRefs } from "vue";
import { INav, INavItem, Order } from "@/types/getData";
import { IDialogConfig, INavForm, ISelectItem } from "@/types/category";
import useGetNav from "@/hooks/GetData/useGetNav";
import api from "@/utils/api";
import server from "@/utils/axios";

export default defineComponent({
  name: "NavCategories",
  setup() {
    const { navList, getNavData } = useGetNav(Order.positive);
    let dialogConfig = reactive<IDialogConfig>({
      visible: false,
      title: "",
      id: 0,
    });
    let formData = reactive<INavForm>({
      name: "",
      pid: 0,
      path: "",
      role_id: 0,
    });
    let pidSelect = reactive<ISelectItem[]>([
      { value: 0, label: "一级导航" },
      { value: 1, label: "二级导航" },
    ]);
    let roleSelect = reactive<ISelectItem[]>([
      { value: 0, label: "普通权限" },
      { value: 1, label: "Admin权限" },
    ]);
    let disabled = ref<boolean>(false);
    let ruleForm = ref<string | null>(null);

    const navRules = reactive({
      name: [{ required: true, message: "请输入导航名", trigger: "change" }],
      pid: [{ required: true, message: "请选择导航级别", trigger: "change" }],
      path: [{ required: true, message: "请输入导航路由", trigger: "change" }],
      role_id: [
        { required: true, message: "请选择导航权限", trigger: "change" },
      ],
    });

    const add = (item: INavItem, type: number) => {
      ruleForm.value && (ruleForm as Ref).value.resetFields();
      dialogConfig.title = "增加导航分类";
      dialogConfig.visible = true;
      if (type === 1) {
        formData.path = "-";
        disabled.value = true;
      } else if (type === 2) {
        if (item.pid === 0) {
          pidSelect[1].value = item.id;
          formData.pid = item.id;
        } else {
          pidSelect[1].value = item.pid;
          formData.pid = item.pid;
        }
        disabled.value = false;
      }
    };

    const remove = async (item: INavItem): Promise<void> => {
      let { data: res } = await server.request({
        url: api.deleteNav,
        method: "post",
        data: { id: item.id },
      });
      getNavData();
    };

    const edit = (item: INavItem): void => {
      ruleForm.value && (ruleForm as Ref).value.resetFields();
      dialogConfig.title = "修改导航分类";
      dialogConfig.visible = true;
      dialogConfig.id = item.id;
      if (item.pid !== 0) {
        pidSelect[1].value = item.pid;
      }
      formData.pid = item.pid;
      formData.name = item.name;
      formData.path = item.path;
      formData.role_id = item.role_id;
    };

    const submit = async (): Promise<void> => {
      if (dialogConfig.title === "修改导航分类") {
        let { data: res } = await server.request({
          url: api.editNav,
          method: "post",
          data: { id: dialogConfig.id, ...formData },
        });
      } else if (dialogConfig.title === "增加导航分类") {
        let { data: res } = await server.request({
          url: api.addNav,
          method: "post",
          data: { ...formData },
        });
      }
      getNavData();
      dialogConfig.visible = false;
    };

    return {
      ruleForm,
      navList,
      dialogConfig,
      formData,
      navRules,
      pidSelect,
      roleSelect,
      disabled,
      add,
      remove,
      edit,
      submit,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<!--
* @fileName User
* @author yq
* @date 2020/10/28 17:23:48
!-->
<template>
  <div class="user-wrap">
    <div class="table">
      <div class="add-btn">
        <a-button type="primary" @click="add">添加用户</a-button>
      </div>
      <a-table
        :data-source="users.list"
        rowKey="id"
        bordered
        :pagination="false"
      >
        <a-table-column key="id" title="id" data-index="id" :width="60" />
        <a-table-column key="user" title="用户名" data-index="user" />
        <a-table-column
          key="create_time"
          title="创建日期"
          data-index="create_time"
          :width="200"
        />
        <a-table-column
          key="update_time"
          title="更新日期"
          data-index="update_time"
          :width="200"
        />
        <a-table-column
          key="role_name"
          title="权限"
          data-index="role_name"
          :width="80"
        />
        <a-table-column key="action" title="操作">
          <template v-slot="{ record }">
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
              @click="remove(record)"
            >
              删除
            </a-button>
          </template>
        </a-table-column>
      </a-table>
      <div class="paging">
        <a-pagination
          :total="users.pagination.total"
          :showTotal="() => `Total ${users.pagination.total}`"
          show-quick-jumper
          v-model:current="current"
          @change="jump"
        />
      </div>
    </div>
    <a-modal
      :title="dialogConfig.title"
      v-model:visible="dialogConfig.visible"
      @ok="submit"
    >
      <a-form ref="ruleForm" :model="userForm" :rules="userRules">
        <a-form-item label="用户名" name="user" required has-feedback>
          <a-input v-model:value="userForm.user" />
        </a-form-item>
        <a-form-item label="密码" name="password" required has-feedback>
          <a-input type="password" v-model:value="userForm.password" />
        </a-form-item>
        <a-form-item label="权限等级">
          <a-select v-model:value="userForm.role_id">
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
import { defineComponent, reactive, Ref, ref } from "vue";
import server from "@/utils/axios";
import api from '@/utils/api'
import useGetUsers from '@/hooks/GetData/useGetUsers'
import { IUsersItem } from "@/types/getData";
import { IUserDialogConfig, IUserForm, ISelectItem } from '@/types/category'
import useValidator from '@/hooks/Login/useValidator';
import { message } from 'ant-design-vue';
export default defineComponent({
  name: "User",
  setup() {
    const { users, getUsersData } = useGetUsers();
    const dialogConfig = reactive<IUserDialogConfig>({
      title: "",
      visible: false,
      type: "",
      id: 0,
    });
    const userForm = reactive<IUserForm>({
      user: "",
      password: "",
      role_id: 0,
    });
    const roleSelect:Array<ISelectItem> = [
      { value: 0, label: "user" },
      { value: 1, label: "admin" },
    ];
    let ruleForm = ref<string | null>(null);
    const current = ref<number>(1)
    const { validateUsername,validatePassword }  = useValidator()
    const userRules = {
      user:[{ validator: validateUsername, trigger: 'change' }],
      password:[{ validator: validatePassword, trigger: 'change' }]
    }
    const init = ():void => {
      dialogConfig.visible = false;
      dialogConfig.title = "";
      dialogConfig.type = "";
      dialogConfig.id = 0;
      userForm.user = "";
      userForm.password = "";
      userForm.role_id = 0;
    };
    const jump = (curr: number):void => {
      getUsersData(curr);
      current.value = curr
    };
    const add = async (item: IUsersItem):Promise<void> => {
      dialogConfig.visible = true;
      dialogConfig.title = "添加用户";
      dialogConfig.type = "add";
    };
    const edit = async (item: IUsersItem):Promise<void>  => {
      dialogConfig.visible = true;
      dialogConfig.title = "修改用户";
      dialogConfig.type = "edit";
      dialogConfig.id = item.id;
      userForm.user = item.user;
      userForm.role_id = item.role_id;
    };
    const remove = async (item: IUsersItem):Promise<void>  => {
      await server.request({
        url: api.deleteUser,
        method: "post",
        data: { id: item.id },
      });
      jump(1);
    };
    const submit = (type: string):void  => {
      if (dialogConfig.type === "add") {
        (ruleForm as Ref).value.validate().then(async () => {
          let res = await server.request({
            url: api.addUser,
            method: "post",
            data: { ...userForm },
          });
          if (res.data.code == 1000) {
            message.success("添加成功")
            init()
            jump(1);
          }
        }).catch((err: Error) => {
          console.log("error", err);
        });
      } else if (dialogConfig.type === "edit") {
        if (dialogConfig.id !== 0) {
          (ruleForm as Ref).value.validate().then(async () => {
            let res = await server.request({
              url: api.editUser,
              method: "post",
              data: { id: dialogConfig.id, ...userForm },
            });
            if (res.data.code == 1000) {
              message.success("添加成功")
              init()
              jump(1);
            }
          }).catch((err: Error) => {
            console.log("error", err);
          });
        }
      }
    };
    return {
      current,
      users,
      dialogConfig,
      roleSelect,
      jump,
      add,
      edit,
      remove,
      submit,
      userForm,
      ruleForm,
      userRules
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<!--
* @fileName Login
* @author yq
* @date 2020/11/02 16:45:19
!-->
<template>
  <div class="login-component">
    <a-form
      class="form"
      :label-col="formStyle.labelCol"
      :wrapper-col="formStyle.wrapperCol"
      ref="ruleForm"
      :model="formData"
      :rules="loginRules"
    >
      <a-form-item label="用户名" name="user" required has-feedback>
        <a-input
          v-model:value="formData.user"
          placeholder="Username"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="密码" name="password" required has-feedback>
        <a-input
          v-model:value="formData.password"
          type="password"
          placeholder="Password"
        >
        </a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 5, span: 18 }">
        <div style="display:flex;justify-content: flex-end;">
          <a>
            忘记密码
          </a>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 5, span: 18 }">
        <div style="display:flex;justify-content: space-between;">
          <a-button type="primary" @click="onSubmit">
            登 陆
          </a-button>
          <a-button @click="resetForm">
            重 置
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { ILoginForm } from "@/types/login";
import { getStorage } from "@/utils/storage";
import useValidator from '@/hooks/Login/useValidator';
import useLoginBtns from '@/hooks/Login/useLoginBtns'
export default defineComponent({
  name: "Login",
  setup() {
    // 初始化
    const formData = reactive<ILoginForm>({
      user: "",
      password: "",
    });
    const ruleForm = ref<string | null>(null)
    onMounted(() => {
      if (getStorage("userInfo")) {
        formData.user = getStorage("userInfo").user;
      }
    });
    const { validateUsername,validatePassword }  = useValidator()
    const loginRules = reactive({
        user: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }]
    });
    const { submit, reset } = useLoginBtns(ruleForm)
    const onSubmit = ():void =>{
      submit('login',formData)
    }
    const resetForm = ():void =>{
      reset()
    }
    return {
      formStyle: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
      formData,
      ruleForm,
      loginRules,
      onSubmit,
      resetForm,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./Login.scss";
</style>

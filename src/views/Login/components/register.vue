<!--
* @description
* @fileName register
* @directory C:\Users\Administrator\Desktop\blog\src\views\Login\components
* @author yq
* @date 2020/10/11 16:36:50
!-->
<template>
  <div class="register-component">
    <a-form
      class="form"
      :label-col="formStyle.labelCol"
      :wrapper-col="formStyle.wrapperCol"
      ref="ruleForm"
      :model="formData"
      :rules="regRules"
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
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="确认密码" name="password2" required has-feedback>
        <a-input
          v-model:value="formData.password2"
          type="password"
          placeholder="Password"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="验证码" name="code" required>
        <div class="code">
          <a-input
            class="code-content"
            :maxlength="6"
            v-model:value="formData.code"
            placeholder="Code"
            autocomplete="off"
          >
          </a-input>
          <a-button
            type="danger"
            class="code-btn"
            :loading="btnStatus.loading"
            :disabled="btnStatus.disabled"
            @click="getCode"
          >
            {{ btnStatus.text }}
          </a-button>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 5, span: 18 }">
        <div style="display:flex;justify-content: space-between;">
          <a-button type="primary" @click="onSubmit">
            注 册
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
import { defineComponent, PropType, reactive, ref } from "vue";
import useCode from "@/hooks/Login/useCode";
import { IBtnStatus, IRegisterForm } from "@/types/login";
import useValidator from "@/hooks/Login/useValidator";
import useLoginBtns from "@/hooks/Login/useLoginBtns";
export default defineComponent({
  name: "Register",
  emits: ["update:activeIndex"],
  props: {
    activeIndex: {
      type: Number as PropType<number>,
      default: 1,
    },
  },
  setup(props, { emit }) {
    // 初始化
    const formData = reactive<IRegisterForm>({
      user: "",
      password: "",
      password2: "",
      code: "",
    });
    const btnStatus = reactive<IBtnStatus>({
      loading: false,
      disabled: false,
      text: "验证码",
    });
    const ruleForm = ref<string | null>(null);
    const {
      validateUsername,
      validatePassword,
      validatePassword2,
      validateCode,
    } = useValidator(formData);
    const regRules = reactive({
      user: [{ validator: validateUsername, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
      password2: [{ validator: validatePassword2, trigger: "change" }],
      code: [{ validator: validateCode, trigger: "change" }],
    });
    const { submit, reset } = useLoginBtns(ruleForm);
    const { getCode } = useCode(formData, btnStatus);

    const onSubmit = (): void => {
      console.log(submit("register", formData))
      if (submit("register", formData)) {
        emit("update:activeIndex", 0);
      }
    };
    const resetForm = (): void => {
      reset();
    };

    return {
      formStyle: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
      formData,
      regRules,
      ruleForm,

      btnStatus,
      onSubmit,
      resetForm,
      getCode,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./Register.scss";
</style>

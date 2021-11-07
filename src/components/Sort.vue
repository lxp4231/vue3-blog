<!--
* @fileName Sort
* @author yq
* @date 2020/10/19 15:47:58
!-->
<template>
    <div class="sort" @click="changeActive" :class="{isActive:!active}">
      <CaretDownOutlined v-if="!active" />
      <CaretUpOutlined v-else />
      <span>{{ label }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "Sort",
  components: {
    CaretUpOutlined,
    CaretDownOutlined,
  },
  props: {
    label: {
      type: String,
      default: "排序",
    },
    active: {
      type: Number,
      default: 1,
    },
  },
  emits: ["update:active"],
  setup(props, { emit }) {
    const changeActive = () => {
      if(props.active === 0){
        emit("update:active",1)
      }else{
        emit("update:active",0)
      }
    };
    return {
      changeActive,
    };
  },
});
</script>

<style scoped lang="scss">
.sort{
  cursor: pointer;
}
.isActive{
  color:#6b9bfe;
  font-weight: bold;
}
</style>

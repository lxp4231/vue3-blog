<!--
* @description scss
* @fileName Tabs
* @author yq
* @date 2020/10/14 18:00:08
!-->
<template>
  <div
    class="tabs"
    :style="[
      { background: background },
      { height: `${height}px` },
      { width: `${width}px` },
    ]"
  >
    <div
      class="tabs-item"
      :style="[
        { lineHeight: `${height}px` },
        { fontSize: `${fontSize}px` },
      ]"
      :class="{ active: activeIndex === index }"
      v-for="(item, index) in list"
      :key="index"
      @click="changeActive(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref } from "vue";
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => ["list1", "list2", "list3"],
    },
    activeIndex: Number,
    default: () => {
      return 0;
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
      default: "50",
    },
    background: {
      type: String,
      default: "#FFFFFF",
    },
    fontSize: {
      type: [String, Number],
      default: "15",
    },
  },
  emits: ["update:activeIndex"],
  setup(props, { emit }) {
    const changeActive = (index: number) => {
      emit("update:activeIndex", index);
    };
    return {
      changeActive,
    };
  },
});
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-around;
  .tabs-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  .active {
    background-color: #1890ff !important;
    color: #FFFFFF !important;
  }
}
</style>

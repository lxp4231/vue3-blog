<!--
* @fileName markdown
* @author yq
* @date 2020/11/04 15:08:31
!-->
<template>
  <vue3-markdown-it
    class="marked"
    :source="source"
    :style="{ height: `${height}px` }"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
export default defineComponent({
  name: "markdown",
  props: {
    source: {
      type: String as PropType<string>,
      default: "",
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: () => {
        return 800;
      },
    },
  },
});
</script>

<style scoped lang="scss"></style>

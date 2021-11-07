<!--
* @fileName Editor
* @author yq
* @date 2020/10/27 16:09:06
!-->
<template>
  <div class="editor">
    <a-textarea
      class="input"
      :value="source"
      @input="$emit('update:source', $event.target.value)"
      placeholder="Hellow, guys!!!"
      :style="{height:`${height}px`}"
    />
    <vue3-markdown-it
      class="marked"
      :source="source"
      :style="{height:`${height}px`}"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "Editor",
  props: {
    source: {
      type: String,
      default: () => {
        return "Hellow, guys!!!";
      },
    },
    height: {
      type: [String, Number],
      default: () => {
        return 400;
      },
    },
  },
  emits: ["update:source"],
});
</script>

<style scoped lang="scss">
.editor {
  display: flex;
  align-items: flex-start;
  background-color: #eeeeee;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #000000;
  .input {
    flex: 1;
    resize:none
  }
  .marked {
    background-color: #ffffff;
    margin-left: 10px;
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
    overflow-x: scroll;
    overflow-y: scroll;
  }
}
</style>

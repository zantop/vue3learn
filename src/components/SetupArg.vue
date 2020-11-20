<template>
  <div>
    <p>====子组件====</p>
    <strong>子组件通过context.attrs获取：{{ attrs.title }}</strong>
    <div>插槽：<slot name="slot1"></slot></div>
    <div>
      子组件context.emit修改父组件数据：{{ attrs.name }}
      <button @click="handleClick">子组件context.emit==>父组件</button>
    </div>

    <p>============</p>
  </div>
</template> 
<script>
import { watchEffect, watch } from "vue";
export default {
  // props: {
  //   title: String,
  // },
  //   emits: ["plus"],
  setup(props, context) {
    console.log("监听1：", props);
    watchEffect(() => {
      console.log(`watchEffect: ` + props.title);
    });
    watch(
      () => props.title,
      (newVal, oldVal) => {
        console.log("watch:", newVal, oldVal);
      }
    );
    console.log("输出context", context);
    console.log("输出context-attrs：", context.attrs);
    console.log("输出context-slots：", context.slots);
    console.log("输出context-slots1：", context.slots);
    const handleClick = () => {
      context.emit("plus", 10);
    };
    return {
      attrs: context.attrs,
      handleClick,
    };
  },
};
</script>
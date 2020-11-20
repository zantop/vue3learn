import { h, ref, reactive } from "vue";

export default {
  setup() {
    const count = ref("渲染1");
    const object = reactive({ foo: "渲染2" });
    return () => h("div", [h("p", count.value), h("p", object.foo)]);
  }
};

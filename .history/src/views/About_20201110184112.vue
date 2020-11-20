<template>
  <div class="about">
    <h2>==响应api Refs==</h2>
    <ul>
      <li v-for="(item, index) in stateArr" :key="index">{{ item }}</li>
    </ul>
    <h2 ref="h2">ref unref</h2>
    <p>{{ tea }}</p>
    <button @click="handleRef">ref unref</button>
    <h2>reactive toref torefs</h2>
    <ul>
      <li v-for="(item, key, index) in stateObj" :key="key">
        {{ key }} {{ item }} {{ index }}
      </li>
    </ul>
    <button @click="handleReactive">reactive</button>
    <button @click="handleToRef">toRef</button>
    <button @click="handleToRefs">toRefs</button>
    <h2>customRef</h2>
    <p>{{ age }}</p>
    <button @click="handleCustomRef">customRef</button>
    <h2>shallowRef shallowReactive</h2>
    <p>{{ sex }}</p>
    <button @click="handleShallowRef">shallowRef</button>
    <button @click="handleShallowReactive">shallowReactive</button>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  isRef,
  unref,
  reactive,
  toRef,
  toRefs,
  customRef,
  onMounted,
  shallowRef,
} from "vue";

function myRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track(); // 告诉Vue这个数据是需要追踪变化的
        console.log("get", value);
        return value;
      },
      set(newValue) {
        console.log("set", newValue);
        value = newValue;
        trigger(); // 告诉Vue触发界面更新
      },
    };
  });
}
//外层处理数据
function useFeatureX() {
  const state = reactive({
    name: "姓名",
    age: 12,
  });
  // 逻辑运行状态
  state.name = "小明";
  state.age = 20;
  // 返回时转换为ref
  return toRefs(state);
}

//proxy

export default defineComponent({
  setup() {
    let h2 = ref(null);
    let tea = ref("红茶");
    let age = myRef(18);
    let stateArr = reactive(["a", "b", "c"]);
    let stateObj = reactive({
      a: "苹果",
      b: "菠萝",
      c: "雪梨",
    });
    let person = {
      person: {
        name: "人类",
        info: {
          name: "学生",
          student: {
            name: "小明",
          },
        },
      },
    };
    let atoRef = toRef(stateObj, "a");
    let statetoRefs = toRefs(stateObj);

    let oo = reactive(person);
    let shallowLObj = shallowRef(person);
    const handleRef = () => {
      tea.value = "绿茶";
      console.log(ref({ name: "姓名" }).value.name);
      console.log(`tea被ref包装后:`, tea);
      console.log(`tea.value:`, tea.value);
      console.log("isRef:", isRef(tea));
      console.log(`unref:`, unref(tea));
    };
    const handleReactive = () => {
      stateObj.a = "桃子🍑";
      console.log(stateObj);
    };
    const handleToRef = () => {
      //结构出来直接修改 UI不会更新
      /*  let { a, b, c } = stateObj;
      a = "桃子🍑";
      console.log(stateObj); */
      atoRef.value = "桃子🍑";
      console.log(stateObj);
    };
    const handleToRefs = () => {
      const { name } = useFeatureX();
      statetoRefs.a.value = "桃子🍑";
      statetoRefs.b.value = `${name.value}在吃菠萝🍍`;
      console.log(statetoRefs);
    };
    const handleCustomRef = () => {
      age.value += 1;
    };
    const handleShallowRef = () => {
      console.log(oo == person);
      console.log(person);
    };
    //生命周期
    onMounted(() => {
      //获取ref 要return出去
      console.log("onMounted", h2.value);
    });

    return {
      h2,
      tea,
      age,
      handleRef,
      stateArr,
      stateObj,
      handleReactive,
      handleToRef,
      handleToRefs,
      handleCustomRef,
      handleShallowRef,
    };
  },
});
</script>
<style lang="scss" scoped>
ul li {
  list-style: none;
}
</style>
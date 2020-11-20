<template>
    <div class="hello">
        <ul>
            <li>
                <h3>setup的调用时机在beforeCreate之前调用，不能使用this</h3>
                <dd>不能使用this，getCurrentInstance可以获取当前组件的实例：看控制台输出内容</dd>
            </li>
            <li><h3>return 属性和方法绑定到模板中</h3></li>
            <li><h3>可以返回一个render函数</h3></li>
            <p>====render函数====</p>
            <Demo />
            <p>====render函数====</p>
            <li><h3>接收参数(props,context)</h3></li>

            <dl>
                <dt>props：</dt>
                <dd>
                    1、setup只执行一次，props在后续有改变的时候，需要用watchEffect 或 watch监听props
                </dd>
                <dd>
                    2、因为props是被proxy包装后的对象，不要结构解析props，否则会失去响应式。
                </dd>
                <dd>3、不能直接修改props</dd>
            </dl>
            <dl>
                <dt>context(attrs,emit,slots)：</dt>
                <dd>attrs 给个组件的属性，组件可以不通过props获取数据,通过attr获取</dd>
                <dd>
                    <SetupArg :title="title" :name="name" @plus="handlePlus">
                        <template v-slot:slot1>
                            <span>使用slot1</span>
                        </template>
                    </SetupArg>
                    <p>{{ count }}</p>
                    <button @click="handleClick1">父组件==>子组件context.attrs</button>
                </dd>
            </dl>
        </ul>
    </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
import Demo from '../components/demo.tsx'
import SetupArg from '../components/SetupArg.vue'
export default {
    components: {
        Demo,
        SetupArg
    },
    setup() {
        let inst = getCurrentInstance()
        let title = ref(0)
        let name = ref(0)
        let count = ref(0)
        console.log(inst)
        function handleClick1() {
            count.value += 1
            title.value = new Date().getTime()
        }
        const handlePlus = num => {
            name.value += num
        }
        return { count, title, name, handleClick1, handlePlus }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

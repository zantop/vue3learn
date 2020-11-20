<template>
    <div class="hello">
        <ul>
            <li>
                <h3>父组件 在setup 中使用provide(key,value)</h3>
                <p>父组件更改，子组件响应式的，用ref的响应式代理数据</p>
            </li>
            <li>
                <h3>父组件可以通过provide(handleEvent)传递事件给子组件,子组件接收调用父组件方法</h3>
            </li>
        </ul>
        <p>Parent：{{ name }}</p>
        <Father />
        <button @click="handleClick">传递数据</button>
    </div>
</template>

<script>
import Father from '../components/Father'
import { ref, provide } from 'vue'
export default {
    name: 'Setup',
    components: {
        Father
    },
    beforeMount() {
        console.log('这里')
    },
    setup() {
        let name = ref('小王')
        const handleClick = () => {
            name.value = '大毛'
        }
        provide('name', name)
        provide('changeName', handleClick)
        return {
            name,
            handleClick
        }
    }
}
</script>

<style scoped></style>

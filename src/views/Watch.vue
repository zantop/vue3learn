<template>
    <div class="hello">
        <ul>
            <li>
                <h3>
                    侦听单个数据源
                </h3>
                <p>
                    ref: watch(count, (countNew, countOld) => { })
                </p>
                <p>
                    reactive: watch( () => student.name, (nameNew, newOld) => { })
                </p>
                <dd>
                    <p>{{ count }}</p>
                    <p>{{ student.name }}</p>
                    <button @click="handleClick">监听ref</button>
                    <button @click="handleClick1">监听reactive</button>
                </dd>
            </li>
            <li>
                <h3>
                    侦听多个数据源
                </h3>
                <p>
                    watch([count2, () => student2.name], ([countNew, nameNew], [countOld, nameOld])
                    => { })
                </p>
                <dd>
                    <p>{{ count2 }}</p>
                    <p>{{ student2.name }}</p>
                    <button @click="handleClick2">监听多个</button>
                </dd>
            </li>
            <li>
                <h3>
                    执行时机 onBeforeUpdate
                </h3>
                <p>onBeforeUpdate默认在watch之后，第三个参数 flush 为post的时候，在watch之前</p>
                <dd>
                    <p>{{ count2 }}</p>
                    <p>{{ student2.name }}</p>
                    <button @click="handleClick2">监听多个</button>
                </dd>
            </li>
            <li>
                <h3>
                    跟watchEffect 其他行为 stop(),接收onInvalidate等一致
                </h3>
            </li>
        </ul>
    </div>
</template>

<script>
import { onBeforeUpdate, reactive, ref, watch } from 'vue'
export default {
    name: 'Setup',
    setup() {
        let count = ref(0)
        let student = reactive({
            name: '张三',
            age: 12
        })
        const handleClick = () => {
            count.value += 1
        }
        watch(count, (count, prevCount) => {
            console.log('新count value：', count)
            console.log('旧count value：', prevCount)
        })
        const handleClick1 = () => {
            student.name = '张飞'
        }
        watch(
            () => student.name,
            (n, o) => {
                console.log('新value：', n)
                console.log('旧value：', o)
            }
        )

        let count2 = ref(0)
        let student2 = reactive({
            name: '张三',
            age: 12
        })

        const handleClick2 = () => {
            count2.value += 1
            student2.name = '张飞'
        }
        watch(
            [count2, () => student2.name],
            ([countNew, nameNew], [countOld, nameOld]) => {
                console.log('新count：', countNew)
                console.log('旧count：', countOld)
                console.log('新name：', nameNew)
                console.log('旧name：', nameOld)
            },
            {
                // flush: 'post'
            }
        )
        onBeforeUpdate(() => {
            console.log('更新之前')
        })
        return {
            count,
            student,
            count2,
            student2,
            handleClick,
            handleClick1,
            handleClick2
        }
    }
}
</script>

<style scoped></style>

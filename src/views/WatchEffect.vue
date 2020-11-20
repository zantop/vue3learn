<template>
    <div class="hello">
        <ul>
            <li>
                <h3>
                    <p>传入一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数</p>
                    <p>返回一个函数，执行它停止监听，声明周期卸载的时候，会自动停止监听</p>
                </h3>
                <dd>
                    <p>{{ count }}</p>
                    <button @click="handleClick2">增加</button>
                    <button @click="handleClick1">停止监听</button>
                </dd>
            </li>
            <li>
                <h3>
                    清除副作用
                </h3>
                <p>接收一个onInvalidate函数，在监听count.value之前执行，在stop停止监听之前执行</p>
                <p>用途：可以做登录防抖，取消之前调用</p>
                <dd>
                    <button @click="handleClick3">清除副作用</button>
                </dd>
                <p>处理异步函数</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
    name: 'Setup',
    setup() {
        let count = ref(0)

        let stop = watchEffect(() => {
            console.log(`监听到了：${count.value}`)
        })
        const handleClick1 = () => {
            stop()
            console.log('停止监听')
        }
        const handleClick2 = () => {
            count.value += 1
        }

        let count1 = ref(0)
        const getData = count1 =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(count1)
                }, 1000)
            })

        watchEffect(async handler => {
            let num = 0
            let num1 = count1.value
            const data = await getData(num)
            console.log(data)
            console.log(`请求的数据:${data}`)
            handler(() => {
                num = count1.value
                console.log('监听更新数据之前', num)
                // console.log(data)
            })
        })
        const handleClick3 = () => {
            count1.value += 1
        }
        return {
            count,
            handleClick1,
            handleClick2,
            handleClick3
        }
    }
}
</script>

<style scoped></style>

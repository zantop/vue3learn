<template>
    <div class="hello">
        <ul>
            <li>
                <h3>
                    toRaw
                    把ref/reactive代理后的对象还原成原始数据，这样后续修改不会视图更新，减少渲染
                </h3>
                <dd>
                    <p>origin===toRaw(reactive(origin)) true</p>
                    <p>{{ student.name }}</p>
                    <button @click="handleClick">更新</button>
                </dd>
            </li>
            <li>
                <h3>
                    markRaw 对象为永远不会转为响应式代理，返回原始对象本身
                </h3>
                <dd>
                    <p>原始对象被markRaw包装后，即使后面使用reactive返回的也是原始对象,不会更新</p>
                    <p>{{ student1.name }}</p>
                    <button @click="handleClick1">更新</button>
                </dd>
            </li>
        </ul>
    </div>
</template>

<script>
import { markRaw, reactive, toRaw } from 'vue'
export default {
    name: 'Setup',
    setup() {
        let origin = {
            name: '小红',
            age: 10
        }
        let student = reactive(origin)
        let studentRaw = toRaw(student)
        console.log(student)
        console.log(origin)
        console.log(studentRaw)
        console.log(studentRaw === origin)

        const handleClick = () => {
            student.name = '大猫'
            // origin.name = '狗熊' //不会更新视图
            // studentRaw.name = '狗熊' //不会更新视图
            console.log(student)
            console.log(origin)
            console.log(studentRaw)
        }

        let origin1 = {
            name: '小红',
            age: 10,
            grade: {
                lev: '六年级'
            }
        }
        let studentRaw1 = markRaw(origin1)
        let student1 = reactive(studentRaw1)
        const handleClick1 = () => {
            student1.name = '大毛'
            console.log(origin1)
            console.log(studentRaw1)
            console.log(student1)
            console.log(origin1 === studentRaw1)
        }

        return {
            student,
            student1,
            handleClick,
            handleClick1
        }
    }
}
</script>

<style scoped></style>

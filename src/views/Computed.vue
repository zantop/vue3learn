<template>
    <div class="hello">
        <ul>
            <li>
                <h3>
                    默认传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象，
                    <p>使用get set 创建的ref 对象可以修改</p>
                </h3>
                <p>
                    返回的ref 是有个__v_isReadonly: false 来判断是否修改
                </p>
                <dd>
                    <p>不可手动修改：{{ plusOne }}</p>
                    <p>可手动修改：{{ plusOne2 }}</p>
                    <button @click="handleClick1">computed</button>
                </dd>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
    name: 'Setup',
    setup() {
        const count = ref(1)
        const plusOne = computed(() => count.value + 1)
        const plusOne2 = computed({
            get: () => `小明今年${count.value}岁了`,
            set: val => {
                console.log(val)
            }
        })

        const handleClick1 = () => {
            count.value += 1
            plusOne2.value = '修改小明的年龄'
            plusOne.value = '修改小明的年龄'
            console.log(plusOne)
            console.log(plusOne2)
        }
        return {
            count,
            plusOne,
            plusOne2,
            handleClick1
        }
    }
}
</script>

<style scoped></style>

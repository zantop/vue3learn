<template>
    <div class="hello">
        <ul>
            <li>
                <p>vue2.0与setup对比</p>
                <p>beforeCreate -> 使用 setup()</p>
                <p>created -> 使用 setup()</p>
                <p>beforeMount -> onBeforeMount</p>
                <p>mounted -> onMounted</p>
                <p>beforeUpdate -> onBeforeUpdate</p>
                <p>updated -> onUpdated</p>
                <p>beforeDestroy -> onBeforeUnmount</p>
                <p>destroyed -> onUnmounted</p>
                <p>errorCaptured -> onErrorCaptured</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { markRaw, reactive, toRaw, getCurrentInstance, onBeforeMount } from 'vue'
export default {
    name: 'Setup',
    beforeMount() {
        console.log('这里')
    },
    setup() {
        onBeforeMount(() => {
            console.log('内部')
        })
        return {}
    }
}
</script>

<style scoped></style>

<!--
 * @Author: wz
 * @Date: 2020-11-20 16:20:41
 * @LastEditors: wz
 * @LastEditTime: 2020-11-20 16:54:15
 * @Description: 
-->
<template>
    <div class="container">
        <div>
            <p>Father:{{ name }}</p>
            <button @click="changeName">接收事件修改名字</button>
            <Child />
        </div>
    </div>
</template>
<script>
import { inject } from 'vue'
import Child from './Child'
export default {
    components: {
        Child
    },
    setup() {
        let name = inject('name', '父组件')
        let changeName = inject('changeName')
        return {
            name,
            changeName
        }
    }
}
</script>
<style lang="scss" scoped></style>

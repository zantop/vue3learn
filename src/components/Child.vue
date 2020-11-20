<!--
 * @Author: wz
 * @Date: 2020-11-20 16:20:45
 * @LastEditors: wz
 * @LastEditTime: 2020-11-20 16:43:41
 * @Description: 
-->
<template>
    <div class="container">
        <p>
            Child:<span class="green">{{ name }}</span>
        </p>
    </div>
</template>
<script>
import { inject } from 'vue'
export default {
    components: {},
    setup() {
        let name = inject('name', '子组件')
        return {
            name
        }
    }
}
</script>
<style lang="scss" scoped></style>

<template>
    <div class="hello">
        <dl>
            <dt>
                <ul>
                    <li><h3>接收对象返回被proxy代理后响应式的对象。</h3></li>
                    <li><h3>对象内深度响应式</h3></li>
                    <li>示例：</li>
                    <p>reactive接收obj：{{ stateObj }}</p>
                    <button @click="handleClickObj">对象类型响应式</button>
                    <p>reactive接收非obj：{{ stateOther }}</p>
                    <button @click="handleClickOther">非对象类型非响应式</button>
                    <p>直接修改传入对象的数据不会更新，要重新赋值{{ stateV.name }}</p>
                    <button @click="handleClickTime">重新赋值</button>
                    <li>
                        <h3>shallowReactive</h3>

                        <dd>
                            <p>实例：</p>
                            <p>一层：{{ student1.name }}</p>
                            <p>深层：{{ student1.grade.friends.name }}</p>
                            <p>如果同时更新了一层+深层，那么深层次也会响应式的</p>
                            <button @click="handleClick1">一层会更新</button>
                            <button @click="handleClick2">深层不会更新</button>
                        </dd>
                    </li>
                </ul>
            </dt>
        </dl>
    </div>
</template>

<script>
import { reactive, isReactive, shallowReactive } from 'vue'
export default {
    name: 'Reactive',
    setup() {
        /**
    reactive参数必须是对象(json/arr)
     */
        let originObj = [1, 3, 5]
        let stateObj = reactive(originObj)
        function handleClickObj() {
            stateObj.push(Math.floor(Math.random() * 10))
            console.log(stateObj)
        }
        /**
      传递其他数据不会更新
      */
        let stateOther = reactive(1)
        function handleClickOther() {
            console.log(stateOther)
            let ss = '啊啊啊'
            stateOther = ss
        }
        /**
     * 默认情况下修改对象, 界面不会自动更新
      如果想更新, 可以通过重新赋值的方式
     */
        let stateV = reactive({
            name: 'abcd'
        })
        function handleClickTime() {
            /*  stateV.name.toUpperCase();
      console.log(stateV) */
            //虽然数据变化了，但是UI层不会更新，要重新赋值
            stateV.name = stateV.name.toUpperCase()
            console.log(stateV)
        }

        let student1 = shallowReactive({
            name: '张三',
            age: 12,
            grade: {
                lev: '三年级',
                friends: {
                    name: '小王',
                    age: 20
                }
            }
        })
        const handleClick1 = () => {
            student1.name = '赵敏'
            console.log(isReactive(student1))
            console.log(isReactive(student1.grade))
        }
        const handleClick2 = () => {
            student1.grade.friends.name = '赵敏'
            console.log(isReactive(student1))
            console.log(isReactive(student1.grade))
        }
        return {
            stateObj,
            stateOther,
            stateV,
            student1,
            handleClickObj,
            handleClickOther,
            handleClickTime,
            handleClick1,
            handleClick2
        }
    }
}
</script>
<style scoped></style>

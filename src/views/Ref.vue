<template>
    <div class="hello">
        <ul>
            <li>
                <h3>传入简单值，只能通过.value修改，模板中无需写.value</h3>
                <p>
                    ref底层的本质其实还是reactive 系统会自动根据我们给ref传入的值将它转换成 ref(xx)
                    -> reactive({value:xx})
                </p>
                <dd>
                    <p>实例：</p>
                    <p>{{ state }}</p>
                    <button @click="handleClick">简单数值监听</button>
                </dd>
            </li>
            <li>
                <h3>传入对象{ name: '小红' }，只能通过obj.value.name来修改</h3>
                <dd>
                    <p>实例：</p>
                    <p>{{ obj.name }}</p>
                    <button @click="handleClick2">简单数值监听</button>
                </dd>
            </li>
            <li>
                <h3>
                    判断数据是ref还是reactive，通过<span class="green">isRef / isReactive </span
                    >方法
                </h3>
                <dd>
                    <p>实例：</p>
                    <p>
                        ref与reactive区别，ref返回数据要通过.value修改，reactive返回的数据直接修改
                    </p>
                    <p>{{ obj3.name }}</p>
                    <p>{{ obj4.name }}</p>
                    <button @click="handleClick3">判断是ref还是reactive类型</button>
                </dd>
            </li>
            <li>
                <h3>嵌套使用</h3>
                <p>reactive中传入ref返回值,会自动转换ref.value给reactive</p>
                <dd>
                    <p>实例：</p>
                    <p>obj5.name: {{ obj5.name }}</p>
                    <p>
                        let count5 = ref('小明') let obj5 = reactive({ name: count5 })
                    </p>
                    <p class="red">
                        如果reactive传入ref是arr/map等原生集合，不会自动转ref.value给reactive
                    </p>
                    <p>obj51[0].value: {{ obj51[0].value }}</p>
                    <p>
                        let count5 = ref('小明') let obj51 = reactive([count5])
                    </p>
                    <button @click="handleClick5">reactive(ref)</button>
                </dd>
                <p>ref中传入ref返回值,会自动转替换旧的ref</p>
                <dd>
                    <p>实例：</p>
                    <p>name6: {{ name6 }}</p>
                    <p>let name = ref('小华') let name6 = ref(name)</p>
                    <button @click="handleClick6">ref(ref)</button>
                </dd>
            </li>
            <li>
                <h3>unref</h3>
                <dd>
                    <p>实例：</p>
                    <p>{{ name7 }}</p>
                    <p>val = isRef(val) ? val.value : val 的语法糖</p>
                    <button @click="handleClick7">unref</button>
                </dd>
            </li>
            <li>
                <h3>toRef/toRefs</h3>
                <p>toRef(reactive,key) 返回一个响应式的ref</p>
                <dd>
                    <p>实例：</p>
                    <p>{{ name8 }}</p>
                    <p>修改响应式的ref是会影响到原始数据</p>
                    <button @click="handleClick8">toRef</button>
                </dd>
                <p>toRefs把响应式数据=>普通对象,但是每个key都是响应式的ref</p>
                <dd>
                    <p>实例：</p>
                    <p>reactive daStudent: {{ daStudent }}</p>
                    <p>因为每个key都是ref，可以结构解析展开 {...toRefs(daStudent)}</p>
                    <p>daming:{{ daming }}</p>
                    <p>daage:{{ daage }}</p>
                    <p></p>
                    <button @click="handleClick9">toRefs</button>
                </dd>
            </li>
            <li>
                <h3>customRef</h3>
                <p>自定义一个ref</p>
                <dd>
                    <p>实例：</p>
                    <p>{{ dd }}</p>
                    <button @click="handleClick10">customRef</button>
                </dd>
            </li>
        </ul>
    </div>
</template>
<script>
import { ref, isReactive, isRef, reactive, unref, toRef, toRefs, customRef } from 'vue'

const myRef = value => {
    return customRef((track, trigger) => {
        return {
            get() {
                track() //追踪变化
                console.log('GET===>', value)
                return value
            },
            set(newValue) {
                console.log('SET===>', newValue)
                value = newValue
                trigger() // 告诉Vue触发界面更新
            }
        }
    })
}
export default {
    name: 'Setup',
    setup() {
        let state = ref(0)
        function handleClick() {
            console.log(state)
            state.value += 1
        }
        let obj = ref({
            name: '小红'
        })
        const handleClick2 = () => {
            console.log(obj)
            console.log(obj.value)
            obj.value.name = '杨过'
            console.log(obj.value)
        }
        let obj3 = ref({
            name: 'ref创建'
        })
        let obj4 = reactive({
            name: 'reactive创建'
        })
        const handleClick3 = () => {
            obj3.value.name = isRef(obj3)
            obj4.name = isReactive(obj4)
        }
        let count5 = ref('小明')
        let obj5 = reactive({
            name: count5
        })
        let obj51 = reactive([count5])
        const handleClick5 = () => {
            console.log(count5)
            console.log(obj5.name)
            console.log(obj51[0].value)
        }
        let name = ref('小华')
        let name6 = ref(name)
        const handleClick6 = () => {
            console.log(name)
            console.log(name6)
            console.log(name.value === name6.value)
        }
        let originName = {
            name: '小工'
        }
        let originName2 = ref(originName)
        let name7
        const handleClick7 = () => {
            // name7 = isRef(originName) ? originName.value : originName
            console.log(unref(originName))
            console.log(unref(originName2))
        }

        let info = {
            name: '小华',
            age: 18
        }
        let info2 = reactive(info)
        let name8 = toRef(info2, 'name')
        const handleClick8 = () => {
            name8.value = '郭靖'
            console.log(name8)
            console.log(name8.value)
            console.log(info)
            console.log(info2)
        }

        let daStudent = reactive({
            daming: '欧阳锋',
            daage: 19
        })
        let daStudentRefs = toRefs(daStudent)
        const handleClick9 = () => {
            daStudentRefs.daage.value = 2020
            console.log(daStudent)
            console.log(daStudentRefs)
        }

        let student10 = {
            miName: '杨飞',
            miAge: 20
        }
        let dd = myRef(10)
        const handleClick10 = () => {
            dd.value += 1
            // console.log(dd)
            // console.log(dd.value)
        }
        return {
            state,
            obj,
            obj3,
            obj4,
            obj5,
            obj51,
            name6,
            name7,
            name8,
            student10,
            daStudent,
            ...daStudentRefs,
            dd,
            handleClick,
            handleClick2,
            handleClick3,
            handleClick5,
            handleClick6,
            handleClick7,
            handleClick8,
            handleClick9,
            handleClick10
        }
    }
}
</script>

<style scoped></style>

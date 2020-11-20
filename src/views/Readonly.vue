<template>
    <div class="hello">
        <ul>
            <li>
                <h3>
                    readonly 传入响应式或普通对象或 ref,返回原始对象的只读proxy,并且是递归只读
                </h3>
                <dd>
                    <p>infoRead.student.grade：{{ infoRead.student.grade }}</p>
                    <button @click="handleClick1">infoRead.student.grade==>六年级</button>
                </dd>
            </li>
            <li>
                <h3>
                    isReadonly
                </h3>
                <dd>
                    <p></p>
                    <button @click="handleClick1">isReadonly</button>
                </dd>
            </li>
            <li>
                <h3>
                    shallowReadonly
                </h3>
                <dd>
                    <p>对象第一层是只读，深层次可修改,但是都不是响应式的</p>
                    <p>一层infoShallowRead.name：{{ infoShallowRead.name }}</p>
                    <p>深层infoShallowRead.student.grade：{{ infoShallowRead.student.grade }}</p>
                    <button @click="handleClick31">一层</button>
                    <button @click="handleClick32">深层</button>
                </dd>
            </li>
            <li>
                <h3>
                    isProxy
                </h3>
                <dd>
                    <p>
                        检测对象是否被代理了，如果对象使用原生new Proxy
                        返回的是fasle,如果响应式的ref/reactive被new Proxy 返回的是true
                    </p>
                    <button @click="handleClick4">isProxy</button>
                </dd>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, reactive, readonly, isReadonly, shallowReadonly, isProxy, isReactive } from 'vue'
export default {
    name: 'Setup',
    setup() {
        const info = reactive({
            name: '小红',
            age: 12,
            student: {
                grade: '三年级',
                friends: {
                    name: '小光'
                }
            }
        })
        const infoRead = readonly(info)
        const info2 = {
            name: '测试'
        }
        const info3 = new Proxy(info, {})
        const info4 = new Proxy(info2, {})
        const handleClick1 = () => {
            infoRead.student.grade = '六年级'
            console.log(isReadonly(infoRead))
            console.log(infoRead)
        }

        const infoShallowRead = shallowReadonly({
            name: '小红',
            age: 12,
            student: {
                grade: '三年级',
                friends: {
                    name: '小光'
                }
            }
        })

        const handleClick31 = () => {
            console.log(isReadonly(infoShallowRead))
            console.log(isReadonly(infoShallowRead.name))
            console.log(isReactive(infoShallowRead.name))
            infoShallowRead.name = '大猫'
            console.log(infoShallowRead)
        }
        const handleClick32 = () => {
            console.log(isReadonly(infoShallowRead))
            console.log(isReadonly(infoShallowRead.student))
            console.log(isReactive(infoShallowRead.student))
            infoShallowRead.student.grade = '初中'
            console.log(infoShallowRead)
        }

        const handleClick4 = () => {
            console.log(isProxy(info))
            console.log(isProxy(infoRead))
            console.log(isProxy(info2))
            console.log(isProxy(info3))
            console.log(isProxy(info4))
        }

        return {
            infoRead,
            infoShallowRead,
            handleClick1,
            handleClick31,
            handleClick32,
            handleClick4
        }
    }
}
</script>

<style scoped></style>

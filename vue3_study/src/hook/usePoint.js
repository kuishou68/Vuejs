import {  reactive, onMounted, onBeforeUnmount } from 'vue'
export default function (){
    // 数据
    let point = reactive({
        x:0,
        y:0
    })
    // 方法
    function savePoint(event){
        point.x = event.pageX
        point.x = event.pageY
        console.log(event.pageX, event.pageY)
    }
    /**
     * 什么是 hook ? ----本质上是一个函数，把setup中使用的Composition API 进行数据封装。
     * 类似于 vue2.x 中的 mixin。
     * hook 的幼师：复用代码，让setup中的逻辑清除易懂。
     * */
    // 绑定事件，组件挂载完毕开始获取window 坐标,
    onMounted(()=>{
        window.addEventListener('click', savePoint )
    })
    // 卸载之前，
    onBeforeUnmount(()=>{
        window.removeEventListener('click', savePoint)
    })
    return point
}
<template>
    <button @click="modalOpen=true"> 打开一个对话框</button>
    <!--teleport标签-->
    <teleport to="body">
        <div v-if="modalOpen" class="modal">
            <div>对话框
                <button @click="modalOpen = false">关闭对话框</button>
            </div>
        </div>
    </teleport>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    name: 'ModalButton',
    setup() {
        // 控制对话框显示或者隐藏
        const modalOpen = ref(false)
        return {
            modalOpen
        }
    }
})
</script>

<style>
.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
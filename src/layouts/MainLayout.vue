<template>
  <div class="app-main-layout">
    
    <Navbar 
      @switch-sidebar="isShow = !isShow"
    />

    <Sidebar 
      v-model="isShow"
    />    

    <main 
      v-bind:class="{full: !isShow}"
      class="app-content"
    >
        <div class="app-page">
            <router-view />
        </div>
    </main>

    <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue" href="#">
            <i class="large material-icons">add</i>
        </a>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'

export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar
  },
  data(){
    return {
      isShow: true
    }
  }
}
</script>
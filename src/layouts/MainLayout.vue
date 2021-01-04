<template>
  <Loader 
    v-if="loading"
  />

  <div 
    v-else
    class="app-main-layout"
  >
    
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
        <router-link 
          to="/record"
          v-tooltip="'Создать новую запись'"

          class="btn-floating btn-large blue"
        >
            <i class="large material-icons">add</i>
        </router-link>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import messages from "@/utils/messages"

export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar
  },
  data(){
    return {
      isShow: true,
      loading: true
    }
  },
  computed: {
    error(){
      // возращаем error из store
      // если что-то будет меняться в $store.getters то 
      // будет обновляться это свойство ( error() )  
      return this.$store.getters.error
    }
  },
  watch: {
    error(fdError){
      this.$error(messages[fdError.code] || "Что-то пошло не так");

    }
  },
  async mounted(){
    // 1) проверяем info в файле store/info.js
    // если там нет значений (все значения info складываем в массив с помощью Object.keys и 
    // проверяем этот массив на длину). Если длина массива больше 0 то значения там есть
    // 2) Если равно 0 то вызываем метод fetchInfo
    if(!Object.keys(this.$store.getters.info).length){
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  }
}
</script>
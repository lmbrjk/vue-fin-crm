<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages"

export default {
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
  }
}
</script>>
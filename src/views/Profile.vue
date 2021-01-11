<template>
<div>
  <div class="page-title">
    <h3>Профиль</h3>
  </div>

  <form 
    v-on:submit.prevent="submitHandler"
    class="form"
  >
    <div class="input-field">
      <input 
        v-model="name"
        v-bind:class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"

        id="description"
        type="text"
      >
      <label for="description">Имя</label>
      <small
        v-if="$v.name.$dirty && !$v.name.required"
        class="helper-text invalid"
      >
        Поле не должно быть пустым
      </small>
      <small
        v-else-if="$v.name.$dirty && !$v.name.minLength"
        class="helper-text invalid"
      >
        Имя должно быть не менее {{ $v.name.$params.minLength.min }} символов
      </small>
    </div>

    <div class="switch">
      <label>
        English
        <input type="checkbox">
        <span class="lever"></span>
        Русский
      </label>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Обновить
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import {mapGetters} from "vuex"
import {required, minLength} from "vuelidate/lib/validators"
import messages from "@/utils/messages"

export default {
  data(){
    return {
      name: ""
    }
  },
  validations: {
    name: {required, minLength: minLength(4)}
  },
  computed: {
    ...mapGetters(["info"]) 
  },
  methods: {
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch();
        return
      }

      try {
        await this.$store.dispatch("updateInfo", {name: this.name});
      } catch (e){}

    }
  },
  async mounted(){
    this.name = this.info.name;

    // чтобы правильно сработал window.M.updateTextFields(); 
    await this.$nextTick;

    window.M.updateTextFields();
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
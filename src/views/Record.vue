<template>
<div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>

  <Loader 
    v-if="loading"
  />

  <p 
    v-else-if="!categories.length"
    class="center"
  >
    Категорий пока что нет. <router-link to="/categories">Создайте первую</router-link>
  </p>

  <form 
    v-else
    class="form"
  >
    <div class="input-field" >
      <select
        ref="select"
      >
        <option
          v-for="category of categories"
          v-bind:key="category.id"
          v-bind:value="category.id"
        >
          {{ category.categoryName }}
        </option>
      </select>
      <label>Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
      >
      <label for="amount">Сумма</label>
      <span class="helper-text invalid">amount пароль</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
      >
      <label for="description">Описание</label>
      <span
            class="helper-text invalid">description пароль</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
export default {

  data(){
    return {
      categories: [],
      select: null,
      categoryName: '',
      loading: true
    }
  }, 
  async mounted(){
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;


    // несколько вариантов решения задачи синхронности
    // 1)  без setTimeout привязка к селекту materialize не будет работать т.к.
    // после того как this.loading = false (см. на 2 строки выше)  
    // vue начинает перерисовывать часть страницы и селект к которому применяется 
    // привязка к селекту materialize не будет работать т.к. не к чему привязываться
    // т.е. селекта еще нет
    // setTimeout( () => {
    //   // привязка к селекту materialize для функционирования селекта
    //   this.select = window.M.FormSelect.init(this.$refs.select);    
    // }, 0);
    // 2)  this.$nextTick(() => {
    //   this.select = window.M.FormSelect.init(this.$refs.select);
    // });
    //3) 
    await this.$nextTick;    
    this.select = window.M.FormSelect.init(this.$refs.select);
    
  },
  destroyed(){
    if(this.select && this.select.destroy){
        this.select.destroy();
    }
  }

}
</script>

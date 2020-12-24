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
    v-on:submit.prevent="submitHandler"


    class="form"
  >
    <div class="input-field" >
      <select
        v-model="current"
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
            v-model="type"

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
            v-model="type"

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
          v-model.number="amount"
          v-bind:class="{invalid: ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)}"

          id="amount"
          type="number"
      >
      <label for="amount">Сумма</label>
      <span
        v-if="$v.amount.$dirty && !$v.amount.required"

        class="helper-text invalid"
      >
        Поле не может быть пустым
      </span>
      <span
        v-else-if="$v.amount.$dirty && !$v.amount.minValue"

        class="helper-text invalid"
      >
        Число не может быть меньше {{ $v.amount.$params.minValue.min }}
      </span>
    </div>

    <div class="input-field">
      <input
          v-model="description"
          v-bind:class="{invalid: $v.description.$dirty && !$v.description.required}"

          id="description"
          type="text"
      >
      <label for="description">Описание</label>
      <span
        v-if="$v.description.$dirty && !$v.description.required" 

        class="helper-text invalid"
      >
        Поле не может быть пустым
      </span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import {required, minValue} from "vuelidate/lib/validators"
import {mapGetters} from "vuex"

export default {

  data(){
    return {
      categories: [],
      select: null,
      current: null,
      categoryName: '',
      type: "outcome",
      amount: 1,
      description: '',
      loading: true
    }
  },
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required}
  },
  computed: {
    // из хранилища забираем свойство info и его свойство bill
    ...mapGetters(["info"]),
    canCreateRecord(){
      if(this.type === "income"){
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch();
        return
      }
      
      // проверка в computed свойстве canCreateRecord чтобы затраты не превышали количество денег у пользователя
      // если this.canCreateRecord возвращает true - то затраты не превышают сумму на счету
      if(this.canCreateRecord){        
        try {
          // записываем в БД созданную запись
          await this.$store.dispatch("createRecord", {
            category: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            // toJSON() - используем для корректной записи даты в firebase
            date: new Date().toJSON()
          });

          // если введенное значение доход, то
          // складываем общую сумму счета с введнным значением, если
          // введенное значение расход, то вычитаем его от общей суммы счета
          const bill = this.type === "income" 
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch("updateInfo", {bill});

          this.$message("Запись создана");
          this.$v.reset();
          this.amount = 1;
          this.description = "";

        } catch(e){}        

      } else {
        this.$message(`На счёте не достаточно ${this.amount - this.info.bill}` );
      }
    }
  }, 
  async mounted(){
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if(this.categories.length){
      this.current = this.categories[0].id;
    }  

    // несколько вариантов решения задачи синхронности
    // 1)  без setTimeout привязка к селекту materialize не будет работать т.к.
    // после того как this.loading = false (см. выше)  
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
    window.M.updateTextFields();      
    
  },
  destroyed(){
    if(this.select && this.select.destroy){
      this.select.destroy();
    }
  }

}
</script>

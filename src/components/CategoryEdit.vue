<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form v-on:submit.prevent="submitHandler">
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

                <div class="input-field">
                    <input
                        v-model="categoryName"
                        v-bind:class="{invalid: $v.categoryName.$dirty && !$v.categoryName.required}"

                        id="name"
                        type="text"
                    >
                    <label for="name">Название</label>
                    <span
                        v-if="$v.categoryName.$dirty && !$v.categoryName.required"
                        class="helper-text invalid"
                    >
                        Введите имя категории
                    </span>
                </div>

                <div class="input-field">
                    <input
                        v-model.number.trim="limit"
                        v-bind:class="{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)}"

                        id="limit"
                        type="number"
                    >
                    <label for="limit">Лимит</label>
                    <span
                        v-if="$v.limit.$dirty && !$v.limit.minValue "
                        class="helper-text invalid"
                    >
                        Минимальное значение {{ $v.limit.$params.minValue.min }}
                    </span>
                    <span
                        v-else-if="$v.limit.$dirty && !$v.limit.required "
                        class="helper-text invalid"
                    >
                        Поле не должно быть пустым
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minValue} from "vuelidate/lib/validators"

export default {
    props: ["categories"],
    data(){
        return {
            select: null,
            categoryName: '',
            limit: 100,
            current: null
        }
    },
    validations: {
        categoryName: {required},
        limit: {required, minValue: minValue(100)}
    },
    watch: {
        // при выборе в селекте нужной категории будут показаны данные этой катгории
        current(catId){
            const {categoryName, limit} = this.categories.find(c => c.id == catId);

            this.categoryName = categoryName;
            this.limit = limit;
        }
    },    
    methods: {
        async submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch();
                return
            }            

            try {
                const categoryData = {
                    categoryName: this.categoryName,
                    limit: this.limit,
                    id: this.current 
                };               
                await this.$store.dispatch("updateCategory", categoryData);
                this.$message("Категория обновлена");
                
                // 1) для обновления массива categories в родительском компоненте Categories
                // 2) это нужно для автоматического обновления отредактированного пункта в
                // селекте без перезагрузки страницы
                this.$emit("updateCurrentCategory", categoryData);

            } catch(e){}
        }
    },
    created(){
        const {id, categoryName, limit} = this.categories[0];

        this.current = id;
        this.categoryName = categoryName;
        this.limit = limit;
    },
    mounted(){
        // привязка к селекту materialize
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
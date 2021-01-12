<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ "Create" | localize }}</h4>
            </div>

            <form
                v-on:submit.prevent="submitHandler"
            >
                <div class="input-field">
                    <input
                        v-model="categoryName"
                        v-bind:class="{invalid: $v.categoryName.$dirty && !$v.categoryName.required}"

                        id="name"
                        type="text"
                    >
                    <label for="name">{{ "Title" | localize }}</label>
                    <span
                        v-if="$v.categoryName.$dirty && !$v.categoryName.required"
                        class="helper-text invalid"
                    >
                        {{ "EnterNameCategory" | localize }}
                    </span>
                </div>

                <div class="input-field">
                    <input
                        v-model.number.trim="limit"
                        v-bind:class="{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)}"

                        id="limit"
                        type="number"
                    >
                    <label for="limit">{{ "Limit" | localize }}</label>
                    <span
                        v-if="$v.limit.$dirty && !$v.limit.minValue "
                        class="helper-text invalid"
                    >
                        {{ "invalidMinValue" | localize }} {{ $v.limit.$params.minValue.min }}
                    </span>
                    <span
                        v-else-if="$v.limit.$dirty && !$v.limit.required "
                        class="helper-text invalid"
                    >
                        {{ "invalidNameEmpty" | localize }}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                {{ "Create" | localize }}
                <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minValue} from "vuelidate/lib/validators"

export default {
    data(){
        return {
            categoryName: '',
            limit: 100
        }
    },
    validations: {
        categoryName: {required},
        limit: {required, minValue: minValue(100)}
    },
    methods: {
        async submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch();
                return
            }

            try{
                const category = await this.$store.dispatch("createCategory", {
                    categoryName: this.categoryName,
                    limit: this.limit
                });

                // сбрасываем значения на дефолтные
                this.categoryName = '';
                this.limit = 100;

                this.$v.$reset();

                this.$message("Категория была создана");

                // для того чтобы родительский компонент и 
                // компонент CategoryEdit знали о создании новой категории
                this.$emit("created", category);

            } catch(e){}
            
        }
    },
    mounted(){
        window.M.updateTextFields();
    }
}
</script>
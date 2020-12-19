<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form
                v-on:click.prevent="submitHandler"
            >
                <div class="input-field">
                    <input
                        v-model.trim="name"
                        v-bind:class="{invalid: $v.name.$dirty && !$v.name.required}"

                        id="name"
                        type="text"
                    >
                    <label for="name">Название</label>
                    <span
                        v-if="$v.name.$dirty && !$v.name.required"
                        class="helper-text invalid"
                    >
                        Введите имя категории
                    </span>
                </div>

                <div class="input-field">
                    <input
                        v-model.trim="limit"
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
                Создать
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
            name: '',
            limit: 100
        }
    },
    validations: {
        name: {required},
        limit: {required, minValue: minValue(100)}
    },
    methods: {
        submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch();
                return
            }
        }
    },
    mounted(){
        window.M.updateTextFields();
    }
}
</script>
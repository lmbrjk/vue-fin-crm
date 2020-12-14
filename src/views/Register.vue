<template>
    <form 
        v-on:submit.prevent="submitHandler"

        class="card auth-card"
    >
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input
                    v-model.trim="email"
                    v-bind:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"

                    id="email"
                    type="text"
                >
                <label for="email">Email</label>
                <small
                    v-if="$v.email.$dirty && !$v.email.required"
                    class="helper-text invalid"
                >
                    Поле Email не должно быть пустым
                </small>
                <small
                    v-else-if="$v.email.$dirty && !$v.email.email"
                    class="helper-text invalid"
                >
                    Введите корректный Email
                </small>
            </div>
            <div class="input-field">
                <input
                    v-model.trim="password"
                    v-bind:class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"

                    id="password"
                    type="password"
                >
                <label for="password">Пароль</label>
                <small
                    v-if="$v.password.$dirty && !$v.password.required"
                    class="helper-text invalid"
                >
                    Поле не должно быть пустым
                </small>
                <small
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                    class="helper-text invalid"
                >
                    Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов
                </small>
            </div>
            <div class="input-field">
                <input
                    v-model.trim="name"
                    v-bind:class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"

                    id="name"
                    type="text"
                >
                <label for="name">Имя</label>
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
            <p>
                <label>
                    <input
                        v-model="agree"
                        type="checkbox"
                    />
                    <span>С правилами согласен</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    Зарегистрироваться
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Уже есть аккаунт?
                <router-link
                    to="/login"
                >
                    Войти!
                </router-link>
            </p>
        </div>
    </form>
</template>


<script>
import {email, required, minLength} from "vuelidate/lib/validators"

export default {
    data(){
        return {
            email: '',
            password: '',
            name: '',
            agree: false
        }
    },
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)},
        name: {required, minLength: minLength(4)},
        agree: {checked: v => v}
    },
    methods: {
        submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch();
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            };
            console.log(formData);

            this.$router.push('/');
        }
    }
}
</script>
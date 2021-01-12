<template>
  <form
    v-on:submit.prevent="submitHandler"

    class="card auth-card"
  >
    <div class="card-content">
        <span class="card-title">
            {{'CRM_Title'|localize}}
        </span>
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
                {{'Message_EmailRequired'|localize}}
            </small>
            <small
                v-else-if="$v.email.$dirty && !$v.email.email"

                class="helper-text invalid"
            >
                {{'Message_EmailValid'|localize}}
            </small>
        </div>
        <div class="input-field">
            <input
                v-model.trim="password"
                v-bind:class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"

                id="password"
                type="password"
            >
            <label for="password">{{'Password'|localize}}</label>
            <small
                v-if="$v.password.$dirty && !$v.password.required"

                class="helper-text invalid"
            >
                {{'invalidNameEmpty'|localize}}
            </small>
            <small
                v-else-if="$v.password.$dirty && !$v.password.minLength"
                class="helper-text invalid"
            >
                {{'invalidNameMinLength'|localize}} {{$v.password.$params.minLength.min}}
            </small>
        </div>
        <div class="input-field">
            <input
                v-model.trim="name"
                v-bind:class="{invalid: $v.name.$dirty && !$v.name.required}"

                id="name"
                type="text"
            >
            <label for="name">{{'Name'|localize}}</label>
            <small
                v-if="$v.name.$dirty && !$v.name.required"

                class="helper-text invalid"
            >
                {{'Message_EnterName'|localize}}
            </small>
        </div>
        <p>
            <label>
                <input
                    v-model="agree"

                    type="checkbox"
                >
                <span>{{'AcceptRules'|localize}}</span>
            </label>
        </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Register'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'HasAccount'|localize}}
        <router-link to="/login">{{'Login'|localize}}</router-link>
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
        async submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch();
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            };

            try {
                await this.$store.dispatch("register", formData);

                this.$router.push('/');

            } catch (e){}
            
           
        }
    }
}
</script>
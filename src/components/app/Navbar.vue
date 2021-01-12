<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a 
            v-on:click="$emit('switch-sidebar')"
          >
            <i class="material-icons black-text">dehaze</i>
          </a>

          <span class="black-text">{{ date | date("datetime") }}</span>

        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger black-text"
              data-target="dropdown"
              ref="dropdown"
            >
              {{ name }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link
                  to="/profile" 
                  class="black-text"
                >
                  <i class="material-icons">account_circle</i>{{ "ProfileTitle" | localize }}
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a 
                  v-on:click.prevent="logout"
                  class="black-text"
                >
                  <i class="material-icons">assignment_return</i>{{ "Logout" | localize }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import M from 'materialize-css'

export default {
  data(){
    return {
      // текущая дата
      date: new Date(),
      // интервал для постоянного отсчета текущего времени
      interval: null,
      // выпадающее меню при нажатии на пользователя
      dropdown: null
    }
  },
  methods: {
    // выход пользователя
    async logout(){
      await this.$store.dispatch("logout");

      this.$router.push("/login?message=logout");
    }
  },
  computed: {
    name(){
      return this.$store.getters.info.name;
    }
  },
  mounted(){
    // вывод текущего времени в навбаре
    this.interval = setInterval( () => {
      this.date = Date.now();
    }, 1000);
    // подключение выпадающего меню к кнопке логина
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {constrainWidth: true});
  },
  beforeDestroy(){
    // удаление вывода текущего времени в навбаре если навбара нет на текущей странице
    clearInterval(this.interval);

    // удаление выпадающего меню в навбаре если навбара нет на текущей странице
    // используем проверку что если все подключено, то удаляем
    if(this.dropdown && this.dropdown.destroy){
      this.dropdown.destroy();
    }

  }
}
</script>
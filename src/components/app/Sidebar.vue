<template>
    <ul
      v-bind:class="{open: value}" 
      class="sidenav app-sidenav"
    >
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        v-bind:to="link.url"
        v-bind:exact="link.exact"
      >
        <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </router-link>
    </ul>
</template>

<script>
export default {
  props: ['value'],
  data(){
    return {
      links: [
        {title: "Счет", url: "/", exact: true},
        {title: "История", url: "/history"},
        {title: "Планирование", url: "/planning"},
        {title: "Новая запись", url: "/record"},
        {title: "Категории", url: "/categories"}
      ]
    }
  }
}
</script>
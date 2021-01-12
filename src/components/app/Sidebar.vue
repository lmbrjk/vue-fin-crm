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
        <a class="waves-effect waves-orange pointer">{{ link.title | localize }}</a>
      </router-link>
    </ul>
</template>

<script>

export default {
  props: ['value'],
  data(){
    return {
      links: [
        {title: "Menu_Bill", url: "/", exact: true},
        {title: "Menu_History", url: "/history"},
        {title: "Menu_Planning", url: "/planning"},
        {title: "Menu_NewRecord", url: "/record"},
        {title: "Menu_Categories", url: "/categories"}
      ]
    }
  }
}
</script>
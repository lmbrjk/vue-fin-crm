<template>
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">{{ "MyBill" | localize }}</span>

          <p
            v-for="cur of currencies" 
            v-bind:key="cur"

            class="currency-line"
          >
            <span>{{ getCurrency(cur) | currency(cur) }}</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  props: ["rates"],
  data(){
    return {
      currencies: ["RUB", "USD", "EUR"]
    }
  },
  computed: {
    // делаем Рубль основной валютой по отношению к которой будут рассчитываться другие валюты
    base(){
      return this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["EUR"]);
    }
  },
  methods: {
    // 1) преобразуем количество наличных денег взятых из $store.getters.info.bill в разные валюты
    // 2) this.base - computed-свойство в котором 
    // рубль сделан основной валютой по отношению к которой будут рассчитываться другие валюты
    getCurrency(currency){
      return Math.floor(this.base * this.rates[currency]);
    }
  }
}
</script>
<template>
<div>
  <div class="page-title">
    <h3>{{"Bill" | localize }}</h3>

    <button 
      v-on:click="refreshCurrency"

      class="btn waves-effect waves-light btn-small"
    >
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <Loader 
    v-if="loading"
  />

  <div 
    v-else
    class="row"
  >

    <HomeBill 
      v-bind:rates="currency.rates"
    />

    <HomeCurrency    
      v-bind:currencyRates="currency.rates"
      v-bind:currencyDate="currency.date"
    />
  </div>
</div>
</template>

<script>
import HomeBill from "@/components/HomeBill"
import HomeCurrency from "@/components/HomeCurrency"

export default {
  components: {
    HomeBill, HomeCurrency
  },
  data(){
    return {
      loading: true,
      currency: null
    }
  },
  methods: {
    async refreshCurrency(){
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
      
    }
  },
  async mounted(){
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
    
  }
}
</script>
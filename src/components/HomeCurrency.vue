<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{ "CurrencyRate" | localize }}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{ "Currency" | localize }}</th>
              <th>{{ "Rate" | localize }}</th>
              <th>{{ "Date" | localize }}</th>
            </tr>
            </thead>

            <tbody>
            <tr
              v-for="cur of currencies"
              v-bind:key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ currencyRates[cur].toFixed(2) }}</td>
              <td>{{ currencyDate | date }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ["currencyRates", "currencyDate"],
  data(){
    return {
      currencies: ["RUB", "USD", "EUR"]
    }
  }
}
</script>
<template>
<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>

  <section>
    <Loader 
      v-if="loading"
    />

    <p 
      v-else-if="!records.length"
      class="center"
    >
      Пока что нет записей о расходах и доходах. <router-link to="/record">Создайте первую</router-link>
    </p>

    <HistoryTable 
      v-else
      v-bind:records="records"
    />
  </section>
</div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable"
export default {
  components: {
    HistoryTable
  },
  data(){
    return {
      records: [],
      loading: true
    }
  },
  async mounted(){
    const categories = await this.$store.dispatch("fetchCategories");

    const records = await this.$store.dispatch("fetchRecords");

    this.records = records.map( record => {
      return {
        ...record,
        categoryName: categories.find( category => category.id == record.categoryName).categoryName,
        typeClass: record.type === "outcome" ? "red" : "green",
        typeText: record.type === "outcome" ? "Расход" : "Доход",
      }
    });
    
    this.loading = false;
  }
}
</script>
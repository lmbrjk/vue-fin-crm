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
    // this.categories = await this.$store.dispatch("fetchCategories");
    const categories = await this.$store.dispatch("fetchCategories");

    const records = await this.$store.dispatch("fetchRecords");

    categories.forEach( (cat) => {
      records.forEach( (record) => {
        if( record.categoryName == cat.id){
          record.categoryName = cat.categoryName; 
        }
      })
    });    
    
    this.records = records;

    this.loading = false;
  }
}
</script>
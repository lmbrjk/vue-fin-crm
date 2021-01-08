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
      v-bind:records="items"
    />

    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперёд'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    />
  </section>
</div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin"
import HistoryTable from "@/components/HistoryTable"

export default {
  components: {
    HistoryTable
  },
  mixins: [paginationMixin],
  data(){
    return {
      records: [],
      loading: true
    }
  },
  async mounted(){
    const categories = await this.$store.dispatch("fetchCategories");

    this.records = await this.$store.dispatch("fetchRecords");    
    
    // setupPagination - из миксина pagination
    this.setupPagination(this.records.map( record => {
      return {
        ...record,
        categoryName: categories.find( category => category.id == record.categoryName).categoryName,
        typeClass: record.type === "outcome" ? "red" : "green",
        typeText: record.type === "outcome" ? "Расход" : "Доход",
      }
    }));

    // console.log(this.records)

    this.loading = false;
  }
}
</script>
<style scoped>

</style>
<template>
<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas"></canvas>
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
import {Pie} from "vue-chartjs"

export default {
  components: {
    HistoryTable
  },
  mixins: [paginationMixin],
  extends: Pie,
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

    this.renderChart({
        labels: categories.map( c => c.categoryName ),
        datasets: [{
            label: 'Расходы по категориям',
            data: categories.map( c => {
              return this.records.reduce( (total, r) => {
                if(r.categoryName === c.id && r.type === "outcome"){
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    });

    this.loading = false;
  }
}
</script>
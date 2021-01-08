<template>
    <div>
        <Loader 
            v-if="loading"
        />       

        <div
            v-else-if="record"
        >
            <div class="breadcrumb-wrap">
                <router-link 
                    to="/history" 
                    class="breadcrumb"
                >
                    История
                </router-link>
                <a 
                    v-on:click.prevent
                    class="breadcrumb"
                >
                    {{ record.type === "income" ? "Доход" : "Расход" }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div 
                        v-bind:class="{green: record.type === 'income', red: record.type === 'outcome'}"
                        class="card"
                    >
                        <div class="card-content white-text">
                            <p>Описание: {{ record.description }}</p>
                            <p>Сумма: {{ record.amount | currency("RUB") }}</p>
                            <p>Категория: {{ record.categoryName }}</p>

                            <small>{{ record.date | date("datetime") }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p 
            v-else
            class="center"
        >
            Такой записи нет.
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            record: [],
            loading: true
        }
    },
    async mounted(){
        try {
            // id - то же что указано в routes (path: '/detail/:id')
            const params = this.$route.params.id;

            const record = await this.$store.dispatch("getRecordById", params);            
            
            const category = await this.$store.dispatch("getCategoryById", record.categoryName);

            this.record = {
                ...record,
                categoryName: category.categoryName
            };

            this.loading = false;

        } catch(e){}
        
    }
}
</script>
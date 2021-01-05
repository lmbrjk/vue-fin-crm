<template>
    <div>
        <Loader 
            v-if="loading"
        />
        <div
            v-else
        >
            <div class="breadcrumb-wrap">
                <a href="/history" class="breadcrumb">История</a>
                <a class="breadcrumb">
                    Расход
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card red">
                        <div class="card-content white-text">
                            <p>Описание:</p>
                            <p>Сумма:</p>
                            <p>Категория:</p>

                            <small>12.12.12</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            record: [],
            category: [],
            loading: true
        }
    },
    async mounted(){
        try {
            // id - то же что указано в routes (path: '/detail/:id')
            const params = this.$route.params.id;

            const record = await this.$store.dispatch("getRecordById", params);            
            
            const category = await this.$store.dispatch("getCategoryById", record.categoryName);

            /* ** */
            this.record = {};

            this.loading = false;

        } catch(e){}
        
    }
}
</script>
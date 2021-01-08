export default {
    data(){
        return {
            //проверяем есть ли в роуте query-параметр page
            page: +this.$route.query.page || 1,
            pageSize: 5,
            pageCount: 0,
            items: [],
            allItems: []
        };
    },
    methods: {
        // передаваемое в функцию значение allItems это
        // this.records.map() из хука mounted в компоненте History
        setupPagination(allItems){                       
            let from = (this.page - 1) * this.pageSize;
            let to = from + this.pageSize;

            this.allItems = allItems;
            
            this.items = allItems.slice(from, to);
            
            // страницы в пагинации
            this.pageCount = Math.ceil(allItems.length / this.pageSize);

        },
        pageChangeHandler(page){
            this.$router.push(`${this.$route.path}?page=${this.page}`);

            let from = (page - 1) * this.pageSize;
            let to = from + this.pageSize; 
            
            this.items = this.allItems.slice(from, to);
        }
    }
}
<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader 
                v-if="loading"
            />
            <div 
                v-else                
                class="row"
            >
                <CategoryCreate 
                    v-on:created="addNewCategory"
                />
                
                <CategoryEdit 
                    v-bind:categories="categories"
                />                
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate"
import CategoryEdit from "@/components/CategoryEdit"

export default {
    components: {
        CategoryCreate, CategoryEdit
    },
    data(){
        return {
            categories: [],
            loading: true
        }
    },
    methods: {
        addNewCategory(category){
            this.categories.push(category);
        }
    },
    async mounted(){
        this.categories = await this.$store.dispatch("fetchCategories");

        this.loading = false;
    }
}
</script>
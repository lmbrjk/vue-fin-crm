<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <div class="row">
                <CategoryCreate 
                    v-on:created="addNewCategory"
                />
                
                <CategoryEdit />                
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
            categories: []
        }
    },
    methods: {
        addNewCategory(category){
            this.categories.push(category);
        }
    }
}
</script>
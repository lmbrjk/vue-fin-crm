<template>
    <div>
        <div class="page-title">
            <h3>{{ "Menu_Categories" | localize }}</h3>
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
                    v-if="categories.length"
                    v-bind:categories="categories"
                    v-on:updateCurrentCategory="updateCurrentCategory"
                    v-bind:key="categories.length + updateCount"
                />
                <p 
                    v-else
                    class="center"
                >
                    {{ "NoCategories" | localize }}
                </p>            
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
            loading: true,
            // для обновления свойства key у компонента CategoryEdit
            // чтобы после редактирования категории ее данные сразу же менялись на
            // страницы без её перезагрузки 
            updateCount: 0
        }
    },
    methods: {
        addNewCategory(category){
            this.categories.push(category);
        },
        // 1) в метод передается отредактированная категория из компонента CategoryEdit
        // 2) массив this.categories автоматически обновляется, обновляя пункты селекта без 
        // перезагрузки страницы
        // 3) updatedCategory - это передаваемый объект categoryData из компонента CategoryEdit
        updateCurrentCategory(updatedCategory){
            const index = this.categories.findIndex( c => c.id === updatedCategory.id);

            this.categories[index].categoryName = updatedCategory.categoryName;
            this.categories[index].limit = updatedCategory.limit;

            // обновляем значение updateCount обновляя также v-bind:key у компонента CategoryEdit
            // чтобы после редактирования категории ее данные сразу же менялись на
            // страницы без её перезагрузки 
            this.updateCount++;
        }
    },
    async mounted(){
        this.categories = await this.$store.dispatch("fetchCategories");

        this.loading = false;
    }
}
</script>
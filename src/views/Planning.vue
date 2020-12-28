<template>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{ info.bill | currency("RUB") }}</h4>
        </div>

        <Loader 
            v-if="loading"
        />

        <p 
            v-else-if="!categories.length"
            class="center"
        >
            Категорий пока что нет. <router-link to="/categories">Создайте первую</router-link>
        </p>

        <section
            v-else
        >
            <div
                v-for="cat of categories"
                v-bind:key="cat.id"
            >
                <p>
                    <strong>{{ cat.categoryName }}:</strong>
                    {{ cat.spend }} из {{ cat.limit }}
                </p>
                <div class="progress" >
                    <div
                        class="determinate"
                        v-bind:class="[cat.progressColor]"
                        v-bind:style="{width: cat.progressPercent}"
                    >
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    data(){
        return {
            loading: true,
            categories: []
        }
    },
    computed: {
        ...mapGetters(["info"])
    },
    async mounted(){
        const records = await this.$store.dispatch("fetchRecords");
        console.log(records)
        // не помещаем categories в модель, т.е. this.categories т.к. 
        // нужно снала модифицировать данные с бэкэнда
        const categories = await this.$store.dispatch("fetchCategories");

        this.categories = categories.map( cat => {
            const spend = records
                // отбираем все записи для данной категории cat
                .filter( r => { r.id === cat.id })
                // отбираем расходы
                .filter( r => { r.type === "outcome" })
                // складываем расходы
                .reduce( (total, record) => {
                    return total += +record.amount
                }, 0);
            
            // преобразуем в проценты общую сумму расходов по данной категории
            const percent = 100 * spend / cat.limit;

            const progressPercent = percent > 100 ? 100 : percent
            // цвет шкалы в зависимости от затрат
            const progressColor = percent < 60
                ? "green"
                : percent < 100
                    ? "yellow"
                    : "red";

            console.log({
                ...cat,
                progressPercent,
                progressColor,
                spend
            });

            return {
                ...cat,
                progressPercent,
                progressColor,
                spend
            }

        });

        console.log(this.categories)

        this.loading = false;
    }
}
</script>
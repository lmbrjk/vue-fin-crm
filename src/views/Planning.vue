<template>
    <div>
        <div class="page-title">
            <h3>{{ "Menu_Planning" | localize }}</h3>
            <h4>{{ info.bill | currency("RUB") }}</h4>
        </div>

        <Loader 
            v-if="loading"
        />

        <p 
            v-else-if="!categories.length"
            class="center"
        >
            Категорий пока что нет. <router-link to="/categories">{{ "CreateRecord" | localize }}</router-link>
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
                <div
                    v-tooltip="cat.tooltip" 
                    class="progress"
                >
                    <div
                        class="determinate"
                        v-bind:class="[cat.progressColor]"
                        v-bind:style="{width: cat.progressPercent + '%'}"
                    >
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
// для использования данного фильтра с tooltip
import currencyFilter from "@/filters/currency.filter"
import localizeFilter from "@/filters/localize.filter"

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

        // не помещаем categories в модель, т.е. this.categories т.к. 
        // нужно снала модифицировать данные с бэкэнда
        const categories = await this.$store.dispatch("fetchCategories");

        this.categories = categories.map( cat => {
            const spend = records
                // отбираем все записи для данной категории cat
                .filter( r => r.categoryName === cat.id)
                // отбираем расходы
                .filter( r => r.type === "outcome")
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

            // 1) текст для tooltip
            // 2) currencyFilter - в html-теге использовать не получится поэтому
            // мы его импортировали выше и применили как функцию
            const tooltipValue = cat.limit - spend;
            const tooltip = `${tooltipValue < 0 ? localizeFilter("ExceedingLimit") : localizeFilter("CanSpend")} ${currencyFilter(Math.abs(tooltipValue))}`

            return {
                ...cat,
                progressPercent,
                progressColor,
                spend,
                tooltip
            }

        });

        this.loading = false;
    }
}
</script>
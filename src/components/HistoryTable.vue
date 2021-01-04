<template>
    <table>
      <thead>
        <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr
            v-for="(record, index) of records"
            v-bind:key="index"
        >
            <td>{{ index + 1 }}</td>
            <td>{{ record.amount | currency("RUB") }}</td>
            <td>{{ record.date | date("datetime") }}</td>
            <td>{{ record.categoryName }}</td>
            <td>
                <span 
                    v-if="record.type === 'outcome'"
                    class="white-text badge red"
                >
                    Расход
                </span>
                <span 
                    v-else
                    class="white-text badge green"
                >
                    Доход
                </span>
            </td>
            <td>
                <button class="btn-small btn">
                    <i class="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    props: ["records"],
    mounted() {}
}
</script>
<template>
    <table>
      <thead>
        <tr>
            <th>#</th>
            <th>{{ "TheAmount" | localize }}</th>
            <th>{{ "Date" | localize }}</th>
            <th>{{ "Category" | localize }}</th>
            <th>{{ "Type" | localize }}</th>
            <th>{{ "Open" | localize }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
            v-for="(record, index) of records"
            v-bind:key="record.id"
        >
            <td>{{ index + 1 }}</td>
            <td>{{ record.amount | currency("RUB") }}</td>
            <td>{{ record.date | date("datetime") }}</td>
            <td>{{ record.categoryName }}</td>
            <td>
                <span 
                    v-bind:class="[record.typeClass]"
                    class="white-text badge"
                >
                    {{ record.typeText }}
                </span>
            </td>
            <td>
                <button 
                    v-on:click="$router.push('/detail/' + record.id)"
                    v-tooltip="'Посмотреть подробней'"
                    class="btn-small btn"
                >
                    <i class="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    props: {
        records : {
            type: Array,
            required: true
        }
    }
}
</script>
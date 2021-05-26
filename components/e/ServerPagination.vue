<template>
  <div>
    <div v-if="show">
      <div
        class="text-xs rounded border-0 outline-none ring-2 ring-gray-500 bg-white"
      >
        <div
          class="font-bold rounded-t text-sm text-gray-800 w-auto p-1 bg-gray-300"
        >
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </div>
        <vue-good-table
          :columns="columns"
          :rows="rows"
          max-height="200px"
          :fixed-header="true"
          :row-style-class="rowStyleClassFn"
        >
          <div slot="emptystate">No Data from Server....</div>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerPagination',
  props: {
    show: { type: Boolean, required: false, default: true },
    label: {
      type: String,
      required: true,
      default: 'Please Provide Table title...',
    },
    disabled: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '', score: 0.03343 },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343,
        },
        {
          id: 3,
          name: 'Susan',
          age: 16,
          createdAt: '2011-10-30',
          score: 0.03343,
        },
        {
          id: 4,
          name: 'Chris',
          age: 55,
          createdAt: '2011-10-11',
          score: 0.03343,
        },
        {
          id: 5,
          name: 'Dan',
          age: 40,
          createdAt: '2011-10-21',
          score: 0.03343,
        },
        {
          id: 6,
          name: 'John',
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343,
        },
      ],
    }
  },
  computed: {},
  methods: {
    rowStyleClassFn(row) {
      return row.originalIndex % 2 === 1 ? 'bg-yellow-300' : 'bg-yellow-red'
    },
  },
}
</script>

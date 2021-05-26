<template>
  <div>
    <table id="test">
      <thead>
        <tr>
          <td>First Name</td>
          <td>Middle Name</td>
          <td>Last Name</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Elvino</td>
          <td>Tan</td>
          <td>Tan</td>
        </tr>
        <tr>
          <td>Carinnia</td>
          <td>Tan</td>
          <td>Untoro</td>
        </tr>
        <tr>
          <td>Constantine</td>
          <td>Davin</td>
          <td>Ethan</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import $ from 'jquery'
import dt from 'datatables.net'

export default {
  mounted() {
    console.log('Jqury ', $)
    console.log('Datatable ', dt)

    $('#test').DataTable()
  },
}
</script>

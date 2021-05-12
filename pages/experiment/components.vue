<template>
  <table>
    <thead>
      <tr>
        <td>Type</td>
        <td>Component</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ShortText</td>
        <td><InputShortText id="myId" label="Elvino" :maxlength="3" /></td>
      </tr>
      <tr>
        <td>Select</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Area</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Checkbox</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Radio</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>PaginationServer</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>PaginationServer</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Dialog</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Loading</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Information</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Confirmation</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Autocomplete</td>
        <td>&nbsp;</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      planets: [],
    }
  },
  async fetch() {
    this.planets = await fetch('https://api.nuxtjs.dev/planets').then((res) =>
      res.json()
    )
  },
}
</script>

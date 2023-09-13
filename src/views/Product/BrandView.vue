<template>
  <h2>{{ $t("brands.table.caption") }}</h2>

  <div class="container mt-4 table-responsive">
    <table class="table table-bordered table-hover custom-table">
      <thead>
        <tr>
          <th>{{ $t("brands.table.headers.name") }}</th>
          <th>{{ $t("brands.table.headers.listDiscount") }}</th>
          <th>{{ $t("brands.table.headers.profitRate") }}</th>
          <th>{{ $t("brands.table.headers.profitMin") }}</th>
          <th>{{ $t("brands.table.headers.profitMax") }}</th>
          <th>{{ $t("brands.table.headers.cc") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in brands" :key="item.id">
          <th>{{ item.name }}</th>
          <td contenteditable="true">{{ item.listDiscountRate }}%</td>
          <td contenteditable="true">{{ item.profitRate }}%</td>
          <td contenteditable="true">{{ item.profitMinRate }}%</td>
          <td contenteditable="true">{{ item.profitMaxRate }}%</td>
          <td contenteditable="true">{{ item.ccRate }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      brands: [],
    };
  },
  methods: {
    async getBrands() {
      this.$axios
        .get(`brands`)
        .then((response) => {
          this.brands = response.data;
        })
        .catch((error) => {
          this.products = [];
          if (error.response) {
            alert(`Error ${error.response.status}: ${error.response.data}`);
          } else if (error.request) {
            alert("No response from server.");
          } else {
            alert(`Error: ${error.message}`);
          }
        });
    },
  },
  async created() {
    this.getBrands();
  },
};
</script>

<style scoped>
.table td,
.table th {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
</style>

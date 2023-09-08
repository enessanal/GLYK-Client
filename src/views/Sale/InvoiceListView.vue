<template>
  <h2>Invoices</h2>
  <div class="table-responsive">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Customer</th>
          <th scope="col">Date</th>
          <th scope="col">Delivery Date</th>
          <th scope="col">Staff</th>
          <th scope="col" class="text-center">Operations</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(invoice, index) in invoices" :key="invoice.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ invoice.customerDetails.fullName }}</td>
          <td>{{ invoice.invoiceDetails.date }}</td>
          <td>{{ invoice.invoiceDetails.deliveryDate }}</td>
          <td>{{ invoice.invoiceDetails.staffFullName }}</td>
          <td class="text-center">
            <router-link
              :to="{ name: 'InvoiceDetailsView', params: { id: invoice.id } }"
              ><button class="btn btn-primary btn-sm mx-1">
                <i class="bi bi-pencil-square"></i></button
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invoices: [],
    };
  },
  methods: {
    async fetchInvoices() {
      const response = await fetch("/api/invoices");
      const data = await response.json();
      return data;
    },
  },
  async created() {
    this.invoices = await this.fetchInvoices();
  },
};
</script>

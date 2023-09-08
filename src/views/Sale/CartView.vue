<template>
  <div class="text-center">
    <h2>{{ $t("titles.cart") }}</h2>
  </div>
  <BackButton />
  <CartProductTable />

  <!-- <hr> -->
  <h3>Sale Details</h3>

  <div class="form-group mb-3">
    <label for="saleNotesTextArea">Sale Notes</label>
    <textarea
      class="form-control"
      id="saleNotesTextArea"
      rows="1"
      v-model="invoiceDetails.saleNotes"
    ></textarea>
  </div>

  <div class="col-md-6">
    <div class="d-flex mb-3 align-items-center">
      <label for="invoiceDate" class="me-2 flex-shrink-0" style="width: 120px"
        >Invoice Date</label
      >
      <input
        type="date"
        class="form-control"
        id="invoiceDate"
        v-model="invoiceDetails.date"
      />
    </div>

    <div class="d-flex mb-3 align-items-center">
      <label for="deliveryDate" class="me-2 flex-shrink-0" style="width: 120px"
        >Delivery Date</label
      >
      <input
        type="date"
        class="form-control"
        id="deliveryDate"
        v-model="invoiceDetails.deliveryDate"
      />
    </div>

    <div class="d-flex mb-3 align-items-center">
      <label for="invoiceNumber" class="me-2 flex-shrink-0" style="width: 120px"
        >Invoice Number</label
      >
      <input
        type="text"
        class="form-control"
        id="invoiceNumber"
        v-model="invoiceDetails.invoiceNumber"
      />
    </div>

    <div class="d-flex mb-3 align-items-center">
      <label
        for="staffFullName"
        class="me-2 flex-shrink-0 fw-bold"
        style="width: 120px"
        >Staff Full Name</label
      >
      <input
        type="text"
        class="form-control"
        id="staffFullName"
        v-model="invoiceDetails.staffFullName"
        disabled
      />
    </div>
  </div>
</template>

<script>
import CartProductTable from "@/components/Sale/CartProductTable.vue";
import BackButton from "@/components/other/BackButton.vue";

export default {
  data() {
    return {
      invoiceDetails: {
        date: "2023-04-10",
        deliveryDate: "2023-04-15",
        invoiceNumber: "123456",
        staffFullName: "John Smith",
        saleNotes:
          "Customer: 2-year client. House features: 3 floors, no elevator. Special request: Sofa with wooden legs.",
      },
      customerDetails: {
        fullName: "Robert Johnson",
        tcNumber: "12345678901",
        phoneNumber: "555-123-4567",
        contactNumber: "555-987-6543",
        address: "123 Elm St, Block A, 4th Floor, Apt:5 Springfield/USA",
        deliveryAddres: "123 Elm St, Block A, 4th Floor, Apt:5 Springfield/USA",
        customerNotes: "Returning client. Previous purchase 2 years ago.",
      },
      paymentDetails: {
        inAdvancePayments: [
          { type: "cash", amount: 500, note: "Paid in person." },
          {
            type: "creditCard",
            amount: 1500,
            note: "Paid in full with 3 installments.",
          },
        ],
        installmentPayments: [
          { date: "20.04.2023", amount: "2000", note: "Payment through card." },
          {
            date: "27.04.2023",
            amount: "1000",
            note: "Cash payment expected.",
          },
        ],
        totalPrice: "8000",
        difference: "30",
        remain: "5000",
        staffBonus: "200",
      },
    };
  },
  components: {
    CartProductTable,
    BackButton,
  },
};
</script>

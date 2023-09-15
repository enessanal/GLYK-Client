<template>
  <div class="text-center">
    <h2>{{ $t("titles.cart") }}</h2>
  </div>
  <BackButton />

  <CartProductTable />

  <div class="row mt-5">
    <div class="col-md-6"><CartSaleDetails /></div>

    <div class="col-md-6 mt-4 mt-md-0"><CartCustomerDetails /></div>
  </div>
</template>

<script>
import CartProductTable from "@/components/Sale/CartProductTable.vue";
import BackButton from "@/components/other/BackButton.vue";
import CartCustomerDetails from "@/components/Sale/CartCustomerDetails.vue";
import CartSaleDetails from "@/components/Sale/CartSaleDetails.vue";

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
    BackButton,
    CartProductTable,
    CartCustomerDetails,
    CartSaleDetails,
  },
};
</script>

<template>
  <h3><i class="bi bi-person-circle"></i> Customer Details</h3>
  <hr />
  <div class="row">
    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-calendar4-week"></i> Full Name</label
      >
      <input
        type="date"
        class="form-control"
        v-model="form.fullName"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-3 mt-3 mt-md-0">
      <label class="form-label fw-bold"><i class="bi bi-123"></i> Code</label>
      <input
        type="text"
        class="form-control"
        v-model="form.code"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-3 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-person-vcard"></i> Identity Number</label
      >
      <input
        type="text"
        class="form-control"
        v-model="form.tc"
        :disabled="!isEditing"
      />
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-telephone"></i> Phone Number</label
      >
      <input
        type="text"
        class="form-control fst-italic"
        v-model="form.phoneNumber"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-telephone"></i> Contact Number</label
      >
      <input
        type="text"
        class="form-control fst-italic"
        v-model="form.contactNumber"
        :disabled="!isEditing"
      />
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-12 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-house"></i> Address</label
      >
      <textarea
        class="form-control"
        rows="1"
        v-model="form.address"
        :disabled="!isEditing"
      ></textarea>
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-12 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-house"></i> Delivery Address</label
      >
      <textarea
        class="form-control"
        rows="1"
        v-model="form.deliveryAddress"
        :disabled="!isEditing"
      ></textarea>
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-12 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-card-text"></i> Customer Note</label
      >
      <textarea
        class="form-control"
        rows="1"
        v-model="form.note"
        :disabled="!isEditing"
      ></textarea>
    </div>
  </div>

  <!--  phoneNumber: "555-123-4567",-->
  <!--  contactNumber: "555-987-6543",-->
  <!--  address: "123 Elm St, Block A, 4th Floor, Apt:5 Springfield/USA",-->
  <!--  deliveryAddres: "123 Elm St, Block A, 4th Floor, Apt:5 Springfield/USA",-->
  <!--  customerNotes: "Returning client. Previous purchase 2 years ago.",-->
  <!--  -->

  <!-- Buttons -->
  <CartEditButtonGroup
    :hasText="true"
    :is-editing="isEditing"
    @edit="edit"
    @save="save"
    @clearForm="clearForm"
    @cancel="cancel"
  />
</template>

<script>
import CartEditButtonGroup from "@/components/Sale/CartEditButtonGroup.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    CartEditButtonGroup,
  },
  data() {
    return {
      isEditing: false,
      form: {
        fullName: "",
        code: "",
        tc: "",
        phoneNumber: "",
        contactNumber: "",
        address: "",
        deliveryAddress: "",
        note: "",
      },
      backupForm: {},
    };
  },
  computed: {
    ...mapGetters("cart", ["customerDetails"]),
  },
  methods: {
    ...mapActions("cart", ["storeCustomerDetails"]),
    edit() {
      this.backupForm = { ...this.form };
      this.isEditing = true;
    },
    save() {
      this.isEditing = false;
      this.storeCustomerDetails(this.form);
    },
    cancel() {
      this.form = { ...this.backupForm };
      this.isEditing = false;
    },
    clearForm() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
    },
  },
  created() {
    this.form = this.customerDetails;
  },
};
</script>

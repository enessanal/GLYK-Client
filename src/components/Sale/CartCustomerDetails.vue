<template>
  <h3 class=""><i class="bi bi-receipt"></i> Customer Details</h3>
  <hr />
  <div class="row">
    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-calendar4-week"></i> Contract Date</label
      >
      <input
        type="date"
        class="form-control"
        v-model="form.contractDate"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-person-video"></i> Employee</label
      >
      <input
        type="text"
        class="form-control"
        v-model="form.employee"
        :disabled="!isEditing"
      />
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-cash"></i> Cash Payment</label
      >
      <input
        type="number"
        class="form-control"
        v-model="form.cashPayment"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-card-text"></i> Cash Details</label
      >
      <input
        type="text"
        class="form-control fst-italic"
        v-model="form.cashDetails"
        :disabled="!isEditing"
      />
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-credit-card"></i> Card Payment</label
      >
      <input
        type="number"
        class="form-control"
        v-model="form.cardPayment"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-card-text"></i> Card Details</label
      >
      <input
        type="text"
        class="form-control fst-italic"
        v-model="form.cardDetails"
        :disabled="!isEditing"
      />
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-bank"></i> Credit Payment</label
      >
      <input
        type="number"
        class="form-control"
        v-model="form.creditPayment"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-card-text"></i> Credit Details</label
      >
      <input
        type="text"
        class="form-control fst-italic"
        v-model="form.creditDetails"
        :disabled="!isEditing"
      />
    </div>
  </div>

  <div class="row mt-md-3">
    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-arrow-left-right"></i> Transfer Payment</label
      >
      <input
        type="number"
        class="form-control"
        v-model="form.transferPayment"
        :disabled="!isEditing"
      />
    </div>

    <div class="col-md-6 mt-3 mt-md-0">
      <label class="form-label fw-bold"
        ><i class="bi bi-card-text"></i> Transfer Details</label
      >
      <input
        type="text"
        class="form-control fst-italic"
        v-model="form.transferDetails"
        :disabled="!isEditing"
      />
    </div>
  </div>

  <!-- Buttons -->
  <div class="d-flex justify-content-end mt-3">
    <button v-if="!isEditing" @click="edit" class="btn btn-primary me-2">
      Edit
    </button>
    <button v-if="isEditing" @click="save" class="btn btn-success me-2">
      Save
    </button>
    <button v-if="isEditing" @click="cancel" class="btn btn-danger me-2">
      Cancel
    </button>
    <button v-if="isEditing" @click="clearForm" class="btn btn-secondary">
      Reset
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      form: {
        contractDate: "",
        employee: "",
        cashPayment: "",
        cashDetails: "",
        cardPayment: "",
        cardDetails: "",
        creditPayment: "",
        creditDetails: "",
        transferPayment: "",
        transferDetails: "",
      },
      backupForm: {}, // Backup of form for the "Cancel" functionality
    };
  },
  methods: {
    edit() {
      this.backupForm = { ...this.form }; // Shallow copy
      this.isEditing = true;
    },
    save() {
      this.isEditing = false;
      // Here you can send the data to the server or do whatever you need.
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
};
</script>

<!--<template>-->

<!--<h3><i class="bi bi-person-vcard"></i> Customer Details</h3>-->
<!--  <hr>-->
<!--<div class="row">-->

<!--  <div class="col-md-6">-->
<!--    <label for="fullName" class="form-label fw-bold">Customer Full Name</label>-->
<!--    <input type="text" class="form-control" id="fullName">-->
<!--  </div>-->

<!--  <div class="col-md-6">-->
<!--    <label for="contractDate" class="form-label">Sözleşme Tarihi</label>-->
<!--    <input type="date" class="form-control" id="sozlesmeTarihi" pattern="dd-mm-yyyy">-->
<!--  </div>-->

<!--  <div class="col-md-12">-->
<!--    <label for="contractDate" class="form-label">Address</label>-->
<!--    <input type="text" class="form-control" id="sozlesmeTarihi">-->
<!--  </div>-->

<!--  <div class="col-md-12">-->
<!--    <label for="contractDate" class="form-label">Delivery Address</label>-->
<!--    <input type="text" class="form-control" id="sozlesmeTarihi">-->
<!--  </div>-->

<!--</div>-->

<!--</template>-->

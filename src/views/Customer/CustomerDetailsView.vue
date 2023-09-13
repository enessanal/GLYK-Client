<template>
  <BackButton />
  <div class="container overflow-auto">
    <h2 class="text-center">
      <b>{{ customer.fullName }} ({{ customer.code }})</b>
    </h2>

    <div class="table-responsive">
      <table class="table table-hover">
        <tr>
          <th>{{ $t("customers.table.columns.identityNumber") }}</th>
          <td>{{ customer.identityNumber }}</td>
        </tr>

        <tr>
          <th>{{ $t("customers.table.columns.email") }}</th>
          <td>{{ customer.email }}</td>
        </tr>

        <tr>
          <th>{{ $t("customers.table.columns.createdTime") }}</th>
          <td>{{ customer.createdTime }}</td>
        </tr>

        <tr>
          <th>{{ $t("customers.table.columns.updatedTime") }}</th>
          <td>{{ customer.updatedTime }}</td>
        </tr>

        <tr>
          <th>{{ $t("customers.table.columns.details") }}</th>
          <td>{{ customer.details }}</td>
        </tr>
      </table>
    </div>
  </div>
  <hr />
  <div class="text-center">
    <h3>{{ $t("customers.addresses") }}</h3>

    <div v-if="customer.addresses?.length == 0">
      <p class="lead text-secondary">
        {{ $t("customers.messages.noAddress") }}
      </p>
      <button class="btn btn-success">
        {{ $t("customers.button.addAddress") }}
      </button>
    </div>
  </div>

  <div
    class="accordion my-3"
    :id="'accordion' + index"
    v-for="(address, index) in customer.addresses"
    :key="address.id"
  >
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + index"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          <strong
            >{{ address.name }}
            <small>({{ address.district }} / {{ address.city }})</small></strong
          >
        </button>
      </h2>
      <div
        :id="'collapse' + index"
        class="accordion-collapse collapse"
        aria-labelledby="headingTwo"
        :data-bs-parent="'#accordion' + index"
      >
        <div class="accordion-body">
          <p class="lead wrap-text">{{ address.details }}</p>
          <p class="lead wrap-text">
            {{ address.district }} / {{ address.city }}
          </p>
        </div>
        <div
          class="d-flex justify-content-around justify-content-sm-end flex-wrap bd-highlight m-1"
        >
          <button class="btn btn-primary">Update</button>
          <button
            class="btn btn-danger mx-1"
            @click="
              this.$refs.confirmModal.show({
                title: this.$t('customers.messages.addressDeleteTitle'),
                contents: [
                  `(${address.name})`,
                  this.$t('others.confirmDelete'),
                ],
                param: address,
                onConfirm: this.deleteCustomerAddress,
              })
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <ModalConfirmation ref="confirmModal" />
</template>

<script>
import BackButton from "@/components/other/BackButton.vue";
import ModalConfirmation from "@/components/other/ModalConfirmation.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      customer: {},
    };
  },
  components: {
    BackButton,
    ModalConfirmation,
  },
  methods: {
    async getCustomerAddresses() {
      this.$axios
        .get(`customers/id/${this.customer.id}/addresses`)
        .then((response) => {
          this.customer.addresses = response.data;
        })
        .catch((error) => {
          if (error.response) {
            this.$toast.warn(error.response.data, {
              autoClose: 3000,
              theme: "colored",
            });
          } else if (error.request) {
            this.$toast.error("No response from server", {
              autoClose: 5000,
              theme: "colored",
            });
          } else {
            this.$toast.error(error.message, {
              autoClose: 3000,
              theme: "colored",
            });
          }
        });
    },

    async deleteCustomerAddress(address) {
      this.$axios
        .delete(`customers/id/${this.customer.id}/addresses/${address.id}`)
        .then((response) => {
          if (response.status === 204) {
            this.$toast.success(
              `${this.$t("customers.messages.addressDeletedToast")} (${
                address.name
              })`,
              { autoClose: 3000, theme: "colored" }
            );
            this.getCustomerAddresses();
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
            this.$toast.warn(error.response.data.message, {
              autoClose: 3000,
              theme: "colored",
            });
          } else if (error.request) {
            this.$toast.error("No response from server", {
              autoClose: 5000,
              theme: "colored",
            });
          } else {
            this.$toast.error(error.message, {
              autoClose: 3000,
              theme: "colored",
            });
          }
        });
    },
  },
  async created() {
    this.$axios
      .get(`customers/id/${this.id}`)
      .then((response) => {
        console.log(response);
        this.customer = response.data;
      })
      .catch((response) => {
        if (response.response.status === 404) {
          alert("Customer not found!");
          this.$router.push({ path: "/customers" });
        }
      });
  },
};
</script>

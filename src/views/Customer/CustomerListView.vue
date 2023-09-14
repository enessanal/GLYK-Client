<template>
  <h1 class="mb-3">{{ $t("customers.table.caption") }}</h1>

  <CustomerCountPill ref="countPill" />

  <div class="d-flex justify-content-center" v-if="spinner">
    <half-circle-spinner
      :animation-duration="800"
      :size="100"
      :color="'#007242af'"
    />
  </div>

  <div class="table-responsive" v-if="customers?.length > 0">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>

          <th scope="col" v-for="column in columns" :key="column.name">
            <span
              class="clickable"
              @click="sortTable(column.name)"
              :class="{
                'sort-asc': sortBy === column.name && sortOrder === 'asc',
                'sort-desc': sortBy === column.name && sortOrder === 'desc',
              }"
            >
              {{ $t(column.displayKey) }}
            </span>
          </th>

          <th scope="col" class="text-center">
            {{ $t("customers.table.headers.actions") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(customer, index) in customers" :key="customer?.id">
          <th scope="row">{{ page.pageable.offset + index + 1 }}</th>

          <td v-for="column in columns" :key="column.name">
            {{ customer[column.name] }}
          </td>

          <td class="text-center">
            <IconClickable
              :icon="'trash-fill'"
              :color="'danger'"
              :param="customer"
              :title="'Delete'"
              @call="
                this.$refs.confirmModal.show({
                  title: this.$t('customers.messages.deleteTitle'),
                  contents: [
                    `(${customer.fullName} - ${customer.identityNumber})`,
                    this.$t('others.confirmDelete'),
                  ],
                  param: customer,
                  onConfirm: this.deleteCustomer,
                })
              "
              class="me-1"
            />
            <router-link
              :to="{ name: 'CustomerDetailsView', params: { id: customer.id } }"
            >
              <IconClickable
                :icon="'info-square-fill'"
                :color="'primary'"
                :param="customer"
                :title="'Details'"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <TablePagination
    :page="page"
    :sizes="sizes"
    @changePageSize="handleChangePageSize"
    @clickPageNumber="handleClickPageNumber"
  />

  <ModalConfirmation ref="confirmModal" />
</template>

<script>
import TablePagination from "@/components/other/Pagination.vue";
import ModalConfirmation from "@/components/other/ModalConfirmation.vue";
import CustomerCountPill from "@/components/Customer/CustomerCountPill.vue";
import { HalfCircleSpinner } from "epic-spinners";
import IconClickable from "@/components/other/IconClickable.vue";
export default {
  components: {
    IconClickable,
    TablePagination,
    ModalConfirmation,
    CustomerCountPill,
    HalfCircleSpinner,
  },
  data() {
    return {
      modalTitle: "",
      modalContents: [],
      selectedCustomer: null,
      spinner: true,

      columns: [
        { name: "code", displayKey: "customers.table.columns.code" },
        { name: "fullName", displayKey: "customers.table.columns.fullName" },
        {
          name: "identityNumber",
          displayKey: "customers.table.columns.identityNumber",
        },
        { name: "email", displayKey: "customers.table.columns.email" },
        {
          name: "mobilePhone",
          displayKey: "customers.table.columns.mobilePhone",
        },
      ],
      count: 0,
      error: false,
      errorMessage: "",
      customers: [],
      page: {},
      sizes: [10, 25, 50, 100],
      sortOrder: "",
      sortBy: "",
    };
  },
  methods: {
    handleChangePageSize() {
      this.getCustomers(0);
    },
    handleClickPageNumber(number) {
      this.getCustomers(number);
    },
    async sortTable(sortBy) {
      if (this.sortBy === sortBy) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = sortBy;
        this.sortOrder = "asc";
      }
      await this.getCustomers(this.page.number);
    },
    async getCustomers(pageNumber) {
      this.page.number = pageNumber;

      this.customers = [];
      this.page.totalPages = 1;

      const params = {
        pageSize: this.page.size,
        pageNumber: this.page.number,
        sortBy: this.sortBy,
        direction: this.sortOrder,
      };

      this.$axios
        .get(`customers`, { params })
        .then((response) => {
          this.spinner = false;
          this.page = response.data;
          this.customers = this.page.content;

          this.error = false;
        })
        .catch((error) => {
          this.spinner = false;
          this.customers = [];
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
    async deleteCustomer(customer) {
      this.$axios
        .delete(`customers/id/${customer.id}`)
        .then((response) => {
          if (response.status === 204) {
            this.$toast.success(
              `${this.$t("customers.messages.successDeleteContent")} (${
                customer.fullName
              })`,
              { autoClose: 3000, theme: "colored" }
            );

            this.getCustomers();
            this.$refs.countPill.countAll();
          }
        })
        .catch((axiosError) => {
          this.$toast.error(
            `${this.$t(
              "customers.messages.failedDeleteContent"
            )} => ${axiosError}`,
            { autoClose: 3000, theme: "colored" }
          );
        });
    },
  },
  async created() {
    this.getCustomers();
  },
};
</script>

<style scoped>
.sort-asc,
.sort-desc {
  text-decoration: underline;
}

.sort-asc::after {
  content: "↑";
}

.sort-desc::after {
  content: "↓";
}

.clickable {
  color: cornflowerblue;
}
.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>

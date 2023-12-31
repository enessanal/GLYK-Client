<template>
  <h2>{{ $t("products.table.caption") }}</h2>

  <ProductCountPill ref="countPill" />

  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>

          <th
            scope="col"
            v-for="column in columns"
            :key="column.name"
            :class="{ 'text-center': column.align === 'center' }"
          >
            <span
              class="clickable"
              @click="sortTable(column.filter)"
              :class="{
                'sort-asc': sortBy === column.filter && sortOrder === 'asc',
                'sort-desc': sortBy === column.filter && sortOrder === 'desc',
              }"
            >
              {{ $t(column.displayKey) }}
            </span>
          </th>

          <th scope="col" class="text-center">
            {{ $t("products.table.headers.actions") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ page.pageable.offset + index + 1 }}</th>

          <td
            v-for="column in columns"
            :key="column.name"
            :class="{ 'text-center': column.align === 'center' }"
          >
            {{
              column.type === "price"
                ? product[column.name].toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : product[column.name]
            }}
          </td>

          <td class="text-center">
            <IconClickable
              :icon="'trash-fill'"
              :color="'danger'"
              :param="product"
              :title="'Delete'"
              @call="
                this.$refs.confirmModal.show({
                  title: this.$t('products.messages.deleteTitle'),
                  contents: [
                    `(${product.name} - ${product.code})`,
                    this.$t('others.confirmDelete'),
                  ],
                  param: product,
                  onConfirm: this.deleteProduct,
                })
              "
              class="me-1"
            />

            <router-link
              :to="{ name: 'ProductDetailsView', params: { id: product.id } }"
            >
              <IconClickable
                :icon="'info-square-fill'"
                :color="'primary'"
                :param="product"
                :title="'Details'"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ModalConfirmation ref="confirmModal" />
  <TablePagination
    :page="page"
    :sizes="sizes"
    @changePageSize="handleChangePageSize"
    @clickPageNumber="handleClickPageNumber"
  />
</template>

<script>
import TablePagination from "@/components/other/Pagination.vue";
import ModalConfirmation from "@/components/other/ModalConfirmation.vue";
import ProductCountPill from "@/components/Product/ProductCountPill.vue";
import { toast } from "vue3-toastify";
import IconClickable from "@/components/other/IconClickable.vue";

export default {
  components: {
    IconClickable,
    TablePagination,
    ModalConfirmation,
    ProductCountPill,
  },

  data() {
    return {
      columns: [],
      products: [],
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
      this.getProducts(0);
    },
    handleClickPageNumber(number) {
      this.getProducts(number);
    },
    async sortTable(sortBy) {
      console.log(sortBy);
      if (this.sortBy === sortBy) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = sortBy;
        this.sortOrder = "asc";
      }
      await this.getProducts(this.page.number);
    },
    async getProducts(pageNumber) {
      this.page.number = pageNumber;

      this.products = [];
      this.page.totalPages = 1;

      const params = {
        pageSize: this.page.size,
        pageNumber: this.page.number,
        sortBy: this.sortBy,
        direction: this.sortOrder,
      };

      this.$axios
        .get(`products`, { params })
        .then((response) => {
          this.page = response.data;
          this.products = this.page.content;

          this.error = false;
        })

        .catch((error) => {
          this.products = [];
          if (error.response) {
            toast.warn(error.response.data, {
              autoClose: 3000,
              theme: "colored",
            });
          } else if (error.request) {
            toast.error("No response from server", {
              autoClose: 5000,
              theme: "colored",
            });
          } else {
            toast.error(error.message, { autoClose: 3000, theme: "colored" });
          }
        });
    },
    async deleteProduct(product) {
      this.$axios
        .delete(`products/id/${product.id}`)
        .then((response) => {
          if (response.status === 204) {
            toast.success("OK", { autoClose: 3000, theme: "colored" });
            this.getProducts();
            this.$refs.countPill.countAll();
          }
        })
        .catch((axiosError) => {
          toast.error(axiosError.message, {
            autoClose: 3000,
            theme: "colored",
          });
        });
    },
    confirmDelete(product) {
      if (
        confirm(
          `${this.$t("others.confirmDelete")} "${product.name} (${
            product.code
          })" ?`
        )
      ) {
        this.deleteProduct(product.id);
      }
    },
  },
  async created() {
    (this.columns = [
      {
        name: "category",
        filter: "category.name",
        type: "text",
        align: "left",
        show: true,
        displayKey: "products.table.columns.category",
      },
      {
        name: "type",
        filter: "type.name",
        type: "text",
        align: "left",
        show: true,
        displayKey: "products.table.columns.type",
      },
      {
        name: "brand",
        filter: "brand.name",
        type: "text",
        align: "left",
        show: true,
        displayKey: "products.table.columns.brand",
      },
      {
        name: "name",
        filter: "name",
        type: "text",
        align: "left",
        show: true,
        displayKey: "products.table.columns.name",
      },
      {
        name: "code",
        filter: "code",
        type: "text",
        align: "left",
        show: true,
        displayKey: "products.table.columns.code",
      },
      {
        name: "size",
        filter: "size.name",
        type: "text",
        align: "center",
        show: true,
        displayKey: "products.table.columns.size",
      },
      {
        name: "listPrice",
        filter: "listPrice",
        type: "price",
        align: "center",
        show: true,
        displayKey: "products.table.columns.listPrice",
      },
      {
        name: "purchasePrice",
        filter: "purchasePrice",
        type: "price",
        align: "center",
        show: true,
        displayKey: "products.table.columns.purchasePrice",
      },
      {
        name: "cashPrice",
        filter: "cashPrice",
        type: "price",
        align: "center",
        show: true,
        displayKey: "products.table.columns.cashPrice",
      },
      {
        name: "ccPrice",
        filter: "ccPrice",
        type: "price",
        align: "center",
        show: true,
        displayKey: "products.table.columns.ccPrice",
      },
      {
        name: "lastPrice",
        filter: "lastPrice",
        type: "price",
        align: "center",
        show: true,
        displayKey: "products.table.columns.lastPrice",
      },
      {
        name: "limitPrice",
        filter: "limitPrice",
        type: "price",
        align: "center",
        show: true,
        displayKey: "products.table.columns.limitPrice",
      },
      {
        name: "stock",
        filter: "stock",
        type: "number",
        align: "center",
        show: true,
        displayKey: "products.table.columns.stock",
      },
    ]),
      await this.getProducts();
  },
};
</script>

<style scoped>
table {
  font-size: 75%;
}

.sort-asc,
.sort-desc {
  text-decoration: underline;
}

.sort-asc::after {
  content: "↑"; /* veya istediğiniz bir Unicode karakteri */
}

.sort-desc::after {
  content: "↓"; /* veya istediğiniz bir Unicode karakteri */
}

.clickable {
  color: cornflowerblue;
}
.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>

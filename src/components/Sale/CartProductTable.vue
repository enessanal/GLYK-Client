<template>
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
            v-show="column?.show"
          >
            <span> {{ $t(column.displayKey) }} </span>
          </th>
          <th scope="col" class="text-center">
            {{ $t("products.table.headers.actions") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <th scope="row">{{ index + 1 }}</th>

          <td
            v-for="column in columns"
            :key="column.name"
            :class="{
              'text-center': column.align == 'center',
              'fw-bold': column.bold,
            }"
            v-show="column?.show"
          >
            {{ getCellValue(item, column) }}
          </td>

          <td class="text-center">
            <IconClickable
              v-if="item.amount === 1"
              :icon="'trash-fill'"
              :color="'danger'"
              :param="item.product"
              :title="$t('others.remove')"
              @call="
                this.$refs.confirmModal.show({
                  title: $t('cart.messages.removeItem'),
                  contents: [
                    `(${item.product.name} - ${item.product.code})`,
                    $t('cart.messages.removeConfirmText'),
                  ],
                  param: item.product,
                  onConfirm: this.removeProductFromCart,
                })
              "
            />

            <IconClickable
              v-else
              :icon="'dash-circle-fill'"
              :color="'danger'"
              :param="item.product"
              :title="$t('others.decrease')"
              @call="decreaseProductFromCart"
            />

            <IconClickable
              :icon="'plus-circle-fill'"
              :color="'success'"
              :param="item.product"
              :title="$t('others.increase')"
              @call="addProductToCart"
              class="mx-1"
            />
          </td>
        </tr>
        <tr>
          <td colspan="6"></td>

          <td class="fw-bold text-center">{{ getTotals().amount }}</td>
          <td class="fw-bold text-center">
            {{
              getTotals().cashPrice.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>
          <td class="fw-bold text-center">
            {{
              getTotals().ccPrice.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>
          <td class="fw-bold text-center">
            {{
              getTotals().lastPrice.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>
          <td class="fw-bold text-center">
            {{
              getTotals().limitPrice.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>

          <td colspan="2"></td>
          <td
            :class="{ editable: salePriceEditable }"
            @click="enableEditSalePrice"
          >
            <input
              v-show="salePriceEditable"
              @keyup.enter="saveSalePrice"
              @blur="saveSalePrice"
              @keyup.esc="saveSalePrice"
              v-model.number="editingValue"
              class="form-control"
              ref="editableInput"
              id="enes"
            />
            <span v-show="!salePriceEditable">{{ getSaleTotalPrice() }}</span>
          </td>

          <td class="text-center">
            <button
              id="clearBtn"
              class="btn btn-danger btn-sm"
              :disabled="!cartItems.length"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              :title="$t('others.clearAll')"
              @click="
                this.$refs.confirmModal.show({
                  title: $t('cart.messages.emptyTitle'),
                  contents: [$t('cart.messages.emptyCartConfirmTest')],
                  onConfirm: this.emptyItems,
                })
              "
            >
              <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ModalConfirmation ref="confirmModal" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalConfirmation from "@/components/other/ModalConfirmation.vue";
import IconClickable from "@/components/other/IconClickable.vue";
import dayjs from "dayjs";

export default {
  components: {
    IconClickable,
    ModalConfirmation,
  },
  data() {
    return {
      cart: {},
      salePriceEditable: false,
      editingValue: 0,
      columns: [
        {
          name: "category",
          type: "text",
          align: "left",
          show: false,
          isProductKey: true,
          displayKey: "products.table.columns.category",
        },
        {
          name: "type",
          type: "text",
          align: "left",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.type",
        },
        {
          name: "brand",
          type: "text",
          align: "left",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.brand",
        },
        {
          name: "name",
          type: "text",
          align: "left",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.name",
        },
        {
          name: "code",
          type: "text",
          align: "left",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.code",
        },
        {
          name: "size",
          type: "text",
          align: "center",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.size",
        },
        {
          name: "amount",
          type: "number",
          align: "center",
          show: true,
          isProductKey: false,
          bold: true,
          displayKey: "products.table.columns.amount",
        },
        {
          name: "cashPrice",
          type: "price",
          align: "center",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.cashPrice",
        },
        {
          name: "ccPrice",
          type: "price",
          align: "center",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.ccPrice",
        },
        {
          name: "lastPrice",
          type: "price",
          align: "center",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.lastPrice",
        },
        {
          name: "limitPrice",
          type: "price",
          align: "center",
          show: true,
          isProductKey: true,
          displayKey: "products.table.columns.limitPrice",
        },
        {
          name: "deliveryDate",
          type: "date",
          align: "center",
          show: true,
          isProductKey: false,
          displayKey: "products.table.columns.deliveryDate",
        },
        {
          name: "warehouse",
          type: "text",
          align: "left",
          show: true,
          isProductKey: false,
          displayKey: "products.table.columns.warehouse",
        },
        {
          name: "salePrice",
          type: "price",
          align: "center",
          show: true,
          isProductKey: false,
          displayKey: "products.table.columns.salePrice",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "getTotals", "saleTotalPrice"]),
  },
  methods: {
    ...mapActions("cart", [
      "addProductToCart",
      "removeProductFromCart",
      "decreaseProductFromCart",
      "checkCartFromServer",
      "emptyItems",
      "setSaleTotalPrice",
    ]),

    enableEditSalePrice() {
      this.salePriceEditable = true;
      this.editingValue = this.saleTotalPrice;

      this.$refs.editableInput.focus();
    },
    saveSalePrice() {
      this.setSaleTotalPrice(this.editingValue);
      this.salePriceEditable = false;
    },

    getSaleTotalPrice() {
      return this.saleTotalPrice.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    getCellValue(item, column) {
      const { type, isProductKey, name } = column;
      const value = isProductKey ? item.product[name] : item[name];

      if (type === "price") {
        if (name === "salePrice") {
          return value.toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }

        return (value * item.amount).toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      if (type === "date") {
        return dayjs(value).format("DD.MM.YYYY");
      }

      return value;
    },
  },
  async created() {
    this.checkCartFromServer();
  },
  mounted() {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  },
};
</script>

<style scoped>
#clearBtn {
  transition: transform 0.1s;
}
#clearBtn:hover {
  transform: scale(1.5);
}

/*
tbody
{
    font-size: 1rem;
}

td 
{
    vertical-align: middle;
}

td[contenteditable="true"] 
{
    background-color: rgba(255, 253, 127, 0.293);
}


td[contenteditable="true"]:hover 
{
    cursor:cell;
}

td[contenteditable="true"]:focus 
{
    background-color: rgba(204, 255, 0, 0.422);
    border-style: dotted;
    cursor: text;
} */
</style>

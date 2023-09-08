<template>
  <div class="d-flex justify-content-between user-select-none">
    <div class="d-inline-flex">
      <select
        class="form-select"
        v-model="page.size"
        @change="onChangePageSize"
      >
        <!-- <option disabled value="">{{ $t('pagination.size') }}</option> -->
        <option v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>

    <div class="d-inline-flex overflow-auto user-select-none">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: page?.number === 0 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="onClickPageNumber(page?.number - 1)"
              >&laquo;</a
            >
          </li>

          <li
            class="page-item"
            :class="{ active: pageNumber === page?.number + 1 }"
            v-for="pageNumber in page?.totalPages"
            :key="pageNumber"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="onClickPageNumber(pageNumber - 1)"
              >{{ pageNumber }}
            </a>
          </li>

          <li
            class="page-item"
            :class="{ disabled: page?.number === page?.totalPages - 1 }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="onClickPageNumber(page?.number + 1)"
              >&raquo;</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "TablePagination",
  props: {
    page: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onChangePageSize(event) {
      console.log(event);
      this.$emit("changePageSize");
    },
    onClickPageNumber(number) {
      this.$emit("clickPageNumber", number);
    },
  },
};
</script>

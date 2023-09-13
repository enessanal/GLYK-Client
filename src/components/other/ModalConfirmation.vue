<template>
  <div class="modal fade" tabindex="-1" ref="confirmationModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p v-for="(content, index) in contents" :key="index">{{ content }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            {{ $t("others.no") }}
          </button>
          <button
            type="button"
            class="btn"
            :class="'btn-' + buttonClass"
            @click="confirm"
          >
            {{ $t("others.yes") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      contents: [],
      param: {},
      buttonClass: "danger",
      onConfirm: "",
    };
  },
  methods: {
    show(options) {
      this.title = options.title || "Confirmation";
      this.contents = options.contents || "Are you sure?";
      this.param = options.param || {};
      this.buttonClass = options.buttonClass || "danger";
      this.onConfirm = options.onConfirm;

      const modal = new bootstrap.Modal(this.$refs.confirmationModal);
      modal.show();
    },
    closeModal() {
      const modal = bootstrap.Modal.getInstance(this.$refs.confirmationModal);
      modal.hide();
    },
    confirm() {
      this.closeModal();
      this.onConfirm(this.param);
    },
  },
};
</script>

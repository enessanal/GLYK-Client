<template>
  <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
    <div
      id="liveToast"
      class="toast fade"
      :class="'bg-' + type"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <i class="bi me-2" :class="'bi-' + icon"></i>
        <strong class="me-auto">{{ title }}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" :class="'text-' + text">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      type: "info",
      text: "black",
      icon: "bi-info-circle-fill",
    };
  },
  methods: {
    show(title, content, type, duration = 1000) {
      this.title = title;
      this.content = content;
      this.type = type;

      if (type === "danger" || type === "success") this.text = "white";

      if (type === "success") this.icon = "check-circle-fill";
      if (type === "danger") this.icon = "exclamation-diamond-fill";
      if (type === "warning") this.icon = "exclamation-circle";

      const myToastEl = document.getElementById("liveToast");
      const myToast = new bootstrap.Toast(myToastEl, {
        delay: duration,
        animation: true,
      });
      myToast.show();
    },
  },
};
</script>

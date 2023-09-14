<template>
  <i
  data-bs-toggle="tooltip"
  data-bs-placement="bottom"
    class="bi"
    :class="['bi-' + icon, 'text-' + color]"
    @click="call(param)"
    :title="title"
  ></i>
</template>
<script>
export default {
  methods: {
    call(param) {
      this.$emit("call", param);
      [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {bootstrap.Tooltip.getInstance(tooltipTriggerEl).hide();});
    },
  },
  props: {
    param: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
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
i {
  cursor: pointer;
  transition: transform 0.2s;
  display: inline-block;
}

i:hover {
  transform: scale(1.5);
}
</style>

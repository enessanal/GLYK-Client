<template>
  <i
    class="bi"
    :class="('bi-' + icon, 'text-' + color)"
    @click="call(param)"
    :title="title"
  ></i>
</template>

<script>
export default {
  methods: {
    call(param) {
      this.$emit("call", param);
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

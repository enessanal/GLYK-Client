<template>
  <i
    class="bi bi-trash-fill icon-action text-danger mx-1"
    @click="call(parameter)"
    :title="title"
  ></i>
</template>

<script>
export default {
  name: "IconTrashFill",
  methods: {
    call(parameter) {
      this.$emit("call", parameter);
    },
  },
  props: {
    object: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.icon-action {
  cursor: pointer;
  transition: transform 0.2s;
  display: inline-block;
}

.icon-action:hover {
  transform: scale(1.5);
}
</style>

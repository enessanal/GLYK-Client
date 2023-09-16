<template>
  <div class="d-flex justify-content-end mt-3" v-if="hasText">
    <button v-if="!isEditing" @click="callEdit" class="btn btn-primary me-2">
      Edit
    </button>
    <button v-if="isEditing" @click="callSave" class="btn btn-success me-2">
      Save
    </button>
    <button
      v-if="isEditing"
      @click="callClearForm"
      class="btn btn-secondary me-2"
    >
      Reset
    </button>
    <button v-if="isEditing" @click="callCancel" class="btn btn-danger">
      Cancel
    </button>
  </div>

  <div class="d-flex justify-content-end mt-3" v-else>
    <button class="btn btn-primary me-2" v-if="!isEditing" @click="callEdit">
      <IconClickable title="" color="white" icon="pencil-fill" />
    </button>

    <button class="btn btn-success me-2" v-if="isEditing" @click="callSave">
      <IconClickable title="" color="white" icon="check-lg" />
    </button>
    <button
      class="btn btn-secondary me-2"
      v-if="isEditing"
      @click="callClearForm"
    >
      <IconClickable title="" color="white" icon="trash" />
    </button>
    <button class="btn btn-danger" v-if="isEditing" @click="callCancel">
      <IconClickable title="" color="white" icon="x-lg" />
    </button>
  </div>
</template>

<script>
import IconClickable from "@/components/other/IconClickable.vue";

export default {
  components: { IconClickable },
  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
    hasText: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    callEdit() {
      this.$emit("edit");
    },
    callSave() {
      this.$emit("save");
    },
    callClearForm() {
      this.$emit("clearForm");
    },
    callCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

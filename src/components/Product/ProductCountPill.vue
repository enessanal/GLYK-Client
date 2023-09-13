<template>
  <CountPill
    :titleKey="titleKey"
    :count="count"
    :divFlex="'flex-row-reverse'"
    :liColor="'primary'"
    :spanColor="'primary'"
  />
</template>

<script>
import CountPill from "@/components/other/CountPill.vue";

export default {
  components: {
    CountPill,
  },
  data() {
    return {
      count: 0,
      titleKey: "products.total",
    };
  },
  methods: {
    async countAll() {
      this.$axios
        .get(`products/count`)
        .then((response) => {
          this.count = response.data;
        })
        .catch((error) => {
          this.count = 0;
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
  },
  async created() {
    this.countAll();
  },
};
</script>

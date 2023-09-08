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
import axios from "axios";
import CountPill from "@/components/other/CountPill.vue";

export default {
  components: {
    CountPill,
  },
  data() {
    return {
      count: 0,
      titleKey: "customers.total",
    };
  },
  methods: {
    async countAll() {
      axios
        .get(`customers/count`)
        .then((response) => {
          this.count = response.data;
        })
        .catch((error) => {
          this.count = 0;
          if (error.response) {
            alert(`Error ${error.response.status}: ${error.response.data}`);
          } else if (error.request) {
            alert("No response from server.");
          } else {
            alert(`Error: ${error.message}`);
          }
        });
    },
  },
  async created() {
    await this.countAll();
  },
};
</script>

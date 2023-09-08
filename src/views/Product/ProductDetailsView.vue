<template>
  <BackButton />

  {{ product }}
</template>

<script>
import BackButton from "@/components/other/BackButton.vue";
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      product: {},
    };
  },
  components: {
    BackButton,
  },
  async created() {
    axios
      .get(`products/id/${this.id}`)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        if (error.response) {
          alert(`Error ${error.response.status}: ${error.response.data}`);
          this.$router.push({ path: "/products" });
        } else if (error.request) {
          alert("No response from server.");
        } else {
          alert(`Error: ${error.message}`);
        }
      });
  },
};
</script>

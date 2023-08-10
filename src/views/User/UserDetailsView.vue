<template>
  <BackButton/>
  <div class="container overflow-auto">
      <h2 class="text-center"><b>User Details ({{ user.username }})</b></h2>
      <h4><b>{{ user.fullName }}</b></h4>
      <p><b>Email:</b> {{ user.email }}</p>
  </div>
</template>




<script>
import BackButton from "@/components/BackButton.vue"

export default{
    data(){
        return {
            id: this.$route.params.id,
            user: {}
        }
    },
    components:
    {
      BackButton
    },
    async created()
    {
      const response = await fetch(`/api/users/${this.id}`);
      const data = await response.json();
      this.user = data;

      if(response.status == 404)
      {
          this.$router.push({ path: '/users'});
      }
    }
}
</script>
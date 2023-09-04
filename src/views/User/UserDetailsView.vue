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
import axios from "axios"

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
      axios.get(`/api/employees/${this.id}`)
      .then(response => 
      {
        this.user = response.data;
      })
      .catch(response => 
      {
        if(response.response.status === 404)
        {
          this.$router.push({ path: '/employees'});
        }
      })
    }
}
</script>
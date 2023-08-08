<template>
    <div class="d-block">
      <div class="d-flex flex-column flex-sm-row justify-content-evenly mb-2">
        <!-- <button class="historyButton redirect" @click="redirect">Redirect</button> -->
        <button class="historyButton back btn btn-secondary" @click="back">&lt; Back</button>
        <!-- <button class="historyButton forward"  @click="forward">Go Forward</button> -->
        </div>
    </div>

  <div class="container overflow-auto">
      <h2 class="text-center"><b>User Details ({{ user.username }})</b></h2>
      <h4><b>{{ user.fullName }}</b></h4>
      <p><b>Email:</b> {{ user.email }}</p>
  </div>
</template>




<script>
export default{
    data(){
        return {
            id: this.$route.params.id,
            user: {}
        }
    },
    methods:{
      back()
      {
        this.$router.go(-1);
      },
    // redirect() 
    // {
    //   this.$router.push({name: "HomeView"})
    // },
    // forward()
    // {
    //   this.$router.go(1);
    // }
  },
  async created()
  {
    const response = await fetch(`/api/users/${this.id}`);
    const data = await response.json();
    this.user = data;
  }

}
</script>




<style>

.historyButton
{
  border: none;
  border-radius: 4px;
  padding:10px;
  font-weight: bold;
}
/* 

.redirect:hover
{
  background-color: #046ed8 ;
  color:aliceblue
}*/
 .back:hover
{
  background-color: #c20606 ;
  color:azure;
} 
/*.forward:hover
{
  background-color: #00e096 ;
  color:beige
} */
</style>
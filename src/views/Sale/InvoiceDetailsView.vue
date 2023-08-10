<template>
    <div class="d-block">
      <div class="d-flex flex-column flex-sm-row justify-content-evenly mb-2">
        <button class="historyButton back btn btn-secondary" @click="back">&lt; Back</button>
        </div>
    </div>

  <div class="container overflow-auto">
      <h2 class="text-center"><b>Invoice ({{ invoice?.customerDetails?.fullName }})</b></h2>
        {{ invoice }}

  </div>
</template>




<script>
export default{
    data(){
        return {
            id: this.$route.params.id,
            invoice: {}
        }
    },
    methods:{
      back()
      {
        this.$router.go(-1);
      }
  },
  async created()
  {
    const response = await fetch(`/api/invoices/${this.id}`);
    const data = await response.json();
    this.invoice = data;
    if(response.status == 404)
    {
        this.$router.push({ path: '/invoices'});
    }
  }

}
</script>




<style scoped>
.historyButton
{
  border: none;
  border-radius: 4px;
  padding:10px;
  font-weight: bold;
}

.back:hover
{
  background-color: #c20606 ;
  color:azure;
}
</style>
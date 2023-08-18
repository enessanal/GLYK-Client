<template>

  <BackButton/>

  <div class="container overflow-auto">
      <h2 class="text-center"><b>Invoice ({{ invoice?.customerDetails?.fullName }})</b></h2>
        {{ invoice }}

  </div>
</template>




<script>
import BackButton from "@/components/BackButton.vue"

export default{
    data(){
        return {
            id: this.$route.params.id,
            invoice: {}
        }
    },
    components:
    {
      BackButton
    },
  async created()
  {
    const response = await fetch(`/api/invoices/${this.id}`);
    const data = await response.json();
    this.invoice = data;
    if(response.status == 404)
    {
      
      alert("Invoice not found!")
      this.$router.push({ path: '/invoices'});
    }
  }

}
</script>
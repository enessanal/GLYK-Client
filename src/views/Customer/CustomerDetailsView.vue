<template>
    <BackButton/>
    <div class="container overflow-auto">
        <h2 class="text-center"><b>{{ customer.fullName }} ({{ customer.accountCode }})</b></h2>
        
        <div class="table-responsive">
            <table class="table table-hover">
                <tr>
                    <th>İdentitiy Number</th>
                    <td>{{ customer.identityNumber }}</td>
                </tr>

                <tr>
                    <th>Email</th>
                    <td>{{ customer.email }}</td>
                </tr>
import CustomerListViewVue from "./CustomerListView.vue"

                <tr>
                    <th>Created Time</th>
                    <td>{{ customer.createdTime }}</td>
                </tr>
                
                <tr>
                    <th>Last Updated Time</th>
                    <td>{{ customer.updatedTime }}</td>
                </tr>
                
                <tr>
                    <th>Customer Details/Notes</th>
                    <td>{{ customer.details }}</td>
                </tr>
            </table>
        </div>
        <p class="lead">Müşteriler max 3 adrese sahip olabilecekler ve adres adları ve içerikleri burada sıralanacak. 
            Ayrıca sözleşmedeki teslimat adresi de o sözleşmeye özgü olacak. Sonradan müşteri ve adresleri değiştirilse bile sözleşme değişmeyecek.
        Ve benzer şekilde; sözleşme teslimat adresi müşteri adresleri içinden de getirilebilecek.
    
    
        Adresler için Accordions kulanılabilir.
        Home altında genel istatisliker konulacak. Customer count, product, user...
    </p>
        <!-- <p class="lead"></p> -->
        <div class="mb-3">
            <label for="address" class="form-label fw-bold">Müşteri Adresi</label>
            <textarea class="form-control" id="address" disabled style="resize:none">{{ customer.address }}</textarea>
        </div>

        <div class="mb-3">
            <label for="deliveryAddress" class="form-label fw-bold">Teslim Adresi</label>
            <textarea class="form-control" id="deliveryAddress" disabled>{{ customer.deliveryAddress }}</textarea>
        </div>

    </div>
  </template>





<script>
import BackButton from "@/components/BackButton.vue"
import axios from "axios"

export default{
    data(){
        return {
            id: this.$route.params.id,
            customer: {}
        }
    },
    components:
    {
      BackButton
    },
    async created()
    {
      axios.get(`http://localhost:8080/api/v1/customers/id/${this.id}`)
      .then(response => 
      {
        console.log(response)
        this.customer = response.data;
      })
      .catch(response => 
      {
        if(response.response.status === 404)
        {
            alert("Customer not found!")
            this.$router.push({ path: '/customers'});
        }
      })
    }
}
</script>
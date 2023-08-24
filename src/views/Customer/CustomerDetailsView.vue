<template>
    <BackButton/>
    <div class="container overflow-auto">
        <h2 class="text-center"><b>{{ customer.fullName }} ({{ customer.code }})</b></h2>
        
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
       


        <!-- <h2>Customer Adresses</h2>
        <hr>

        <div class="mb-3" v-for="(address, index) in customer.addresses">
            
            <h3>{{ index+1 }} - {{ address.name }}</h3>
            <h4>{{ address.district }} / {{ address.city }}</h4>



            <label for="address" class="form-label fw-bold">Details: </label>
            <textarea class="form-control" id="addressDetails" disabled style="resize:none">{{ address.details + " "+address.district+"/"+address.city}}</textarea>
        </div> -->

    </div>


    <div class="accordion my-3" :id="'accordion'+index" v-for="(address, index) in customer.addresses">
        <div class="accordion-item" >
            <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+ index" aria-expanded="false" aria-controls="collapseTwo">
                <strong>{{ address.name }} <small>({{ address.district}} / {{ address.city  }})</small></strong> 
            </button>
            </h2>
            <div :id="'collapse' + index" class="accordion-collapse collapse" aria-labelledby="headingTwo" :data-bs-parent="'#accordion'+index">
                <div class="accordion-body">
                    {{ address.details }}
                    <br><br>
                    <strong>{{ address.district}} / {{ address.city  }}</strong>
                </div>
            </div>
        </div>
    </div>








  </template>





<script>
import BackButton from "@/components/BackButton.vue"
import axios from "axios"

export default{
    data()
    {
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
      axios.get(`customers/id/${this.id}`)
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
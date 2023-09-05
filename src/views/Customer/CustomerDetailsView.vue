<template>
    <BackButton/>
    <div class="container overflow-auto">
        <h2 class="text-center"><b>{{ customer.fullName }} ({{ customer.code }})</b></h2>
        
        <div class="table-responsive">
            <table class="table table-hover">
                <tr>
                    <th>{{ $t("customers.table.columns.identityNumber") }}</th>
                    <td>{{ customer.identityNumber }}</td>
                </tr>

                <tr>
                    <th>{{ $t("customers.table.columns.email") }}</th>
                    <td>{{ customer.email }}</td>
                </tr>

                <tr>
                    <th>{{ $t("customers.table.columns.createdTime") }}</th>
                    <td>{{ customer.createdTime }}</td>
                </tr>
                
                <tr>
                    <th>{{ $t("customers.table.columns.updatedTime") }}</th>
                    <td>{{ customer.updatedTime }}</td>
                </tr>
                
                <tr>
                    <th>{{ $t("customers.table.columns.details") }}</th>
                    <td>{{ customer.details }}</td>
                </tr>
            </table>
        </div>
    </div>
    <hr>
    <div class="text-center">
        <h3>{{ $t('customers.addresses') }}</h3>
        
        <div v-if="customer.addresses?.length==0">
            <p class="lead text-warning">{{ $t("customers.messages.noAddress") }}</p>
            <button class="btn btn-success">{{ $t("customers.button.addAddress") }}</button>
        </div>
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
                <button class="btn btn-danger mb-1">Delete</button>
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
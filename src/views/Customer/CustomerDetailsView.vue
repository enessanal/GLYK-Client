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
            <p class="lead text-secondary">{{ $t("customers.messages.noAddress") }}</p>
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
                    <p class="lead wrap-text">{{ address.details }}</p>
                    <p class="lead wrap-text">{{ address.district}} / {{ address.city }}</p>
                </div>
                <div class="d-flex justify-content-around justify-content-sm-end flex-wrap bd-highlight m-1">
                    <button class="btn btn-primary">Update</button> 
                    <button class="btn btn-danger mx-1" @click="promptDelete(address)">Delete</button>
                </div>
            </div>
        </div>
    </div>



    <ModalConfirmation
    ref="confirmModal"
    :title="modalTitle"
    :contents="modalContents"
    :onConfirm="deleteCustomerAddress"
    :param="selectedAddress"
    :buttonClass="'danger'"
  />




  </template>



<script>
import BackButton from "@/components/other/BackButton.vue"
import axios from "axios"
import ModalConfirmation from '@/components/other/ModalConfirmation.vue';


export default{
    data()
    {
        return {
            id: this.$route.params.id,
            customer: {},


            modalTitle:"",
            modalContents:[],
            selectedAddress:null,

        }
    },
    components:
    {
      BackButton,
      ModalConfirmation
    },
    methods:
    {
        promptDelete(address) 
        {   
            this.selectedAddress = address;
            
            this.modalContents = [];
            this.modalTitle = this.$t("customers.messages.addressDeleteTitle")
            this.modalContents.push(`(${address.name})`);
            this.modalContents.push(this.$t("others.confirmDelete"));
            this.$refs.confirmModal.show();
        },


        async getCustomerAddresses()
        {
            axios.get(`customers/id/${this.customer.id}/addresses`)
            .then(response => 
            {
                this.customer.addresses=response.data;
            })
            .catch(axiosError => 
            {
                alert(axiosError.message);
            })
        },


        async deleteCustomerAddress(address)
        {
            axios.delete(`customers/id/${this.customer.id}/addresses/${address.id}`)
            .then(response => 
            {
                if(response.status === 204)
                {
                    this.getCustomerAddresses();
                }
            })
            .catch(axiosError => 
            {
                alert(axiosError.message);
            })
        } 
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
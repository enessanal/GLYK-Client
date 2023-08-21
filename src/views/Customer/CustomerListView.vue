<template>
    <h1 class="mb-3">Customers</h1>
    
    <div class="d-flex flex-row-reverse bd-highlight">
        <li class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
            <span class="me-3">Total Customers </span><span class="badge bg-primary rounded-pill">{{ count }}</span>
        </li>
    </div>

    <div class="alert alert-dismissible alert-danger mt-2" v-if="error">
        <strong>{{errorMessage}}</strong>
    </div>

    <div class="table-responsive" v-if="customers.length > 0">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">TC</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile Phone</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(customer, index) in customers" :key="customer?.id">
                    <th scope="row">{{index+1}}</th>
                    <td>{{ customer?.code }} </td>
                    <td>{{ customer?.fullName }} </td>
                    <td>{{ customer?.identityNumber}} </td>
                    <td>{{ customer?.email }} </td>
                    <td>{{ customer?.mobilePhone }} </td>
                    <td class="text-center">
                        <i class="bi bi-trash-fill icon-action text-danger mx-1" @click="confirmDelete(customer)" title="Delete"></i>
                        <router-link :to="{name:'CustomerDetailsView', params:{id: customer.id}}"><i class="bi bi-info-square-fill icon-action" title="Details"></i></router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>



</template>


<script>
import axios from "axios"
    export default
    {
        data()
        {
            return{
                
                customers : [],
                count:0,
                error:false,
                errorMessage:""
            }
        },
        methods:
        {
            async getCustomers()
            {
                axios.get(`http://127.0.0.1:8080/api/v1/customers`)
                .then(response => 
                {
                    console.log(response.data)
                    this.customers = response.data.content;
                })
                .catch(axiosError => 
                {
                    // alert(axiosError.message);
                    this.customers = [];
                    this.error=true;
                    this.errorMessage=axiosError.message;
                })
            },
            
            async countCustomers()
            {
                axios.get(`http://127.0.0.1:8080/api/v1/customers/count`)
                .then(response => 
                {
                    this.count = response.data;
                })
                .catch(axiosError => 
                {
                    alert(axiosError.message);
                    this.count = 0;
                })
            },
            async deleteCustomer(id)
            {
                axios.delete(`http://127.0.0.1:8080/api/v1/customers/id/${id}`)
                .then(response => 
                {
                    if(response.status === 204)
                    {
                        this.getCustomers();
                        this.countCustomers();
                    }
                })
                .catch(axiosError => 
                {
                    alert(axiosError.message);
                })
            },
            confirmDelete(customer)
            {
                if(confirm(`Are you sure you want to remove "${customer.fullName} (${customer.identityNumber})" ?`))
                {
                    this.deleteCustomer(customer.id);
                }
            }
        },
        async created()
        {
            this.getCustomers();
            this.countCustomers();
        }
    }
</script>


<style scoped>

.icon-action 
{
    cursor: pointer;
    transition: transform .2s;
    display: inline-block;
}

.icon-action:hover
{
    transform: scale(1.5);
}

</style>
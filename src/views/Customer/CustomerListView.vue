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

    <div class="table-responsive" v-if="customers?.length > 0">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                
                    <th scope="col" v-for="column in columns"><span class="clickable"  @click="sortTable(column.name)" :class="{ 'sort-asc': sortBy === column.name && sortOrder === 'asc', 'sort-desc': sortBy === column.name && sortOrder === 'desc' }">{{column.display}}</span></th>

                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(customer, index) in customers" :key="customer?.id">
                    <th scope="row">{{page.pageable.offset + index+1}}</th>
                    
                    <td v-for="column in columns">{{ customer[column.name] }}</td>

                    <td class="text-center">
                        <i class="bi bi-trash-fill icon-action text-danger mx-1" @click="confirmDelete(customer)" title="Delete"></i>
                        <router-link :to="{name:'CustomerDetailsView', params:{id: customer.id}}"><i class="bi bi-info-square-fill icon-action" title="Details"></i></router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>



    
    <div class="d-flex justify-content-between prevent-select">
        <div class="d-inline-flex">
            <select class="form-select" v-model="page.size" @change="getCustomers(1)">
                <option disabled value="">Page Size</option>
                <option v-for="size in sizes" :value="size">{{size}}</option>
            </select>
        </div>
        <div class="d-inline-flex">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-end">
                    <li class="page-item" :class="{ 'disabled': this.page?.number === 0 }">
                        <a class="page-link" href="#" @click="getCustomers(this.page?.number)">&laquo;</a>
                    </li>

                    <li class="page-item" :class="{ 'active': pageNumber === this.page?.number+1 }" v-for="pageNumber in this.page?.totalPages">
                        <a class='page-link' href="#" @click="getCustomers(pageNumber)">{{ pageNumber }} </a>
                    </li>
                    
                    <li class="page-item" :class="{ 'disabled': this.page?.number === this.page?.totalPages-1 }">
                        <a class="page-link" href="#" @click="getCustomers(this.page?.number+2)">&raquo;</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>


   





</template>


<script>
import axios from "axios"

    export default
    {
        data()
        {
            return{

                columns:
                [
                    {name:"code", display:"Code"},
                    {name:"fullName", display:"Full Name"},
                    {name:"identityNumber", display:"Tc"},
                    {name:"email", display:"Email"},
                    {name:"mobilePhone", display:"Mobile Phone"}
                ],
                count:0,
                error:false,
                errorMessage:"",
                customers : [],
                page:{},
                sizes:[10,25,50,100],
                sortOrder:"",
                sortBy:""
            }
        },
        methods:
        {
            async sortTable(sortBy)
            {
                if(this.sortBy === sortBy)
                {
                    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
                }
                else
                {
                    this.sortBy = sortBy;
                    this.sortOrder = 'asc';
                }
                this.getCustomers(this.page.number+1);
            },
            async getCustomers(pageNumber)
            {
                this.page.number = pageNumber;

                this.customers=[];
                this.page.totalPages = 1;

                const params = 
                {
                    size: this.page.size,
                    page: this.page.number,
                    sortBy: this.sortBy,
                    direction: this.sortOrder
                }
                console.log("params:");
                console.log(params);

                axios.get(`customers`,{params})
                .then(response => 
                {
                    this.page=response.data;
                    this.customers = this.page.content;
                    
                    this.error = false;

                })
                .catch(axiosError => 
                {
                    this.customers = [];
                    this.error=true;
                    this.errorMessage=axiosError.message;
                })
            },
            
            async countCustomers()
            {
                axios.get(`customers/count`)
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
                axios.delete(`customers/id/${id}`)
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


.sort-asc, .sort-desc
{
    text-decoration: underline;
}


.sort-asc::after 
{
    content: "↑"; /* veya istediğiniz bir Unicode karakteri */
}

.sort-desc::after 
{
    content: "↓"; /* veya istediğiniz bir Unicode karakteri */
}



.clickable
{
    color: cornflowerblue;
}
.clickable:hover
{
    cursor: pointer;
    text-decoration: underline;
}


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

.disabled:hover {
    cursor:not-allowed
 }

</style>
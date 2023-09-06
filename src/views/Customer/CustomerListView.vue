<template>
    <h1 class="mb-3"> {{$t("customers.table.caption")}} </h1>
    
    <CustomerCountPill ref="countPill"/>

    <div class="alert alert-dismissible alert-danger mt-2" v-if="error">
        <strong>{{errorMessage}}</strong>
    </div>

    <div class="table-responsive" v-if="customers?.length > 0">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                
                    <th scope="col" v-for="column in columns">
                        <span class="clickable"  
                        @click="sortTable(column.name)" 
                        :class="{ 'sort-asc': sortBy === column.name && sortOrder === 'asc', 'sort-desc': sortBy === column.name && sortOrder === 'desc' }">
                            {{$t(column.displayKey)}}
                        </span>
                    </th>

                    <th scope="col" class="text-center">{{ $t('customers.table.headers.actions') }}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(customer, index) in customers" :key="customer?.id">
                    <th scope="row">{{page.pageable.offset + index+1}}</th>
                    
                    <td v-for="column in columns">{{ customer[column.name] }}</td>

                    <td class="text-center">
                        <IconTrashFill :object="customer" :title="'Delete'" @call="promptDelete(customer)"></IconTrashFill>
                        <router-link :to="{name:'CustomerDetailsView', params:{id: customer.id}}"><i class="bi bi-info-square-fill icon-action" title="Details"></i></router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <ModalConfirmation
    ref="confirmModal"
    :title="modalTitle"
    :contents="modalContents"
    :onConfirm="deleteCustomer"
    :param="selectedCustomer"
    :buttonClass="'danger'"
  />


    
    <Pagination :page="page" :sizes="sizes" @changePageSize="handleChangePageSize" @clickPageNumber="handleClickPageNumber"/>

</template>


<script>
import axios from "axios"
import Pagination from "@/components/Pagination.vue"
import IconTrashFill from "@/components/IconTrashFill.vue"
import ModalConfirmation from '@/components/ModalConfirmation.vue';
import CustomerCountPill from '@/components/Customer/CustomerCountPill.vue';


export default
{
    components:
    {
        Pagination,
        IconTrashFill,
        ModalConfirmation,
        CustomerCountPill,
    },  
    data()
    {
        return{
            modalTitle: '',
            modalContents:[],
            selectedCustomer: null,


            columns:
            [
                {name:"code",               displayKey:"customers.table.columns.code"},
                {name:"fullName",           displayKey:"customers.table.columns.fullName"},
                {name:"identityNumber",     displayKey:"customers.table.columns.identityNumber"},
                {name:"email",              displayKey:"customers.table.columns.email"},
                {name:"mobilePhone",        displayKey:"customers.table.columns.mobilePhone"}
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
        promptDelete(customer) 
        {   
            this.selectedCustomer = customer;
            
            this.modalContents = [];
            this.modalTitle = this.$t("customers.messages.deleteTitle")
            this.modalContents.push(`(${customer.fullName} - ${customer.identityNumber})`);
            this.modalContents.push(this.$t("others.confirmDelete"));
            this.$refs.confirmModal.show();
        },

        handleChangePageSize()
        {
            this.getCustomers(0);
        },
        handleClickPageNumber(number) 
        {
            this.getCustomers(number);
        },
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
            this.getCustomers(this.page.number);
        },
        async getCustomers(pageNumber)
        {
            this.page.number = pageNumber;

            this.customers=[];
            this.page.totalPages = 1;

            const params = 
            {
                pageSize: this.page.size,
                pageNumber: this.page.number,
                sortBy: this.sortBy,
                direction: this.sortOrder
            }

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
        async deleteCustomer(customer)
        {
            axios.delete(`customers/id/${customer.id}`)
            .then(response => 
            {
                if(response.status === 204)
                {
                    this.getCustomers();
                    this.$refs.countPill.countAll();
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
        this.getCustomers();
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
    content: "↑";
}

.sort-desc::after 
{
    content: "↓";
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

.disabled:hover 
{
    cursor:not-allowed
 }

</style>
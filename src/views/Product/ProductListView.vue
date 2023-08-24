<template>
   
    <h2>Products</h2>

    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                
                    <th scope="col" v-for="column in columns">
                        <span class="clickable"  
                        @click="sortTable(column.name)" 
                        :class="{ 'sort-asc': sortBy === column.name && sortOrder === 'asc', 'sort-desc': sortBy === column.name && sortOrder === 'desc' }">
                            {{column.display}}
                        </span>
                    </th>

                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(product, index) in products" :key="products?.id">
                    <th scope="row">{{page.pageable.offset + index+1}}</th>
                    
                    <td v-for="column in columns">
                        
                        {{ product[column.name].toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
                    
                    </td>

                    <td class="text-center">
                        <IconTrashFill :object="product" :title="'Delete'" @call="confirmDelete"></IconTrashFill>
                        <router-link :to="{name:'ProductDetailsView', params:{id: product.id}}"><i class="bi bi-info-square-fill icon-action" title="Details"></i></router-link>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
    
    <Pagination :page="page" :sizes="sizes" @changePageSize="handleChangePageSize" @clickPageNumber="handleClickPageNumber"/>

</template>


<script>
import axios from "axios";
import Pagination from "@/components/Pagination.vue";
import IconTrashFill from "@/components/IconTrashFill.vue";

export default
{
    components:
    {
        Pagination,
        IconTrashFill
    },

    data()
    {
        return{
            columns:
            [
                {name:"category", display:"Category"},
                {name:"type", display:"Type"},
                {name:"brand", display:"Brand"},
                {name:"name", display:"Name"},
                {name:"code", display:"Code"},
                {name:"size", display:"Size"},
                {name:"listPrice", display:"List Prc."},
                {name:"purchasePrice", display:"Purchase Prc."},
                {name:"cashPrice", display:"Cash Prc."},
                {name:"ccPrice", display:"CC Prc."},
                {name:"lastPrice", display:"Last Prc."},
                {name:"limitPrice", display:"Limit Prc."},
            ],
            products:[],
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
        handleChangePageSize()
        {
            this.getProducts(1);
        },
        handleClickPageNumber(number) 
        {
            this.getProducts(number);
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
            this.getProducts(this.page.number+1);
        },
        async getProducts(pageNumber)
        {
            this.page.number = pageNumber;

            this.products=[];
            this.page.totalPages = 1;

            const params = 
            {
                size: this.page.size,
                page: this.page.number,
                sortBy: this.sortBy,
                direction: this.sortOrder
            }

            axios.get(`products`,{params})
            .then(response => 
            {
                this.page=response.data;
                this.products = this.page.content;
                
                this.error = false;
            })
            .catch(axiosError => 
            {
                this.products = [];
                this.error=true;
                this.errorMessage=axiosError.message;
            })
        },
    },
    async created()
    {
        this.getProducts();
        // this.countCustomers();
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

</style>
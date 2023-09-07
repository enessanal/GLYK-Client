<template>
    <h2>{{ $t('products.table.caption') }}</h2>
    
    <transition name="slide-fade">
        <div class="d-flex bd-highlight flex-row-reverse mb-2" v-if="cartItemCount">
            <router-link :to="{ name: 'CartView' }" class="btn btn-success position-relative btn-sm">
                Sepete Git
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{cartItemCount}}
                </span>
            </router-link>
        </div>
    </transition>


    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                
                    <th scope="col" v-for="column in columns" :class="{'text-center': column.align==='center'}" v-show="column?.show">
                        <span class="clickable"  
                        @click="sortTable(column.filter)" 
                        :class="{ 'sort-asc': sortBy === column.filter && sortOrder === 'asc', 'sort-desc': sortBy === column.filter && sortOrder === 'desc' }">
                            {{$t(column.displayKey)}}
                        </span>
                    </th>

                    <th scope="col" class="text-center">{{ $t('products.table.headers.actions') }}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(product, index) in products" :key="products?.id">
                    <th scope="row">{{page.pageable.offset + index+1}}</th>
                    
                    <td v-for="column in columns" :class="{'text-center': column.align==='center'}" v-show="column?.show">
                        
                        {{ 
                        column.type === "price" 
                        ? 
                        product[column.name].toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                        :
                        product[column.name] 
                        }}
                    
                    </td>

                    <td class="text-center">
                        
                        <button type="button" class="btn btn-danger" v-if="getItemAmount(product)!==0" @click="decreaseItem(product)">
                            <i class="bi bi-dash-circle-fill icon-action" ></i>
                        </button>

                        <button type="button" class="btn btn-success" v-if="getItemAmount(product)===0" @click="addItem(product)">
                            <i class="bi bi-bag-plus-fill icon-action"></i>
                        </button>

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
import ModalConfirmation from '@/components/ModalConfirmation.vue';
import ProductCountPill from '@/components/Product/ProductCountPill.vue'

import { mapGetters, mapActions } from 'vuex'

export default
{
    components:
    {
        Pagination,
        IconTrashFill,
        ModalConfirmation,
        ProductCountPill
    },

    data()
    {
        return{
            columns:[],
            products:[],
            count:0,
            error:false,
            errorMessage:"",
            customers : [],
            page:{},
            sizes:[10,25,50,100],
            sortOrder:"",
            sortBy:"",
        }
    },
    computed:
    {
        ...mapGetters('cart', ['getItemAmount', 'cartItemCount'])
    },
    methods:
    {   
        ...mapActions('cart', ['addItem','decreaseItem']),
    
        handleChangePageSize()
        {
            this.getProducts(0);
        },
        handleClickPageNumber(number) 
        {
            this.getProducts(number);
        },
        async sortTable(sortBy)
        {
            console.log(sortBy)
            if(this.sortBy === sortBy)
            {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            }
            else
            {
                this.sortBy = sortBy;
                this.sortOrder = 'asc';
            }
            this.getProducts(this.page.number);
        },
        async getProducts(pageNumber)
        {
            this.page.number = pageNumber;

            this.products=[];
            this.page.totalPages = 1;

            const params = 
            {
                pageSize: this.page.size,
                pageNumber: this.page.number,
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
        }
    },
    async created()
    {
        this.columns=
            [
                {name:"category",           filter:"category.name",  type:"text",     align:"left",       show:true,    displayKey: 'products.table.columns.category'},
                {name:"type",               filter:"type.name",      type:"text",     align:"left",       show:true,    displayKey:'products.table.columns.type'},
                {name:"brand",              filter:"brand.name",     type:"text",     align:"left",       show:true,    displayKey:'products.table.columns.brand'},
                {name:"name",               filter:"name",           type:"text",     align:"left",       show:true,    displayKey:'products.table.columns.name'},
                {name:"code",               filter:"code",           type:"text",     align:"left",       show:true,    displayKey:'products.table.columns.code'},
                {name:"size",               filter:"size.name",      type:"text",     align:"center",     show:false,    displayKey:'products.table.columns.size'},
                {name:"listPrice",          filter:"listPrice",      type:"price",    align:"center",     show:false,    displayKey:'products.table.columns.listPrice'},
                {name:"purchasePrice",      filter:"purchasePrice",  type:"price",    align:"center",     show:false,    displayKey:'products.table.columns.purchasePrice'},
                {name:"cashPrice",          filter:"cashPrice",      type:"price",    align:"center",     show:true,    displayKey:'products.table.columns.cashPrice'},
                {name:"ccPrice",            filter:"ccPrice",        type:"price",    align:"center",     show:false,    displayKey:'products.table.columns.ccPrice'},
                {name:"lastPrice",          filter:"lastPrice",      type:"price",    align:"center",     show:false,    displayKey:'products.table.columns.lastPrice'},
                {name:"limitPrice",         filter:"limitPrice",     type:"price",    align:"center",     show:false,    displayKey:'products.table.columns.limitPrice'},
                {name:"stock",              filter:"stock",          type:"number",   align:"center",     show:false,    displayKey:'products.table.columns.stock'},
            ],
        this.getProducts();
    }
}

</script>




<style scoped>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
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











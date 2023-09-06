<template>
   
    <h2>{{ $t('products.table.caption') }}</h2>

    
    <ProductCountPill ref="countPill"/>



    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                
                    <th scope="col" v-for="column in columns" :class="{'text-center': column.align==='center'}">
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
                    
                    <td v-for="column in columns" :class="{'text-center': column.align==='center'}">
                        
                        {{ 
                        column.type === "price" 
                        ? 
                        product[column.name].toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                        :
                        product[column.name] 
                        }}
                    
                    </td>

                    <td class="text-center">
                        <IconTrashFill :object="product" :title="'Delete'" @call="promptDelete(product)"></IconTrashFill>
                        <router-link :to="{name:'ProductDetailsView', params:{id: product.id}}"><i class="bi bi-info-square-fill icon-action" title="Details"></i></router-link>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
    
    <ModalConfirmation
    ref="confirmModal"
    :title="modalTitle"
    :contents="modalContents"
    :onConfirm="deleteProduct"
    :param="selectedProduct"
    :buttonClass="'danger'"
  />
    <Pagination :page="page" :sizes="sizes" @changePageSize="handleChangePageSize" @clickPageNumber="handleClickPageNumber"/>

</template>


<script>
import axios from "axios";
import Pagination from "@/components/Pagination.vue";
import IconTrashFill from "@/components/IconTrashFill.vue";
import ModalConfirmation from '@/components/ModalConfirmation.vue';
import ProductCountPill from '@/components/Product/ProductCountPill.vue'


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

            modalTitle: '',
            modalContents:[],
            selectedProduct: null,
        }
    },
    methods:
    {       
        promptDelete(product) 
        {   
            this.selectedProduct = product;
            
            this.modalContents = [];
            this.modalTitle = this.$t("products.messages.deleteTitle")
            this.modalContents.push(`(${product.name} - ${product.code})`);
            this.modalContents.push(this.$t("others.confirmDelete"));
            this.$refs.confirmModal.show();
        },

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
        },
        async deleteProduct(product)
        {
            axios.delete(`products/id/${product.id}`)
            .then(response => 
            {
                if(response.status === 204)
                {
                    this.getProducts();
                    this.$refs.countPill.countAll();
                }
            })
            .catch(axiosError => 
            {
                alert(axiosError.message);
            })
        },
        confirmDelete(product)
        {
            if(confirm(`${this.$t("others.confirmDelete")} "${product.name} (${product.code})" ?`))
            {
                this.deleteProduct(product.id);
            }
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
                {name:"size",               filter:"size.name",      type:"text",     align:"center",     show:true,    displayKey:'products.table.columns.size'},
                {name:"listPrice",          filter:"listPrice",      type:"price",    align:"center",     show:true,    displayKey:'products.table.columns.listPrice'},
                {name:"purchasePrice",      filter:"purchasePrice",  type:"price",    align:"center",     show:true,    displayKey:'products.table.columns.purchasePrice'},
                {name:"cashPrice",          filter:"cashPrice",      type:"price",    align:"center",     show:true,    displayKey:'products.table.columns.cashPrice'},
                {name:"ccPrice",            filter:"ccPrice",        type:"price",    align:"center",     show:true,    displayKey:'products.table.columns.ccPrice'},
                {name:"lastPrice",          filter:"lastPrice",      type:"price",    align:"center",     show:true,    displayKey:'products.table.columns.lastPrice'},
                {name:"limitPrice",         filter:"limitPrice",     type:"price",    align:"center",     show:true,    displayKey:'products.table.columns.limitPrice'},
                {name:"stock",              filter:"stock",          type:"number",   align:"center",     show:true,    displayKey:'products.table.columns.stock'},
            ],
        this.getProducts();
    }
}

</script>




<style scoped>

table {
 font-size: 75%;
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
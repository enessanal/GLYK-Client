<template>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" v-for="column in columns" :class="{'text-center': column.align==='center'}" v-show="column?.show">
                        <span> {{$t(column.displayKey)}} </span>
                    </th>
                    <th scope="col" class="text-center">{{ $t('products.table.headers.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items">
                    <th scope="row">{{index+1}}</th>
                    
                    <td v-for="column in columns" :class="{'text-center': column.align=='center'}" v-show="column?.show">
                        {{
                            column.type === "price" 
                        ? 
                            (
                                column.isProductKey
                                ?  
                                item.product[column.name].toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                                :
                                item[column.name].toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                            )
                        :
                        (
                            column.isProductKey
                            ?  
                            item.product[column.name]
                            :
                            item[column.name]
                        )
                        }}
                    
                    </td>

                    <td class="text-center">
                        
                        <!-- <button type="button" class="btn btn-danger" v-if="getItemAmount(product)!==0" @click="decreaseItem(product)">
                            <i class="bi bi-dash-circle-fill icon-action" ></i>
                        </button>

                        <button type="button" class="btn btn-success" v-if="getItemAmount(product)===0" @click="addItem(product)">
                            <i class="bi bi-bag-plus-fill icon-action"></i>
                        </button> -->

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>



<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'

export default
{
    data()
    {
        return{
            cart:{},

            columns:
            [
                {name:"category",         type:"text",     align:"left",       show:false,  isProductKey:true,  displayKey: 'products.table.columns.category'},
                {name:"type",             type:"text",     align:"left",       show:true,  isProductKey:true,  displayKey:'products.table.columns.type'},
                {name:"brand",            type:"text",     align:"left",       show:true,  isProductKey:true,  displayKey:'products.table.columns.brand'},
                {name:"name",             type:"text",     align:"left",       show:true,  isProductKey:true,  displayKey:'products.table.columns.name'},
                {name:"code",             type:"text",     align:"left",       show:true,  isProductKey:true,  displayKey:'products.table.columns.code'},
                {name:"amount",           type:"number",   align:"center",     show:true,  isProductKey:false,  displayKey:'products.table.columns.amount' }, 
                {name:"deliveryDate",     type:"date",     align:"center",     show:true,  isProductKey:false,  displayKey:'products.table.columns.deliveryDate' }, 
                {name:"size",             type:"text",     align:"center",     show:true,  isProductKey:true,  displayKey:'products.table.columns.size'},
                {name:"cashPrice",        type:"price",    align:"center",     show:true,  isProductKey:true,  displayKey:'products.table.columns.cashPrice'},
                {name:"ccPrice",          type:"price",    align:"center",     show:true,  isProductKey:true,  displayKey:'products.table.columns.ccPrice'},
                {name:"lastPrice",        type:"price",    align:"center",     show:true,  isProductKey:true,  displayKey:'products.table.columns.lastPrice'},
                {name:"limitPrice",       type:"price",    align:"center",     show:true,  isProductKey:true,  displayKey:'products.table.columns.limitPrice'},
            ],

            items:
            [
                {product:{}, amount:0, salePrice:0, deliveryDate:""}
            ]
        }
    },
    computed:
    {
        ...mapGetters('cart', ['cartItems']),
    },
    watch:
    {
        
    },
    methods:
    {
        ...mapActions('cart', ["removeItem"]),

        async fetchCartProducts()
        { 
            this.items=[];
            const params = 
            {
                ids: this.cartItems.map(item => item.id).join(','),
            }

            axios.get('products/ids', {params})
            .then(response => 
            {   
                const products = response.data;

                this.cartItems.forEach(item => 
                {
                    const matchedProduct = products.find(product => product.id === item.id);
                    if (matchedProduct) 
                    {
                        this.items.push({product:matchedProduct, amount:item.amount, salePrice: item.salePrice, deliveryDate: item.deliveryDate } )
                    }
                    else
                    {
                        this.removeItem(item);
                    }
                });
                








                
            })
            .catch(error => 
            {
                if (error.response) 
                {
                    alert(`Error ${error.response.status}: ${error.response.data}`);
                } 
                else if (error.request) 
                {
                    alert('No response from server.');
                } 
                else 
                {
                    alert(`Error: ${error.message}`);
                }
            });
        }
    },
    async created()
    {
        this.fetchCartProducts();
    },
    mounted()
    {
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {return new bootstrap.Tooltip(tooltipTriggerEl)})
    }

}

</script>




<style scoped>





/* 
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

#clearBtn
{
    transition: transform .1s;
}

#clearBtn:hover
{
    transform: scale(1.5);
}

tbody
{
    font-size: 1rem;
}

td 
{
    vertical-align: middle;
}

td[contenteditable="true"] 
{
    background-color: rgba(255, 253, 127, 0.293);
}


td[contenteditable="true"]:hover 
{
    cursor:cell;
}

td[contenteditable="true"]:focus 
{
    background-color: rgba(204, 255, 0, 0.422);
    border-style: dotted;
    cursor: text;
} */

</style>
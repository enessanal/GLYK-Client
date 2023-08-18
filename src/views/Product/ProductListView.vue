<template>
    <h2>Products</h2>
    
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Group</th>
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Size</th>
                    <th scope="col">purchasePrice</th>
                    <th scope="col" class="text-center" >Amount</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(product, index) in products" :key="product.id">
                    <th scope="row">{{index+1}}</th>
                    <td>{{ product.brand.name }} </td>
                    <td>{{ product.type }} </td>
                    <td>{{ product.name }} </td>
                    <td>{{ product.code }} </td>
                    <td>{{ product.size }} </td>
                    <td>{{ product.purchasePrice.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} </td>
                    <!-- <td class="text-center"><b>{{ product.amount }}</b> </td>
                    <td class="text-center">{{ (product.amount*product.prices.inAdvance).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}}</td>
                    <td class="text-center">{{ (product.amount*product.prices.creditCard).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} </td>
                    <td class="text-center">{{ (product.amount*product.prices.last).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} </td>
                    <td class="text-center">{{ product.prices.sale.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} </td>
                    <td class="text-center"> -->
                       
                        <!-- <i 
                            v-if="product.amount === 1" 
                            class="bi bi-trash-fill icon-action text-danger" 
                            @click="decreaseAmount(product)" 
                            title="Remove Product">
                        </i>
                        <i 
                            v-else 
                            class="bi bi-dash-circle-fill icon-action text-danger" 
                            @click="decreaseAmount(product)" 
                            title="Decrease Amount">
                        </i>
                        <i 
                        class="bi bi-plus-circle-fill icon-action text-success mx-1" 
                            @click="increaseAmount(product)" 
                            title="Increase Amount">
                        </i> -->
                    <!-- </td> -->
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <!-- <td class="text-center fw-bold">{{ cart.products?.reduce((accumulator, product) => {return accumulator + product.amount},0)}}</td>
                    <td class="text-center fw-bold">{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.inAdvance},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</td>
                    <td class="text-center fw-bold">{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.creditCard},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</td>
                    <td class="text-center fw-bold">{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.last},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</td>
                    <td class="text-center fw-bold" :contenteditable="cart?.products?.length>0"  ref="editableCell" @keydown="validateInput" @paste="handlePaste" @blur="updateTotalPrice" @focus="prepareEdit">{{ totalPriceFormatted }}</td>
                    <td class="text-center fw-bold"><button id="clearBtn" class="btn btn-danger btn-sm" ref="clearButton" @click="empty()"  :disabled="!cart?.products?.length" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Clear All"><i class="bi bi-trash3-fill"></i></button></td> -->
                </tr>
            </tbody>
        </table>
    </div>
    

</template>


<script>
import axios from "axios";
export default
{
    data()
    {
        return{

            products:[],
            pagination: {}
        }
    },
    async created()
    {
        axios.get(`/api/products`)
        .then(response => 
        {
            this.products = response.data.data;
            // this.pagination = response.data.pagination;
        })
        .catch(axiosError => 
        {
            alert(axiosError.message);
        })
    }
}

</script>
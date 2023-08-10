<template>
   <div class="text-center">
       <h2>Cart</h2>
   </div>


    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Size</th>
                    <th scope="col">Group</th>
                    <th scope="col" class="text-center" >Amount</th>
                    <th scope="col">In Advance</th>
                    <th scope="col">Credit Card</th>
                    <th scope="col">Last Price</th>
                    <th scope="col">Sale Price</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(product, index) in cart.products" :key="product.id">
                    <th scope="row">{{index+1}}</th>
                    <td>{{ product.brand }} </td>
                    <td>{{ product.code }} </td>
                    <td>{{ product.name }} </td>
                    <td>{{ product.size }} </td>
                    <td>{{ product.group }} </td>
                    <td class="text-center"><b>{{ product.amount }}</b> </td>
                    <td class="text-center">{{ (product.amount*product.prices.inAdvance).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}}</td>
                    <td class="text-center">{{ (product.amount*product.prices.creditCard).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} </td>
                    <td class="text-center">{{ (product.amount*product.prices.last).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} </td>
                    <td class="text-center">{{ product.prices.sale.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} </td>
                    <td class="text-center">
                        <button class="btn btn-danger btn-sm mx-1" @click="decreaseAmount(product)"><i class="bi bi-dash-circle-fill"></i></button>
                        <button class="btn btn-success btn-sm mx-1" @click="increaseAmount(product)"><i class="bi bi-plus-circle-fill"></i></button>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-center"><b>{{ cart.products?.reduce((accumulator, product) => {return accumulator + product.amount},0)}}</b></td>
                    <td class="text-center"><b>{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.inAdvance},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</b></td>
                    <td class="text-center"><b>{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.creditCard},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</b></td>
                    <td class="text-center"><b>{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.last},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</b></td>
                    <!-- <td class="text-center"><b contenteditable="true">{{totalPrice.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</b></td> -->
                    <!-- <td class="text-center"><b contenteditable="true" ref="editableCell" @input="updateTotalPrice">{{ totalPriceFormatted }}</b></td> -->
                    <td class="text-center bg-warning"><b contenteditable="true" ref="editableCell" 
                        @keydown="validateInput" 
                        @paste="handlePaste"
                        @blur="updateTotalPrice"
                        >{{ totalPriceFormatted }}</b></td>
                    
                </tr>
            </tbody>



        </table>


    </div>


</template>



<script>
    export default
    {
        data()
        {
            return{
                cart:{},
                totalPrice:0
            }
        },
        methods:
        {
            increaseAmount(product)
            {
                product.amount ++;
            },
            decreaseAmount(product)
            {
                if(product.amount==1)
                {
                    var removeOk = confirm(`Are you sure you want to remove ${product.name}`);
                    if(removeOk)
                    {
                        const index = this.cart.products.indexOf(product);
                        this.cart.products.splice(index, 1);
                    }
                }
                else
                {
                    product.amount --;
                }
            },
            handlePaste(event) 
            {
                event.preventDefault();
            },
            validateInput(event) 
            {
                const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight','0','1','2','3','4','5','6','7','8','9'];
                const input = event.key;

                if(input == 'Enter')
                {
                    event.preventDefault();
                    this.$refs.editableCell.blur();
                }
            

                if(!allowedKeys.includes(input) || this.totalPriceFormatted.length >= 15)
                {
                    event.preventDefault();
                }
            },
            updateTotalPrice(event) 
            {
                let newValue = parseFloat(event.target.innerText.replace(/[.]/g, '').replace(',', '.')) || 0;
                this.totalPrice = newValue;
            },
            calculateSalePrices()
            {
                let totalInAdvence = (this.cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.inAdvance},0));
                for(let product in this.cart.products)
                {
                    this.cart.products[product].prices.sale = (this.cart.products[product].prices.inAdvance/totalInAdvence)*this.totalPrice;
                }
            }
        },
        computed:
        {
            totalPriceFormatted() 
            { 
                return this.totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2});
            } 
        },
        watch:
        {
            totalPrice:function()
            {
                this.calculateSalePrices();
            }
        },
        async created()
        {
            const response = await fetch("/api/cart");
            const data = await response.json();
            this.cart = data;

            let totalInAdvence = (this.cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.inAdvance},0));
            this.totalPrice = totalInAdvence*1.25;
            this.calculateSalePrices();

        }
    }
</script>
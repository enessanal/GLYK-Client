<template>
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
                       <!-- Eğer ürün miktarı 1 ise trash iconunu göster -->
                        <i 
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
                        </i>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-center fw-bold">{{ cart.products?.reduce((accumulator, product) => {return accumulator + product.amount},0)}}</td>
                    <td class="text-center fw-bold">{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.inAdvance},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</td>
                    <td class="text-center fw-bold">{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.creditCard},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</td>
                    <td class="text-center fw-bold">{{ (cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.last},0))?.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</td>
                    <td class="text-center fw-bold" :contenteditable="cart?.products?.length>0"  ref="editableCell" @keydown="validateInput" @paste="handlePaste" @blur="updateTotalPrice" @focus="prepareEdit">{{ totalPriceFormatted }}</td>
                    <td class="text-center fw-bold"><button id="clearBtn" class="btn btn-danger btn-sm" ref="clearButton" @click="empty()"   data-bs-toggle="tooltip" data-bs-placement="bottom" title="Clear All"><i class="bi bi-trash3-fill"></i></button></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><small><i>({{ difference.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }})</i></small></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>



<script>
    export default
    {
        name: "CartProductTable",
        props: [],
        data()
        {
            return{
                cart:{},
                totalPrice:0,
                difference:0
            }
        },
        methods:
        {
            increaseAmount(product)
            {
                product.amount ++;
                this.generateTotalSalePrice();
            },
            decreaseAmount(product)
            {
                product.amount --;
                
                if(product.amount == 0 && confirm(`Are you sure you want to remove ${product.name}`))
                {
                    const index = this.cart.products.indexOf(product);
                    this.cart.products.splice(index, 1);
                }
                else if(product.amount == 0)
                {
                    product.amount=1;
                }
                this.generateTotalSalePrice();

            },
            empty()
            {
                var removeOk = confirm(`Are you sure you want to remove all?`);
                if(removeOk)
                {
                    this.cart.products=[];
                    this.generateTotalSalePrice();
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
                this.totalPrice = this.customRound(newValue);
                event.target.innerText=this.totalPriceFormatted;
            },
            generateTotalSalePrice()
            {
                let totalInAdvence = (this.cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.inAdvance},0));
                this.totalPrice = this.customRound(totalInAdvence*1.25);
            },
            calculateSalePrices()
            {
                let totalInAdvence = (this.cart.products?.reduce((accumulator, product) => {return accumulator + product.amount*product.prices.inAdvance},0));
                let reelSum=0.0;
                let roundedSum=0.0;

                for(const product in this.cart.products)
                {
                    let salePriceBeforeRound = ( (this.cart.products[product].prices.inAdvance*this.cart.products[product].amount )/totalInAdvence)*this.totalPrice;
                    let roundedPrice = this.customRound(salePriceBeforeRound);
                    reelSum +=salePriceBeforeRound;
                    roundedSum+=roundedPrice;
                    this.cart.products[product].prices.sale = roundedPrice;
                }
                this.difference = reelSum-roundedSum;
            },
            customRound(number) 
            {
                if (number > 2000) 
                {
                    return Math.round(number / 100) * 100;
                } else if (number > 100)
                {
                    return Math.round(number / 10) * 10;
                }
                else if (number > 0)
                {
                    return Math.round(number);
                }
                else
                {
                    return 0;
                }
            },
            prepareEdit()
            {
                let cellValue = this.$refs.editableCell.textContent;
                cellValue = cellValue.replace(/\./g, '').split(',')[0];
                this.$refs.editableCell.textContent = cellValue; 

                const range = document.createRange();
                range.selectNodeContents(this.$refs.editableCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
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

            this.generateTotalSalePrice();
        },
        mounted()
        {
            let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {return new bootstrap.Tooltip(tooltipTriggerEl)})
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
}

</style>
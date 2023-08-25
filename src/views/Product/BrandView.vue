<template>
   
    <h2>Brands & Price Rates</h2>


    <div class="container mt-4 table-responsive">
        <table class="table table-bordered table-hover custom-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>List Discount</th>
                <th>Profit Rate</th>
                <th>Profit Min</th>
                <th>Profit Max Rate</th>
                <th>CC</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in brands" :key="item.id">
            <th>{{ item.name }}</th>
            <td contenteditable="true">{{ item.listDiscountRate }}%</td>
            <td contenteditable="true">{{ item.profitRate }}%</td>
            <td contenteditable="true">{{ item.profitMinRate }}%</td>
            <td contenteditable="true">{{ item.profitMaxRate }}%</td>
            <td contenteditable="true">{{ item.ccRate }}%</td>
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
          brands:[]
        }
    },
    methods:
    {
        async getBrands()
        {
            axios.get(`brands`)
            .then(response => 
            {
                this.brands = response.data;
                
            })
            .catch(axiosError => 
            {
                this.products = [];
            })
        },
    },
    async created()
    {
        this.getBrands();
    }
}

</script>

<style scoped>
.table td, .table th {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
}
</style>

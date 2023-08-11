<template>
   <div class="text-center">
       <h2>Cart</h2>
   </div>
   
   <CartProductTable/>

</template>



<script>
import CartProductTable from "@/components/Sale/CartProductTable.vue";

export default
{
    data()
    {
        return{
        }
    },
    components:
    {
        CartProductTable
    }
}
</script>
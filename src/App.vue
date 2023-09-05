<template>

  <div class="container-fluid">
    <Navbar :views="views"/>

  </div>

  <div class="py-3" :class="containerClass">
    <router-view />
  </div>
  
  <div class="container-fluid user-select-none my-0 bg-light">
    <Footer/>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default
{
  data ()
  {
    return {
      views:
      [
        {name:"HomeView",            dropdown:false,   displayKey: 'navbar.home'},
        {name:"CustomerListView",    dropdown:false,   displayKey: 'navbar.customers'},
        
        {name:"Products",            dropdown:true,    displayKey: 'navbar.products', 
          subViews: 
          [
            {name:"ProductListView", displayKey: 'navbar.products'}, 
            {name:"BrandView", displayKey: 'navbar.brands'}
          ]
        },

        {name:"UserListView",        dropdown:false,   displayKey: 'navbar.users'},
        {name:"CartView",            dropdown:false,   displayKey: 'navbar.cart'},
        {name:"InvoiceListView",     dropdown:false,   displayKey: 'navbar.invoices'},

      ]
    }
  },


  components:
  {
    Navbar, Footer
  },
  computed: 
  {
    containerClass() 
    {
      if(this.$route.name === 'ProductListView')  return 'container-fluid px-5';
      if(this.$route.name === 'HomeView') return 'container-fluid px-5';

      return 'container';
    }
  }
}
</script>





<style>

  #app 
  {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

</style>

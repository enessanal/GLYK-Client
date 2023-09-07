<template>
    <BackButton/>

    {{ product }}

  </template>





<script>
import BackButton from "@/components/BackButton.vue"
import axios from "axios"

import { mapState, mapGetters, mapActions } from 'vuex'


export default{
    data(){
        return {
            id: this.$route.params.id,
            product: {}
        }
    },
    components:
    {
      BackButton
    },
    computed:
    {
      ...mapState(['testCount']),
      ...mapGetters(['messageForTest'])
    },
    methods:
    {
      ...mapActions('cart', ['addItem'])
    },
    async created()
    {
      axios.get(`products/id/${this.id}`)
      .then(response => 
      {
        this.product = response.data;
        
        this.addItem( this.product);
      })
      .catch(response => 
      {
        if(response.response.status === 404)
        {
            alert("Product not found!")
            this.$router.push({ path: '/products'});
        }
      })
    }
}
</script>
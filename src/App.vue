<template>
  <div class="container-fluid">
    <Navbar/>
    <hr>
    <div class="bg-light py-3">
      <router-view />
    </div>

    <!-- <hr>
    Footer -->
  
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";

export default
{
  components:
  {
    Navbar
  }
}
</script>





<style>
@import '@/assets/css/bootstrap@5.0.2_dist_css_bootstrap.min.css';

.prevent-select {
 -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}



nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  /* padding: 10px; */
}

nav a.router-link-exact-active {
  color: white !important;
  background-color: #007242af;
  border-radius: 4px;
}

</style>

<!-- TODO

  Multi-language

-->
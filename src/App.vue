<template>
  <div class="container-fluid container-md">
    <nav class="navbar navbar-expand-sm navbar-light bg-light prevent-select">
      <div class="container-fluid d-flex justify-content-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse my-1 text-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <b><router-link class="nav-link" :to="{ name: 'HomeView' }">Home</router-link></b>
            </li>
            <li class="nav-item">
              <b><router-link class="nav-link" :to="{ name: 'ProductListView' }">Products</router-link></b>
            </li>
            <li class="nav-item">
              <b><router-link class="nav-link" :to="{ name: 'UserListView' }">Users</router-link></b>
            </li>
            <li class="nav-item">
              <b><router-link class="nav-link" :to="{ name: 'CartView' }">Cart</router-link></b>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <hr>
    <div class="bg-light py-3">
      <router-view />
    </div>

    
    <!-- <hr>
    Footer -->
  
  </div>
</template>

<style>


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
<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light user-select-none">
      <div class="container-fluid d-flex justify-content-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse my-1 text-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" v-for="view in views" :class="{'dropdown':view.dropdown}">
              <b v-if="!view.dropdown"><router-link class="nav-link" :to="{ name: view.name }">{{ $t(view.displayKey) }}</router-link></b>
              <a v-if="view.dropdown" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" >{{ $t(view.displayKey) }}</a>
              <div v-if="view.dropdown" class="dropdown-menu">
                <router-link v-for="subView in view.subViews" class="nav-link" :to="{ name: subView.name }">{{ $t(subView.displayKey) }}</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <hr>

</template>

<script>
export default
{
  name: "NavBar",
  props:
  {
    views:
      {
          type: Array,
          required: true
      }
  }
}

</script>


<style scoped>
  nav a 
  {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    /* padding: 10px; */
  }

  nav a:hover
  {
    background-color: #00724252;
  }

  nav a.router-link-exact-active 
  {
    color: white !important;
    background-color: #007242af;
    border-radius: 4px;
  }

</style>
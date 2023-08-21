<template>
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
              <b><router-link class="nav-link" :to="{ name: 'CustomerListView' }">Customers</router-link></b>
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
            <li class="nav-item">
              <b><router-link class="nav-link" :to="{ name: 'InvoiceListView' }">Invoices</router-link></b>
            </li>
          </ul>

        </div>
      </div>
    </nav>
</template>
<template>
  <!-- Desktop için Tablo Görünümü -->
  <div class="d-none d-md-block">
    <table class="table">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td>Name-{{ i }}</td>
          <td>Surname-{{ i }}</td>
          <td>email{{ i }}@example.com</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Mobil için Kart Görünümü -->
  <div class="d-block d-md-none">
    <div class="card mb-2" v-for="i in 10" :key="i">
      <div class="card-body">
        <h5 class="card-title">Name-{{ i }} Surname-{{ i }}</h5>
        <p class="card-text">Email: email{{ i }}@example.com</p>
      </div>
    </div>
  </div>

  <div class="home">
    <div class="card bg-warning mb-3" style="max-width: 20rem">
      <div class="card-header"><strong>TO-DOs</strong></div>
      <div class="card-body">
        <h4 class="card-title">Remember these</h4>
        <p class="card-text fw-bold">
          Sözleşmedeki teslimat adresi de o sözleşmeye özgü olacak.<br />
          Sonradan müşteri ve adresleri değiştirilse bile sözleşme
          değişmeyecek.<br />
          Adresler için Accordions kulanılabilir.<br />
          sözleşme teslimat adresi müşteri adresleri içinden de
          getirilebilecek.<br />
          Home altında genel istatisliker konulacak. Customer count, product,
          user...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>

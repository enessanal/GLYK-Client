<template>
  <footer
    class="d-flex flex-wrap justify-content-between align-items-center py-3 my-0 border-top"
  >
    <p class="col-md-4 mb-0 text-muted">© 2023 SME Management</p>

    <a
      href="/"
      class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      <img class="bi me-2" width="40" height="32" src="@/assets/logo.png" />
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted disabled">Home</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted disabled">Features</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted disabled">Pricing</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted disabled">FAQs</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted disabled">About</a>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="languageDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ $i18n.locale }}
        </a>
        <ul class="dropdown-menu" aria-labelledby="languageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="changeLanguage('en')"
              >English</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="changeLanguage('tr')"
              >Türkçe</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style>
.disabled a:hover {
  cursor: not-allowed;
}
</style>

<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">
        You are currently viewing the Vue_JWT_App
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-text>{{ user.firstname }} | </b-nav-text>
        <b-nav-item @click="logUserOut" active>Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">
                Name : {{ user.firstname }} {{ user.lastname }}
              </li>
              <li class="list-group-item">Email : {{ user.email }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("user");
      try {
        let decoded = VueJwtDecode.decode(token);
        console.log(decoded, "----------");
        this.user = decoded;
      } catch (error) {
        // return error in production env
        console.log(error, "error from decoding token");
      }
    },
    logUserOut() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  created() {
    this.getUserDetails();
  }
};
</script>

<style>
#navbar {
  margin-bottom: 15px;
}
</style>

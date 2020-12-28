<template>
  <div class="container">
    <b-card
      bg-variant="dark"
      header="Welcome to the Vue JWT App"
      text-variant="white"
      class="text-center"
    >
      <b-card-text>Register Here!</b-card-text>
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
          <form
            class="text-center border border-primary p-5"
            style="margin-top:70px;height:auto;padding-top:100px !important;"
            @submit.prevent="registerUser"
          >
            <input
              type="text"
              id="firstName"
              class="form-control mb-5"
              placeholder="firstName"
              v-model="register.firstName"
              required
            />
            <input
              type="text"
              id="lastName"
              class="form-control mb-5"
              placeholder="lastName"
              v-model="register.lastName"
              required
            />
            <input
              type="email"
              id="email"
              class="form-control mb-5"
              placeholder="Email"
              v-model="register.email"
              required
            />
            <input
              type="password"
              id="password"
              class="form-control mb-5"
              placeholder="Password"
              v-model="register.password"
            />
            <p>
              Already have an account? Click
              <router-link to="/login">here</router-link> to sign in
              <center>
                <button
                  class="btn btn-primary btn-block w-75 my-4"
                  type="submit"
                >
                  Sign up
                </button>
              </center>
            </p>
          </form>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      register: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/auth/signup", this.register);
        console.log(response);
        if (response) {
          this.$router.push("/login");
          console("Success", "Registration Was successful", "success");
        } else {
          console.log("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        let error = err.response;
        console.log(error);
      }
    }
  }
};
</script>

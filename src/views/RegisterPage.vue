<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="register-form">
        <div class="logo-wrapper">
          <img class="logo" src="../assets/logo.png">
          <h2 class="tagline">Open source task management tool</h2>
        </div>
        <form @submit.prevent="submitForm">
          <div v-show="errorMessage" class="alert alert-danger failed">{{ errorMessage }}</div>
          <div class="form-group">
            <input type="text" id="username" class="form-control" v-model="form.username">
          </div>
          <div class="form-group">
            <input type="email" id="emailAddress" class="form-control" v-model="form.emailAddress">
          </div>
          <div class="form-group">
            <input type="password" id="password" class="form-control" v-model="form.password">
          </div>
          <button type="submit" class="btn btn-primary btn-lock">Create account</button>
        </form>
      </div>
    </div>
    <footer class="footer">
      <span class="copyright">Built by Egorka Voronyansky(c)</span>
      <ul class="footer-links list-inline float-right">
        <li>
          <a href="https://github.com/vrnsky">Creator</a>
        </li>
        <li>
          <a href="https//behancer.com/treshkin">Creative Designer</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 900px;
}
.register-form {
  margin-top: 50px;
  max-width: 320px;
}
.logo-wrapper {
  margin-bottom: 40px;
}
.footer {
  width: 100%;
  line-height: 40px;
  margin-top: 50px;
}
</style>


<script>
import registrationService from "@/services/registration";
export default {
  name: "RegisterPage",
  data: function() {
    return {
      form: {
        username: "",
        emailAddress: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      registrationService
        .register(this.form)
        .then(() => {
          this.$router.push({ name: "LoginPage" });
        })
        .catch(error => {
          this.errorMessage =
            "Failed to register user. Reason: " +
            (errorMessage ? errorMessage : "Unknown") +
            ".";
        });
    }
  }
};
</script>
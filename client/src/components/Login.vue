<template>
  <div class="col-md-6 login-form-1">
    <h3>Login for Form 1</h3>
    <form>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Your Email *"
          value=""
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Your Password *"
          value=""
        />
      </div>
      <div class="form-group">
        <input type="submit" class="btnSubmit" value="Login" />
      </div>
      <div class="form-group">
        <a href="#" class="ForgetPwd">Forget Password?</a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // setup() {
  // },
});
</script>

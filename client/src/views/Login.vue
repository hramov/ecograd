<template>
    <div class="login-form-1 text-center">
      <h3>Login for Form 1</h3>
      <form>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Email *"
            value=""
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Пароль *"
            value=""
          />
        </div>
        <div class="form-group">
          <input type="submit" class="btnSubmit" value="Login" />
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

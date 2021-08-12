<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="!isLoggedIn && isTouched" class="alert alert-danger" role="alert">Ошибка авторизации!</div>
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Вход</h5>
          <button
            id="closeBtn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <small>Пожалуйста, введите данные своего аккаунта ниже</small>
          <br />
          <form>
            <div class="form-group">
              <input
                type="text"
                name="login"
                v-model="login"
                class="form-control"
                placeholder="Ваш Email *"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                name="password"
                v-model="password"
                class="form-control"
                placeholder="Ваш пароль *"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click.prevent="loginMethod">
            Войти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const router = instance!.proxy?.$router;

    const store = useStore();

    const login = ref("");
    const password = ref("");
    const isLoggedIn = ref(true)
    const isTouched = ref(false)

    async function loginMethod(): Promise<void> {
      isTouched.value = true
      const result = await axios.post("http://localhost:5000/api/v2/auth/login", {
        email: login.value,
        password: password.value,
      });
      if (result.data.status) {
        const res = result.data;
        console.log(res)
        localStorage.setItem("jwt_token", res.jwt_token);
        store.commit("setJWT", res.jwt_token);
        document.getElementById("closeBtn")!.click();
        store.commit("setUser", res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        router!.push("/");
      } else {
        isLoggedIn.value = false
      }
    }

    return {
      loginMethod: loginMethod,
      login: login,
      password: password,
      isLoggedIn: isLoggedIn,
      isTouched: isTouched
    };
  },
});
</script>

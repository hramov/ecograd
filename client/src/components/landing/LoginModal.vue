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
          <button class="btn btn-success" @click="loginMehod(login, password)">
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
import { IAuthResponse } from "./../../custom/interfaces";

export default defineComponent({
  data() {
    return {
      login: "",
      password: "",
    };
  },

  setup() {
    const instance = getCurrentInstance();
    const router = instance!.proxy?.$router;

    const store = useStore();

    let authResponse: IAuthResponse = reactive({
      status: false,
      jwt_token: "",
      user: { id: 0, role: "" },
    });

    async function loginMehod(login: string, password: string): Promise<void> {
      const result = await axios.post("http://localhost:5000/api/v1/login", {
        login: login,
        password: password,
      });
      if (result.status) {
        authResponse = result.data;
        localStorage.setItem("jwt_token", authResponse.jwt_token);
        store.commit("setJWT", authResponse.jwt_token);
        document.getElementById("closeBtn")!.click();
        store.commit("setUser", authResponse.user);
        localStorage.setItem("user", JSON.stringify(authResponse.user));
        router!.push("/");
      }
    }

    return { loginMehod };
  },
});
</script>

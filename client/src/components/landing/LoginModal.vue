<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLable"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      {{ isLoggedIn }}
      <div class="modal-content">
        <div
          v-if="!isLoggedIn && isTouched"
          class="alert alert-danger"
          role="alert"
        >
          Ошибка авторизации! {{ status }}
        </div>
        <div
          v-if="isLoggedIn && isTouched"
          class="alert alert-success"
          role="alert"
        >
          Вход выполнен успешно
        </div>
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
                name="email"
                v-model="email"
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
          <button class="btn btn-success" @click.prevent="login">Войти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");
    const status = ref("")
    const isLoggedIn = computed(() => store.getters.getIsLoggedIn);
    const isTouched = ref(false);

    const login = async () => {
      status.value = await store.dispatch("login", {
        email: email.value,
        password: password.value,
      });
      isTouched.value = true;
    };

    return {
      isLoggedIn: isLoggedIn,
      isTouched: isTouched,
      email: email,
      status: status,
      password: password,
      login: login,
    };
  },
});
</script>

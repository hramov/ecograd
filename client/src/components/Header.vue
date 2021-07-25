<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white rounded fixed-top"
    aria-label="Eleventh navbar example"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/"
        ><img class="logo" src="assets/img/logo.png"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample09"
        aria-controls="navbarsExample09"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample09">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="text-align: right">
          <li class="nav-item">
            <a class="nav-link item" aria-current="page" href="/#intro"
              >Главная</a
            >
          </li>
          <li class="nav-item item">
            <a class="nav-link item" href="/#about">О нас</a>
          </li>
          <li class="nav-item item">
            <a class="nav-link item" href="/#team">Эксперты</a>
          </li>
          <li class="nav-item item">
            <a class="nav-link item" href="/#requisities">Реквизиты</a>
          </li>
          <li class="nav-item item">
            <a class="nav-link item" href="/#contacts">Контакты</a>
          </li>
          <li class="nav-item item">
            <a
              type="button"
              v-if="!isUser"
              class="nav-link item"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Войти
            </a>
            <div
              class="dropdown"
              style="margin-left: auto; margin-right: 0; max-width: 150px"
              v-else
            >
              <button
                class="nav-link item dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ user.name }} {{ user.last_name }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" v-if="user.role == 'admin'" @click="$router.push('/dashboard')"
                    >Открыть</a
                  >
                  <a class="dropdown-item" v-if="user.role == 'client'" @click="$router.push('/client')"
                    >Открыть</a
                  >
                </li>
                <li><a class="dropdown-item" @click="logout">Выйти</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = store.getters.getRouter;
    const isUser = computed(() => store.getters.getJWT);
    const computedUser = computed(() => store.getters.getUser);
    // const user = JSON.parse(localStorage.getItem("user")!);

    const logout = async () => {
      // console.log(await axios.get(`http://localhost:5000/api/v1/admin/logout/${user}`))
      localStorage.setItem("jwt_token", "");
      localStorage.setItem("user", JSON.stringify({}));
      store.commit("setJWT", null);
      store.commit("setUser", {});
      router.push("/");
    };

    return {
      isUser: isUser,
      user: computedUser,
      logout: logout,
    };
  },
});
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>
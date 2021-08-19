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
            <div
              v-if="!!user.id"
              class="dropdown"
              style="margin-left: auto; margin-right: 0; max-width: 150px"
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
                  <a
                    class="dropdown-item"
                    v-if="user.roles.some((role) => role.id === 1)"
                    @click.prevent="$router.push('/dashboard')"
                    >Открыть</a
                  >
                  <a
                    class="dropdown-item"
                    v-if="user.roles.some((role) => role.id === 3)"
                    @click.prevent="$router.push('/client')"
                    >Открыть</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click.prevent="$store.dispatch('logout')"
                    >Выйти</a
                  >
                </li>
              </ul>
            </div>
            <a
              v-else
              type="button"
              class="nav-link item"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Войти
            </a>
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
  props: {
    isUser: {
      type: String,
    },
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);

    return {
      user: user,
    };
  },
});
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>
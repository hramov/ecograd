<template>
  <div>
    <Header :isUser="$store.getters.getJWT" />
    <router-view />
    <NormatModal />
    <ObjectsModal />
    <DocumentsModal />
    <br />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import NormatModal from "./components/footerModals/Normat.vue";
import ObjectsModal from "./components/footerModals/Objects.vue";
import DocumentsModal from "./components/footerModals/Documents.vue";

import { useStore } from "vuex";
export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
    NormatModal,
    ObjectsModal,
    DocumentsModal,
  },

  setup() {
    const store = useStore();
    const instance = getCurrentInstance();
    const router = instance!.proxy?.$router;
    store.commit("setRouter", router);
    localStorage.getItem("user") ? null : localStorage.setItem("user", JSON.stringify(""))
  },
});
</script>

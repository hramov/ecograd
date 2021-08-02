<template>
  <div>
    <Header :isUser="isUser" />
    <router-view @authUser="isUser = $event" />
    <NormatModal />
    <ObjectsModal />
    <DocumentsModal />
    <br />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import NormatModal from './components/footerModals/Normat.vue'
import ObjectsModal from './components/footerModals/Objects.vue'
import DocumentsModal from './components/footerModals/Documents.vue'

import { useStore } from "vuex";
export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
    NormatModal,
    ObjectsModal,
    DocumentsModal
  },

  setup() {
    let isUser = ref(false);

    const store = useStore();
    const instance = getCurrentInstance();
    const router = instance!.proxy?.$router;

    store.commit("setRouter", router);

    return {
      isUser: isUser
    };
  },
});
</script>

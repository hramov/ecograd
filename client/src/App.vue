<template>
  <div>
    <Header :isUser="isUser" />
    <router-view @authUser="isUser = $event" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useStore } from "vuex";
import axios from "axios";
export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
  },

  setup() {
    let isUser = ref(false);

    const store = useStore();
    const instance = getCurrentInstance();
    const router = instance!.proxy?.$router;
    const token = computed(() => store.getters.getJWT)

    store.commit("setRouter", router);

    return {
      isUser: isUser
    };
  },
});
</script>

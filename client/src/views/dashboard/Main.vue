<template>
  <div>
    <Orders />
    <Experts />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from "vue";
import Orders from "./../../components/dashboard/Orders.vue";
import Experts from "./../../components/dashboard/Experts.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Orders,
    Experts,
  },

  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    if (user.value.role != "admin") {
      const instance = getCurrentInstance();
      const router = instance!.proxy?.$router;
      router!.push('/')
    }
  },
});
</script>

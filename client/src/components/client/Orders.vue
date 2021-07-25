<template>
  <section class="client-orders">
    <div class="container">
      <div class="text-center">
        <h1>Мои заказы</h1>
      </div>
    </div>
  </section>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
} from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const orders = reactive([]);
    const client = computed(() => store.getters.getUser);

    // onMounted(async () => {
    //   await getOrders();
    // });

    const getOrders = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/v1/client/${client.id}/orders`
      );
      if (result.data.status) {
        orders.values = result.data.data;
      }
    };

    return {
      orders: orders,
      client: client,
    };
  },
});
</script>

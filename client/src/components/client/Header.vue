<template>
  <section class="client-orders">
    <div class="container">
      <div class="text-center">
        <h1>Личный кабинет пользователя</h1>
      </div>

      <div class="card" style="height: 100%">
        <div class="card-body">
          <div class="flex-section">
            <h5 class="card-title" style="margin-top: 5px;">Подать заявление на экспертизу</h5>
            <a href="#" class="btn btn-primary" style="height: 100%">Линейный объект</a>
            <a href="#" class="btn btn-primary" style="height: 100%"
              >Объект капитального строительства</a
            >
          </div>
        </div>
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
        `http://localhost:5000/api/v2/client/${client.id}/orders`
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

<style scoped>
    .flex-section {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
    }
</style>
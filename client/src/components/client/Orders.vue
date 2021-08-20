<template>
  <section class="client-orders">
    <div class="container">
      <div class="text-center">
        <h1>Мои заказы</h1>
        <BuyButton />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Объект</th>
              <th scope="col">Тип объекта</th>
              <th scope="col">Создан</th>
              <th scope="col">Документы</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <th scope="row">{{ order.id }}</th>
              <td>{{ order.object }}</td>
              <td v-if="order.object_type == '1'">Линейный объект</td>
              <td v-else-if="order.object_type == '2'">
                Объект капитального строительства
              </td>
              <td>
                {{ new Date(order.createdAt).toLocaleDateString() }} в
                {{ new Date(order.createdAt).toLocaleTimeString() }}
              </td>
              <td>
                <div v-if="!order.docs_url">
                  <button
                    v-if="order.object_type == 2"
                    type="button"
                    class="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#uploadCapitalModal"
                    @click.prevent="getOrder(order.id)"
                  >
                    Загрузить
                  </button>

                  <button
                    v-if="order.object_type == 1"
                    type="button"
                    class="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#uploadLineModal"
                    @click.prevent="getOrder(order.id)"
                  >
                    Загрузить
                  </button>
                </div>
                <a
                  v-else
                  :href="
                    'http://localhost:5000/' + order.docs_url
                  "
                  class="btn btn-success"
                  >Скачать</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import BuyButton from "./../BuyButton.vue";

export default defineComponent({
  components: {
    BuyButton,
  },
  setup() {
    const store = useStore();
    const client = computed(() => store.getters.getUser);
    const orders = computed(() => store.getters.getClientOrders);

    onMounted(async () => {
      await store.dispatch("getOrdersForClient", client.value.id);
    });

    const getOrder = async (id) => {
      await store.dispatch("getOrderAction", id);
    };

    return {
      client: client,
      orders: orders,
      getOrder: getOrder,
    };
  },
});
</script>

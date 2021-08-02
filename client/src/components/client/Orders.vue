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
              <td>{{ order.object_type }}</td>
              <td>{{ new Date(order.created_at).toLocaleDateString() }}</td>
              <td>
                <div v-if="!order.files_url">
                <button
                  v-if="order.object_type == 'Объект капитального строительства'"
                  type="button"
                  class="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadCapitalModal"
                  @click.prevent="getOrder(order.id)"
                >
                  Загрузить
                </button>

                <button
                  v-if="order.object_type == 'Линейный объект'"
                  type="button"
                  class="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadLineModal"
                >
                  Загрузить
                </button>
                </div>
                <a v-else :href="'http://localhost:5000/api/v1/static' + order.files_url" class="btn btn-success">Скачать</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
import BuyButton from "./../BuyButton.vue";

export default defineComponent({
  components: {
    BuyButton,
  },
  setup() {
    const store = useStore();
    const orders = ref([]);
    const client = computed(() => store.getters.getUser);

    onMounted(async () => {
      await getOrders();
    });

    const getOrders = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/v1/client/${client.value.id}/orders`
      );
      if (result.data.status) {
        result.data.data.map((order) => {
          if (order.object_type == "1") order.object_type = "Линейный объект";
          else if (order.object_type == "2")
            order.object_type = "Объект капитального строительства";
        });
        orders.value = result.data.data;
      }
    };

    const getOrder = async(id) =>{
      const result = await axios.get(`http://localhost:5000/api/v1/client/${client.value.id}/orders/${id}`)
      if (result.data.status) {
        store.commit('setOrder', result.data.data)
      }
    }

    return {
      orders: orders,
      client: client,
      getOrder: getOrder
    };
  },
});
</script>

<template>
  <section class="main" id="main">
    <div class="text-center">
      <h1>
        Заказы
        <i class="fa fa-check" v-if="isLoaded" style="color: green"></i>
        <i class="fa fa-times" v-else style="color: red"></i>
      </h1>
    </div>
    <div class="container">
      <table class="table table-striped table-hover" v-if="isOrders">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Компания</th>
            <th scope="col">Объект</th>
            <th scope="col">E-mail</th>
            <th scope="col">Телефон</th>
            <th scope="col">Исполнитель</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.name }}</td>
            <td>{{ order.company }}</td>
            <td>{{ order.object }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.phone }}</td>
            <td v-if="order.exec">{{ order.phone }}</td>
            <td v-else>
              <button type="button" class="btn btn-success" @click="getWork">
                Взять
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="alert alert-secondary text-center"
        role="alert"
        v-else
        style="width: 50%; margin: 0 auto"
      >
        Заказов нет!
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from "axios";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isOrders = ref(false);
    const isLoaded = ref(false);

    const getOrders = async () => {
      if (await store.dispatch("getOrdersAction")) {
        isLoaded.value = true;
      } else {
        isLoaded.value = false;
      }
    };

    onMounted(async () => {
      await getOrders();
    });
    const orders = computed(() => store.getters.getOrders);
    if (orders.value) isOrders.value = true;
    else isOrders.value = false;

    const getWork = async () => {
      const result = await axios.post(
        "http://localhost:5000/api/v1/admin/orders/get-order",
        {
          exec: computed(() => store.getters.getUser),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${store.getters.getJWT}`,
          },
        }
      );
      if (result.status) await getOrders();
    };

    return {
      orders,
      isOrders: isOrders,
      isLoaded: isLoaded,
      getWork: getWork,
    };
  },
});
</script>

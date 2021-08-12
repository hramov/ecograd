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
            <th scope="col">Объект</th>
            <th scope="col">E-mail</th>
            <th scope="col">Телефон</th>
            <th scope="col">Исполнитель</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td v-if="order.client">{{ order.client.name }}</td>
            <td>{{ order.object }}</td>
            <td v-if="order.client">{{ order.client.email }}</td>
            <td v-if="order.client">{{ order.client.phone }}</td>

            <td v-if="order.exec && order.exec.id != user_id">
              {{ order.exec.last_name }} {{ order.exec.name }}
              {{ order.exec.id }}
            </td>
            <td v-if="order.exec && order.exec.id == user_id">
              <a
                v-if="order.is_docs"
                type="button"
                class="btn btn-warning"
                href="#"
                >Скачать документы</a
              >
              <p class="btn-danger" v-else>Документов пока нет</p>
            </td>

            <td v-else>
              <button
                type="button"
                class="btn btn-success"
                @click="getWork(order)"
              >
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
    const user = computed(() => store.getters.getUser);
    const user_id = user.value.id;

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

    const getWork = async (order: any) => {
      const result = await axios.post(
        "http://localhost:5000/api/v2/admin/take-order",
        {
          order: order,
          user: user.value,
        },
        {
          headers: {
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
      user: user,
      user_id: user_id,
      getWork: getWork,
    };
  },
});
</script>

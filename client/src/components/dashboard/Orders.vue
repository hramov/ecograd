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
            <th scope="col">Документы</th>
            <th scope="col">Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td v-if="order.Client">{{ order.Client.name }}</td>
            <td>{{ order.object }}</td>
            <td v-if="order.Client">{{ order.Client.email }}</td>
            <td v-if="order.Client">{{ order.Client.phone }}</td>

            <td v-if="order.Expert && order.Expert.ID != user_id">
              {{ order.Expert.last_name }} {{ order.Expert.name }}
              {{ order.Expert.id }}
            </td>
            <td v-if="order.Expert && order.Expert.ID == user_id">
              <a
                v-if="order.is_docs"
                type="button"
                class="btn btn-warning"
                :href="`${$store.getters.getBackendUrl}/uploads/docs/${order.id}.zip`"
                >Скачать документы</a
              >
              <p class="btn-danger" v-else>Документов пока нет</p>
            </td>

            <td v-else-if="user.role =='admin' || user.role =='expert' && order.status == 'new'">
              <button
                type="button"
                class="btn btn-success"
                @click="getWork(order.id)"
              >
                Взять
              </button>
            </td>
            <td v-if="order.status =='new'">Зарегистрирован</td>
            <td v-else-if="order.status =='taken'">Взят в работу</td>
            <td v-else-if="order.status =='done'"><a :href="`${$store.getters.getBackendUrl}/uploads/finals/${order.id}.zip`">Скачать</a></td>
            <td v-if="order.Expert && order.Expert.ID == user_id">
              <button type="button" class="btn-success" @click.prevent="">Загрузить заключение</button>
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
      await store.dispatch("getOrdersAction")
    };

    onMounted(async () => {
      await getOrders();
      isLoaded.value = true
    });

    const orders = computed(() => store.getters.getOrders);
    if (orders.value) isOrders.value = true;
    else isOrders.value = false;

    const getWork = async (order_id: number) => {
      const result = await store.dispatch('getWorkAction', order_id)
      if (!result.error) await getOrders();
      else {
        console.log(result.error)
      }
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

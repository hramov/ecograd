<template>
  <div
    class="modal fade"
    id="buyModal"
    tabindex="-1"
    aria-labelledby="buyModalLable"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="edited">
          <div v-if="!status" class="alert alert-danger" role="alert">
            Ошибка! {{ error }}
          </div>
          <div v-else class="alert alert-success" role="alert">
            Ваш заказ успешно отправлен!
            <div v-if="!user.id">
              <p>Для входа на сайт используйте</p>
              <p>логин: {{ tempuser.email }}</p>
              <p>пароль: {{ tempuser.password }}</p>
            </div>
          </div>
        </div>
        <div class="modal-header">
          <h5 class="modal-title" id="buyModalLable">
            Форма оформления заказа на экспертизу
          </h5>
          <button
            id="closeBtn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <input
                id="name"
                v-if="!user.id"
                type="text"
                class="form-control"
                placeholder="* Ваше имя"
                v-model="order.name"
                required
              />
            </div>
            <div class="form-group">
              <input
                id="email"
                v-if="!user.id"
                type="email"
                class="form-control"
                placeholder="* Ваш E-mail"
                v-model="order.email"
                required
              />
            </div>
            <div class="form-group">
              <input
                id="object"
                type="text"
                class="form-control"
                placeholder="* Объект"
                v-model="order.object"
                required
              />
            </div>
            <div class="form-group">
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="order.object_type"
              >
                <option :value="Number(1)">
                  Объект капитального строительства
                </option>
                <option :value="Number(2)">Линейный объект</option>
              </select>
            </div>
            <div class="form-group">
              <input
                id="phone"
                v-if="!user.id"
                type="number"
                class="form-control"
                placeholder="* Номер телефона"
                v-model="order.phone"
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <a
            class="btn btn-success"
            style="margin: 0 auto; cursor: pointer"
            @click.prevent="sendOrder"
            >Отправить</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IOrder } from './../../custom/interfaces'
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);

    const order: IOrder = reactive({
      userid: user.value.id,
      name: user.value.name,
      email: user.value.email,
      object: "",
      object_type: 1,
      phone: user.value.phone,
    });

    const status = ref(false);
    const error = ref("");
    const edited = ref(false);

    const tempuser = reactive({
      email: "",
      password: "",
    });

    const sendOrder = async () => {
      const result = user.value.id
        ? await store.dispatch("addOrder", order)
        : await store.dispatch("addOrderUnauthorized", order);

      status.value = result.order?.id ? true : false;

      if (!user.value.id) {
        tempuser.email = result.user.email;
        tempuser.password = result.user.password;
      }

      edited.value = true;

      setTimeout(() => {
        document.getElementById("closeBtn")!.click();
      }, 10000);
    };

    return {
      sendOrder: sendOrder,
      status: status,
      error: error,
      edited: edited,
      order: order,
      tempuser: tempuser,
      user: user,
    };
  },
});
</script>

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
            <p>Для входа на сайт используйте</p>
            <p>логин: {{ tempuser.login }}</p>
            <p>пароль: {{ tempuser.password }}</p>
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
                type="text"
                class="form-control"
                placeholder="* Ваш E-mail"
                v-model="order.email"
                required
              />
            </div>
            <div class="form-group">
              <input
                id="company"
                type="text"
                class="form-control"
                placeholder="Компания"
                v-model="order.company"
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
                <option value="1">Объект капитального строительства</option>
                <option value="2">Линейный объект</option>
              </select>
            </div>
            <div class="form-group">
              <input
                id="phone"
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
import axios from "axios";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    interface IOrder {
      name: string;
      email: string;
      company: string;
      object: string;
      object_type: string;
      phone: string;
    }

    const order: IOrder = reactive({
      name: "",
      email: "",
      company: "",
      object: "",
      object_type: "",
      phone: "",
    });

    const status = ref(false);
    const error = ref("");
    const edited = ref(false);

    const tempuser = reactive({
      login: "",
      password: "",
    });

    const user = computed(() => store.getters.getUser);

    const sendOrder = async () => {
      const result = await axios.post(
        "http://localhost:5000/api/v1/client/send-order",
        {
          order: order,
          user: user.value,
        }
      );

      status.value = result.data.status;
      if (!result.data.status) error.value = result.data.data;

      tempuser.login = result.data.data.login;
      tempuser.password = result.data.data.password;

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
    };
  },
});
</script>

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
                placeholder="Ваше имя"
                v-model="order.name"
              />
            </div>
            <div class="form-group">
              <input
                id="email"
                type="text"
                class="form-control"
                placeholder="Ваш E-mail"
                v-model="order.email"
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
                placeholder="Объект"
                v-model="order.object"
              />
            </div>
            <div class="form-group">
              <input
                id="phone"
                type="number"
                class="form-control"
                placeholder="Номер телефона"
                v-model="order.phone"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <a
            class="btn btn-success"
            style="margin: 0 auto; cursor: pointer"
            @click="sendOrder(order)"
            >Отправить</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, getCurrentInstance, ref } from "vue";

export default defineComponent({
  data() {
    return {
      order: {
        name: "",
        email: "",
        company: "",
        object: "",
        phone: "",
      },
    };
  },
  setup() {
    interface IOrder {
      name: string;
      email: string;
      company: string;
      object: string;
      phone: number;
    }

    const instance = getCurrentInstance();

    const status = ref(false);
    const error = ref("");
    const edited = ref(false);

    const sendOrder = async (order: IOrder) => {
      const response = await axios.post(
        "http://localhost:5000/api/v1/send-order",
        {
          order: order,
        }
      );

      status.value = response.data.status;
      error.value = response.data.error;
      edited.value = true;

      instance!.data.order = {};

      setTimeout(() => {
        document.getElementById("closeBtn")!.click();
      }, 2000);
    };

    return {
      sendOrder: sendOrder,
      status: status,
      error: error,
      edited: edited,
    };
  },
});
</script>

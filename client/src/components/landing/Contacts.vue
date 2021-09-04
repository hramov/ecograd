<template>
  <section class="requisities" id="contacts">
    <div class="text-center">
      <h1>Контакты</h1>
    </div>

    <div class="small">Общество с ограниченной ответственностью "ЭкоГрадЪ"</div>

    <div class="row">
      <div class="col-md-5 col-lg-4 col-sm-12 offset-lg-1 text-left">
        <div class="contact_item">
          <i class="fa fa-map-marker fa-2x"></i>
          655038, Алтайский край, г. Барнаул, ул. Профинтерна, д. 45, Н-1001
        </div>
        <div class="contact_item">
          <i class="fa fa-envelope-square fa-2x"></i>
          oooecograd@mail.ru
        </div>
        <div class="contact_item">
          <i class="fa fa-phone fa-2x"></i>
          +7 (3852) 71-71-60
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 text-center">
        <form>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ваше имя"
              v-model="feedback.name"
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Ваш Email"
              v-model="feedback.email"
            />
          </div>
          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="Сообщение"
              id="floatingTextarea"
              rows="3"
              style="height: 100%"
              v-model="feedback.text"
            ></textarea>
            <label for="floatingTextarea">Сообщение</label>
          </div>

          <div v-if="feedback._touched">
            <div v-if="feedback._sent" class="alert alert-success" role="alert">
              Сообщение успешно отправлено!
            </div>

            <div v-else class="alert alert-danger" role="alert">
              Что-то пошло не так: {{ feedback._data }}
            </div>
          </div>

          <button
            style="margin: 0 auto; cursor: pointer"
            class="btn-get-started"
            @click.prevent="sendFeedback"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {

    const store = useStore();
    const feedback = reactive({
      name: "",
      email: "",
      text: "",

      _sent: false,
      _touched: false,
      _data: "",
    });

    const sendFeedback = async () => {
      feedback._touched = true;
      const result = await axios.post(`${store.getters.getBackendUrl}/feedback/`, feedback);

      if (result.data.data) {
        feedback.name = "";
        feedback.email = "";
        feedback.text = "";
        feedback._sent = true;
      } else {
        feedback._sent = false;
        feedback._data = result.data.join();
      }
    };

    return {
      feedback: feedback,
      sendFeedback: sendFeedback,
    };
  },
});
</script>

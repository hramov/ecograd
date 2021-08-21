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
          <!-- <p> -->
          656058, г.Барнаул, проспект Комсомольский, 120 оф. 205, 206, 207
          <!-- </p> -->
        </div>
        <div class="contact_item">
          <i class="fa fa-envelope-square fa-2x"></i>
          <!-- <p> -->
          oooecograd@mail.ru
          <!-- </p> -->
        </div>
        <div class="contact_item">
          <i class="fa fa-phone fa-2x"></i>
          <!-- <p> -->
          +7 (3852) 71-71-60
          <!-- </p> -->
        </div>
        <!-- <buy-button/> -->
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 text-center">
        <form>
          <div class="mb-3">
            <!-- <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            > -->
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ваше имя"
              v-model="feedback.name"
            />
            <!-- <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div> -->
          </div>
          <div class="mb-3">
            <!-- <label for="exampleInputPassword1" class="form-label"
              >Password</label
            > -->
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
export default defineComponent({
  setup() {
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
      const result = await axios.post("api/v2/feedback", {
        feedback: feedback,
      });
      if (result.data.status) {
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

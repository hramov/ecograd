<template>
  <div
    class="modal fade"
    id="editExpertModal"
    tabindex="-1"
    aria-labelledby="editExpertModalLable"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="isUpdated.touched" class="text-center">
          <div v-if="!isUpdated.status" class="alert alert-danger" role="alert">
            Ошибка изменения данных!
          </div>
          <div v-else class="alert alert-success" role="alert">
            Данные успешно обновлены!
          </div>
        </div>
        <div class="modal-header">
          <h5 class="modal-title" id="editExpertModalLable">
            Изменить эксперта {{ expert.last_name }} {{ expert.name }}
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
            <div v-if="!isImage" class="form-group">
              <input
                id="image_url"
                type="file"
                class="form-control"
                placeholder="Ссылка на аватар"
                ref="file"
                @change="changeUploadImage"
              />
            </div>
            <div v-else class="form-group text-center">
              <img
                :src="`http://localhost:5000/static/` + expert.image_url"
                style="width: 100%; margin-bottom: 10px"
              />
              <button class="btn btn-warning" @click="isImage = false">
                Изменить аватар
              </button>
            </div>

            <div class="form-group">
              <input
                id="last_name"
                type="text"
                class="form-control"
                placeholder="Фамилия"
                v-model="expert.last_name"
              />
            </div>
            <div class="form-group">
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="Имя"
                v-model="expert.name"
              />
            </div>
            <div class="form-group">
              <input
                id="second_name"
                type="text"
                class="form-control"
                placeholder="Отчество"
                v-model="expert.second_name"
              />
            </div>
            <div class="form-group">
              <input
                id="email"
                type="text"
                class="form-control"
                placeholder="Email"
                v-model="expert.email"
              />
            </div>
            <div class="form-group">
              <input
                id="phone"
                type="number"
                class="form-control"
                placeholder="Телефон"
                v-model="expert.phone"
              />
            </div>
            <div class="form-group">
              <input
                id="position"
                type="text"
                class="form-control"
                placeholder="Должность"
                v-model="expert.position"
              />
            </div>
            <div class="form-group">
              <input
                id="birth_date"
                type="date"
                class="form-control"
                placeholder="Дата рождения"
                required
                v-model="expert.birth_date"
              />
            </div>

            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                rows="3"
                style="height: 100%"
                v-model="expert.cert"
              ></textarea>
              <label for="floatingTextarea">Квалификационный аттестат</label>
            </div>

            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                rows="3"
                style="height: 100%"
                v-model="expert.direction"
              ></textarea>
              <label for="floatingTextarea">Направления исследований</label>
            </div>

            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                rows="3"
                style="height: 100%"
                v-model="expert.misc"
              ></textarea>
              <label for="floatingTextarea">Примечания</label>
            </div>
          </form>
        </div>
        {{ isUpdated.edit }}
        <div class="modal-footer">
          <a
            class="btn btn-success"
            style="margin: 0 auto; cursor: pointer"
            @click.prevent="updateExpert"
            >Сохранить</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isLoaded = ref(false);
    const isUpdated = reactive({
      touched: false,
      status: false,
    });
    const file = ref(null);
    const isImage = ref(false);

    const expert = computed(() => store.getters.getExpert);

    watch(expert, (val) => {
      if (val.image_url != "") {
        isImage.value = true;
      } else {
        isImage.value = false;
      }
    });

    const updateExpert = async () => {
      let formData = new FormData();
      formData.append("file", file.value!);
      formData.append("expert", JSON.stringify(expert.value));

      const result = await axios.put(
        `http://localhost:5000/api/v1/experts/${expert.value.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${store.getters.getJWT}`,
          },
        }
      );
      // store.commit("setExpert", expert.value);

      await store.dispatch('getExpertsAction')

      isUpdated.status = result.data.status;
      isUpdated.touched = true;
    };

    const changeUploadImage = async (e: any) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      file.value = files[0];
    };

    return {
      expert: expert,
      isLoaded: isLoaded,
      isUpdated: isUpdated,
      isImage: isImage,
      updateExpert: updateExpert,
      changeUploadImage: changeUploadImage,
    };
  },
});
</script>

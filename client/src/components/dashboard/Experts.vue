<template>
  <section class="dash-experts" id="dash-experts">
    <div class="text-center">
      <h1>
        Эксперты /
        <button
          class="btn btn-success"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          @click="isOpen = !isOpen"
        >
          <p v-if="!isOpen">Добавить</p>
          <p v-else>Скрыть</p>
        </button>
        <button
          style="margin-left: 10px"
          class="btn btn-warning"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseFile"
          aria-expanded="false"
          aria-controls="collapseFile"
        >
          Из файла
        </button>
      </h1>
    </div>

    <div
      class="collapse"
      id="collapseFile"
      style="width: 50%; margin: 10px auto"
    >
      <div class="card card-body text-center">
        <form enctype="multipart/form-data">
          <div class="mb-3">
            <input
              type="file"
              class="form-control"
              placeholder="Выбрать"
              accept=".csv"
              ref="file"
              @change="changeUploadCSV"
            />
          </div>
          <button class="btn btn-success" @click.prevent="uploadCSV">
            Загрузить
          </button>
        </form>
      </div>
    </div>
    <div
      class="collapse"
      id="collapseExample"
      style="width: 50%; margin: 10px auto"
    >
      <div class="card card-body text-center">
        <form>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Фамилия"
              v-model="expert.last_name"
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Имя"
              v-model="expert.name"
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Отчество"
              v-model="expert.second_name"
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Должность"
              v-model="expert.position"
            />
          </div>
          <div class="mb-3">
            <input
              type="date"
              class="form-control"
              placeholder="Дата рождения"
              v-model="expert.birth_date"
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model="expert.email"
            />
          </div>
          <div class="mb-3">
            <input
              type="phone"
              class="form-control"
              placeholder="Телефон"
              v-model="expert.phone"
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
            <label for="floatingTextarea">Направление деятельности</label>
          </div>

          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              rows="3"
              style="height: 100%"
              v-model="expert.misc"
            ></textarea>
            <label for="floatingTextarea">Примечание</label>
          </div>
          <a
            style="margin: 0 auto; cursor: pointer"
            class="btn-get-started"
            @click="addExpert"
            >Сохранить</a
          >
        </form>
      </div>
    </div>

    <div class="row container" v-if="isExperts">
      <div class="col-md-6 col-lg-4 col-sm-12">
        <div class="card" v-for="expert in experts" :key="expert.id">
          <img
            :src="`http://localhost:5000/static/` + expert.image_url"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ expert.last_name }} {{ expert.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ expert.position }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">{{ expert.email }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">{{ expert.phone }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">{{ expert.cert }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ expert.direction }}
            </h6>
            <hr />
            <div style="display: flex; justify-content: space-around">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#editExpertModal"
                @click="editExpert(expert.id)"
              >
                Изменить
              </button>
              <button type="button" class="btn btn-danger">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="alert alert-secondary text-center"
      role="alert"
      v-else
      style="width: 50%; margin: 0 auto"
    >
      Экспертов нет!
    </div>
    <EditExpertModal />
  </section>
</template>

<script lang="ts">
import axios from "axios";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import EditExpertModal from "./EditExpertModal.vue";

export default defineComponent({
  components: {
    EditExpertModal,
  },

  // methods: {
  //   uploadCSV() {
  //     console.log(this.$refs.file)
  //   },
  // },
  setup() {
    const expert = reactive({
      id: 0,
      last_name: "",
      name: "",
      second_name: "",
      position: "",
      birth_date: "",
      email: "",
      phone: "",
      cert: "",
      direction: "",
      misc: "",
      image_url: "",
      created_at: new Date(Date.now()),
    });

    const isOpen = ref(false);
    const isExperts = ref(false);
    const isOpenEditExpert = ref(false);
    const store = useStore();
    const file = ref(null);

    const getExperts = async () => {
      const result = await axios.get("http://localhost:5000/api/v1/experts");
      if (result.data.status) {
        isExperts.value = true;
        store.commit("setExperts", result.data.data);
      }
    };

    const addExpert = async () => {
      const result = await axios.post(
        "http://localhost:5000/api/v1/experts",
        {
          expert: expert,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${store.getters.getJWT}`,
          },
        }
      );

      if (result.data) {
        if (result.data.status) {
          console.log("Success");
        }
        await getExperts();
      } else {
        console.log("Error");
      }
    };

    onMounted(async () => {
      await getExperts();
    });

    const experts = computed(() => store.getters.getExperts);
    const editedExpert = computed(() => store.getters.getExpert);

    if (experts.value.length > 0) isExperts.value = true;
    else isExperts.value = false;

    const changeUploadCSV = (e: any) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      file.value = files[0];
    };

    const uploadCSV = async () => {
      let formData = new FormData();
      formData.append("file", file.value!);
      await axios
        .post("http://localhost:5000/api/v1/experts/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    };

    const editExpert = async (id: number) => {
      isOpenEditExpert.value = true;
      await store.dispatch("getSingleExpertAction", id);
    };

    return {
      experts: experts,
      isExperts: isExperts,
      expert: expert,
      isOpen: isOpen,
      editedExpert: editedExpert,
      addExpert: addExpert,
      editExpert: editExpert,
      uploadCSV: uploadCSV,
      changeUploadCSV: changeUploadCSV,
    };
  },
});
</script>

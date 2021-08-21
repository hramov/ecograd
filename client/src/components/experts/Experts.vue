<template>
  <section class="dash-experts" id="dash-experts">
    <div class="text-center">
      <h1>
        Эксперты /
        <button
          class="btn btn-success"
          type="button"
          id="addExpertBtn"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          @click="isOpen = !isOpen"
        >
          <p v-if="!isOpen">Добавить</p>
          <p v-else>Скрыть</p>
        </button>
      </h1>
    </div>
    <br />
    <div
      class="collapse"
      id="collapseExample"
      style="width: 50%; margin: 10px auto"
    >
      <div class="card card-body text-center">
        <form>
          <div class="form-group">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="expert.userid"
            >
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.last_name }} {{ user.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Должность"
              v-model="expert.position"
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
            @click.prevent="addExpert"
            >Сохранить</a
          >
        </form>
      </div>
    </div>

    <div class="row" v-if="isExperts">
      <div
        class="col-md-6 col-lg-4 col-sm-12 col-xl-4"
        v-for="uexpert in uexperts"
        :key="uexpert.id"
      >
        <div class="card">
          <img
            v-if="uexpert.image_url"
            :src="`http://localhost:5000/` + uexpert.image_url"
            class="card-img-top"
            alt="..."
          />
          <img
            v-else
            :src="`http://localhost:5000/users/img/dummy.png`"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body text-left">
            <h5 class="card-title">
              {{ uexpert.last_name }} {{ uexpert.name }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              <i class="fa fa-male"></i>{{ uexpert.expert.position }}
            </h6>
            <hr />
            <h6 class="card-subtitle mb-2 text-muted">
              <i class="fa fa-envelope-square"></i>{{ uexpert.email }}
            </h6>
            <hr />
            <h6 class="card-subtitle mb-2 text-muted">
              <i class="fa fa-phone"></i>{{ uexpert.phone }}
            </h6>
            <hr />
            <h6
              class="card-subtitle mb-2 text-muted"
              v-for="c in uexpert.expert.cert.split(';')"
              :key="c"
            >
              <i class="fa fa-certificate"></i>{{ c }}
            </h6>
            <hr />
            <h6
              class="card-subtitle mb-2 text-muted"
              v-for="dir in uexpert.expert.direction.split(';')"
              :key="dir"
            >
              <i class="fa fa-compass"></i>{{ dir }}
            </h6>
            <hr />
            <h6 class="card-subtitle mb-2 text-muted">
              <i class="fa fa-compass"></i>{{ uexpert.expert.misc }}
            </h6>
            <hr />
            <div style="display: flex; justify-content: space-around">
              <!-- <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#editExpertModal"
                @click="editExpert(uexpert.id)"
              >
                Изменить
              </button> -->
              <button
                type="button"
                class="btn btn-danger"
                @click.prevent="deleteExpert(uexpert.id)"
              >
                Удалить
              </button>
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
import { IExpert, IOrder, IUser } from "./../../custom/interfaces";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import EditExpertModal from "./EditExpertModal.vue";

export default defineComponent({
  components: {
    EditExpertModal,
  },

  setup() {
    let expert: IExpert = reactive({
      id: 0,
      userid: 0,
      position: "",
      cert: "",
      direction: "",
      misc: "",
      orders: [] as IOrder[],
      user: {} as IUser,
    });

    const isOpen = ref(false);
    const isExperts = ref(false);
    const isOpenEditExpert = ref(false);
    const store = useStore();
    const file = ref(null);
    const users = computed(() => store.getters.getUsers);
    const uexperts = computed(() => store.getters.getUExperts);

    const getExperts = async () => {
      await store.dispatch("getExpertsAction");
      await store.dispatch("getUsersAction");
      await store.dispatch("getUExpertsAction");
      isExperts.value = true;
    };

    const addExpert = async () => {
      console.log(expert);
      await store.dispatch("addExpertAction", expert);
      document.getElementById("addExpertBtn")!.click();
      await getExperts();
    };

    onMounted(async () => {
      await getExperts();
    });

    const experts = computed(() => store.getters.getExperts);
    const editedExpert = computed(() => store.getters.getExpert);

    if (experts.value.length > 0) isExperts.value = true;
    else isExperts.value = false;

    const editExpert = async (id: number) => {
      isOpenEditExpert.value = true;
      await store.dispatch("getUExpertAction", id);
    };

    const deleteExpert = async (id: number) => {
      await store.dispatch("deleteExpertAction", id);
      await getExperts();
    };

    return {
      users: users,
      experts: experts,
      uexperts: uexperts,
      isExperts: isExperts,
      expert: expert,
      isOpen: isOpen,
      editedExpert: editedExpert,
      addExpert: addExpert,
      editExpert: editExpert,
      deleteExpert: deleteExpert,
    };
  },
});
</script>

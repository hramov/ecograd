<template>
  <section class="team" id="team">
    <div class="text-center">
      <h1>Наши эксперты</h1>
      <div class="small mb-3">
        Список экспертов по экспертизе проектной документации и результатам
        инженерных изысканий
      </div>
      <br />
      <div class="row">
        <div
          class="col-md-4 col-lg-4 col-sm-6 col-xl-3"
          v-for="expert in experts"
          :key="expert.id"
        >
          <div class="card">
            <img
              v-if="expert.image_url"
              :src="backEndUrl + expert.image_url"
              class="card-img-top"
              alt="..."
            />
            <img
              v-else
              :src="backEndUrl + `/uploads/avatars/dummy.jpg`"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body text-left">
              <h5 class="card-title">
                {{ expert.last_name }} {{ expert.name }}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <i class="fa fa-male"></i>{{ expert.position }}
              </h6>
              <hr />
              <h6
                class="card-subtitle mb-2 text-muted">
                <i class="fa fa-certificate"></i>{{ expert.cert }}
              </h6>
              <hr />
              <h6
                class="card-subtitle mb-2 text-muted"
              >
                <i class="fa fa-compass"></i>{{ expert.misc }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const experts = computed(() => store.getters.getExperts);
    const backEndUrl = computed(() => store.getters.getBackendUrl)

    onMounted(async () => {
      await store.dispatch("getExpertsAction");
    });

    return {
      experts: experts,
      backEndUrl: backEndUrl
    };
  },
});
</script>
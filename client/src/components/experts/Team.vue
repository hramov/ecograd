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
          :key="expert.expert.id"
        >
          <div class="card">
            <img
              v-if="expert.image_url"
              :src="`http://localhost:5000/` + expert.image_url"
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
                {{ expert.last_name }} {{ expert.name }}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <i class="fa fa-male"></i>{{ expert.expert.position }}
              </h6>
              <hr />
              <h6
                class="card-subtitle mb-2 text-muted"
                v-for="c in expert.expert.cert.split(';')"
                :key="c"
              >
                <i class="fa fa-certificate"></i>{{ c }}
              </h6>
              <hr />
              <h6
                class="card-subtitle mb-2 text-muted"
                v-for="dir in expert.expert.direction.split(';')"
                :key="dir"
              >
                <i class="fa fa-compass"></i>{{ dir }}
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
    const experts = computed(() => store.getters.getUExperts);

    onMounted(async () => {
      await store.dispatch("getUExpertsAction");
    });

    return {
      experts: experts,
    };
  },
});
</script>
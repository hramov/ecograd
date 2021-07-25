<template>
  <section class="team" id="team">
    <div class="text-center">
      <h1>Наши эксперты</h1>
      <div class="small mb-3">
        Список экспертов по экспертизе проектной документации и результатам
        инженерных изысканий
      </div>

      <div class="row">

        <div class="col-md-6 col-lg-3 col-sm-12 mb-3" v-for="expert in experts" :key="expert.id">
          <div class="card">
            <img
              :src="`http://localhost:5000/static/${expert.image_url}`"
              class="card-img-top"
              :alt="expert.last_name"
            />
            <div class="card-body">
              <!-- <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p> -->
              <h5 class="card-title" style="margin-bottom: 5px;">{{ expert.last_name }} {{ expert.name }}</h5>
              <p class="">Должность: {{ expert.position }}</p>
              <p class="">Сертификаты: {{ expert.cert }}</p>
              <p class="">Направления: {{ expert.direction }}</p>
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
    const store = useStore()
    const experts = computed(() => store.getters.getExperts)

    onMounted(async() => {
      await store.dispatch('getExpertsAction')
    })

    return {
      experts: experts
    }
  },
});
</script>

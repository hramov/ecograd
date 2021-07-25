<template>
  <section class="intro" id="intro">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12 col-sm-12 text-center mt-5">
        <h1>ООО "ЭкоГрадЪ"</h1>
        <p class="fs-5 text-muted">
          Негосударственная <a href="/expertise">экспертиза</a> проектной
          документации и инженерных изысканий
        </p>
        <br />
        <p>Телефон: +7 (3852) 71-71-60</p>
        <br />
        <p>E-mail: oooecograd@mail.ru</p>
        <br />
        <BuyButton />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-sm-12 text-center">
        <div class="intro_img">
          <img src="assets/img/intro.png" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BuyButton from "./../BuyButton.vue";
export default defineComponent({
  components: {
    BuyButton,
  },
});
</script>

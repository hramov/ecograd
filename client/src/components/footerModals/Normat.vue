<template>
  <div
    class="modal fade"
    id="normatModal"
    tabindex="-1"
    aria-labelledby="normatModalLable"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="buyModalLable">Нормативная база</h5>
          <button
            id="closeBtn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li class="list-group-item">
              <a href="https://экоградъ22.рф/ekspertiza/337-fz.docx"
                >О ВНЕСЕНИИ ИЗМЕНЕНИЙ В ГРАДОСТРОИТЕЛЬНЫЙ КОДЕКС РОССИЙСКОЙ
                ФЕДЕРАЦИИ И ОТДЕЛЬНЫЕ ЗАКОНОДАТЕЛЬНЫЕ АКТЫ РОССИЙСКОЙ ФЕДЕРАЦИИ
                от 28 ноября 2011 года (337-ФЗ)</a
              >
            </li>
            <li class="list-group-item">
              <a
                href="https://экоградъ22.рф/ekspertiza/postan_145_05[1].03.2007.docx"
                >Постановление правительства №145 от 5 марта 2007 года</a
              >
            </li>
            <li class="list-group-item">
              <a
                href="https://экоградъ22.рф/ekspertiza/postan_87_16[1].02.2008.docx"
                >Постановление правительства №87 от 16 февраля 2008 года</a
              >
            </li>
            <li class="list-group-item">
              <a
                href="https://экоградъ22.рф/ekspertiza/forma%20zakliuchenia.docx"
                >Форма заключения на проектную документацию</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
a {
  color: black;
}
a:hover {
  color: darkgray;
}
</style>
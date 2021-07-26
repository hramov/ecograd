<template>
  <div
    class="modal fade"
    id="documentsModal"
    tabindex="-1"
    aria-labelledby="documentsModalLable"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="buyModalLable">Документы</h5>
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
              <a href="http://экоградъ22.рф/documents/pismo.doc"
                >Форма письма обращения для проведения негосударственной
                экспертизы проектной документации</a
              >
            </li>
            <li class="list-group-item">
              <a href="http://экоградъ22.рф/documents/pismo.opis.doc"
                >Приложение/опись к письму обращения для проведения
                негосударственной экспертизы</a
              >
            </li>
            <li class="list-group-item">
              <a href="http://экоградъ22.рф/documents/zaiavlenie.doc"
                >Заявка на проведение негосударственной экспертизы проектной
                документации
              </a>
            </li>
            <li class="list-group-item">
              <a href="http://экоградъ22.рф/documents/anketa.doc"
                >Анкета заявителя</a
              >
            </li>
            <li class="list-group-item">
              <a href="http://экоградъ22.рф/documents/aktLO.doc"
                >Акт приема передачи документов на экспертизу линейного
                объекта</a
              >
            </li>
            <li class="list-group-item">
              <a href="http://экоградъ22.рф/documents/aktoks.doc"
                >Акт приема передачи документов на экспертизу объекта
                капитального строительства</a
              >
            </li>
            <li class="list-group-item">
              <a href="http://экоградъ22.рф/documents/doverennost.doc"
                >Доверенность</a
              >
            </li>
            <li class="list-group-item">
              <a href="http://экоградъ22.рф/documents/svedenia.doc"
                >Сведения об объекте
              </a>
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
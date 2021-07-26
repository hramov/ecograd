<template>
  <div
    class="modal fade"
    id="uploadCapitalModal"
    tabindex="-1"
    aria-labelledby="uploadCapitalModalLable"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="buyModalLable">
            Форма добавления документов объекта капитального строительства
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-left">
          <form>
            <div class="form-group">
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="Адрес объекта"
                required
              />
            </div>
            <hr />
            <h5 class="text-muted">Разрешительные документы</h5>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Градостроительный план земельного участка</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Технические условия</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Задание на проектирование подписанное заказчиком электронной
                подписью
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Доверенность</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">СРО на проектирование</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Пояснительная записка</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Схема планировочной организации земельного участка
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Архитектурные решения</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Конструктивные и объемно-планировочные решения
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Система электроснабжения</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Система водоснабжения</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Отопление вентиляция и кондиционирование воздуха, тепловые сети
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Сети связи</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Система газоснабжения</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Проект организации строительства</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Проект организации работ по сносу пли демонтажу объектов
                капитального строительства
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Перечень мероприятий по охране окружающей среды
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Мероприятия по обеспечению пожарной безопасности
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Мероприятия по обеспечению доступа инвалидов
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Требования к безопасной эксплуатации объекта капитального
                строительства
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Перечень мероприятий по гражданской обороне, мероприятий по
                предупреждению чрезвычайных ситуаций природного и техногенного
                характера
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <hr />

            <h5 class="text-muted">Инженерные изыскания</h5>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Техническое задание на выполнение инженерных изысканий
                утвержденное заказчиком электронной подписью
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>
            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Программа инженерных изысканий утвержденное заказчиком
                электронной подписью
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>
            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">СРО на проектирование инженерных изысканий</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>
            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Отчет по Инженерно-геологическим изысканиям</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>
            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Отчет по Инженерно-геодезическим изысканиям</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>
            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Отчет по Инженерно-экологическим изысканиям</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>
            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Отчет по Инженерно-гидрометеорологичекским изысканиям
              </div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>

            <hr />
            <h5 class="text-muted">Смета</h5>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Смета</div>
              <div class="col">
                <div v-if="!isImage" class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                  />
                </div>
              </div>
            </div>
          </form>

          <hr />
          <div class="text-center">
            <button type="button" class="btn btn-success">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  //   setup() {
  //     return {
  //     };
  //   },
});
</script>

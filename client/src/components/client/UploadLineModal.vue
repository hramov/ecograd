<template>
  <div
    class="modal fade"
    id="uploadLineModal"
    tabindex="-1"
    aria-labelledby="uploadLineModalLable"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="buyModalLable">
            Форма добавления документов линейного объекта {{ order.object }}
          </h5>
          <button
            id="closeBtn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-left">
          <form>
            <h5 class="text-muted">Разрешительные документы</h5>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Cхема размещения линейного объекта</div>
              <div class="col">
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    @change="changeFile"
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
                Постановление о согласовании схемы размещения линейного объекта
              </div>
              <div class="col">
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Задание на проектирование (подписанное заказчиком электронной
                подписью)
              </div>
              <div class="col">
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Проект полосы отвода</div>
              <div class="col">
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">
                Технологические и конструктивные решения линейного объекта.
                Искусственные сооружения
              </div>
              <div class="col">
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
                  />
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin: 0 !important; padding: 0 !important"
            >
              <div class="col">Мероприятия по охране окружающей среды</div>
              <div class="col">
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
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
                <div class="form-group">
                  <input
                    id="image_url"
                    type="file"
                    class="form-control"
                    placeholder="Файл"
                    ref="file"
                    @change="changeFile"
                  />
                </div>
              </div>
            </div>
          </form>

          <hr />
          <div class="text-center">
            <button
              type="button"
              class="btn btn-success"
              @click.prevent="uploadFiles"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const files: any[] = [];
    const disabled = ref(true);
    const status = ref(false);
    const order = computed(() => store.getters.getOrder);

    const changeFile = (e: any) => {
      if (e.target.files[0]) {
        files.push(e.target.files[0]);
        if (files.length > 2) disabled.value = false;
      }
    };

    const uploadFiles = async () => {
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file);
      }

      console.log(order.value)

      status.value = await store.dispatch("uploadDocsAction", {
        id: order.value.id,
        formData: formData,
      });

      await store.dispatch("getOrdersAction");

      setTimeout(() => {
        document.getElementById("closeBtn")!.click();
      }, 2000);
    };

    return {
      changeFile,
      uploadFiles,
      status: status,
      order: order
    };
  },
});
</script>

<template>
	<div v-if="!userStore.user" style="margin-top: 50px" class="container">
		<div class="alert alert-warning" role="alert">
			Для того, чтобы получить возможность добавлять заказы необходимо
			заключить договор. Далее вам будет предоставлен доступ к системе
		</div>
	</div>
	<div class="add-project-contaider" v-else>
		<h2 style="text-align: center">Добавить объект</h2>
		<!-- <hr style="width: 90%; margin: 20px auto" /> -->
		<form class="add-project-contaider-colum" @submit.prevent="createOrder">
			<div class="project-name">
				<h4 style="margin-left: 10px">Описание</h4>
				<textarea
					style="resize: none"
					rows="3"
					placeholder="Введите название проектной документации..."
					class="form-control form-margin-texarea"
					v-model="order.title"
					@input="isNameInput = true"
					@emptied="isNameInput = false"
					required
				></textarea>
				<div style="margin: 0px -10px 20px 10px" v-if="isNameInput">
					<label>Заявление на проведение экспертизы</label>
					<input
						type="file"
						class="form-control form-size"
						@change="
							isFileLoaded = true;
							addFile($event, '0');
						"
						required
					/>
				</div>
				<select
					v-if="isFileLoaded"
					style="width: 100%"
					class="accordion-button collapsed form-control form-margin-texarea form-select"
					name="registraistion-name-sex"
					@change="
						isTypeSelected = true;
						loadSections();
					"
					v-model="order.exp_type"
					required
				>
					<option disabled value="0">Вид экспертизы</option>
					<option value="1">
						Результаты инженерно-экологических изысканий (РИИ)
					</option>
					<option value="2">Проектная документация (ПД)</option>
					<option value="3">РИИ и ПД</option>
				</select>
				<select
					v-if="isTypeSelected && order.exp_type != '1'"
					style="width: 100%"
					class="accordion-button collapsed form-control form-margin-texarea form-select"
					name="registraistion-name-sex"
					v-model="order.object_type"
					@change="
						isObjectTypeSelected = true;
						loadSections();
					"
					required
				>
					<option disabled value="0">Тип объекта</option>
					<option value="1">Объект капитального строительства</option>
					<option value="2">Линейный объект</option>
				</select>
				<textarea
					style="resize: none"
					rows="3"
					v-if="isObjectTypeSelected || order.exp_type == '1'"
					placeholder="Введите шифр проектной документации..."
					class="form-control form-margin-texarea"
					v-model="order.docs_cipher"
					required
				></textarea>
				<textarea
					style="resize: none"
					rows="3"
					v-if="isObjectTypeSelected || order.exp_type == '1'"
					placeholder="Введите шифр РИИ..."
					class="form-control form-margin-texarea"
					v-model="order.rii_cipher"
					required
				></textarea>
			</div>

			<div class="add-project-form" v-if="isShowSections">
				<h4>Разделы</h4>
				<div class="add-project-checkbox">
					<div class="add-project-checkbox-up">
						<div
							class="add-project-checkbox-up-text"
							v-for="(section, index) in sections"
							:key="index"
						>
							<div
								v-if="!section.sub"
								class="add-project-checkbox-up-text"
							>
								<div class="add-project-checkbox-text">
									<label
										class="form-check-label"
										for="flexCheckChecked"
									>
										<input
											class="form-check-input"
											type="checkbox"
											id="flexCheckChecked"
											v-model="section.checked"
										/>
										{{ section.code }}
										{{ section.title }}</label
									>
								</div>
								<div class="add-project-input-up">
									<input
										type="file"
										class="form-control form-size"
										:disabled="!section.checked"
										:ref="section.code"
										@change="addFile($event, section.code)"
									/>
								</div>
							</div>
							<div
								class="accordion accordion-flush"
								id="accordionExample"
								v-else
							>
								<div class="accordion-item">
									<h2
										class="accordion-header"
										style="width: 99.2%; margin: 8px 0"
										id="headingTwo"
									>
										<button
											class="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseTwo"
											aria-expanded="false"
											aria-controls="collapseTwo"
										>
											{{ section.code }}
											{{ section.title }}
										</button>
									</h2>
									<div
										id="collapseTwo"
										class="accordion-collapse collapse collapse-margin"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample"
									>
										<div
											class="accordion-body"
											v-for="(sub, index) in section.sub"
											:key="index"
										>
											<div class="accordion-body-text">
												<p>
													<label
														class="form-check-label"
														for="flexCheckChecked"
													>
														<input
															class="form-check-input"
															type="checkbox"
															id="flexCheckChecked"
															v-model="
																sub.checked
															"
														/>
														{{ sub.code }}
														{{ sub.title }}</label
													>
												</p>
											</div>
											<div class="accordion-body-input">
												<input
													name="myFile"
													type="file"
													class="form-control form-size"
													:disabled="!sub.checked"
													:ref="sub.code"
													@change="
														addFile(
															$event,
															sub.code,
														)
													"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="sections.length" style="text-align: center">
					<button
						class="btn"
						type="submit"
						style="
							width: 20%;
							font-weight: bold;
							background-color: #7dce94;
						"
					>
						Добавить
					</button>
				</div>
				<div v-else style="width: 60%; margin: 0 auto">
					<div class="alert alert-danger" role="alert">
						Ошибка при загрузке секций
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { ApiManager } from '../../api/manager';
import { Client, Expert, useUserStore } from '../../store/user.store';

export interface Order {
	id: number;
	title: string;
	docs_cipher: string;
	rii_cipher: string;
	exp_type: 0 | 1 | 2;
	object_type: 0 | 1 | 2;
	sections: Section[];
	client: Client;
	expert: Expert;
}

export interface Section {
	id: number;
	code: string;
	title: string;
	checked: boolean;
	sub: Section[];
	arrange: string;
	attach: any;
	status: 'new' | 'taken' | 'done';
}

const order = ref({
	exp_type: 0,
	object_type: 0,
} as Order);

const sections = ref([] as Section[]);
const formData = ref(new FormData());
const isNameInput = ref(false);
const isFileLoaded = ref(false);
const isTypeSelected = ref(false);
const isObjectTypeSelected = ref(false);

const userStore = useUserStore();

const emit = defineEmits(['add-project']);

const isShowSections = computed(() => {
	return (
		isNameInput.value &&
		isFileLoaded.value &&
		isTypeSelected.value &&
		(isObjectTypeSelected.value || order.value.exp_type == 1)
	);
});

const loadSections = async () => {
	sections.value = (
		await ApiManager.get<Section[]>(
			'/order/sections-dict/' +
				order.value.exp_type +
				'/' +
				order.value.object_type,
		)
	).data;
};

const createOrder = async () => {
	checkSubsection();

	const loadedSections = sections.value.filter(
		(section: Section) => section.checked,
	);

	if (loadedSections.length == 0) {
		alert('Необходимо загрузить хотя бы один раздел!');
		return;
	}

	formData.value.append('0', 'Заявление на проведение экспертизы');

	for (const section of loadedSections) {
		if (section.sub) {
			for (const sub of section.sub) {
				formData.value.append(sub.code, sub.title);
			}
		}
		formData.value.append(section.code, section.title);
	}

	if (!isFormDataHasItems(formData.value)) {
		alert('Необходимо выбрать хотя бы один раздел');
		return;
	}

	const orderResult = await ApiManager.post<Order, Order>(
		'/order',
		order.value,
	);

	if (!orderResult.data.id) {
		return;
	}

	const result = await ApiManager.post<any, any>(
		'/order/upload-file/' + orderResult.data.id,
		formData,
	);
	formData.value = new FormData();
	alert('Проект успешно добавлен');
	emit('add-project', true);
	order.value = {} as Order;
	sections.value = [];
};

const checkSubsection = () => {
	const sectionsWithSub = sections.value.filter(
		(section: Section) => section.sub,
	);
	for (const section of sectionsWithSub) {
		if (section.sub.filter((sub: Section) => sub.checked).length > 0) {
			section.checked = true;
			section.sub = section.sub.filter((sub: Section) => sub.checked);
		} else {
			section.checked = false;
		}
	}
};

const addFile = (ev: Event, code: string) => {
	const target = ev.target as HTMLInputElement;
	formData.value.append(code, target.files![0]);
};

const isFormDataHasItems = (formData: FormData) => {
	let i = 0;
	for (const val of formData.values()) {
		if (val) i++;
	}
	return !!i;
};

const showFormData = (formData: FormData) => {
	for (const val of formData.values()) {
		console.log(val);
	}
};
</script>

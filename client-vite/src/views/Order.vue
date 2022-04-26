<template>
	<section class="client-orders">
		<div
			v-if="userStore.isExpert && !orders.length"
			class="alert alert-warning"
			role="alert"
			style="width: 50%; margin: 0 auto; text-align: center"
		>
			Пока нет назначенных проектов
		</div>
		<div v-else>
			<div class="project">
				<div class="add-project-container">
					<ul class="list-group">
						<button
							type="button"
							class="add-project-bt btn list-group-item-action"
							@click="addProject = true"
							v-if="userStore.isClient"
						>
							Добавить объект
						</button>
						<li
							style="cursor: pointer"
							class="list-group-item list-group-item-action list-project-color"
							:class="{ selected: selectedId == order.id }"
							@click="
								addProject = false;
								selectedId != order.id
									? chooseOrder(order.id)
									: null;
							"
							v-for="order in orders"
							:key="order.id"
						>
							<img
								align="left"
								:src="apiUrl + 'public/img/change.png'"
								style="width: 20px"
								v-if="
									changes
										.map((change) => change.order_id)
										.includes(order.id)
								"
							/>
							{{ order.title }}
						</li>
					</ul>
				</div>
				<div class="divider"></div>

				<AddOrder
					v-if="addProject"
					style="width: 75%"
					@add-project="addProjectHandler"
				/>

				<div
					class="info-project-container"
					v-if="order.id && !addProject"
				>
					<h2 style="margin: 0 auto; margin-bottom: 30px">
						{{ order.title }}
					</h2>
					<div
						style="
							width: 100%;
							margin-left: 10px;
							margin-bottom: 30px;
						"
						v-if="!addProject"
					>
						<h4>Загруженные справки о внесении изменений</h4>
						<table class="table">
							<thead>
								<tr>
									<th scope="col">№</th>
									<th scope="col">Документ</th>
									<th scope="col">Дата загрузки</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(inquire, index) in inquires"
									:key="index"
								>
									<th scope="row">{{ index + 1 }}</th>
									<td>
										<a :href="apiUrl + inquire.path">{{
											inquire.title
										}}</a>
									</td>
									<td>{{ inquire.createdAt }}</td>
								</tr>
							</tbody>
						</table>
						<div style="display: flex">
							<input
								type="file"
								class="form-control"
								:ref="section.code"
								@change="
									addInquireFile($event, 'inquire');
									inquireAttached = true;
								"
								style="width: 40%"
							/>
							<button
								class="btn"
								style="
									background-color: #7dce94;
									font-weight: bold;
									margin-left: 20px;
								"
								@click="addInquire"
								:disabled="!inquireAttached"
							>
								Загрузить
							</button>
						</div>
					</div>
					<div class="existing-project" v-if="!addProject">
						<ul class="list-group">
							<h4>Загруженные разделы</h4>
							<li
								class="list-group-item list-group-item-action color-selection"
								:class="{
									green: section.status == 'done',
									yellow: section.status == 'taken',
									grey: section.status == 'new',
									selected: selectedSectionId == section.id,
								}"
								style="
									text-align: justify;
									word-wrap: break-word;
								"
								v-for="section in sections"
								:key="section.id"
								@click="
									selectedSectionId != section.id
										? chooseSection(section.id)
										: null
								"
							>
								<img
									align="left"
									:src="apiUrl + 'public/img/change.png'"
									style="width: 20px; margin-right: 10px"
									v-if="
										changes
											.map((change) => change.section_id)
											.includes(section.id)
									"
								/>
								{{ section.arrange }} {{ section.title }}
							</li>
							<li
								class="list-group-item list-group-item-action add-project-bt"
								style="text-align: center"
								@click="showAddSection = true"
								v-if="getIsClient && sectionsToAdd.length > 0"
							>
								<button>Добавить раздел</button>
							</li>
						</ul>
					</div>

					<div
						class="add-project-form"
						v-if="
							order.object_type &&
							order.exp_type &&
							showAddSection &&
							!addProject
						"
						style="width: 65%"
					>
						<h4>Доступные разделы</h4>
						<div class="add-project-checkbox">
							<div class="add-project-checkbox-up">
								<div
									class="add-project-checkbox-up-text"
									v-for="section in sectionsToAdd"
									:key="section.code"
								>
									<div
										v-if="!section.sub"
										class="add-project-checkbox-up-text"
									>
										<div class="add-project-checkbox-text">
											<label
												class="form-check-label"
												for="flexCheckChecked"
												style="text-align: left"
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
												@change="
													addFile(
														$event,
														section.code,
													)
												"
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
													v-for="(
														sub, index
													) in section.sub"
													:key="index"
												>
													<div
														class="accordion-body-text"
													>
														<label
															class="form-check-label"
															for="flexCheckChecked"
															style="
																text-align: left;
															"
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
															{{
																sub.title
															}}</label
														>
													</div>
													<div
														class="accordion-body-input"
													>
														<input
															name="myFile"
															type="file"
															class="form-control form-size"
															:disabled="
																!sub.checked
															"
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
								style="text-align: center; width: 20%"
								class="btn btn-success"
								@click="addSection"
							>
								Добавить
							</button>
						</div>
					</div>

					<div
						class="project-status"
						v-if="section.id && !showAddSection && !addProject"
					>
						<div class="project-status-chapter">
							<ul class="list-group">
								<h4 style="text-align: center">
									{{ section.title }}
								</h4>
								<li
									class="list-group-item list-group-item-action file-data"
									v-for="file in attaches"
									:key="file.id"
								>
									<a :href="getDownloadURL(file.path)"
										><span
											>{{
												changes
													.map(
														(change) =>
															change.attach_id,
													)
													.includes(file.id)
													? '*'
													: ''
											}}
											{{ file.title }}</span
										></a
									>
									<span
										>{{
											new Date(
												file.createdAt,
											).toLocaleDateString()
										}}
										{{
											new Date(
												file.createdAt,
											).toLocaleTimeString()
										}}</span
									>
								</li>

								<li
									class="list-group-item list-group-item-action file-data"
									v-if="section.status != 'done'"
								>
									<input
										type="file"
										class="form-control"
										style="margin-top: 20px"
										:ref="section.code"
										@change="
											addFile($event, section.arrange)
										"
									/>
								</li>
							</ul>
							<div
								class="project-status-button"
								v-if="section.status != 'done'"
							>
								<button
									type="button"
									class="add-project-bt btn"
									style="margin-right: 20px"
									@click="addAttach"
								>
									Загрузить документ
								</button>
								<button
									class="btn btn-success"
									v-if="userStore.isExpert"
									@click="setSectionDone(section.id)"
								>
									Отметить законченным
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import BuyButton from './../BuyButton.vue';
import AddOrder from '../../views/order/AddOrder.vue';
import { onMounted, ref } from '@vue/runtime-core';
import { Order, Section, useOrderStore } from '../store/order.store';
import { Expert, useUserStore } from '../store/user.store';
import { ApiManager } from '../api/manager';

export interface Attach {
	id: number;
	path: string;
	title: string;
	is_new: boolean;
	createdAt: Date;
}

const orders = ref([] as Order[]);
const order = ref({} as Order);
const section = ref({} as Section);
const showAddSection = ref(false);
const sections = ref([] as Section[]);
const sectionsToAdd = ref([] as Section[]);
const attaches = ref([] as Attach[]);
let formData = new FormData();
const fileInquireUpload = ref({} as any);
let inquiryForm = new FormData();
const fileUpload = ref({} as any);
const inquireAttached = ref(false);

const changes = ref([
	{
		order_id: 0,
		section_id: 0,
		attach_id: 0,
	},
]);

const selectedId = ref(0);
const selectedSectionId = ref(0);
const inquires = ref([] as any[]);
const addProject = ref(false);
const apiUrl = process.env.VUE_APP_BACKEND;
const orderStore = useOrderStore();
const userStore = useUserStore();

onMounted(async () => await orderStore.getOrders());

const getOrders = async () => {
	if (userStore.isExpert) {
		orders.value = (await ApiManager.get<Order[]>('/order/expert')).data;
		changes.value = (
			await ApiManager.get<any>('/order/check-changes')
		).data;
	}
	if (userStore.isClient) {
		orders.value = (await ApiManager.get<Order[]>('/order/client')).data;
		changes.value = (
			await ApiManager.get<any>('/order/check-changes')
		).data;
	}
};

const setSectionDone = async (section_id: number) => {
	const sure = confirm('Завершить секцию?');
	if (sure) {
		await ApiManager.put<any, any>(
			'/order/change-section-status/' + section_id,
			{ new_status: 'done' },
		);
		alert('Секция помечена как законченная');
	}
};

const getDownloadURL = (path: string) => {
	return process.env.VUE_APP_BACKEND + path;
};

const addSection = async () => {
	for (const section of sectionsToAdd.value) {
		if (section.sub) {
			for (const sub of section.sub.filter(
				(sub: Section) => sub.checked,
			)) {
				formData.append(sub.code, sub.title);
			}
		}
		if (section.checked) {
			formData.append(section.code, section.title);
		}
	}

	if (isFormDataHasItems(formData)) {
		await ApiManager.post<Section, Section>(
			'/order/upload-file/' + order.value.id,
			formData,
		);

		formData = new FormData();
		alert('Раздел успешно добавлен');
		await chooseOrder(order.value.id!);
		showAddSection.value = false;
	}
};

const addFile = (ev: Event, code: string) => {
	fileUpload.value = ev.target as HTMLInputElement;
	formData.append(code, fileUpload.value.files![0]);
};

const addInquireFile = (ev: Event, code: string) => {
	fileInquireUpload.value = ev.target as HTMLInputElement;
	inquiryForm.append(code, fileInquireUpload.value.files![0]);
};

const addAttach = async () => {
	formData.append('order_id', String(order.value.id));
	formData.append('section_id', String(section.value.id));
	await ApiManager.post<any, any>('/order/upload-file-for-section', formData);
	formData = new FormData();
	changes.value = (await ApiManager.get<any>('/order/check-changes')).data;

	alert('Документ успешно загружен');
	await chooseSection(Number(section.value.id));
	fileUpload.value = null;
};

const addInquire = async () => {
	if (!isFormDataHasItems(inquiryForm)) {
		alert('Необходимо прикрепить файл!');
		return;
	}

	inquiryForm.append('order_id', String(order.value.id));
	await ApiManager.post<any, any>('/order/upload-inquire', inquiryForm);
	inquiryForm = new FormData();

	alert('Справка успешно загружена');
	await chooseOrder(Number(order.value.id));
	fileInquireUpload.value = null;
};

const chooseOrder = async (id: number) => {
	if (!id) return;

	selectedId.value = id;
	order.value = (await ApiManager.get<Order>('/order/' + id)).data;

	if (!order.value || !order.value.id) return;
	order.value.expert = (
		await ApiManager.get<Expert>(
			'/order/expert-for-order/' + order.value.id,
		)
	).data;

	inquires.value = (
		await ApiManager.get<any>('/order/inquire/' + order.value.id)
	).data;

	sections.value = (
		await ApiManager.get<Section[]>('/order/sections/' + order.value.id)
	).data.sort((a: Section, b: Section) =>
		Number(a.arrange) - Number(b.arrange) > 0 ? 1 : -1,
	);

	const candidate: Section[] = (
		await ApiManager.get<Section[]>(
			'/order/sections-dict/' +
				order.value.exp_type +
				'/' +
				order.value.object_type,
		)
	).data;

	const orderArrange = sections.value.map(
		(section: Section) => section.arrange,
	);

	sectionsToAdd.value = [];
	for (let i = 0; i < candidate.length; i++) {
		if (!orderArrange.includes(candidate[i].code)) {
			sectionsToAdd.value.push(candidate[i]);
			if (candidate[i].sub) {
				candidate[i].sub = candidate[i].sub.filter(
					(sub: Section) => !orderArrange.includes(sub.code),
				);
				if (candidate[i].sub && candidate[i].sub.length == 0) {
					sectionsToAdd.value.pop();
				} else {
					sectionsToAdd.value[this.sectionsToAdd.length - 1].sub =
						candidate[i].sub;
				}
			}
		}
	}
};

const chooseSection = async (id: number) => {
	selectedSectionId.value = id;
	showAddSection.value = false;
	section.value = (await ApiManager.get<any>('/order/section/' + id)).data;
	attaches.value = (
		await ApiManager.get<any>('/order/attaches-for-section/' + id)
	).data;
	changes.value = (await ApiManager.get<any>('/order/check-changes')).data;
};

const isFormDataHasItems = (formData: FormData) => {
	let i = 0;
	for (const val of formData.values()) {
		if (val) i++;
	}
	return !!i;
};

const addProjectHandler = async (data: any) => {
	if (data == true) {
		await getOrders();
		addProject.value = false;
	}
};
</script>

<style>
.green {
	background-color: #53d8a5a9;
	cursor: pointer;
}

.yellow {
	background-color: #feef7d9c;
	cursor: pointer;
}

.grey {
	background-color: #fffafa;
	cursor: pointer;
}

.selected {
	background-color: #add8e6;
}

.selected:hover {
	text-decoration: none;
	background-color: #add8e6;
}
</style>

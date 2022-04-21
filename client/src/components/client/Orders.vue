<template>
	<section class="client-orders">
		<div v-if="getIsExpert && !orders.length">
			Нет проектов
		</div>
		<div v-else>
			<h1 v-if="!order.id">Мои объекты</h1>
			<h3 v-else style="text-align: center">{{ order.title }}</h3>
			<h4 class="status-project-header" v-if="order.id">
				Статус выбранного объекта:
				{{
					order.status == 'new'
						? 'зарегистрирован'
						: order.status == 'taken'
						? 'у эксперта'
						: 'закончен'
				}}
			</h4>
			<div class="project">
				<div class="add-project-container">
					<ul class="list-group">
						<button
							type="button"
							class="add-project-bt btn list-group-item-action"
							@click="$router.push({ path: 'add-order' })"
							v-if="getIsClient"
						>
							Добавить проект
						</button>
						<li
							style="cursor: pointer"
							class="list-group-item list-group-item-action"
							:class="{ selected: selectedId == order.id }"
							@click="
								selectedId != order.id
									? chooseOrder(order.id)
									: null
							"
							v-for="order in orders"
							:key="order.id"
						>
							<img
								align="left"
								:src="getBackendURL() + 'public/img/change.png'"
								style="width: 20px"
								v-if="
									changes
										.map(change => change.order_id)
										.includes(order.id)
								"
							/>
							{{ order.title }}
						</li>
					</ul>
				</div>
				<div class="divider"></div>

				<div class="info-project-container" v-if="order.id">
					<div class="existing-project">
						<div v-if="getIsExpert" style="text-align: center">
							<p>Клиент: {{ order.client_name }}</p>
						</div>

						<div
							v-if="getIsClient && order.expert"
							style="text-align: center"
						>
							<p>Эксперт: {{ order.expert.name }}</p>
						</div>
						<div
							v-if="getIsClient && !order.expert"
							style="text-align: center"
						>
							<p>Эксперт еще не назначен</p>
						</div>
						<ul class="list-group">
							<p class="list-group-p">Загруженные разделы</p>
							<li
								class="list-group-item list-group-item-action color-selection"
								:class="{
									green: section.status == 'done',
									yellow: section.status == 'taken',
									grey: section.status == 'new',
									selected: selectedSectionId == section.id,
								}"
								style="text-align: justify; word-wrap: break-word;"
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
									:src="
										getBackendURL() +
											'public/img/change.png'
									"
									style="width: 20px; margin-right: 10px;"
									v-if="
										changes
											.map(change => change.section_id)
											.includes(section.id)
									"
								/>
								{{ section.arrange }} {{ section.title }}
							</li>
							<li
								class="list-group-item list-group-item-action"
								style="background-color: #CEDFFA; text-align: center"
								@click="showAddSection = true"
								v-if="getIsClient && sectionsToAdd.length > 0"
							>
								<button>
									Добавить раздел
								</button>
							</li>
						</ul>
					</div>
					<div v-if="showAddSection">
						<div class="add-project-form" v-if="order.type">
							<div class="add-project-checkbox">
								<div class="add-project-checkbox-up">
									<div
										class="add-project-checkbox-up-text"
										v-for="section in sectionsToAdd"
										:key="section.code"
									>
										<div v-if="!section.sub">
											<div
												class="add-project-checkbox-text"
											>
												<p>
													<input
														class="form-check-input"
														type="checkbox"
														value=""
														id="flexCheckChecked"
														v-model="
															section.checked
														"
													/>
													<label
														class="form-check-label"
														for="flexCheckChecked"
													>
														{{ section.code }}
														{{
															section.title
														}}</label
													>
												</p>
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
														v-for="(sub,
														index) in section.sub"
														:key="index"
													>
														<div
															class="accordion-body-text"
														>
															<p>
																<input
																	class="form-check-input "
																	type="checkbox"
																	id="flexCheckChecked"
																	v-model="
																		sub.checked
																	"
																/>
																<label
																	class="form-check-label"
																	for="flexCheckChecked"
																>
																	{{
																		sub.code
																	}}
																	{{
																		sub.title
																	}}</label
																>
															</p>
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
							<button class="btn btn-success" @click="addSection">
								Добавить
							</button>
						</div>
					</div>
					<div
						class="project-status"
						v-if="section.id && !showAddSection"
					>
						<div class="project-status-chapter">
							<ul class="list-group">
								<h2>{{ section.title }}</h2>
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
														change =>
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
									v-if="getIsExpert"
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

<script lang="ts">
import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { Order, Section } from '@/views/order/AddOrder.vue';
import { defineComponent } from '@vue/runtime-core';
import { mapGetters } from 'vuex';
import BuyButton from './../BuyButton.vue';

export interface Attach {
	id: number;
	path: string;
	title: string;
	is_new: boolean;
	createdAt: Date;
}

export default defineComponent({
	components: {
		BuyButton,
	},
	data() {
		return {
			orders: [] as Order[],
			order: {} as Order,
			section: {} as Section,
			showAddSection: false,
			sections: [] as Section[],
			sectionsToAdd: [] as Section[],
			attaches: [] as Attach[],
			formData: new FormData(),
			fileUpload: {} as any,
			changes: [
				{
					order_id: 0,
					section_id: 0,
					attach_id: 0,
				},
			],
			selectedId: 0,
			selectedSectionId: 0,
		};
	},

	computed: {
		...mapGetters(['getIsExpert', 'getIsClient']),
	},

	async mounted() {
		await this.getOrders();
	},

	methods: {
		async getOrders() {
			if (this.getIsExpert) {
				this.orders = await FetchDataProvider.get('/order/expert');
				this.changes = await FetchDataProvider.get(
					'/order/check-changes',
				);
			}
			if (this.getIsClient) {
				this.orders = await FetchDataProvider.get('/order/client');
				this.changes = await FetchDataProvider.get(
					'/order/check-changes',
				);
			}
		},

		async setSectionDone(section_id: number) {
			const sure = confirm('Завершить секцию?');
			if (sure) {
				await FetchDataProvider.patch(
					'/order/change-section-status',
					section_id,
					{ new_status: 'done' },
				);
				alert('Секция помечена как законченная');
			}
		},
		getDownloadURL(path: string) {
			return process.env.VUE_APP_BACKEND + path;
		},

		getBackendURL() {
			return process.env.VUE_APP_BACKEND;
		},

		async addSection() {
			for (const section of this.sectionsToAdd) {
				if (section.sub) {
					for (const sub of section.sub.filter(
						(sub: Section) => sub.checked,
					)) {
						this.formData.append(sub.code, sub.title);
					}
				}
				if (section.checked) {
					this.formData.append(section.code, section.title);
				}
			}

			if (this.isFormDataHasItems(this.formData)) {
				await FetchDataProvider.post(
					'/order/upload-file/' + this.order.id,
					this.formData,
				);

				this.formData = new FormData();
				alert('Раздел успешно добавлен');
				await this.chooseOrder(this.order.id!);
				this.showAddSection = false;
			}
		},

		addFile(ev: Event, code: string) {
			this.fileUpload = ev.target as HTMLInputElement;
			this.formData.append(code, this.fileUpload.files![0]);
		},

		async addAttach() {
			this.formData.append('order_id', String(this.order.id));
			this.formData.append('section_id', String(this.section.id));
			await FetchDataProvider.post(
				'/order/upload-file-for-section',
				this.formData,
			);
			this.formData = new FormData();
			this.changes = await FetchDataProvider.get('/order/check-changes');

			alert('Документ успешно загружен');
			await this.chooseSection(Number(this.section.id));
			this.fileUpload.value = null;
		},

		async chooseOrder(id: number) {
			this.selectedId = id;
			this.order = await FetchDataProvider.get('/order/' + id);
			this.order.expert = await FetchDataProvider.get(
				'/order/expert-for-order/' + this.order.id,
			);
			this.sections = (
				await FetchDataProvider.get('/order/sections/' + this.order.id)
			).sort((a: Section, b: Section) =>
				Number(a.arrange) - Number(b.arrange) > 0 ? 1 : -1,
			);

			const candidate: Section[] = await FetchDataProvider.get(
				'/order/sections-dict/' + this.order.type,
			);
			const orderArrange = this.sections.map(
				(section: Section) => section.arrange,
			);

			this.sectionsToAdd = [];
			for (let i = 0; i < candidate.length; i++) {
				if (!orderArrange.includes(candidate[i].code)) {
					this.sectionsToAdd.push(candidate[i]);
					if (candidate[i].sub) {
						candidate[i].sub = candidate[i].sub.filter(
							(sub: Section) => !orderArrange.includes(sub.code),
						);
						if (candidate[i].sub && candidate[i].sub.length == 0) {
							this.sectionsToAdd.pop();
						} else {
							this.sectionsToAdd[
								this.sectionsToAdd.length - 1
							].sub = candidate[i].sub;
						}
					}
				}
			}
		},

		async chooseSection(id: number) {
			this.selectedSectionId = id;
			this.showAddSection = false;
			this.section = await FetchDataProvider.get('/order/section/' + id);
			this.attaches = await FetchDataProvider.get(
				'/order/attaches-for-section/' + id,
			);
		},

		isFormDataHasItems(formData: FormData) {
			let i = 0;
			for (const val of formData.values()) {
				if (val) i++;
			}
			return !!i;
		},
	},
});
</script>

<style>
.green {
	background-color: #71c55d;
	cursor: pointer;
}

.yellow {
	background-color: #ced11f;
	cursor: pointer;
}

.grey {
	background-color: #d2d8d1;
	cursor: pointer;
}

.selected {
	border-color: #71c55d;
	background-color: white;
}

.selected:hover {
	text-decoration: none;
	background-color: #9dd193;
}
</style>

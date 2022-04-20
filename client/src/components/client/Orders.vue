<template>
	<section class="client-orders">
		<h1>Мои проекты</h1>
		<h4 class="status-project-header" v-if="order.id">
			Статус выбранного объекта: на рассмотрении у экспертов
		</h4>
		<div class="project">
			<div class="add-project-container">
				<ul class="list-group">
					<button
						type="button"
						class="add-project-bt btn list-group-item-action"
						@click="$router.push({ path: 'add-order' })"
					>
						Добавить проект
					</button>
					<li
						class="list-group-item list-group-item-action"
						@click="chooseOrder(order.id)"
						v-for="order in orders"
						:key="order.id"
					>
						{{ order.title }}
					</li>
				</ul>
			</div>
			<div class="divider"></div>

			<div class="info-project-container" v-if="order.id">
				<div class="existing-project">
					<ul class="list-group">
						<p class="list-group-p">Загруженные разделы</p>
						<li
							class="list-group-item list-group-item-action color-selection"
							style="text-align: justify; word-wrap: break-word;"
							v-for="section in order.sections"
							:key="section.id"
							@click="chooseSection(section.id)"
						>
							{{ section.arrange }} {{ section.title }}
						</li>
						<li
							class="list-group-item list-group-item-action"
							style="background-color: #CEDFFA; text-align: center"
							@click="showAddSection = true"
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
									v-for="(section, index) in sections"
									:key="index"
								>
									<div v-if="!section.sub">
										<div class="add-project-checkbox-text">
											<p>
												<input
													class="form-check-input"
													type="checkbox"
													value=""
													id="flexCheckChecked"
													v-model="section.checked"
												/>
												<label
													class="form-check-label"
													for="flexCheckChecked"
												>
													{{ section.code }}
													{{ section.title }}</label
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
																{{ sub.code }}
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
								v-for="file in section.attach"
								:key="file.id"
							>
								<span>{{ file.title }}</span>
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
							>
								<input
									type="file"
									class="form-control"
									style="margin-top: 20px"
									:ref="section.code"
									@change="addFile($event, section.arrange)"
								/>
							</li>
						</ul>
						<div class="project-status-button">
							<button
								type="button"
								class="add-project-bt btn"
								@click="addAttach"
							>
								Загрузить
							</button>
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
import BuyButton from './../BuyButton.vue';

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
			formData: new FormData(),
		};
	},

	async mounted() {
		this.orders = await FetchDataProvider.get('/order/client');
	},

	methods: {
		async addSection() {
			for (const section of this.sections.filter(
				(section: Section) => section.checked,
			)) {
				if (section.sub) {
					for (const sub of section.sub) {
						this.formData.append(sub.code, sub.title);
					}
				}
				this.formData.append(section.code, section.title);
			}

			await FetchDataProvider.post(
				'/order/upload-file/' + this.order.id,
				this.formData,
			);

			this.formData = new FormData();
		},

		addFile(ev: Event, code: string) {
			this.formData.append(code, ev!.target!.files[0]);
		},

		async addAttach() {
			this.formData.append('order_id', String(this.order.id));
			this.formData.append('section_id', String(this.section.id));
			await FetchDataProvider.post(
				'/order/upload-file-for-section',
				this.formData,
			);
			this.formData = new FormData();
		},

		async chooseOrder(id: number) {
			this.order = this.orders.find((order: Order) => order.id == id)!;
			this.order.sections = this.order.sections.filter(
				(section: Section) => section.attach.length > 0,
			);

			const candidate: Section[] = await FetchDataProvider.get(
				'/order/sections-dict/' + this.order.type,
			);

			const orderArrange = this.order.sections.map(
				(section: Section) => section.arrange,
			);
			for (let i = 0; i < candidate.length; i++) {
				if (!orderArrange.includes(candidate[i].code)) {
					this.sections.push(candidate[i]);
				}

				if (candidate[i].sub) {
					candidate[i].sub = candidate[i].sub.filter(
						(sub: Section) => !orderArrange.includes(sub.code),
					);
					this.sections[this.sections.length - 1].sub =
						candidate[i].sub;
				}
			}
		},

		chooseSection(id: number) {
			this.showAddSection = false;
			this.section = this.order.sections.find(
				(section: Section) => section.id == id,
			)!;
		},
	},
});
</script>

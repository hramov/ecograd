<template>
	<div v-if="!getUser" style="margin-top: 100px" class="container">
		<div class="alert alert-warning" role="alert">
			Для того, чтобы получить возможность добавлять заказы необходимо
			заключить договор. Далее вам будет предоставлен доступ к системе
		</div>
	</div>
	<div class="add-project-contaider" style="margin-top: 100px" v-else>
		<h2 class="header-background">Добавить проект</h2>
		<div class="add-project-contaider-colum">
			<div class="project-name">
				<p>
					<textarea
						placeholder="Введите название объекта..."
						class="form-control form-margin-texarea"
						v-model="order.title"
					></textarea>
				</p>
				<p>
					<textarea
						placeholder="Введите шифр объекта..."
						class="form-control form-margin-texarea"
						v-model="order.cipher"
					></textarea>
				</p>

				<select
					class="accordion-button collapsed form-control form-margin-texarea form-select"
					name="registraistion-name-sex"
					v-model="order.type"
					@change="loadSections"
				>
					<option disabled value="0">Тип объекта</option>
					<option value="1">Объект капитального строительства</option>
					<option value="2">Линейный объект</option>
				</select>
			</div>

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
													<input
														class="form-check-input "
														type="checkbox"
														id="flexCheckChecked"
														v-model="sub.checked"
													/>
													<label
														class="form-check-label"
														for="flexCheckChecked"
													>
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
				<button class="btn btn-success" @click="createOrder">
					Добавить
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Client, Expert } from '@/components/experts/Experts.vue';
import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { defineComponent } from '@vue/runtime-core';
import { mapGetters } from 'vuex';

export interface Order {
	id?: number;
	title: string;
	cipher: string;
	type: 0 | 1 | 2;
	sections: Section[];
	client: Client;
	expert: Expert;
}

export interface Section {
	id?: number;
	code: string;
	title: string;
	checked: boolean;
	sub: Section[];
	arrange: string;
	attach: any;
	status: 'new' | 'taken' | 'done';
}

export default defineComponent({
	name: 'AddProject',
	data() {
		return {
			order: {
				type: 0,
			} as Order,
			sections: [] as Section[],
			formData: new FormData(),
		};
	},
	computed: {
		...mapGetters(['getUser']),
	},
	methods: {
		async loadSections() {
			this.sections = await FetchDataProvider.get(
				'/order/sections-dict/' + this.order.type,
			);
		},

		async createOrder() {
			this.checkSubsection();
			const orderResult = await FetchDataProvider.post(
				'/order',
				this.order,
			);

			if (!orderResult.id) {
				return;
			}

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

			const result = await FetchDataProvider.post(
				'/order/upload-file/' + orderResult.id,
				this.formData,
			);
			this.formData = new FormData();
			alert('Проект успешно добавлен');
			this.$router.push({ path: '/client' });
		},

		checkSubsection() {
			const sectionsWithSub = this.sections.filter(
				(section: Section) => section.sub,
			);
			for (const section of sectionsWithSub) {
				if (
					section.sub.filter((sub: Section) => sub.checked).length > 0
				) {
					section.checked = true;
					section.sub = section.sub.filter(
						(sub: Section) => sub.checked,
					);
				} else {
					section.checked = false;
				}
			}
		},

		addFile(ev: Event, code: string) {
			const target = ev.target as HTMLInputElement;
			this.formData.append(code, target.files![0]);
		},
	},
});
</script>

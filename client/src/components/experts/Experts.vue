<template>
	<section class="dash-experts" id="dash-experts">
		<div class="text-center">
			<h1>
				Пользователи /
				<button
					class="btn btn-success"
					type="button"
					id="addExpertBtn"
					data-bs-toggle="collapse"
					data-bs-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample"
					@click="isOpen = !isOpen"
				>
					<p v-if="!isOpen">Добавить / Изменить</p>
					<p v-else>Скрыть</p>
				</button>
			</h1>
		</div>
		<br />
		<div
			class="collapse"
			id="collapseExample"
			style="width: 50%; margin: 10px auto"
		>
			<div class="card card-body text-center">
				<form>
					<div v-if="!user.image_url" class="form-group">
						<label for="image_url" class="label">Аватар</label>
						<input
							id="image_url"
							type="file"
							class="form-control"
							placeholder="Ссылка на аватар"
							ref="file"
							@change="changeUploadImage"
						/>
					</div>
					<div v-else class="form-group">
						<img
							:src="`` + user.image_url"
							style="width: 100%; margin-bottom: 10px"
						/>
					</div>
					<div class="form-group">
						<div class="mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="ФИО"
								v-model="user.fio"
							/>
						</div>
					</div>
					<div class="form-group">
						<div class="mb-3">
							<input
								type="date"
								class="form-control"
								placeholder="Дата рождения"
								v-model="user.birth_date"
							/>
						</div>
					</div>
					<div class="form-group">
						<div class="mb-3">
							<input
								type="email"
								class="form-control"
								placeholder="Email"
								v-model="user.email"
							/>
						</div>
					</div>
					<div class="form-group">
						<div class="mb-3">
							<input
								type="password"
								class="form-control"
								placeholder="Пароль"
								v-model="user.password"
							/>
						</div>
					</div>
					<div class="form-group">
						<div class="mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="Телефон"
								v-model="user.phone"
							/>
						</div>
					</div>

					<div class="form-group">
						<div class="mb-3">
							<select
								class="form-select"
								placeholder="Профиль"
								v-model="user.profile"
							>
								<option
									v-for="profile in profiles"
									:key="profile.id"
								>
									{{ profile.title }}
								</option>
							</select>
						</div>
					</div>

					<div v-if="user.profile == 2">
						<div class="form-group">
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									placeholder="Должность"
									v-model="expert.position"
								/>
							</div>
						</div>
						<div class="form-floating mb-3">
							<textarea
								class="form-control"
								rows="3"
								style="height: 100%"
								v-model="expert.cert"
							></textarea>
							<label for="floatingTextarea"
								>Квалификационный аттестат</label
							>
						</div>

						<div class="form-floating mb-3">
							<textarea
								class="form-control"
								rows="3"
								style="height: 100%"
								v-model="expert.direction"
							></textarea>
							<label for="floatingTextarea"
								>Направление деятельности</label
							>
						</div>

						<div class="form-floating mb-3">
							<textarea
								class="form-control"
								rows="3"
								style="height: 100%"
								v-model="expert.misc"
							></textarea>
							<label for="floatingTextarea">Примечание</label>
						</div>
					</div>
					<a
						style="margin: 0 auto; cursor: pointer"
						class="btn-get-started"
						@click.prevent="addExpert()"
						>Сохранить</a
					>
				</form>
			</div>
		</div>

		<div class="row" v-if="getExperts?.length">
			<div
				class="col-md-6 col-lg-4 col-sm-12 col-xl-4"
				v-for="expert in experts"
				:key="expert.id"
			>
				<div class="card">
					<img
						v-if="expert.image_url"
						:src="backEndUrl + expert.image_url"
						class="card-img-top"
						alt="..."
					/>
					<img
						v-else
						:src="`${backEndUrl}/uploads/avatars/dummy.jpg`"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body text-left">
						<h5 class="card-title">
							{{ expert.last_name }} {{ expert.name }}
						</h5>
						<h6 class="card-subtitle mb-2 text-muted">
							<i class="fa fa-male"></i>{{ expert.position }}
						</h6>
						<hr />
						<h6 class="card-subtitle mb-2 text-muted">
							<i class="fa fa-envelope-square"></i
							>{{ expert.email }}
						</h6>
						<hr />
						<h6 class="card-subtitle mb-2 text-muted">
							<i class="fa fa-phone"></i>{{ expert.phone }}
						</h6>
						<hr />
						<h6 class="card-subtitle mb-2 text-muted">
							<i class="fa fa-certificate"></i>{{ expert.cert }}
						</h6>
						<hr />
						<h6 class="card-subtitle mb-2 text-muted">
							<i class="fa fa-compass"></i>{{ expert.directions }}
						</h6>
						<hr />
						<h6 class="card-subtitle mb-2 text-muted">
							<i class="fa fa-compass"></i>{{ expert.misc }}
						</h6>
						<hr />
						<div
							style="display: flex; justify-content: space-around"
						>
							<button
								type="button"
								class="btn btn-danger"
								@click.prevent="deleteExpert(expert.id)"
							>
								Удалить
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="alert alert-secondary text-center"
			role="alert"
			v-else
			style="width: 50%; margin: 0 auto"
		>
			Пользователей нет!
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export interface Expert {
	position: string;
	cert: string;
	direction: string;
	misc: string;
}

export interface User {
	fio: string;
	birth_date: Date;
	email: string;
	password: string;
	phone: string;
	profile: number;
}

export default defineComponent({
	data() {
		return {
			user: {} as User,
			expert: {} as Expert,
			file: '',
		};
	},
	async mounted() {
		await this.$store.dispatch('getExpertsAction');
		await this.$store.dispatch('getUsersAction');
		await this.$store.dispatch('getRolesAction');
	},
	computed: {
		...mapGetters(['getExperts', 'getUsers']),
	},
	methods: {
		async changeUploadImage(e: any) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;
			this.file = files[0];
		},
		async addExpert() {
			let formData = null;
			if (this.file != null) {
				formData = new FormData();
				formData.append('file', this.file);
				formData.append('expert', JSON.stringify(this.expert));
			}

			const result = await this.$store.dispatch(
				'addExpertAction',
				formData,
			);

			document.getElementById('addExpertBtn')!.click();
			await this.$store.dispatch('getExpertsAction');
		},
	},
});
</script>

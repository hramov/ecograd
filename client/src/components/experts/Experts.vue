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
					<p v-if="!isOpen">Добавить</p>
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
					<div class="form-group">
						<div class="mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="ФИО"
								v-model="user.name"
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
							<select
								class="form-select"
								placeholder="Профиль"
								v-model="user.profile"
							>
								<option
									v-for="profile in getProfiles"
									:key="profile?.id"
									:value="profile?.title"
								>
									{{ profile?.title }}
								</option>
							</select>
						</div>
					</div>

					<div v-if="user.profile === 'Эксперт'">
						<div class="form-group">
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									placeholder="Телефон"
									v-model="expert.phone"
								/>
							</div>
						</div>
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
								v-model="expert.certificate"
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

					<div v-else-if="user.profile === 'Клиент'">
						<div class="form-group">
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									placeholder="Телефон"
									v-model="client.phone"
								/>
							</div>
						</div>
					</div>
					<a
						style="margin: 0 auto; cursor: pointer"
						class="btn-get-started"
						@click.prevent="createUser"
						>Сохранить</a
					>
				</form>
			</div>
		</div>

		<div class="row" v-if="Object.keys(getUsers).length">
			<div
				class="col-md-6 col-lg-4 col-sm-12 col-xl-4"
				v-for="(profile, index) in getUsers"
				:key="index"
			>
				<div v-for="user in profile" :key="user.id">
					<div class="card">
						<div class="card-body text-left">
							<h5 class="card-title">
								{{ user.user.name }}
							</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								<i class="fa fa-male"></i
								>{{ user.user?.profile }}
							</h6>
							<h6
								class="card-subtitle mb-2 text-muted"
								v-if="user.user?.profile === 'Эксперт'"
							>
								<hr />
								<i class="fa fa-male"></i>{{ user.position }}
							</h6>
							<h6 class="card-subtitle mb-2 text-muted">
								<hr />
								<i class="fa fa-envelope-square"></i
								>{{ user.user?.email }}
							</h6>
							<h6
								class="card-subtitle mb-2 text-muted"
								v-if="
									user.user?.profile == 'Эксперт' ||
										user.user?.profile == 'Клиент'
								"
							>
								<hr />
								<i class="fa fa-phone"></i>{{ user.phone }}
							</h6>
							<h6
								class="card-subtitle mb-2 text-muted"
								v-if="user.user?.profile == 'Эксперт'"
							>
								<hr />
								<i class="fa fa-certificate"></i
								>{{ user.certificate }}
							</h6>
							<h6
								class="card-subtitle mb-2 text-muted"
								v-if="user.user?.profile == 'Эксперт'"
							>
								<hr />
								<i class="fa fa-compass"></i
								>{{ user.direction }}
							</h6>
							<h6
								class="card-subtitle mb-2 text-muted"
								v-if="
									user.user?.profile == 'Эксперт' && user.misc
								"
							>
								<hr />
								<i class="fa fa-compass"></i>{{ user.misc }}
							</h6>
							<hr />
							<div
								style="display: flex; justify-content: space-around"
							>
								<button
									type="button"
									class="btn btn-danger"
									@click.prevent="deleteUser(user.id)"
								>
									Удалить
								</button>
							</div>
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
	phone: string;
	position: string;
	certificate: string;
	direction: string;
	misc: string;
}

export interface Client {
	phone: string;
}

export interface Admin {}

export interface User {
	name: string;
	email: string;
	password: string;
	profile: string;
	admin: Admin | null;
	client: Client | null;
	expert: Expert | null;
}

export default defineComponent({
	data() {
		return {
			user: {} as User,
			expert: {} as Expert,
			client: {} as Client,
			admin: {},
			file: '',
			isOpen: false,
		};
	},
	async mounted() {
		await this.$store.dispatch('getUsersAction');
		await this.$store.dispatch('getProfilesAction');
	},
	computed: {
		...mapGetters(['getUsers', 'getProfiles']),
	},
	methods: {
		async changeUploadImage(e: any) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;
			this.file = files[0];
		},
		async createUser() {
			const profile =
				this.user.profile == 'Администратор'
					? this.admin
					: this.user.profile == 'Эксперт'
					? this.expert
					: this.client;

			const result = await this.$store.dispatch('addUserAction', {
				user: this.user,
				profile: profile,
			});

			document.getElementById('addExpertBtn')!.click();
			await this.$store.dispatch('getUsersAction');
		},

		async deleteUser(user_id: number) {
			await this.$store.dispatch('deleteUserAction', user_id);
		},
	},
});
</script>

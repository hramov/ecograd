<template>
	<section class="dash-experts" id="dash-experts">
		<div class="text-center">
			<h1>
				Пользователи /
				<button
					class="btn"
					type="button"
					id="addExpertBtn"
					data-bs-toggle="collapse"
					data-bs-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample"
					@click="isOpen = !isOpen"
					style="background-color: #7DCE94;font-weight: bold;"
				>
					<p v-if="!isOpen">
						Добавить
					</p>
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

		<div style="padding: 20px" v-if="Object.keys(getUsers).length">
			<h3>Администраторы</h3>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">Имя</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="admin in getUsers.admin" :key="admin.id">
						<td scope="row">{{ admin.user.name }}</td>
					</tr>
				</tbody>
			</table>

			<h3 style="margin-top: 30px">Эксперты</h3>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Телефон</th>
						<th scope="col">Сертификат</th>
						<th scope="col">Направление</th>
						<th scope="col">Доп.</th>
						<th scope="col">Объектов (в работе / всего)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="expert in getUsers.expert" :key="expert.id">
						<td scope="row">{{ expert.user.name }}</td>
						<td scope="row">{{ expert.phone }}</td>
						<td scope="row">{{ expert.certificate }}</td>
						<td scope="row">{{ expert.direction }}</td>
						<td scope="row">{{ expert.misc }}</td>
						<td scope="row">2 / 10</td>
					</tr>
				</tbody>
			</table>

			<h3 style="margin-top: 30px">Клиенты</h3>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Телефон</th>
						<th scope="col">Объектов (в работе / всего)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="client in getUsers.client" :key="client.id">
						<td scope="row">{{ client.user.name }}</td>
						<td scope="row">{{ client.phone }}</td>
						<td scope="row">2 / 10</td>
					</tr>
				</tbody>
			</table>
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

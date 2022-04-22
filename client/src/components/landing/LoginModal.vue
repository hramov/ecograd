<template>
	<div
		class="modal fade"
		id="loginModal"
		tabindex="-1"
		aria-labelledby="loginModalLable"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div
					v-if="!isLoggedIn && isTouched"
					class="alert alert-danger"
					role="alert"
				>
					Ошибка авторизации!
				</div>
				<div
					v-if="isLoggedIn && isTouched"
					class="alert alert-success"
					role="alert"
				>
					Вход выполнен успешно
				</div>
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Вход</h5>
					<button
						id="closeBtn"
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<small
						>Пожалуйста, введите данные своего аккаунта ниже</small
					>
					<br />
					<form>
						<div class="form-group">
							<input
								type="text"
								name="email"
								v-model="email"
								class="form-control"
								placeholder="Ваш Email *"
							/>
						</div>
						<div class="form-group">
							<input
								type="password"
								name="password"
								v-model="password"
								class="form-control"
								placeholder="Ваш пароль *"
							/>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" @click.prevent="login">
						Войти
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
	data() {
		return {
			email: '',
			password: '',
			isTouched: false,
			isLoggedIn: false,
		};
	},
	computed: {
		...mapGetters(['getUser', 'getIsAdmin', 'getIsClient', 'getIsExpert']),
	},
	methods: {
		...mapActions(['loginAction', 'getUserAction']),
		async login() {
			this.isTouched = true;
			this.isLoggedIn = await this.loginAction({
				email: this.email,
				password: this.password,
			});
			await this.getUserAction();

			if (this.getUser) {
				const closeBtn = document.getElementById(
					'closeBtn',
				) as HTMLElement;
				closeBtn.click();
				if (this.getIsAdmin)
					return this.$router.push({ path: '/dashboard' });
				if (this.getIsClient)
					return this.$router.push({ path: '/client' });
				if (this.getIsExpert)
					return this.$router.push({ path: '/client' });
			}
		},
	},
});
</script>

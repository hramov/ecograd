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
					v-if="isTouched && !isLoggedIn"
					class="alert alert-danger"
					role="alert"
				>
					Ошибка авторизации!
				</div>
				<div
					v-if="isTouched && isLoggedIn"
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

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/user.store';
const router = useRouter();
const store = useUserStore();
const email = ref('');
const isLoggedIn = ref(false);
const isTouched = ref(false);
const password = ref('');

async function login() {
	isLoggedIn.value = await store.login({
		email: email.value,
		password: password.value,
	});

	isTouched.value = true;

	await store.getUser();

	if (store.user && store.user.id) {
		const closeBtn = document.getElementById('closeBtn') as HTMLElement;
		closeBtn.click();
		if (store.isAdmin) return router.push({ path: '/dashboard' });
		if (store.isClient || store.isExpert)
			return router.push({ path: '/orders' });
	}
}
</script>

<style scoped>
form input {
	margin-bottom: 10px;
}
</style>

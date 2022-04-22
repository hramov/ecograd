<template>
	<nav
		class="navbar navbar-expand-lg navbar-light bg-white rounded fixed-top"
		aria-label="Eleventh navbar example"
	>
		<div class="container-fluid">
			<a class="navbar-brand" href="/"
				><img class="logo" src="assets/img/logo.png"
			/></a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarsExample09"
				aria-controls="navbarsExample09"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarsExample09">
				<ul
					class="navbar-nav me-auto mb-2 mb-lg-0"
					style="text-align: right"
				>
					<li class="nav-item">
						<a
							class="nav-link item"
							aria-current="page"
							href="/#intro"
							>Главная</a
						>
					</li>
					<li class="nav-item item">
						<a class="nav-link item" href="/#about">О нас</a>
					</li>
					<li class="nav-item item">
						<a class="nav-link item" href="/#team">Эксперты</a>
					</li>
					<li class="nav-item item">
						<a class="nav-link item" href="/#requisities"
							>Реквизиты</a
						>
					</li>
					<li class="nav-item item">
						<a class="nav-link item" href="/#contacts">Контакты</a>
					</li>
					<li class="nav-item item">
						<div
							v-if="!!getUser.id"
							class="dropdown"
							style="margin-left: auto; margin-right: 0; max-width: 300px"
						>
							<button
								class="nav-link item dropdown-toggle"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{{ getUser.name }} {{ getUser.last_name }}
							</button>
							<ul
								class="dropdown-menu"
								aria-labelledby="dropdownMenuButton1"
							>
								<li>
									<a
										class="dropdown-item"
										v-if="getIsAdmin"
										@click.prevent="
											$router.push('/dashboard')
										"
										>Открыть</a
									>
									<a
										class="dropdown-item"
										v-if="getIsClient || getIsExpert"
										@click.prevent="$router.push('/client')"
										>Открыть</a
									>
								</li>
								<li>
									<a
										class="dropdown-item"
										@click.prevent="
											$store.dispatch('logout');
											$router.push({ path: '/' });
										"
										>Выйти</a
									>
								</li>
							</ul>
						</div>
						<a
							v-else
							type="button"
							class="nav-link item"
							data-bs-toggle="modal"
							data-bs-target="#loginModal"
						>
							Войти
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	props: {
		isUser: {
			type: String,
		},
	},
	computed: {
		...mapGetters(['getUser', 'getIsAdmin', 'getIsClient', 'getIsExpert']),
	},
});
</script>

<style scoped>
li {
	cursor: pointer;
}
</style>

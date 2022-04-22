<template>
	<nav
		class="navbar navbar-expand-lg navbar-light bg-white rounded fixed-top"
		aria-label="Eleventh navbar example"
	>
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/"
				><img class="logo" src="assets/img/logo.png"
			/></router-link>
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
						<router-link
							v-if="$route.path != '/'"
							class="nav-link item"
							aria-current="page"
							to="/"
							>Главная</router-link
						>
						<a v-else class="nav-link item" href="/#intro"
							>Главная</a
						>
					</li>
					<li class="nav-item item">
						<a class="nav-link item" href="/#about">О нас</a>
					</li>
					<li class="nav-item item" v-if="getExperts.length">
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
						<div v-if="getUser && getUser.id" class="dropdown">
							<button
								class="nav-link item dropdown-toggle"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style="float: right"
							>
								{{ getUser.name }}
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
											$router.push({ path: '/dashboard' })
										"
										>Открыть</a
									>
									<a
										class="dropdown-item"
										v-if="getIsClient || getIsExpert"
										@click.prevent="
											$router.push({ path: '/client' })
										"
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
		...mapGetters([
			'getUser',
			'getIsAdmin',
			'getIsClient',
			'getIsExpert',
			'getExperts',
		]),
		displayUser(): string {
			const last_name = this.getUser.name.split(' ')[0];
			const name = this.getUser.name.split(' ')[1];
			const middle_name = this.getUser.name.split(' ')[2];

			return (
				last_name +
				' ' +
				name[0].toUpperCase() +
				'. ' +
				middle_name[0].toUpperCase() +
				'.'
			);
		},
	},
});
</script>

<style scoped>
li {
	cursor: pointer;
}
</style>

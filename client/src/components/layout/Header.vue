<template>
	<nav
		class="navbar navbar-expand-lg navbar-light bg-white rounded fixed-top"
		aria-label="Eleventh navbar example"
	>
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/"
				><img class="logo" src="@/assets/img/layout/logo.png"
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
					<li class="nav-item item" v-if="store.experts?.length">
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
							v-if="store.user && store.user.id"
							class="dropdown"
						>
							<a
								class="nav-link item dropdown-toggle"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style="float: right"
							>
								{{ store.user.name }}
							</a>
							<ul
								class="dropdown-menu"
								aria-labelledby="dropdownMenuButton1"
							>
								<li>
									<a
										class="dropdown-item"
										v-if="store.isAdmin"
										@click.prevent="
											$router.push({ path: '/dashboard' })
										"
										>Открыть</a
									>
									<a
										class="dropdown-item"
										v-if="store.isClient || store.isExpert"
										@click.prevent="
											$router.push({ path: '/orders' })
										"
										>Открыть</a
									>
								</li>
								<li>
									<a
										class="dropdown-item"
										@click.prevent="
											store.logout();
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

<script setup lang="ts">
import { useUserStore } from '../../store/user.store';
const store = useUserStore();
</script>

<style scoped>
li {
	cursor: pointer;
}
</style>

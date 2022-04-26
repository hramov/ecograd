<template>
	<section class="intro" id="intro" ref="intro">
		<div class="row">
			<div
				class="col-lg-6 col-md-12 col-sm-12 col-sm-12 text-center mt-5"
			>
				<h1>ООО "ЭкоГрадЪ"</h1>
				<p class="fs-5 text-muted">
					Негосударственная
					<router-link to="/expertise">экспертиза</router-link>
					проектной документации и инженерных изысканий
				</p>
				<br />
				<p>Телефон: +7 (3852) 71-71-60</p>
				<br />
				<p>E-mail: oooecograd@mail.ru</p>
				<br />
				<BuyButton v-if="store.isClient" />
				<div v-if="!store.user || !store.user.id">
					<div class="alert alert-warning" role="alert">
						Для того, чтобы получить возможность добавлять заказы,
						необходимо обратиться по одному из контактов выше. Далее
						вам будет предоставлен доступ к системе.
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-12 col-sm-12 col-sm-12 text-center">
				<div class="intro_img">
					<img src="@/assets/img/landing/intro.png" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user.store';
import BuyButton from './components/BuyButton.vue';
const store = useUserStore();
</script>

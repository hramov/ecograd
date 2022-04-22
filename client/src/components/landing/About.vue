<template>
	<section class="about" id="about" ref="about">
		<div class="text-center">
			<h1>Почему нужно выбрать именно нас</h1>
		</div>
		<div class="small">
			В соответствии с Федеральным законом "О внесении изменений в
			Градостроительный кодекс РФ и отдельные законодательные акты РФ" от
			28.11.2011 №337-ФЗ деятельность негосударственной экспертизы
			приравнивается к государственной экспертизе с 1 апреля 2012, кроме
			объектов с частичным или полным бюджетным финансированием.
		</div>
		<div class="row">
			<div class="col-md-12 col-lg-4 col-sm-12 mb-5">
				<div>
					<div class="card-img text-center">
						<img src="/assets/img/rocket.png" />
					</div>
					<div class="card-title text-center">
						Максимальная оперативность
					</div>
					<div class="card-conter">
						Современная материально-техническая база и четкое
						взаимодействие всех экспертов обеспечивают выполнение
						работ в максимально сжатые сроки (от 15 рабочих дней)
					</div>
				</div>
			</div>
			<div class="col-md-12 col-lg-4 col-sm-12 mb-5">
				<div class="card-img text-center">
					<img src="/assets/img/success.png" />
				</div>
				<div class="card-title text-center">
					Профессионализм и качество
				</div>
				<div class="card-conter">
					Значительный опыт и профессионализм наших экспертов
					гарантирует качественное проведение негосэкспертизы,
					грамотное оформление всех документов, надежность и
					безопасность будущего объекта
				</div>
			</div>
			<div class="col-md-12 col-lg-4 col-sm-12 mb-5">
				<div class="card-img text-center">
					<img src="/assets/img/result.png" />
				</div>
				<div class="card-title text-center">Гарантия результата</div>
				<div class="card-conter">
					Все замечания по проектной документации предоставляются в
					ходе проведения экспертизы, что гарантирует заказчику
					оперативное устранение всех недоработок без оформления
					отрицательного заключения и направления проекта на повторную
					оценку
				</div>
			</div>
		</div>
		<div class="text-center">
			<buy-button v-if="getIsClient" />
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import BuyButton from '../BuyButton.vue';

export default defineComponent({
	components: { BuyButton },
	computed: {
		...mapGetters(['getIsClient']),
	},
});
</script>

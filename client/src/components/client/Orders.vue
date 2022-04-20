<template>
	<section class="client-orders">
		<h1>Мои проекты</h1>
		<h4 class="status-project-header" v-if="order.id">
			Статус выбранного объекта: на рассмотрении у экспертов
		</h4>
		<div class="project">
			<div class="add-project-container">
				<ul class="list-group">
					<button
						type="button"
						class="add-project-bt btn list-group-item-action"
						@click="$router.push({ path: 'add-order' })"
					>
						Добавить проект
					</button>
					<li
						class="list-group-item list-group-item-action"
						@click="chooseOrder(order.id)"
						v-for="order in orders"
						:key="order.id"
					>
						{{ order.title }}
					</li>
				</ul>
			</div>
			<div class="divider"></div>

			<div class="info-project-container" v-if="order.id">
				<div class="existing-project">
					<ul class="list-group">
						<p class="list-group-p">Загруженные разделы</p>
						<li
							class="list-group-item list-group-item-action color-selection"
							style="text-align: justify; word-wrap: break-word;"
							v-for="section in order.sections"
							:key="section.id"
							@click="chooseSection(section.id)"
						>
							{{ section.arrange }} {{ section.title }}
						</li>
					</ul>
				</div>
				<div class="project-status" v-if="section.id">
					<div class="project-status-chapter">
						<ul class="list-group">
							<h2>{{ section.title }}</h2>
							<li
								class="list-group-item list-group-item-action file-data"
								v-for="file in section.attach"
								:key="file.id"
							>
								<span>{{ file.title }}</span>
								<span
									>{{
										new Date(
											file.createdAt,
										).toLocaleDateString()
									}}
									{{
										new Date(
											file.createdAt,
										).toLocaleTimeString()
									}}</span
								>
							</li>
						</ul>
						<div class="project-status-button">
							<button type="button" class="add-project-bt btn">
								Загрузить
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { Order, Section } from '@/views/order/AddOrder.vue';
import { defineComponent } from '@vue/runtime-core';
import BuyButton from './../BuyButton.vue';

export default defineComponent({
	components: {
		BuyButton,
	},
	data() {
		return {
			orders: [] as Order[],
			order: {} as Order,
			section: {} as Section,
		};
	},

	async mounted() {
		this.orders = await FetchDataProvider.get('/order/client');
	},

	methods: {
		chooseOrder(id: number) {
			this.order = this.orders.find((order: Order) => order.id == id)!;
			this.order.sections = this.order.sections.filter(
				(section: Section) => section.attach.length > 0,
			);

			console.log(this.order);
		},
		chooseSection(id: number) {
			this.section = this.order.sections.find(
				(section: Section) => section.id == id,
			)!;
		},
	},
});
</script>

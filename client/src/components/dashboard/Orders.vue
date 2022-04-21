<template>
	<section class="main" id="main">
		<div class="text-center">
			<h1>
				Заказы
				<i class="fa fa-check" v-if="isLoaded" style="color: green"></i>
				<i class="fa fa-times" v-else style="color: red"></i>
			</h1>
		</div>
		<div>
			<table class="table table-striped table-hover" v-if="orders.length">
				<thead>
					<tr>
						<th scope="col">Объект</th>
						<th scope="col">Заказчик</th>
						<th scope="col">Разделы</th>
						<th scope="col">E-mail</th>
						<th scope="col">Телефон</th>
						<th scope="col">Статус</th>
						<th scope="col">Добавлен</th>
						<th scope="col">Эксперт</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="order in orders" :key="order.id">
						<td>{{ order.title }}</td>
						<td>{{ order.name }}</td>
						<td>
							<p
								v-for="section in order.sections
									.split(';')
									.sort((a, b) =>
										Number(a.split(' ')[0]) -
											Number(b.split(' ')[0]) >
										0
											? 1
											: -1,
									)"
								:key="section.id"
							>
								{{ section }}
							</p>
						</td>
						<td>{{ order.client_email }}</td>
						<td>{{ order.client_phone }}</td>
						<td v-if="order.status == 'new'">Зарегистрирован</td>
						<td v-else-if="order.status == 'taken'">
							Взят в работу
						</td>
						<td>
							{{ new Date(order.createdAt).toLocaleDateString() }}
						</td>
						<td>
							<select
								v-if="!order.expert?.id"
								class="form-select"
								v-model="order.expert"
								@change="appointExpert($event, order.id)"
								><option
									v-for="expert in getExperts"
									:key="expert.id"
									:value="expert.id"
									>{{ expert.user?.name }}</option
								></select
							>
							<span v-else>{{ order.expert.name }}</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div
				class="alert alert-secondary text-center"
				role="alert"
				v-else
				style="width: 50%; margin: 0 auto"
			>
				Заказов нет!
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	data() {
		return {
			orders: [] as any[],
			isLoaded: false,
		};
	},
	computed: {
		...mapGetters(['getExperts']),
	},
	async mounted() {
		await this.$store.dispatch('getExpertsAction');
		this.isLoaded = false;
		this.orders = await FetchDataProvider.get('/order');
		for await (const order of this.orders) {
			order.expert = await FetchDataProvider.get(
				'/order/expert/' + order.id,
			);
		}
		this.isLoaded = true;
	},
	methods: {
		async appointExpert(event: any, order_id: number) {
			const expert_id = event.target.value;
			const sure = confirm('Подтверите назначение эксперта');
			if (sure) {
				const result = await FetchDataProvider.patch(
					'/order/appoint-expert',
					order_id,
					{ expert_id },
				);
			}
		},
	},
});
</script>

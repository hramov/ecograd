<template>
	<section class="main" id="main">
		<div class="text-center">
			<h1>
				Заказы
				<i class="fa fa-check" v-if="isLoaded" style="color: green"></i>
				<i class="fa fa-times" v-else style="color: red"></i>
			</h1>
		</div>
		<div style="padding: 20px">
			<table
				class="table table-striped table-hover"
				v-if="orderStore.orders.length"
			>
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
					<tr v-for="order in orderStore.orders" :key="order.id">
						<td>{{ order.title }}</td>
						<td>{{ order.name }}</td>
						<td>
							<p
								v-for="(section, index) in order.sections
									.split(';')
									.sort((a, b) =>
										Number(a.split(' ')[0]) -
											Number(b.split(' ')[0]) >
										0
											? 1
											: -1,
									)"
								:key="index"
							>
								{{ section }}
							</p>
						</td>
						<td>{{ order.client_email }}</td>
						<td>{{ order.client_phone }}</td>
						<td v-if="order.status == OrderStatus.New">
							Зарегистрирован
						</td>
						<td v-else-if="order.status == OrderStatus.Taken">
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
							>
								<option
									v-for="expert in userStore.experts"
									:key="expert.id"
									:value="expert.id"
								>
									{{ expert.user.name }}
								</option>
							</select>
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

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { ApiManager } from '../../api/manager';
import { Order, useOrderStore, OrderStatus } from '../../store/order.store';
import { Expert, useUserStore } from '../../store/user.store';

const userStore = useUserStore();
const orderStore = useOrderStore();
const isLoaded = ref(false);

onMounted(async () => {
	await userStore.getExperts();
	await orderStore.getOrders();
	isLoaded.value = true;
});

const appointExpert = async (event: any, order_id: number) => {
	const expert_id = event.target.value;
	const sure = confirm('Подтверите назначение эксперта');
	if (sure) {
		const result = await ApiManager.put<{ expert_id: number }, Expert>(
			'/order/appoint-expert/' + order_id,
			{ expert_id },
		);
		if (result) {
			await orderStore.getOrders();
		}
	}
};
</script>

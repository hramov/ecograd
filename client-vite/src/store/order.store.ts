import { defineStore } from 'pinia';
import { ApiManager } from '../api/manager';
import { Expert } from './user.store';
export interface Order {
	id: number;
	title: string;
	name: string;
	sections: string;
	client_email: string;
	client_phone: string;
	status: OrderStatus;
	createdAt: Date;
	expert: Expert;
}

export enum OrderStatus {
	New = 'new',
	Taken = 'taken',
	Done = 'done',
}
export interface Section {}
export const useOrderStore = defineStore('order', {
	state: () => {
		return {
			orders: [] as Order[],
		};
	},

	actions: {
		async getOrders() {
			const result = await ApiManager.get<Order[]>('/order');
			this.orders = result.data;

			for await (const order of this.orders) {
				const result = await ApiManager.get<Expert>(
					'/order/expert/' + order.id,
				);
				order.expert = result.data;
			}
		},
	},
});

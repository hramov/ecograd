import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Order } from '../model/order/Order.model';
export class OrderAccess {
	private repository: Repository<Order>;
	constructor() {
		this.repository = AppDataSource.getRepository(Order);
	}

	public async getOrders() {
		return await this.repository.find();
	}
}

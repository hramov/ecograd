import axios, { AxiosResponse } from 'axios';
import store from './../store/index';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.VUE_APP_BACKEND;

export class FetchDataProvider {
	public static async get(url: string) {
		const response: AxiosResponse<any> = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${store.getters.getJWT}`,
			},
		});
		return response.data;
	}

	public static async getByID(url: string, id?: number) {
		const { data } = await axios.get(url + '/' + id);
		return data;
	}

	public static async post(
		url: string,
		data: any,
		isFile?: any,
	): Promise<any> {
		if (isFile) {
			return await axios
				.post(url, data, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${store.getters.getJWT}`,
					},
				})
				.then(response => response.data)
				.catch(error => {
					console.log(error);
				});
		}
		return await axios
			.post(url, data)
			.then(response => response.data)
			.catch(error => {
				throw new Error(error);
			});
	}

	public static async uploadFile(
		url: string,
		id: number,
		data: any,
	): Promise<AxiosResponse<any>> {
		return await axios
			.patch(url + '/' + id || '', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(response => response.data)
			.catch(error => {
				console.log(error);
			});
	}

	public static async patch(
		url: string,
		id: number,
		data: any,
	): Promise<AxiosResponse<any>> {
		return await axios
			.patch(url + '/' + id, data)
			.then(response => response.data)
			.catch(error => {
				console.log(error);
			});
	}

	public static async delete(url: string, id: number) {
		return await axios
			.delete(url + '/' + id)
			.then(response => response.data)
			.catch(error => {
				throw new Error(error);
			});
	}
}

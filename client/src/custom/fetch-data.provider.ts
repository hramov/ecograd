import axios, { AxiosResponse } from 'axios';
import store from './../store/index';

export class FetchDataProvider {
	private static _backendUrl: string;

	constructor() {
		axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${store.getters.getJWT}`;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.baseURL = process.env.VUE_APP_BACKEND;
	}

	public async get(url: string) {
		const { data } = await axios.get(url);
		return data;
	}

	public async getByID(url: string, id?: number) {
		const { data } = await axios.get(url + '/' + id);
		return data;
	}

	public async post(url: string, data: any, isFile?: any) {
		if (isFile) {
			return await axios
				.post(url, data, {
					headers: {
						'Content-Type': 'multipart/form-data',
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

	public async uploadFile(
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

	public async patch(
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

	public async delete(url: string, id: number) {
		return await axios
			.delete(url + '/' + id)
			.then(response => response.data)
			.catch(error => {
				throw new Error(error);
			});
	}
}

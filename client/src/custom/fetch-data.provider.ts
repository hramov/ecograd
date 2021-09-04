import axios, { AxiosResponse } from "axios";
import store from "./../store/index";

export class FetchDataProvider {

  private static _backendUrl: string;

  constructor() {
    FetchDataProvider._backendUrl = store.getters.getBackendUrl
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${store.getters.getJWT}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";
  }

  private static _makePath(url: string, id?: number): string {
    if (id) return `${FetchDataProvider._backendUrl}/${url}/${id}`;
    return `${FetchDataProvider._backendUrl}/${url}`;
  }

  public async get(url: string, id?: number) {
    const { data } = await axios.get(FetchDataProvider._makePath(url, id));
    return data;
  }

  public async post(url: string, data: any, isFile?: any) {
    if (isFile) {
      return await axios
      .post(FetchDataProvider._makePath(url), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    }
    return await axios
      .post(FetchDataProvider._makePath(url), data)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }

  public async uploadFile(
    url: string,
    id: number,
    data: any
  ): Promise<AxiosResponse<any>> {
    console.log(id)
    return await axios
      .patch(FetchDataProvider._makePath(url, id), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  public async patch(
    url: string,
    id: number,
    data: any
  ): Promise<AxiosResponse<any>> {
    return await axios
      .patch(FetchDataProvider._makePath(url, id), data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  public async delete(url: string, id: number) {
    return await axios
      .delete(FetchDataProvider._makePath(url, id))
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
}

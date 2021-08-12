import axios, { AxiosResponse, AxiosError } from "axios";
import store from "./../store/index";

export class FetchDataProvider {
  private static _backendUrl = "http://localhost:5000/api/v2";

  public static init() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${store.getters.getJWT}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";
  }

  private static _handleAxiosError(error: AxiosError<any>) {
    console.log(error.response!.status);
  }

  private static _makePath(url: string, id?: number): string {
    if (id) return `${FetchDataProvider._backendUrl}/${url}/${id}`;
    return `${FetchDataProvider._backendUrl}/${url}`;
  }

  public static async get(url: string, id?: number) {
    try {
      const { data } = await axios.get(FetchDataProvider._makePath(url, id));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        FetchDataProvider._handleAxiosError(error);
      } else {
        throw new Error(error as string);
      }
    }
  }

  public static async post(url: string, data: any) {
    console.log(data)
    return await axios
      .post(FetchDataProvider._makePath(url), data)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }

  public static async patch(
    url: string,
    id: number,
    data: any
  ): Promise<AxiosResponse<any>> {
    return await axios
      .patch(FetchDataProvider._makePath(url, id), data)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }

  public static async delete(url: string, id: number) {
    return await axios
      .delete(FetchDataProvider._makePath(url, id))
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
}

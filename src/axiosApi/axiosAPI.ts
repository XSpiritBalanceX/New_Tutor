import axios, { AxiosInstance, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { BASE_URL, TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRES_KEY, USER_TYPE } from "@utils/appConsts";

interface IToken {
  user_type: number;
  exp: number;
}

class AxiosAPI {
  //@ts-ignore
  private axiosInstance: AxiosInstance;

  logout: () => void = () => {
    console.error("empty");
  };
  setItem: (key: string, value: any) => void = () => {
    console.error("empty");
  };
  public getItem: (key: string) => any = () => {
    console.error("empty");
  };

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        console.error(error);
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          try {
            await this.fetchToken();
            const newToken = axiosAPI.getItem(TOKEN_KEY);
            if (newToken) {
              this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return this.axiosInstance(error.config);
            } else {
              this.logout();
              return Promise.reject(error);
            }
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  setLogout(logout: () => void) {
    this.logout = logout;
  }

  setSetItem(setItem: (key: string, value: any) => void) {
    this.setItem = setItem;
  }

  setGetItem(getItem: (key: string) => any) {
    this.getItem = getItem;
  }

  async fetchToken() {
    const refreshToken = this.getItem(REFRESH_TOKEN_KEY);
    const token = this.getItem(TOKEN_KEY);
    const userType = this.getItem(USER_TYPE);
    if (!refreshToken) throw Error("some err");

    try {
      const result = await axios.post(
        `${BASE_URL}/auth/refreshToken`,
        {
          refresh_token: refreshToken,
          user_type: Number(userType),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const decodeToken: IToken = jwtDecode(result.data.access_token);
      const tokenExpires = decodeToken.exp;

      this.setItem(TOKEN_KEY, result.data.access_token);
      this.setItem(TOKEN_EXPIRES_KEY, tokenExpires.toString());
    } catch (err: any) {
      if (err.response.status === 401) {
        axiosAPI.logout();
      }
    }
  }

  getAxiosInstance() {
    return this.axiosInstance;
  }
}

export const axiosAPI = new AxiosAPI();

export const axiosInstance = axiosAPI.getAxiosInstance();

axiosInstance.interceptors.request.use(
  async function (config) {
    return new Promise(async (resolve) => {
      try {
        const token = axiosAPI.getItem(TOKEN_KEY);
        const expTime = moment.unix(Number(localStorage.getItem("tutor_tokenExpires") ?? "0") ?? 0);
        const currentTime = moment();
        const threeMinutes = 3;
        if (token && expTime.isAfter(currentTime) && expTime.diff(currentTime, "minutes") <= threeMinutes) {
          await axiosAPI.fetchToken();
        }
        const updToken = axiosAPI.getItem(TOKEN_KEY);
        if (updToken) {
          // @ts-ignore
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${updToken}`,
          };
        }
        resolve(config);
      } catch (err) {
        console.log("axiosInstance.interceptors.request.use", err);
        axiosAPI.logout();
        resolve(config);
      }
    });
  },
  function (error) {
    return Promise.reject(error);
  },
);

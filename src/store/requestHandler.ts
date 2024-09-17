import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TOKEN_KEY } from "@utils/appConsts";
import { refreshToken } from "@api/auth/refreshToken";
import { BaseQueryFn, FetchBaseQueryMeta, FetchBaseQueryError, FetchArgs } from "@reduxjs/toolkit/query";
import moment from "moment";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> =
  fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const isSkipAuth = localStorage.getItem("tutor_skip_auth");
      if (!isSkipAuth) {
        const currentToken = localStorage.getItem(TOKEN_KEY);
        if (currentToken) {
          headers.set("authorization", `Bearer ${currentToken}`);
        }
      }
    },
  });

// Перехватчик запросов для обработки ошибок
export const requestHandler = async (url: string | FetchArgs, config: any, extraOptions: object) => {
  const response = await baseQuery(url, config, extraOptions);
  const token = localStorage.getItem(TOKEN_KEY);
  const expTime = moment.unix(Number(localStorage.getItem("tutor_tokenExpires") ?? "0") ?? 0);
  const currentTime = moment();
  const threeMinutes = 3;
  if (token && expTime.isAfter(currentTime) && expTime.diff(currentTime, "minutes") <= threeMinutes) {
    try {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        localStorage.setItem(TOKEN_KEY, newAccessToken);

        const updatedConfig = {
          ...config,
          headers: {
            ...config.headers,
            authorization: `Bearer ${newAccessToken}`,
          },
        };
        return baseQuery(url, updatedConfig, extraOptions);
      }
    } catch (error) {
      throw error;
    }
  } else if (
    (response.error as { status: number })?.status === 401 ||
    (response.error as { originalStatus: number })?.originalStatus === 401
  ) {
    try {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        localStorage.setItem(TOKEN_KEY, newAccessToken);

        const updatedConfig = {
          ...config,
          headers: {
            ...config.headers,
            authorization: `Bearer ${newAccessToken}`,
          },
        };
        return baseQuery(url, updatedConfig, extraOptions);
      }
    } catch (error) {
      throw error;
    }
  }
  return response;
};

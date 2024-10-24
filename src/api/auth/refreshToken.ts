import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "@utils/appConsts";
import { IToken } from "@axiosApi/TypesAPI";
import { TOKEN_EXPIRES_KEY } from "@utils/appConsts";

export const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem("tutor_refresh_token");
    const tokenAccess = localStorage.getItem("tutor_access_token");
    const decodeAccess: IToken = jwtDecode(tokenAccess!);

    const result = await axios.post(
      `${BASE_URL}/auth/refreshToken`,
      {
        refresh_token: refreshToken,
        user_type: Number(decodeAccess.user_type),
      },
      { headers: { Authorization: `Bearer ${tokenAccess}` } },
    );

    const decodeToken: IToken = jwtDecode(result.data.access_token);
    const newAccessToken = result.data.access_token;

    localStorage.setItem(TOKEN_EXPIRES_KEY, decodeToken.exp.toString());
    return newAccessToken;
  } catch (err: any) {
    if (err.response.status === 401) {
      localStorage.removeItem("tutor_tokenExpires");
      localStorage.removeItem("tutor_access_token");
      localStorage.removeItem("tutor_refresh_token");
      localStorage.removeItem("tutor_login");
      localStorage.removeItem("tutor_user_type");
      window.location.href = "/login";
    }
    return "";
  }
};

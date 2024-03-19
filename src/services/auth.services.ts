import { UserCredentials } from "../types/auth.types";
import { axiosHttp } from "../config/axios.config";
import { ServiceResponse } from "../types/response.service";

const getToken = async (credentials: UserCredentials) => {
  try {
    const token = (
      await axiosHttp.post<ServiceResponse<string>>(
        "/auth/generate-token",
        credentials,
      )
    ).data.responseData;
    return token;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message || "Server Error");
  }
};

export { getToken };

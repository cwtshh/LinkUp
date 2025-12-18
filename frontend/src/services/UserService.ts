import { AxiosInstance } from "./api/Api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await AxiosInstance.post("/user/register", data);
  return response.data;
};

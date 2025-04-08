import { API } from "./api";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    registration: string;
  };
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await API.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  console.log(response);

  return response.data;
}

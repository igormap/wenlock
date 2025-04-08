import { API } from "./api";

export interface UserTokenResponse {
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
): Promise<UserTokenResponse> {
  const response = await API.post<UserTokenResponse>("/auth/login", {
    email,
    password,
  });
  console.log(response);

  return response.data;
}

import { API, getAuthorizedHeader } from "./api";
import { UserTokenResponse } from "./auth";

export interface CreateUser {
  name: string;
  email: string;
  registration: string;
  password: string;
}

export async function createUser(body: CreateUser): Promise<UserTokenResponse> {
  console.log(body);

  const URL = "auth/register";
  const res = await API.post<UserTokenResponse>(
    URL,
    body,
    getAuthorizedHeader()
  );

  return res.data;
}

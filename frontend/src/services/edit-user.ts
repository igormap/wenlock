import { API, getAuthorizedHeader } from "./api";
import { UserTokenResponse } from "./auth";

export interface EditUser {
  name: string;
  email: string;
  registration: string;
}

export async function editUser(body: EditUser): Promise<UserTokenResponse> {
  const URL = "/users/" + body.registration.toString();
  const res = await API.put<UserTokenResponse>(
    URL,
    body,
    getAuthorizedHeader()
  );

  return res.data;
}

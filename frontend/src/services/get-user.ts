import { API, getAuthorizedHeader } from "./api";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  registration: string;
  createdAt: string;
}

export async function getUser(registration: string): Promise<UserResponse> {
  const response = await API.get<UserResponse>(
    "/users/" + registration,
    getAuthorizedHeader()
  );

  return response.data;
}

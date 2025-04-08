import { API } from "./api";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  registration: string;
  createdAt: string;
}

export async function removeUser(registration: string): Promise<UserResponse> {
  const response = await API.delete<UserResponse>("/users/" + registration);

  return response.data;
}

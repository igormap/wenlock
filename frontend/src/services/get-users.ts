import { API } from "./api";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  registration: string;
  createdAt: string;
}

export async function listUsers(search?: string): Promise<UserResponse[]> {
  const response = await API.get<UserResponse[]>("/users");
  console.log(response);

  return response.data;
}

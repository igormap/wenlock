import { API, getAuthorizedHeader } from "./api";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  registration: string;
  createdAt: string;
}

export async function listUsers(search?: string): Promise<UserResponse[]> {
  const response = await API.get<UserResponse[]>(
    "/users",
    getAuthorizedHeader()
  );
  console.log(response);
  return response.data;
}

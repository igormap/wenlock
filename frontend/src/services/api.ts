import { getToken } from "@/contexts/AuthContext";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000", // ajuste se a porta for diferente
});

export const getAuthorizedHeader = (access_token?: string) => {
  const storedToken = getToken();
  return {
    headers: {
      Authorization: `Bearer ${access_token || storedToken}`,
    },
  };
};

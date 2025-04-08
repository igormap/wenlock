import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000", // ajuste se a porta for diferente
});

export const getAuthorizedHeader = (access_token?: string) => {
  const token = access_token || getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getToken = () => {
  return localStorage.getItem("token");
};

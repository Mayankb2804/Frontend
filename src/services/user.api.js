import { api } from "./axiosInstance.js";

export const loginUser = async (username, password) => {
  const response = await api.post("/users/login", {
    username,
    password,
  });
  return response.data.data.user;
};

export const logoutUser = async () => {
  await api.post("/users/logout");
};

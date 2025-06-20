import axiosInstance from "./axiosInstance";

export const login = (data) => axiosInstance.post("/auth/login", data);
export const logout = () => axiosInstance.post("/auth/logout")
export const register = (data) => axiosInstance.post("/auth/register", data);
export const getUser = (id) => axiosInstance.get(`/auth/user/${id}`);
export const getMeUser = () => axiosInstance.get("/auth/me")

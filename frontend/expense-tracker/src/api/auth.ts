import api from "./axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";

export const login = (data: LoginRequest) =>
  api.post<LoginResponse>("/auth/login", data);

export const register = (data: RegisterRequest) =>
  api.post("/auth/register", data);

export const getCurrentUser = () => {
  const token = localStorage.getItem("access_token");

  return api.get("/users/self", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

let logoutTimer: ReturnType<typeof setTimeout>;

export const logout = () => {
  clearTimeout(logoutTimer);

  localStorage.removeItem("access_token");
  localStorage.removeItem("expires_in");

  window.location.href = "/login";
};

export const startLogoutTimer = (expiresIn: number) => {
  clearTimeout(logoutTimer);

  logoutTimer = setTimeout(() => {
    logout();
  }, expiresIn * 1000);
};

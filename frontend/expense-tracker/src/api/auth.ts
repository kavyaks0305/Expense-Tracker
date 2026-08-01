import api from "./axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";

export const login = (data: LoginRequest) =>
  api.post<LoginResponse>("/auth/login", data);

export const register = (data: RegisterRequest) =>
  api.post("/auth/register", data);

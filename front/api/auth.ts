import { destroyCookie } from "nookies";
import axios from "../axios/index";
import { LoginFormDTO, LoginResponseDTO, RegisterFormDTO, RegisterResponseDTO, User } from "./dto/auth.dto";

export const login = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  return (await axios.post("/api/auth/login", values)).data;
};


export const register = async (
  values: RegisterFormDTO
): Promise<RegisterResponseDTO> => {
  return (await axios.post("/api/auth/registration", values)).data;
};

export const getMe = async (
): Promise<User> => {
  return (await axios.get("/api/auth/login")).data;
};

export const logout = () => {
  destroyCookie(null, "_accessToken", { path: "/" });
};
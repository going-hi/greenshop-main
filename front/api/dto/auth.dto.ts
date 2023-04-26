export interface LoginFormDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
}

export type RegisterFormDTO = LoginFormDTO;

export type RegisterResponseDTO = LoginResponseDTO;

export interface User {
  id: number;
  email: string;
}

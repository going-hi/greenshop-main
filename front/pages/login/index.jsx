import React from "react";
import { instance } from "@/axios";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    const user = await instance.post(
      "/api/auth/login",
      userData
    );
    console.log(user.data);
  };
  return (
    <>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Почта"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">кнопка</button>
      </form>
    </>
  );
};

export default Login;

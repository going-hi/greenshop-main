import React from "react";
import { instance } from "@/axios";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [repeatPassword, setRepeatPassword] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      // repeatPassword,
    };
    const newUser = await instance.post("/api/auth/registration", userData);
    console.log(newUser.data);
  };
  return (
    <>
      <h2>Регистрация</h2>
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
        {/* <input
          type="password"
          placeholder="повторите пароль"
          onChange={(e) => setRepeatPassword(e.target.value)}
        /> */}
        <button type="submit">кнопка</button>
      </form>
    </>
  );
};

export default Register;

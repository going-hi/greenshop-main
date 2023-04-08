import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import Form from "@/components/form/form";
import { setUser } from "@/store/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accesToken,
          })
        );
      })
      .catch(() => alert('ошибка'));
  };
  return (
    <>
      <h1>Авторизация</h1>
      <Form title="Войти" handleClick={handleLogin} />
      <p>
        Вы не зарегестрированы?
        <Link href="/registration">Зарегестироватся</Link>
      </p>
    </>
  );
};

export default Login;

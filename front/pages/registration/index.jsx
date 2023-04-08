import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import Form from "@/components/form/form";
import { setUser } from "@/store/slices/userSlice";

const Register = () => {
  const dispatch = useDispatch();

  const handleRegister = (email, password) => {
    const auth = getAuth();
    console.log(auth);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accesToken,
          })
        );
      })
      .catch(console.error);
  };

  return (
    <>
      <h1>Регистрация</h1>
      <Form title="Регистрация" handleClick={handleRegister} />
      <p>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </>
  );
};

export default Register;

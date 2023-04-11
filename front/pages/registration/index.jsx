import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "@/store/auth/authSlice";
import { useRouter } from "next/router";

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const router = useRouter(selectIsAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);

    if (!data.payload) {
      return alert("Не удалось зарегестироватся");
    }

    if ('accessToken' in data.payload) {
      window.localStorage.setItem("accessToken", data.payload.accessToken);
    }
  };

  if (isAuth) {
    router.push("/");
    return null;
  }

  return (
    <>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Почта"
          {...register("email", { require: "Укажите почту" })}
        />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="пароль"
          {...register("password", { require: "Укажите пароль" })}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">кнопка</button>
      </form>
    </>
  );
};

export default Register;

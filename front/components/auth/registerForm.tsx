import React from "react";
import { Button, Form, Input, notification } from "antd";
import { RegisterFormDTO } from "@/api/dto/auth.dto";
import { setCookie } from "nookies";

import * as Api from "@/api";

const RegisterForm: React.FC = () => {
  const onSubmit = async (values: RegisterFormDTO) => {
    try {
      const { accessToken } = await Api.auth.register(values);

      notification.success({
        message: "Успешно!",
        description: "Переходим в админ-панель...",
        duration: 2,
      });

      setCookie(null, "_accessToken", accessToken, {
        path: "/",
      });

      location.href = "/";
    } catch (err) {
      console.warn(err);

      notification.error({
        message: "Ошибка!",
        description: "Ошибка при регистрации",
        duration: 2,
      });
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="E-Mail"
        name="email"
        rules={[
          {
            required: true,
            message: "Укажите почту",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Укажите пароль",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

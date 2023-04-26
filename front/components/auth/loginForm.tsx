import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { LoginFormDTO } from "@/api/dto/auth.dto";
import { setCookie } from "nookies";

import * as Api from "@/api";

const LoginForm: React.FC = () => {
  const onSubmit = async (values: LoginFormDTO) => {
    try {
      const { accessToken } = await Api.auth.login(values);
      notification.success({
        message: "Успешно!",
        description: "Переходим в админ-панель...",
        duration: 2,
      });

      setCookie(null, "_accessToken", accessToken, {
        path: "/",
      });

      location.href = "/dashboard";
    } catch (err) {
      console.warn("LoginForm", err);

      notification.error({
        message: "Ошибка!",
        description: "Неверный логин или пароль",
        duration: 2,
      });
    }
  };


  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Укажите почту!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Укажите пароль!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

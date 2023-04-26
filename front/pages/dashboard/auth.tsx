import LoginForm from "@/components/auth/loginForm";
import RegisterForm from "@/components/auth/registerForm";
import { Tabs } from "antd";
import { NextPage } from "next";

const AuthPage: NextPage = () => {
  return (
    <div style={{ width: 400, margin: "50px auto" }}>
      <Tabs
        items={[
          { label: "войти", key: "1", children: <LoginForm /> },
          { label: "регистрация", key: "2", children: <RegisterForm /> },
        ]}
      />
    </div>
  );
};

export default AuthPage;

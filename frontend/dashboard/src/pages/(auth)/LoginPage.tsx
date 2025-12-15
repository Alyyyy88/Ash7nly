import AuthLayout from "@/Layouts/AuthLayout";
import { LoginForm } from "./components/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;

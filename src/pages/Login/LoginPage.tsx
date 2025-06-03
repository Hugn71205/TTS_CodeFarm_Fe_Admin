/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Breadcrumb, message } from "antd";
import CustomButton from "./components/CustomButton";
import GoogleLoginButton from "./components/GoogleLoginButton";
import InputField from "./components/InputField";
import type { UserLogin } from "../../../interface/type";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const navigate = useNavigate();

  const onSubmit = async (user: UserLogin) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8888/auth/login",
        user
      );
      message.success("🎉 Đăng nhập thành công!");

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error: any) {
      message.error(error.response?.data?.message || "❌ Đăng nhập thất bại!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />

      <h1 className="text-2xl text-black font-bold mb-8">Login</h1>

      <div className="max-w-md mx-auto">
        <GoogleLoginButton />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <InputField
              label="Email"
              id="email"
              type="email"
              register={register("email", {
                required: "Không được để trống",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email không đúng định dạng",
                },
              })}
              error={errors.email}
              required
            />

            <InputField
              label="Password"
              id="password"
              type="password"
              register={register("password", {
                required: "Không được để trống",
              })}
              error={errors.password}
              required
            />

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Forgot Password?
              </Link>
            </div>

            <CustomButton type="submit">Login</CustomButton>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

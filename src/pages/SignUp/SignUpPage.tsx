/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import InputField from "./components/InputField";
import CustomButton from "./components/CustomButton";
import MyCustomIcon from "./components/MyCustomIcon";
import type { UserRegister } from "../../../interface/type";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>();

  const navigate = useNavigate();

  const onSubmit = async (user: UserRegister) => {
    try {
      await axios.post("http://localhost:8888/auth/register", user);
      alert("🎉 Đăng ký thành công! Vui lòng kiểm tra email để xác minh.");
      navigate("/verify-email", { state: { email: user.email } });
    } catch (error: any) {
      alert(error?.response?.data?.message?.[0] || "❌ Đăng ký thất bại!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-8 text-black">Sign up</h1>

      <div className="max-w-md mx-auto">
        <CustomButton variant="google">
          <MyCustomIcon />
          Continue with Google
        </CustomButton>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Name"
            placeholder="Type your name..."
            {...register("name", { required: "Không được để trống" })}
            error={errors.name}
          />

          <InputField
            label="Email"
            placeholder="Type your email..."
            {...register("email", {
              required: "Không được để trống",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email không đúng định dạng",
              },
            })}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Type your password..."
            {...register("password", { required: "Không được để trống" })}
            error={errors.password}
          />

          <div className="text-sm text-gray-600 mt-2">
            By Creating An Account You Agree With Our Terms Of Service, Privacy
            Policy.
          </div>

          <CustomButton type="submit">Create account</CustomButton>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

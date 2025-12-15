import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginRequestSchema } from "@/schema/auth";
import { Link } from "react-router";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginRequestSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: login } = useLogin();

  const onSubmit = (data: LoginRequestSchema) => {
    console.log("Form submitted with data:", data);
    login(data, {
      onSuccess: () => {
        reset();
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-900">
          Email
        </Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="merchant@ash7nly.com"
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-gray-900">
            Password
          </Label>
          <Link
            to="/forgot-password"
            className="text-xs text-gray-500 hover:text-red-500 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="••••••••"
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
        Login
      </Button>
    </form>
  );
};

export default Form;

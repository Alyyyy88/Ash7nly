import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema, type RegisterRequestSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/auth";
const RegForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterRequestSchema>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "MERCHANT",
      userName: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate: registerUser } = useRegister();
  const role = watch("role");
  console.log("Selected role:", role);

  const onSubmit = (data: RegisterRequestSchema) => {
    console.log("Register form submitted with data:", data);
    registerUser(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-gray-900">
          Full Name
        </Label>
        <Input
          {...register("fullName")}
          id="fullName"
          type="text"
          placeholder="John Doe"
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        {errors.fullName && (
          <p className="text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="userName" className="text-gray-900">
          Username
        </Label>
        <Input
          {...register("userName")}
          id="userName"
          type="text"
          placeholder="johndoe"
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        {errors.userName && (
          <p className="text-sm text-red-600">{errors.userName.message}</p>
        )}
      </div>

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
        <Label htmlFor="password" className="text-gray-900">
          Password
        </Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
        Register
      </Button>
    </form>
  );
};

export default RegForm;

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store } from "lucide-react";
import { Link } from "react-router";
import RegForm from "./RegForm";

const RegisterForm = () => {
  return (
    <Card className="w-full max-w-md bg-white dark:bg-white border border-gray-100 shadow-xl">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex justify-center">
          <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center shadow-md">
            <Store size={28} className="text-white" strokeWidth={2.5} />
          </div>
        </div>
        <div className="text-center space-y-1">
          <CardTitle className="text-2xl text-gray-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Join Ash7nly Merchant Dashboard
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <RegForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;

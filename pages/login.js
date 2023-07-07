import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "@/stores/auth";
const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email is not valid"
      )
      .typeError("Email is not valid")
      .required(),
    password: yup.string().min(6).required(),
  })
  .required();
export default function Login() {
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    login(data);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="min-w-[120px] ">
        <Card className="p-4" shadow={true}>
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <Input size="lg" label="Email" {...register("email")} />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            {/* <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-blue-500"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            /> */}
            <Button className="mt-6" fullWidth type="submit">
              Login
            </Button>
            {/* <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </a>
            </Typography> */}
          </form>
        </Card>
      </div>
    </div>
  );
}

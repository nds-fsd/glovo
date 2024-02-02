import { useForm } from "react-hook-form";
import { api } from "../../utils/apiWrapper";
import { setUserSession } from "../../utils/localStorage.utils";

const Login = ({ forceUpdate }) => {
  const ref = useOnclickOutside(() => {
    setFormulariosIsOpen(false);
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    api.post("/auth/login", data).then((data) => {
      if (data?.data.token) {
        setUserSession(data.data);
        forceUpdate();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <label for="name">Email*:</label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <br />

      <label for="name">Password*:</label>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <br />

      <input type="submit" />
    </form>
  );
};

export default Login;

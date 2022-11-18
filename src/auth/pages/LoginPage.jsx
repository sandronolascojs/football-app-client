import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HomeLayout } from "../../app/layout/HomeLayout";
import { useLogin } from "../../hooks";
import styles from "./styles.module.scss";

export const LoginPage = () => {
  const { isLoading } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { onSubmit, clear } = useLogin(reset);

  return (
    <HomeLayout>
      <div
        className={`${styles.containerLogin} animate__animated animate__zoomIn`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Email"
            autoFocus
            autoComplete="off"
            {...register("email", {
              required: true,
              maxLength: 40,
              validate: (value) => {
                return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                  value.toLowerCase()
                );
              },
            })}
            disabled={isLoading}
            style={
              isLoading
                ? { cursor: "not-allowed", backgroundColor: "gray" }
                : {}
            }
          />
          {errors.email?.type === "required" && <p>Email is required</p>}
          {errors.email?.type === "validate" && <p>Email format is invalid</p>}
          {errors.email?.type === "maxLength" && (
            <p>email must have a maximum of 40 characters</p>
          )}
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 10,
              validate: (value) => {
                return !/\s/.test(value.toLowerCase());
              },
            })}
            disabled={isLoading}
            style={
              isLoading
                ? { cursor: "not-allowed", backgroundColor: "gray" }
                : {}
            }
          />
          {errors.password?.type === "required" && <p>Password is required</p>}
          {errors.password?.type === "validate" && (
            <p>Password must not have spaces</p>
          )}
          {(errors.password?.type === "maxLength" ||
            errors.password?.type === "minLength") && (
            <p>Password must be between 6 and 10 characters</p>
          )}
          <div className={styles.buttons}>
            <input
              type="button"
              value="Clear"
              onClick={clear}
              disabled={isLoading}
              style={
                isLoading
                  ? { cursor: "not-allowed", backgroundColor: "gray" }
                  : {}
              }
            />
            <input
              type="submit"
              value={isLoading ? "Verifying..." : "Login"}
              disabled={isLoading}
              style={
                isLoading
                  ? { cursor: "not-allowed", backgroundColor: "gray" }
                  : {}
              }
            />
          </div>
          <span className={styles.click}>
            ¿Are you not registered yet?{" "}
            <Link to="/auth/register">Register here</Link>
          </span>
        </form>
      </div>
    </HomeLayout>
  );
};

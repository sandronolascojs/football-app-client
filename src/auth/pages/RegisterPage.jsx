import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HomeLayout } from "../../app/layout/HomeLayout";
import { useRegister } from "../../hooks";
import { Spinner } from "../../utils/Spinner/Spinner";
import styles from "./styles.module.scss";

export const RegisterPage = () => {
  const { isLoading } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { onSubmit, clear } = useRegister(reset);

  return (
    <HomeLayout>
      <div
        className={`${styles.containerLogin} animate__animated animate__zoomIn`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="User"
            autoFocus
            autoComplete="off"
            {...register("username", {
              required: true,
              maxLength: 20,
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
          {errors.username?.type === "required" && <p>User is required</p>}
          {errors.username?.type === "validate" && (
            <p>User must not contain spaces</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p>User must have a maximum of 20 characters</p>
          )}
          <input
            type="text"
            placeholder="Email"
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
          {errors.email?.type === "required" && <p>El email es obligatorio</p>}
          {errors.email?.type === "validate" && (
            <p>El fomato de email no es válido</p>
          )}
          {errors.email?.type === "maxLength" && (
            <p>El email debe tener como máximo 40 caracteres</p>
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
          {errors.password?.type === "required" && (
            <p>La contraseña es obligatorio</p>
          )}
          {errors.password?.type === "validate" && (
            <p>La contraseña no debe tener espacios</p>
          )}
          {(errors.password?.type === "maxLength" ||
            errors.password?.type === "minLength") && (
            <p>La contraseña debe tener entre 6 y 10 caracteres</p>
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
              value={isLoading ? "Registering..." : "Register"}
              disabled={isLoading}
              style={
                isLoading
                  ? { cursor: "not-allowed", backgroundColor: "gray" }
                  : {}
              }
            />
          </div>
          <span className={styles.click}>
            ¿Have you already registered?{" "}
            <Link to="/auth/login">Enter here</Link>
          </span>
        </form>
      </div>
    </HomeLayout>
  );
};

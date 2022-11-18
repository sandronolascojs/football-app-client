import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isChecking, login, logout, userRegister } from "../store/appSlice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

export const useLogin = (reset) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(isChecking());

    await axios
      .post(`${import.meta.env.VITE_BACKEND}/api/v1/auth/login`, data)
      .then(async (data) => {
        await swal.fire("Success!", "Welcome to OneFootball!", "success");

        const {
          data: { data: dataF },
        } = data;

        localStorage.setItem("x-token", dataF.token);
        localStorage.setItem("username", dataF.user.username);
        localStorage.setItem("id", dataF.user.id);

        dispatch(login());
        navigate("/home");
      })
      .catch((err) => {
        dispatch(logout());
        swal.fire("Error!", "Incorrect credentials", "error");
      });
  };

  const clear = () => {
    reset();
  };
  return { onSubmit, clear };
};

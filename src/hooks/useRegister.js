import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isChecking, login, logout, userRegister } from "../store/appSlice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

export const useRegister = (reset) => {
  const { dataUser } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetching()
      .then(({ data }) => {
        const dataToSend = {
          ip: data.ip,
          location: data.location,
          country: data.country.name,
        };
        dispatch(userRegister(dataToSend));
      })
      .catch((error) => console.log(error));
  }, []);

  const fetching = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_LOOKUP_URL, {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_API_LOOKUP_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_API_LOOKUP_HOST,
        },
      });

      return response;
    } catch (error) {
      throw Error("Error al obtener la data");
    }
  };

  const onSubmit = async (data) => {
    dispatch(isChecking());
    const { ip, location, country } = dataUser;

    const dataToSend = { ...data, ip, location, country };

    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`, dataToSend)
      .then(async (data) => {
        const {
          data: { data: dataF },
        } = data;

        await swal.fire(
          "Success!",
          "The account has been created successfully",
          "success"
        );

        localStorage.setItem("x-token", dataF.token);
        localStorage.setItem("username", dataF.user.username);
        localStorage.setItem("email", dataF.user.email);

        dispatch(login());
      })
      .catch((err) => {
        dispatch(logout());
        swal.fire("Error!", "The email is already registered", "error");
      });

    navigate("/home");
  };

  const clear = () => {
    reset();
  };
  return { onSubmit, clear };
};

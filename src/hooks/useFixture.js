import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFixture } from "../store/appSlice";
import axios from "axios";

export const useFixture = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/matchs`).then((data) => {
      dispatch(getFixture(data.data.data));
    });
  }, []);
};

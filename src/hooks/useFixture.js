import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFixture } from "../store/appSlice";
import {config } from '../config/config.js'
import axios from "axios";

const { env } = config

export const useFixture = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${env.backendApiUrl}/api/v1/matchs`).then((data) => {
      dispatch(getFixture(data.data.data));
    });
  }, []);
};

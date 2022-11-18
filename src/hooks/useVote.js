import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert2";

const userToken = localStorage.getItem("x-token");

export const useVote = () => {
  const [idMatch, setIdMatch] = useState("");
  const [idTeam, setIdTeam] = useState("");

  const vote = async (nCountry) => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/matchs`)
      .then(async (data) => {
        let currentMatch = { rawDate: new Date().toLocaleDateString };
        data.data.data.forEach((match) => {
          if (currentMatch.rawDate > match.rawDate) {
            currentMatch = match;
          }
        });

        const finalData = {
          match: currentMatch._id,
          team: currentMatch.teams[nCountry]._id,
        };

        await axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/votes`, finalData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("x-token"),
            },
          })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return {
    vote,
  };
};

const getIdMatch = () => {
  const { fixture } = useSelector((state) => state.app);
  const [nextMatch, setNextMatch] = useState({});

  let currentMatch = { rawDate: new Date().toLocaleDateString };
  fixture.forEach((match) => {
    if (currentMatch.rawDate > match.rawDate) {
      currentMatch = match;
    }
  });

  setNextMatch(currentMatch);
};

// token de usuario
// id de partida
// id del equipo

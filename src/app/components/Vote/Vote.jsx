import { useNavigate } from "react-router-dom";
import { useMatches } from "../../../hooks/useMatches";
import { useVote } from "../../../hooks/useVote";
import swal from 'sweetalert2'
import styles from "./styles.module.scss";

export const Vote = () => {
  const { nextMatch } = useMatches();
  const { vote: goToVote } = useVote();
  const navigate = useNavigate();

  if (!localStorage.getItem("x-token")) {
    // swal.fire("Warning!", "You must be logged in to be able to vote", "warning");
    return navigate("/auth/login");
  }

  return (
    <div
      className={`${styles.containerVote} animate__animated animate__zoomIn`}
    >
      <h1>Please, select a country!</h1>
      <div className={styles.countriesVote}>
        <div className={styles.firstTeam} onClick={() => goToVote(0)}>
          <figure>
            <img
              src={nextMatch?.teams?.[0].img}
              alt={nextMatch?.teams?.[0].img}
            />
          </figure>
        </div>
        <div className={styles.secondTeam} onClick={() => goToVote(1)}>
          <figure>
            <img
              src={nextMatch?.teams?.[1].img}
              alt={nextMatch?.teams?.[1].img}
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

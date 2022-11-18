import fifa from "/fifa_world.png";
import { useMatches, useVote } from "../../../hooks";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const { nextMatch } = useMatches();

  const { vote } = useVote();

  const goToVote = () => {};

  return (
    <div
      className={`${styles.containerHome} animate__animated animate__zoomIn`}
    >
      <div className={styles.first}>
        <figure>
          <img src={fifa} alt="fifa" />
        </figure>
      </div>
      <div className={styles.second}>
        <div className={styles.firstCard}>
          <h1 className={styles.next}>Next match</h1>
          <h3 className={styles.teams}>Teams</h3>
          <div className={styles.infoTeam}>
            <div className={styles.team}>
              <figure>
                <img
                  src={nextMatch.teams?.[0].img}
                  alt={nextMatch.teams?.[0].country}
                />
              </figure>
              <span>{nextMatch.teams?.[0].country}</span>
            </div>
            <span className={styles.vs}>vs</span>
            <div className={styles.team}>
              <figure>
                <img
                  src={nextMatch.teams?.[1].img}
                  alt={nextMatch.teams?.[1].country}
                />
              </figure>
              <span>{nextMatch.teams?.[1].country}</span>
            </div>
          </div>
        </div>
        {/* <div className={styles.line}></div> */}
        <div className={styles.secondCard}>
          <h1 className={styles.time}>Timezone</h1>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <span>13:30pm</span>
          </div>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <span>14:00pm</span>
          </div>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <span>16:30pm</span>
          </div>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <span>17:00pm</span>
          </div>
        </div>
        <div className={styles.vote}>
          <Link to="/home/vote">Vote here!</Link>
        </div>
      </div>
    </div>
  );
};

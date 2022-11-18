import React, { useState } from "react";
import { useEffect } from "react";
import { getAllTeamsByRanking } from "../../services/ranking.services";
import { HomeLayout } from "../layout/HomeLayout";

const styles = {
    container: {
        backgroundImage: 'url("/estadio.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff'

    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '32px',
        padding: '54px',
    },
  table: {
    width: "80%",
    borderCollapse: "collapse",
    textAlign: "center",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  tableDataWrapper: {
    border: "rgba(218, 223, 225, 0.8)",
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    padding: "26px",
    display: "flex",
    gap: "24px",
    borderRadius: "8px",
  },
  teamInfo: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  teamLogo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "1px solid black",
  },
};

export default function RankingPage() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return async () => {
      const response = await getAllTeamsByRanking();
      setRanking(response.data);
      setLoading(false);
    };
  }, []);
  return (
    <>
         <HomeLayout>
         <div style={styles.container}>
                <div style={styles.contentWrapper}>
                <h1>Ranking</h1>

        {loading && <p>Loading...</p>}

        <div style={styles.table}>
        {ranking?.map((team) => {
            return (
            <div key={team._id}>
                <div style={styles.tableDataWrapper}>
                <img
                    style={styles.teamLogo}
                    src={team.img}
                    alt={team.country}
                />
                <div style={styles.teamInfo}>
                    <p>{team.country}</p>
                    <p>{team.points}</p>
                </div>
                </div>
            </div>
            );
        })}
        </div>
        </div>
          
    </div>
         </HomeLayout>
    </>
  );
}

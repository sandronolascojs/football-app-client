import { useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { ImUserPlus } from "react-icons/im";
import pelota from "/pelota.svg";
import { getFixture, logout } from "../../store/appSlice";
import styles from "./styles.module.scss";
import { useFixture } from "../../hooks/useFixture";

const style = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "1rem",
};

export const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.app);

  useFixture();

  const startLogout = () => {
    dispatch(logout());
    <Navigate to="/home" />;
  };

  return (
    <div className={styles.containerHomeLayout}>
      <nav className={styles.navbar}>
        <div className={styles.first}>
          <figure>
            <img src={pelota} alt="football" />
          </figure>
          <span>OneFootball</span>
        </div>
        <div className={styles.second}>
          <ul>
            <li>
              <NavLink
                style={({ isActive }) => {
                  return {
                    display: "block",
                    borderBottom: isActive ? "red" : "",
                  };
                }}
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/ranking">Ranking</NavLink>
            </li>
            <li>
              <NavLink to="/teams">Teams</NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => {
                  return {
                    display: "block",
                    borderBottom: isActive ? "red" : "",
                  };
                }}
                to="/account"
              >
                Account
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.third}>
          {!isLogged ? (
            <>
              <Link to="/auth/register" style={{ marginRight: "0.7rem" }}>
                <div style={style}>
                  <ImUserPlus />
                  <span>Register</span>
                </div>
              </Link>
              <Link to="/auth/login">
                <div style={style}>
                  <BiLogIn />
                  <span>Login</span>
                </div>
              </Link>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  marginRight: "1rem",
                  backgroundColor: "blue",
                  borderRadius: "1rem",
                  padding: "0.3rem 0.8rem",
                  fontWeight: "bolder",
                }}
              >
                User: <span>{localStorage.getItem("username")}</span>
              </span>
              <Link onClick={startLogout}>
                <div style={style}>
                  <BiLogOut />
                  <span>Logout</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const user = JSON.parse(localStorage.getItem("auth"));

export default function Profile() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }
  return (
    <div className="mt-5" style={{ minHeight: "77vh" }}>
      <div className={styles.card}>
        <img src={user.userImg} alt={user.username} style={{ width: "100px", margin: "20px" }} />
        <h1>{user.username}</h1>

        <p>Email: {user.email}</p>
        <p>Created Items: {user.themes.length}</p>
        <p>Total Comments: {user.posts.length}</p>

        <p>
          <button className={styles["btn-profile"]} onClick={handleClick}>
            Back
          </button>
        </p>
      </div>
    </div>
  );
}

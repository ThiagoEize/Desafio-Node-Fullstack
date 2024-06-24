import { Link, useLocation } from "react-router-dom";
import styles from "./ContentTop.module.css";

interface ContentTopProps {
  title: string;
  message: string;
}

const ContentTop: React.FC<ContentTopProps> = ({ title, message }) => {
  const location = useLocation();

  const displayTitle = (): string => {
    return title === "events"
      ? "Eventos"
      : title === "places"
      ? "Places"
      : title === "edit-events"
      ? "Editar Evento"
      : "Editar Lugar";
  };

  return (
    <>
      <div className={styles.navLinks}>
        <Link
          to="/"
          className={location.pathname === "/" ? styles.selected : ""}
        >
          Home
        </Link>
        /
        <Link
          to={`/${title}`}
          className={location.pathname.includes(title) ? styles.selected : ""}
        >
          {displayTitle()}
        </Link>
      </div>
      <h1>{displayTitle()}</h1>
      <p>{message}</p>
    </>
  );
};

export default ContentTop;

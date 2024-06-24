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
      : title === "edit-event"
      ? "Editar Evento"
      : "Editar Lugar";
  };

  const isSelected = (path: string) => {
    const regex = new RegExp(`^/${path}`);
    return regex.test(location.pathname);
  };

  // Extracting any parameters from the location.pathname
  const params = location.pathname.split("/").slice(2).join("/");

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
          to={`/${title}${params ? `/${params}` : ""}`}
          className={isSelected(title) ? styles.selected : ""}
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

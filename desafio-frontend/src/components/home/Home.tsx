import React, { useEffect } from "react";
import EventsList from "../EventsList";
import PlacesList from "../PlacesList";
import { usePlaceContext } from "../../context/PlaceContext";
import { useEventContext } from "../../context/EventContext";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import styles from "./Home.module.css";
import placeIcon from "../../assets/images/placeIcon.png";
import eventIcon from "../../assets/images/eventIcon.png";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const placesToDisplay = ["name", "address", "turnstiles", "singlePage"];
  const eventsToDisplay = ["event", "type", "placeId", "singlePage"];

  const { fetchPlaces } = usePlaceContext();
  const { fetchEvents } = useEventContext();

  useEffect(() => {
    fetchPlaces({ page: 1, limit: 3, searchTerm: "", orderBy: "dateStart" });
    fetchEvents({ page: 1, limit: 3, searchTerm: "", orderBy: "dateStart" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainContainer">
      <div className="row">
        <div className="col-6">
          <div className={styles.allPlacesContainer}>
            <div className="left-align">
              <div className="customRow">
                <img className={styles.placeIcon} src={placeIcon} alt="House" />
                <div>
                  <h1>Locais</h1>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/places")}
              className={styles.button}
            >
              Conferir locais
            </button>
          </div>
          <PlacesList fieldsToDisplay={placesToDisplay} />
        </div>
        <div className="col-6">
          <div className={styles.allEventsContainer}>
            <div className="left-align">
              <div className="customRow">
                <img className={styles.eventIcon} src={eventIcon} alt="House" />
                <div>
                  <h1>Eventos</h1>
                </div>
              </div>
            </div>
            <button className={styles.button}>Conferir Eventos</button>
          </div>
          <EventsList fieldsToDisplay={eventsToDisplay} />
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";
import Header from "../components/Header";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();

  const { data, loading, error } = useFetch(
    `https://meetup-backend-zcy0.onrender.com/event/${id}`
  );
  console.log(id);
  console.log(data);
  if (!event && data) {
    setEvent(data);
  }

  return (
    <div className="p-4">
      <Header />
      {event && (
        <>
          <h2>{event.title}</h2>
          <img
            src={event.photos}
            alt={event.title}
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
          <p>{event.description}</p>
          <ul>
            <li> Date: {event.date}</li>
            <li> Time: {event.time}</li>
            <li> Speakers: {event.speakers}</li>
            <li> Mode: {event.mode}</li>
          </ul>
          <Link to="/" className="btn btn-secondary mt-3">
            Back to Events
          </Link>
        </>
      )}
    </div>
  );
};

export default EventDetails;

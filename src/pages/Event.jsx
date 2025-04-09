import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

const Event = () => {
  const [initialData, setInitialData] = useState([]);
  const [dataUse, setDataUse] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const apiUrl = `https://meetup-backend-zcy0.onrender.com/event`;

  const { data, loading, error } = useFetch(apiUrl);
  console.log(data);

  useEffect(() => {
    if (data && data.length && initialData.length === 0) {
      setInitialData(data);
      setDataUse(data);
    }
  }, [data, initialData]);

  const filterHandle = (e) => {
    const value = e.target.value;
    if (value === "both") {
      setDataUse(initialData);
    } else {
      const filtered = initialData.filter((event) => event.mode === value);
      setDataUse(filtered);
    }
  };

  const handleClick = () => {
    const search = inputValue.toLowerCase();
    const filtered = initialData.filter((event) => {
      const titleMatch = event.title?.toLowerCase().includes(search);
      const tagMatch = event.tags?.some((tag) =>
        tag.toLowerCase().includes(search)
      );
      return titleMatch || tagMatch;
    });

    setDataUse(filtered);
  };

  return (
    <div className="container-fluid p-4 vh-100 bg-secondary-subtle overflow-auto">
      <h2 className="text-dark mb-4">Upcoming Events</h2>

      <div className="mb-4 d-flex gap-4">
        <div>
          <label className="form-label fw-bold">Filter by Mode:</label>
          <select
            name="modeFilter"
            className="form-select w-auto"
            onChange={filterHandle}
          >
            <option value="both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div className="flex-grow-1">
          <label className="form-label fw-bold">Search by Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or tag..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleClick}>
            Check
          </button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {dataUse?.map((event) => (
          <div className="col" key={event._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={event.photos}
                className="card-img-top"
                alt={event.title}
                style={{ height: "160px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text mb-1">
                  <strong>Mode:</strong> {event.mode}
                </p>
                <p className="card-text">
                  <strong>Date:</strong> {event.date}
                </p>
                <Link
                  className="btn btn-primary mt-auto"
                  to={`/event/${event._id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {dataUse?.length === 0 && (
          <div className="text-muted mt-4">No events found.</div>
        )}
      </div>
    </div>
  );
};

export default Event;

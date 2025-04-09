import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="py-2 bg-light shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://cdn.pixabay.com/photo/2020/09/17/18/05/people-5579977_1280.png"
            alt="Meetup Logo"
            style={{ maxWidth: "150px" }}
          />
          <h2 className="mb-0 text-dark fw-semibold">Meetup</h2>
        </div>

        <div>
          <span className="text-secondary fw-medium fs-5">
            Discover. Connect. Experience Events.
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

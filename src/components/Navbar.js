import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        // Redirect to home page or do any necessary clean up
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
        <NavLink to="/" className="navbar-brand p-0">
          <h1 className="m-0 text-primary">
            <i className="fa fa-tooth me-2" />
            DentCare
          </h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            {/* Other NavLinks */}
            <NavLink to="/" className="nav-item nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to="/service" className="nav-item nav-link">
              Service
            </NavLink>
            <div className="nav-item dropdown">
              <NavLink
                to="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </NavLink>
              <div className="dropdown-menu m-0">
                <NavLink to="/pricing" className="dropdown-item">
                  Pricing Plan
                </NavLink>
                <NavLink to="/team" className="dropdown-item">
                  Our Dentist
                </NavLink>
                <NavLink to="/testimonial" className="dropdown-item">
                  Testimonial
                </NavLink>
                <NavLink to="/appointment" className="dropdown-item">
                  Appointment
                </NavLink>
              </div>
            </div>
            <NavLink to="/contact" className="nav-item nav-link">
              Contact
            </NavLink>
          </div>
          <button
            type="button"
            className="btn text-dark"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fa fa-search" />
          </button>
          <NavLink to="/appointment" className="btn btn-primary py-2 px-4 ms-3">
            Appointment
          </NavLink>

          {/* Sign In Button */}
          <NavLink
            to="/signin"
            className="btn btn-primary py-2 px-4 ms-3"
            style={{ display: isLoggedIn ? "none" : "block" }}
          >
            Sign In
          </NavLink>
          {/* User login */}
          {isLoggedIn && (
            <div className="dropdown">
              {/* Dropdown Button */}
              <button
                className="btn btn-primary py-2 px-4 ms-3 dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  aria-hidden="true"
                  style={{
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                />
                {userName}
                {/* Replace this with actual user name */}
              </button>
              {/* Dropdown Menu */}
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <NavLink to="/profile" className="dropdown-item">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/seo-settings" className="dropdown-item">
                    SEO Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/adminpage" className="dropdown-item">
                    Admin Page
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {/* User login */}
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}

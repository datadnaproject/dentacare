import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        // Redirect to home page or do any necessary clean up
        window.location.href = "/";
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

          {/* User login */}
          <div className="dropdown">
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
              {isLoggedIn ? "User Name" : "Login"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {isLoggedIn ? (
                <>
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
                </>
              ) : (
                <li>
                  <NavLink to="/signin" className="dropdown-item">
                    Sign In
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {/* User login */}
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}

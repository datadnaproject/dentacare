import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Header({ pageTitle, subTitle }) {
  const [headerBgImageUrl, setHeaderBgImageUrl] = useState(null);

  // fetch images from storage
  useEffect(() => {
    async function fetchHeaderBgImageUrl() {
      try {
        const storageRef = firebase.storage().ref("Background_Images");
        const imageRef = storageRef.child("Header-bg.jpg");
        const url = await imageRef.getDownloadURL();
        setHeaderBgImageUrl(url); // Set the array of image URLs to state
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    }

    fetchHeaderBgImageUrl();
  }, []);
  return (
    <>
      {/* Header Start */}
      <div
        className="container-fluid bg-primary py-5 hero-header mb-5"
        style={{
          backgroundImage: `linear-gradient(rgba(9, 30, 62, 0.85), rgba(9, 30, 62, 0.85)),
        url(${headerBgImageUrl})`,
        }}
      >
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">
              {pageTitle}
            </h1>
            <NavLink href="/" className="h4 text-white">
              Home
            </NavLink>
            <i className="far fa-circle text-white px-2" />
            <NavLink href="" className="h4 text-white">
              {subTitle}
            </NavLink>
          </div>
        </div>
      </div>
      {/* Header End */}
    </>
  );
}

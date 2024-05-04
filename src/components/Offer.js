import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Offer() {
  const [offerContent, setOfferContent] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchOfferContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Offer")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Offer_Title, Offer_Description} = data;

          setOfferContent({
            title: Offer_Title || "",
            description: Offer_Description || "",
          });
        } else {
          console.error("Offer section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching offer section content:", error);
      }
    };

    fetchOfferContent();
  }, []);
  return (
    <>
      {/* Offer Start */}
      <div
        className="container-fluid bg-offer my-5 py-5 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
              <div className="offer-text text-center rounded p-5">
                <h1 className="display-5 text-white">
                  {offerContent.title}
                </h1>
                <p className="text-white mb-4">
                  {offerContent.description}
                </p>
                <NavLink
                  to="/appointment"
                  className="btn btn-dark py-3 px-5 me-3"
                >
                  Appointment
                </NavLink>
                <a href="" className="btn btn-light py-3 px-5">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Offer End */}
    </>
  );
}

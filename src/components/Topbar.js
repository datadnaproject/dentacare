import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Topbar() {
  const [topbarContent, setTopbarContent] = useState({
    email: "",
    time: "",
    contactNumber: "",
  });

  useEffect(() => {
    const fetchTopbarContent = async () => {
      try {
        const snapshot = await firebase.database().ref("Topbar").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Email, Time, Contact_Number } = data;

          setTopbarContent({
            email: Email || "",
            time: Time || "",
            contactNumber: Contact_Number || "",
          });
        } else {
          console.error("Topbar content not found in database");
        }
      } catch (error) {
        console.error("Error fetching topbar content:", error);
      }
    };

    fetchTopbarContent();
  }, []);
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <small className="py-2">
                <i className="far fa-clock text-primary me-2" />
                {topbarContent.time}
              </small>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-end">
            <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
              <div className="me-3 pe-3 border-end py-2">
                <p className="m-0">
                  <i className="fa fa-envelope-open me-2" />
                  {topbarContent.email}
                </p>
              </div>
              <div className="py-2">
                <p className="m-0">
                  <i className="fa fa-phone-alt me-2" />
                  {topbarContent.contactNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
    </>
  );
}

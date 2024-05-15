import { NavLink } from "react-router-dom";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Footer() {
  const [footerContent, setFooterContent] = useState({
    siteName: "",
    description: "",
    footers: "",
  });

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Footer_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Copyright_Content, Footer_Content } = data;

          setFooterContent({
            siteName: Copyright_Content.Site_Name || "",
            description: Copyright_Content.Description || "",
            footers: Footer_Content || "",
          });
        } else {
          console.error("Footer section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching footer section content:", error);
      }
    };

    fetchFooterContent();
  }, []);
  return (
    <>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-light py-5 wow fadeInUp"
        data-wow-delay="0.3s"
        style={{ marginTop: "-75px" }}
      >
        <div className="container pt-5">
          <div className="row g-5 pt-4">
            <div className="col-lg-3 col-md-6">
              <h3 className="text-white mb-4">
                {footerContent.footers.Footer_1?.Title}
              </h3>
              <div className="d-flex flex-column justify-content-start">
                {footerContent.footers.Footer_1?.Footer_Links.map(
                  (link, index) => (
                    <NavLink
                      key={index}
                      className="text-light mb-2"
                      to={link.Url}
                    >
                      <i className="bi bi-arrow-right text-primary me-2" />
                      {link.Link}
                    </NavLink>
                  )
                )}
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 className="text-white mb-4">
                {footerContent.footers.Footer_2?.Title}
              </h3>
              <div className="d-flex flex-column justify-content-start">
                {footerContent.footers.Footer_2?.Footer_Links.map(
                  (link, index) => (
                    <NavLink
                      key={index}
                      className="text-light mb-2"
                      to={link.Url}
                    >
                      <i className="bi bi-arrow-right text-primary me-2" />
                      {link.Link}
                    </NavLink>
                  )
                )}
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 className="text-white mb-4">
                {footerContent.footers.Footer_3?.Title}
              </h3>
              <p className="mb-2">
                <i className="bi bi-geo-alt text-primary me-2" />
                {footerContent.footers.Footer_3?.Contact_Details.Location}
              </p>
              <p className="mb-2">
                <i className="bi bi-envelope-open text-primary me-2" />
                {footerContent.footers.Footer_3?.Contact_Details.Email}
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone text-primary me-2" />
                {footerContent.footers.Footer_3?.Contact_Details.Contact_Number}
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 className="text-white mb-4">Follow Us</h3>
              <div className="d-flex">
                <NavLink
                  className="btn btn-lg btn-primary btn-lg-square rounded me-2"
                  href="#"
                >
                  <i className="fab fa-twitter fw-normal" />
                </NavLink>
                <NavLink
                  className="btn btn-lg btn-primary btn-lg-square rounded me-2"
                  href="#"
                >
                  <i className="fab fa-facebook-f fw-normal" />
                </NavLink>
                <NavLink
                  className="btn btn-lg btn-primary btn-lg-square rounded me-2"
                  href="#"
                >
                  <i className="fab fa-linkedin-in fw-normal" />
                </NavLink>
                <NavLink
                  className="btn btn-lg btn-primary btn-lg-square rounded"
                  href="#"
                >
                  <i className="fab fa-instagram fw-normal" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid text-light py-4"
        style={{ background: "#051225" }}
      >
        <div className="container">
          <div className="row g-0">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-md-0">
                ©{" "}
                <NavLink className="text-white border-bottom" href="#">
                  {footerContent.siteName}
                </NavLink>
                {footerContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}

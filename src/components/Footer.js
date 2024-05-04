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
    footer1: "",
    footer2: "",
    footer3: "",
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

          console.log(Footer_Content);
          setFooterContent({
            siteName: Copyright_Content.Site_Name || "",
            description: Copyright_Content.Description || "",
            footer1: Footer_Content.Footer_1 || "",
            footer2: Footer_Content.Footer_2 || "",
            footer3: Footer_Content.Footer_3 || "",
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
              <h3 className="text-white mb-4">{footerContent.footer1.Title}</h3>
              <div className="d-flex flex-column justify-content-start">
                {footerContent.footer1.Footer_Links.map((link, index) => (
                  <NavLink key={index} className="text-light mb-2" href="#">
                    <i className="bi bi-arrow-right text-primary me-2" />
                    Home {link.Link}
                  </NavLink>
                ))}
                {/* <NavLink className="text-light mb-2" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  About Us
                </NavLink>
                <NavLink className="text-light mb-2" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  Our Services
                </NavLink>
                <NavLink className="text-light mb-2" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  Latest Blog
                </NavLink>
                <NavLink className="text-light" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  Contact Us
                </NavLink> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 className="text-white mb-4">{footerContent.footer2.Title}</h3>
              <div className="d-flex flex-column justify-content-start">
                <NavLink className="text-light mb-2" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  Home
                </NavLink>
                <NavLink className="text-light mb-2" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  About Us
                </NavLink>
                <NavLink className="text-light mb-2" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  Our Services
                </NavLink>
                <NavLink className="text-light mb-2" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  Latest Blog
                </NavLink>
                <NavLink className="text-light" href="#">
                  <i className="bi bi-arrow-right text-primary me-2" />
                  Contact Us
                </NavLink>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 className="text-white mb-4">{footerContent.footer3.Title}</h3>
              <p className="mb-2">
                <i className="bi bi-geo-alt text-primary me-2" />
                123 Street, New York, USA
              </p>
              <p className="mb-2">
                <i className="bi bi-envelope-open text-primary me-2" />
                info@example.com
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone text-primary me-2" />
                +012 345 67890
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

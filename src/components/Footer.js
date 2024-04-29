import React from "react";
import { NavLink } from "react-router-dom";

export function Footer() {
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
              <h3 className="text-white mb-4">Quick Links</h3>
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
              <h3 className="text-white mb-4">Popular Links</h3>
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
              <h3 className="text-white mb-4">Get In Touch</h3>
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
                  Your Site Name
                </NavLink>
                . All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                Designed by{" "}
                <NavLink
                  className="text-white border-bottom"
                  href="https://htmlcodex.com"
                >
                  HTML Codex
                </NavLink>
                <br />
                Distributed by{" "}
                <NavLink
                  className="text-white border-bottom"
                  href="https://themewagon.com"
                >
                  ThemeWagon
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}

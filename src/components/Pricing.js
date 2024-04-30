import priceimage1 from "../assets/img/price-1.jpg";
import priceimage2 from "../assets/img/price-2.jpg";
import priceimage3 from "../assets/img/price-3.jpg";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function Pricing() {
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Pricing Plan
              </h5>
              <h1 className="display-5 mb-0">
                We Offer Fair Prices for Dental Treatment
              </h1>
            </div>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor
              sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem
              et sit, sed stet no labore lorem sit. Sanctus clita duo justo
              eirmod magna dolore erat amet
            </p>
            <h5
              className="text-uppercase text-primary wow fadeInUp"
              data-wow-delay="0.3s"
            >
              Call for Appointment
            </h5>
            <h1 className="wow fadeInUp" data-wow-delay="0.6s">
              +012 345 6789
            </h1>
          </div>
          <div className="col-lg-7">
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={false}
              interval={5000}
            >
              <div className="price-item pb-3">
                <div className="position-relative">
                  <img
                    className="img-fluid rounded-top"
                    src={priceimage1}
                    alt=""
                  />
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
                    style={{ zIndex: 2 }}
                  >
                    <h2 className="text-primary m-0">$35</h2>
                  </div>
                </div>
                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                  <h4>Teeth Whitening</h4>
                  <hr className="text-primary w-50 mx-auto mt-0" />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Modern Equipment</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Professional Dentist</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>24/7 Call Support</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <a
                    href="appointment.html"
                    className="btn btn-primary py-2 px-14 position-absolute top-100 start-50 translate-middle"
                  >
                    Appointment
                  </a>
                </div>
              </div>
              <div className="price-item pb-4">
                <div className="position-relative">
                  <img
                    className="img-fluid rounded-top"
                    src={priceimage2}
                    alt=""
                  />
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
                    style={{ zIndex: 2 }}
                  >
                    <h2 className="text-primary m-0">$49</h2>
                  </div>
                </div>
                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                  <h4>Dental Implant</h4>
                  <hr className="text-primary w-50 mx-auto mt-0" />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Modern Equipment</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Professional Dentist</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>24/7 Call Support</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <a
                    href="appointment.html"
                    className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle"
                  >
                    Appointment
                  </a>
                </div>
              </div>
              <div className="price-item pb-4">
                <div className="position-relative">
                  <img
                    className="img-fluid rounded-top"
                    src={priceimage3}
                    alt=""
                  />
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
                    style={{ zIndex: 2 }}
                  >
                    <h2 className="text-primary m-0">$99</h2>
                  </div>
                </div>
                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                  <h4>Root Canal</h4>
                  <hr className="text-primary w-50 mx-auto mt-0" />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Modern Equipment</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Professional Dentist</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>24/7 Call Support</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <a
                    href="appointment.html"
                    className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle"
                  >
                    Appointment
                  </a>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

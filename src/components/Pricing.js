import priceImg1 from "../assets/img/price-1.jpg";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Pricing() {
  const [pricingContent, setPricingContent] = useState({
    title: "",
    description: "",
    contactNumber: "",
    pricingPlans: [],
  });

  useEffect(() => {
    const fetchPricingContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Pricing_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const {
            Pricing_Title,
            Pricing_Description,
            Contact_Number,
            Pricing_Plans,
          } = data;
          setPricingContent({
            title: Pricing_Title || "",
            description: Pricing_Description || "",
            contactNumber: Contact_Number || "",
            pricingPlans: Pricing_Plans.filter((plan) => !!plan.Title) || [], // Filter out plans without a title
          });
        } else {
          console.error("Pricing plan section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching pricing plan section content:", error);
      }
    };

    fetchPricingContent();
  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Pricing Plan
              </h5>
              <h1 className="display-5 mb-0">{pricingContent.title}</h1>
            </div>
            <p className="mb-4">{pricingContent.description}</p>
            <h5
              className="text-uppercase text-primary wow fadeInUp"
              data-wow-delay="0.3s"
            >
              Call for Appointment
            </h5>
            <h1 className="wow fadeInUp" data-wow-delay="0.6s">
              {pricingContent.contactNumber}
            </h1>
          </div>

          <div className="col-lg-7">
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              interval={5000}
            >
              {pricingContent.pricingPlans.map((plan, index) => (
                <div key={index} className="price-item pb-3">
                  <div className="position-relative">
                    <img
                      className="img-fluid rounded-top"
                      src={priceImg1}
                      alt=""
                    />
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
                      style={{ zIndex: 2 }}
                    >
                      <h2 className="text-primary m-0">{plan.Price}</h2>
                    </div>
                  </div>
                  <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                    <h4>{plan.Title}</h4>
                    {plan.Benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between mb-3"
                      >
                        <span>{benefit.Benefit}</span>
                        <i className="fa fa-check text-primary pt-1" />
                      </div>
                    ))}

                    <a
                      href="appointment.html"
                      className="btn btn-primary py-2 px-14 position-absolute top-100 start-50 translate-middle"
                    >
                      Appointment
                    </a>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

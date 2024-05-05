// about highlights needs to done
// Service needs to done

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

<div className="container-wrap mt-5">
  <div className="row d-flex no-gutters">
    <div className="col-md-6 img"></div>
    <div className="col-md-6 d-flex">
      <div className="about-wrap">
        <div className="heading-section heading-section-white mb-5 ftco-animate">
          <h2 className="mb-2">{aboutContent.title}</h2>
          <p>{aboutContent.description}</p>
        </div>
        {aboutContent.services.map((service, index) => (
          <div className="list-services d-flex ftco-animate">
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-check2" />
            </div>
            <div className="text">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>;




import beforeimage from "../assets/img/before.jpg";
import afterimage from "../assets/img/after.jpg";
import serviveimage1 from "../assets/img/service-1.jpg";
import serviveimage2 from "../assets/img/service-2.jpg";
import serviveimage3 from "../assets/img/service-3.jpg";
import serviveimage4 from "../assets/img/service-4.jpg";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Service() {
  const [serviceContent, setServiceContent] = useState({
    title: "",
    appointment: "",
    serviceList: [],
  });

  useEffect(() => {
    const fetchServiceContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Service_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const serviceList = Object.values(data).filter(
            (item) => typeof item === "object"
          );
          const { Service_Title, Service_Appointment } = data;

          setServiceContent({
            title: Service_Title || "",
            appointment: Service_Appointment || "",
            serviceList: serviceList.map((service) => ({
              title: service.Service_Title || "",
            })),
          });
        } else {
          console.error("Service section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching service section content:", error);
      }
    };
    fetchServiceContent();
  }, []);
  return (
    <>
      {/* Service Start */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-5 mb-5">
            <div
              className="col-lg-5 wow zoomIn"
              data-wow-delay="0.3s"
              style={{ minHeight: 400 }}
            >
              <div className="twentytwenty-container position-relative h-100 rounded overflow-hidden">
                <img
                  className="position-absolute w-100 h-100"
                  src={beforeimage}
                  style={{ objectFit: "cover" }}
                />
                <img
                  className="position-absolute w-100 h-100"
                  src={afterimage}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title mb-5">
                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                  Our Services
                </h5>
                <h1 className="display-5 mb-0">{serviceContent.title}</h1>
              </div>
              <div className="row g-5">
                <div
                  className="col-md-6 service-item wow zoomIn"
                  data-wow-delay="0.6s"
                >
                  <div className="rounded-top overflow-hidden">
                    <img className="img-fluid" src={serviveimage1} alt="" />
                  </div>
                  <div className="position-relative bg-light rounded-bottom text-center p-4">
                    <h5 className="m-0">Cosmetic Dentistry</h5>
                  </div>
                </div>
                <div
                  className="col-md-6 service-item wow zoomIn"
                  data-wow-delay="0.9s"
                >
                  <div className="rounded-top overflow-hidden">
                    <img className="img-fluid" src={serviveimage2} alt="" />
                  </div>
                  <div className="position-relative bg-light rounded-bottom text-center p-4">
                    <h5 className="m-0">Dental Implants</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="col-lg-7">
              <div className="row g-5">
                <div
                  className="col-md-6 service-item wow zoomIn"
                  data-wow-delay="0.3s"
                >
                  <div className="rounded-top overflow-hidden">
                    <img className="img-fluid" src={serviveimage3} alt="" />
                  </div>
                  <div className="position-relative bg-light rounded-bottom text-center p-4">
                    <h5 className="m-0">Dental Bridges</h5>
                  </div>
                </div>
                <div
                  className="col-md-6 service-item wow zoomIn"
                  data-wow-delay="0.6s"
                >
                  <div className="rounded-top overflow-hidden">
                    <img className="img-fluid" src={serviveimage4} alt="" />
                  </div>
                  <div className="position-relative bg-light rounded-bottom text-center p-4">
                    <h5 className="m-0">Teeth Whitening</h5>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 service-item wow zoomIn"
              data-wow-delay="0.9s"
            >
              <div className="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                <h3 className="text-white mb-3">
                  {serviceContent.appointment.Title}
                </h3>
                <p className="text-white mb-3">
                  {serviceContent.appointment.Description}
                </p>
                <h2 className="text-white mb-0">
                  {serviceContent.appointment.Contact_Number}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}
    </>
  );
}

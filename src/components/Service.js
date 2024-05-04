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

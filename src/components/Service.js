import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

import ReactCompareImage from "react-compare-image";
import beforeImage from "../assets/img/before.jpg";
import afterImage from "../assets/img/after.jpg";

export function Service() {
  // states for image URLs
  // const [afterImageUrl, setAfterImageUrl] = useState(null);
  // const [beforeImageUrl, setBeforeImageUrl] = useState(null);
  const [serviceImageUrls, setServiceImageUrls] = useState([]);

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
          const { Service_Title, Service_Appointment, Service_List } = data;

          setServiceContent({
            title: Service_Title || "",
            appointment: Service_Appointment || "",
            serviceList: Service_List.map((service) => ({
              title: service.Service_Title || [],
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

  // Add the useEffect hook to fetch image URLs for Compare_Images section
  // useEffect(() => {
  //   const fetchCompareImageUrls = async () => {
  //     try {
  //       const storageRef = firebase
  //         .storage()
  //         .ref("Service_Section/Compare_Images");

  //       // Fetch download URL for "after.jpg"
  //       const afterImageRef = storageRef.child("after.jpg");
  //       const afterUrl = await afterImageRef.getDownloadURL();
  //       setAfterImageUrl(afterUrl);

  //       // Fetch download URL for "before.jpg"
  //       const beforeImageRef = storageRef.child("before.jpg");
  //       const beforeUrl = await beforeImageRef.getDownloadURL();
  //       setBeforeImageUrl(beforeUrl);
  //     } catch (error) {
  //       console.error("Error fetching compare image URLs:", error);
  //     }
  //   };

  //   fetchCompareImageUrls();
  // }, []);

  // Add the useEffect hook to fetch image URLs for service section
  useEffect(() => {
    const fetchServiceImageUrls = async () => {
      try {
        const storageRef = firebase
          .storage()
          .ref("Service_Section/Service_Images");
        const listResult = await storageRef.listAll();
        const urls = await Promise.all(
          listResult.items.map(async (itemRef) => {
            return await itemRef.getDownloadURL();
          })
        );
        setServiceImageUrls(urls);
      } catch (error) {
        console.error("Error fetching service image URLs:", error);
      }
    };

    fetchServiceImageUrls();
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
              <ReactCompareImage
                leftImage={beforeImage}
                rightImage={afterImage}
                leftImageAlt="Before"
                rightImageAlt="After"
                leftImageLabel="Before"
                rightImageLabel="After"
              />
            </div>
            <div className="col-lg-7">
              <div className="section-title mb-5">
                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                  Our Services
                </h5>
                <h1 className="display-5 mb-0">{serviceContent.title}</h1>
              </div>
              <div className="row g-5">
                {serviceContent.serviceList
                  .slice(0, 3)
                  .map((service, index) => (
                    <div
                      key={index}
                      className="col-md-6 service-item wow zoomIn"
                      data-wow-delay="0.6s"
                    >
                      <div className="rounded-top overflow-hidden">
                        <img
                          className="img-fluid"
                          src={serviceImageUrls[index - 1]}
                          alt={`Image ${index}`}
                        />
                      </div>
                      <div className="position-relative bg-light rounded-bottom text-center p-4">
                        <h5 className="m-0">{service.title}</h5>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="row g-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="col-lg-7">
              <div className="row g-5">
                {serviceContent.serviceList.slice(3).map((service, index) => (
                  <div
                    key={index}
                    className="col-md-6 service-item wow zoomIn"
                    data-wow-delay="0.3s"
                  >
                    <div className="rounded-top overflow-hidden">
                      <img
                        className="img-fluid"
                        src={serviceImageUrls[index + 2]}
                        alt={`Image ${index + 2}`}
                      />
                    </div>
                    <div className="position-relative bg-light rounded-bottom text-center p-4">
                      <h5 className="m-0">{service.title}</h5>
                    </div>
                  </div>
                ))}
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

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

export function Pricing() {
  const [priceImageUrls, setPriceImageUrls] = useState("");

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
            git,
          } = data;
          setPricingContent({
            title: Pricing_Title || "",
            description: Pricing_Description || "",
            contactNumber: Contact_Number || "",
            pricingPlans: Pricing_Plans.filter((plan) => !!plan.Title) || [],
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

  // fetch images from storage
  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const storageRef = firebase.storage().ref("Pricing_Section");

        // Get list of items (images) in the directory
        const listResult = await storageRef.listAll();

        // Fetch download URL for each item (image) in the directory
        const urls = await Promise.all(
          listResult.items.map(async (itemRef) => {
            return await itemRef.getDownloadURL();
          })
        );

        setPriceImageUrls(urls); // Set the array of image URLs to state
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    }

    fetchImageUrls();
  }, []);

  return (
    <div className="container-fluid py-5">
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
            <h5 className="text-uppercase text-primary">
              Call for Appointment
            </h5>
            <h1>{pricingContent.contactNumber}</h1>
          </div>

          <div className="col-lg-7">
            {priceImageUrls.length > 0 ? (
              <OwlCarousel
                className="owl-theme price-carousel"
                items="2"
                autoplay={true}
                loop
                dots={false}
                smartSpeed="1500"
                nav={true}
                navText={[
                  `<i class="bi bi-arrow-left"></i>`,
                  `<i class="bi bi-arrow-right"></i>`,
                ]}
                responsive={{
                  0: {
                    items: 1,
                  },
                  768: {
                    items: 2,
                  },
                }}
              >
                {pricingContent.pricingPlans.map((plan, index) => (
                  <div key={index} className="item me-3 ms-3 mb-4">
                    <div className="position-relative">
                      <img
                        className="img-fluid rounded-top"
                        key={index}
                        src={priceImageUrls[index]}
                        alt={`Image ${index + 1}`}
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
                      <hr className="text-primary w-50 mx-auto mt-0" />
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
                        className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle"
                      >
                        Appointment
                      </a>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

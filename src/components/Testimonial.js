import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

export function Testimonial() {
  const [testimonialContent, setTestimonialContent] = useState([]);
  const [imageUrls, setImageUrls] = useState("");

  useEffect(() => {
    const fetchTestimonialContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Testimonial_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const slides = Object.values(data).map((slide) => ({
            name: slide.Client_Name || "",
            description: slide.Client_Description || "",
          }));
          setTestimonialContent(slides);
        } else {
          console.error("Testimonial section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching testimonial section content:", error);
      }
    };

    fetchTestimonialContent();
  }, []);

  // fetch images from storage
  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const storageRef = firebase.storage().ref("Testimonial_Section");

        // Get list of items (images) in the directory
        const listResult = await storageRef.listAll();

        // Fetch download URL for each item (image) in the directory
        const urls = await Promise.all(
          listResult.items.map(async (itemRef) => {
            return await itemRef.getDownloadURL();
          })
        );

        setImageUrls(urls); // Set the array of image URLs to state
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    }

    fetchImageUrls();
  }, []);

  return (
    <div
      className="container-fluid bg-primary bg-testimonial py-5 my-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            {imageUrls.length > 0 ? (
              <OwlCarousel
                className="owl-theme testimonial-carousel p-5"
                items="1"
                autoplay={true}
                loop
                dots={false}
                smartSpeed="1000"
                nav={true}
                autoplayHoverPause
                navText={[
                  `<i class="bi bi-arrow-left"></i>`,
                  `<i class="bi bi-arrow-right"></i>`,
                ]}
                responsive={{
                  0: {
                    items: 1,
                  },
                }}
              >
                {testimonialContent.map((slide, index) => (
                  <div
                    key={index}
                    className="testimonial-item text-center text-white"
                  >
                    <img
                      key={index}
                      className="img-fluid mx-auto rounded mb-4"
                      src={imageUrls[index]}
                      alt={`Image ${index + 1}`}
                    />
                    <p className="fs-5">{slide.description}</p>
                    <hr className="mx-auto w-25" />
                    <h4 className="text-white mb-0">{slide.name}</h4>
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

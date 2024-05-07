import testimonialimage1 from "../assets/img/testimonial-1.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Testimonial() {
  const [testimonialContent, setTestimonialContent] = useState([]);

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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      className="container-fluid bg-primary bg-testimonial py-5 my-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div
        className="container py-5"
        style={{ backgroundColor: "rgba(11, 29, 56,0.6)" }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <Carousel responsive={responsive}>
              {testimonialContent.map((slide, index) => (
                <div
                  key={index}
                  className="testimonial-item text-center text-white"
                >
                  <img
                    className="img-fluid mx-auto rounded mb-4"
                    src={testimonialimage1}
                    alt="Testimonial 1"
                  />
                  <p className="fs-5">{slide.description}</p>
                  <hr className="mx-auto w-25" />
                  <h4 className="text-white mb-0">{slide.name}</h4>
                </div>
              ))}
              {/* <div className="testimonial-item text-center text-white">
                <img
                  className="img-fluid mx-auto rounded mb-4"
                  src={testimonialimage2}
                  alt="Testimonial 2"
                />
                <p className="fs-5">
                  Dolores sed duo clita justo dolor et stet lorem kasd dolore
                  lorem ipsum. At lorem lorem magna ut et, nonumy labore diam
                  erat. Erat dolor rebum sit ipsum.
                </p>
                <hr className="mx-auto w-25" />
                <h4 className="text-white mb-0">Client Name</h4>
              </div> */}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

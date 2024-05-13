import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Hero() {
  const [heroContent, setHeroContent] = useState([]);
  const [imageUrls, setImageUrls] = useState("");

  // fetch content from database
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Hero_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const slides = Object.values(data).map((slide) => ({
            title: slide.Slide_Title || "",
            description: slide.Slide_Description || "",
          }));
          setHeroContent(slides);
        } else {
          console.error("Hero section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching hero section content:", error);
      }
    };

    fetchHeroContent();
  }, []);

  // fetch images from storage
  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const storageRef = firebase.storage().ref("Hero_Section");

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
    <>
      {/* Carousel Start */}
      <div className="container-fluid p-0">
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {heroContent.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  className="w-100"
                  key={index}
                  src={imageUrls[index]}
                  alt={`Image ${index + 1}`}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 900 }}>
                    <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                      {slide.title}
                    </h5>
                    <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                      {slide.description}
                    </h1>
                    <a
                      href="appointment.html"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Appointment
                    </a>
                    <a
                      href=""
                      className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel Start */}
    </>
  );
}

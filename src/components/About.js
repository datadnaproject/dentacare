import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function About() {
  const [aboutImageUrl, setAboutImageUrl] = useState("");

  const [aboutContent, setAboutContent] = useState({
    title: "",
    description: "",
    highlights: "",
  });

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("About_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { About_Title, About_Description, About_Highlights } = data;

          setAboutContent({
            title: About_Title || "",
            description: About_Description || "",
            highlights: About_Highlights || "",
          });
        } else {
          console.error("About section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching about section content:", error);
      }
    };

    fetchAboutContent();
  }, []);

  // fetch images from storage
  useEffect(() => {
    async function fetchAboutImageUrl() {
      try {
        const storageRef = firebase.storage().ref("About_Section");
        const imageRef = storageRef.child("about.jpg");
        const url = await imageRef.getDownloadURL();
        setAboutImageUrl(url); // Set the array of image URLs to state
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    }

    fetchAboutImageUrl();
  }, []);

  return (
    <>
      {/* About Start */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <div className="section-title mb-4">
                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                  About Us
                </h5>
                <h1 className="display-5 mb-0">{aboutContent.title}</h1>
              </div>
              <h4 className="text-body fst-italic mb-4">
                {aboutContent.description.Description_1}
              </h4>
              <p className="mb-4">{aboutContent.description.Description_2}</p>
              <div className="row g-3">
                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3" />
                    {aboutContent.highlights.Highlights_1}
                  </h5>
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3" />
                    {aboutContent.highlights.Highlights_2}
                  </h5>
                </div>
                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3" />
                    {aboutContent.highlights.Highlights_3}
                  </h5>
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3" />
                    {aboutContent.highlights.Highlights_4}
                  </h5>
                </div>
              </div>
              <a
                to="/appointment"
                className="btn btn-primary py-3 px-5 mt-4 wow zoomIn"
                data-wow-delay="0.6s"
              >
                Make Appointment
              </a>
            </div>
            <div className="col-lg-5" style={{ minHeight: 500 }}>
              <div className="position-relative h-100">
                {aboutImageUrl && (
                  <img
                    className="position-absolute w-100 h-100 rounded wow zoomIn"
                    data-wow-delay="0.9s"
                    src={aboutImageUrl}
                    style={{ objectFit: "cover" }}
                    alt={`About Img`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  );
}

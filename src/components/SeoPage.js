import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";

function SeoPage() {
  const [metaTitle, setMetaTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [primaryKeywords, setPrimaryKeywords] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [message3, setMessage3] = useState("");

  useEffect(() => {
    const metaDataRef = firebase.database().ref("metadata");

    // Fetch metadata from the database
    metaDataRef
      .once("value")
      .then((snapshot) => {
        const metaData = snapshot.val();
        if (metaData) {
          setMetaTitle(metaData.metaTitle || "");
          setKeywords(metaData.keywords || "");
          setPrimaryKeywords(metaData.primaryKeywords || "");
          setSecondaryKeywords(metaData.secondaryKeywords || "");
        }
      })
      .catch((error) => {
        console.error("Error fetching metadata:", error);
      });
  }, []);
  useEffect(() => {
    document.title = metaTitle;

    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    const primaryKeywordsMeta = document.querySelector(
      'meta[name="primaryKeywords"]'
    );
    const secondaryKeywordsMeta = document.querySelector(
      'meta[name="secondaryKeywords"]'
    );

    console.log(
      "Keywords meta content:",
      keywordsMeta ? keywordsMeta.content : null
    );
    console.log(
      "Primary keywords meta content:",
      primaryKeywordsMeta ? primaryKeywordsMeta.content : null
    );
    console.log(
      "Secondary keywords meta content:",
      secondaryKeywordsMeta ? secondaryKeywordsMeta.content : null
    );

    if (keywordsMeta) {
      keywordsMeta.setAttribute("content", keywords);
    }

    if (primaryKeywordsMeta) {
      primaryKeywordsMeta.setAttribute("content", primaryKeywords);
    }

    if (secondaryKeywordsMeta) {
      secondaryKeywordsMeta.setAttribute("content", secondaryKeywords);
    }
  }, [metaTitle, keywords, primaryKeywords, secondaryKeywords]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const metaDataRef = firebase.database().ref("metadata");

    // Update database with the values entered by the user
    metaDataRef
      .update({
        metaTitle: metaTitle,
        keywords: keywords,
        primaryKeywords: primaryKeywords,
        secondaryKeywords: secondaryKeywords,
      })
      .then(() => {
        setMessage3("Metadata updated successfully");
      })
      .catch((error) => {
        console.error("Error updating metadata:", error);
        setMessage3("Error updating metadata");
      });
  };

  const [headerBgImageUrl, setHeaderBgImageUrl] = useState(null);

  // fetch images from storage
  useEffect(() => {
    async function fetchHeaderBgImageUrl() {
      try {
        const storageRef = firebase.storage().ref("Background_Images");
        const imageRef = storageRef.child("Header-bg.jpg");
        const url = await imageRef.getDownloadURL();
        setHeaderBgImageUrl(url); // Set the array of image URLs to state
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    }

    fetchHeaderBgImageUrl();
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />
      {/* Header Start */}
      <div
        className="container-fluid bg-primary py-5 hero-header mb-5"
        style={{
          backgroundImage: `linear-gradient(rgba(9, 30, 62, 0.85), rgba(9, 30, 62, 0.85)),
        url(${headerBgImageUrl})`,
        }}
      >
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">Update SEO</h1>
          </div>
        </div>
      </div>
      {/* Header End */}
      <section className="ftco-section">
        <div className="container">
          {/* <div className="row justify-content-center mb-5 pb-5">
            <div className="col-md-7 text-center heading-section ftco-animate">
              <h2 className="mb-2">Update SEO</h2>
            </div>
          </div> */}
          <div className="container-xxl py-5">
            <div className="container">
              <div>
                <h2>Update Metadata</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="metaTitle" className="form-label">
                        Meta Title:
                      </label>
                      <input
                        type="text"
                        id="metaTitle"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="keywords" className="form-label">
                        Keywords:
                      </label>
                      <input
                        type="text"
                        id="keywords"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="primaryKeywords" className="form-label">
                        Primary Keywords:
                      </label>
                      <input
                        type="text"
                        id="primaryKeywords"
                        value={primaryKeywords}
                        onChange={(e) => setPrimaryKeywords(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="secondaryKeywords" className="form-label">
                        Secondary Keywords:
                      </label>
                      <input
                        type="text"
                        id="secondaryKeywords"
                        value={secondaryKeywords}
                        onChange={(e) => setSecondaryKeywords(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
                <p>{message3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}

export default SeoPage;

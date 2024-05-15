import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/firestore";

export function Contact() {
  const [contactContent, setContactContent] = useState({
    title: "",
    contactDetails: "",
  });

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Contact_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Contact_Title, Contact_Details } = data;

          setContactContent({
            title: Contact_Title || "",
            contactDetails: Contact_Details || "",
          });
        } else {
          console.error("Contact section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching contact content:", error);
      }
    };

    fetchContactContent();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [latestId, setLatestId] = useState(0);

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Contact Form")
          .orderByChild("Contact_id")
          .limitToLast(1)
          .once("value");
        if (snapshot.exists()) {
          const latestEntry = snapshot.val();
          const latestIdValue = Object.values(latestEntry)[0].Contact_id;
          setLatestId(latestIdValue);
        } else {
          setLatestId(0);
        }
      } catch (error) {
        console.error("Error fetching latest ID:", error);
      }
    };

    fetchLatestId();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const db = firebase.database();

    try {
      console.log("Latest ID:", latestId);
      const newId = latestId + 1;
      console.log("New ID:", newId);
      // Push form data to the database
      await db.ref("Contact Form").push({
        Contact_id: newId,
        Contact_name: name,
        Contact_email: email,
        Contact_subject: subject,
        Contact_message: message,
      });

      // Clear form fields and set success message
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSuccessMessage("Message sent successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error storing form data:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };
  return (
    <>
      {/* Contact Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-xl-4 col-lg-6 wow slideInUp"
              data-wow-delay="0.1s"
            >
              <div className="bg-light rounded h-100 p-5">
                <div className="section-title">
                  <h5 className="position-relative d-inline-block text-primary text-uppercase">
                    Contact Us
                  </h5>
                  <h1 className="display-6 mb-4">{contactContent.title}</h1>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-geo-alt fs-1 text-primary me-3" />
                  <div className="text-start">
                    <h5 className="mb-0">
                      {contactContent.contactDetails.Contact_1?.Title}
                    </h5>
                    <span>
                      {contactContent.contactDetails.Contact_1?.Location}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-envelope-open fs-1 text-primary me-3" />
                  <div className="text-start">
                    <h5 className="mb-0">
                      {contactContent.contactDetails.Contact_2?.Title}
                    </h5>
                    <span>
                      {contactContent.contactDetails.Contact_2?.Email}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-phone-vibrate fs-1 text-primary me-3" />
                  <div className="text-start">
                    <h5 className="mb-0">
                      {contactContent.contactDetails.Contact_3?.Title}
                    </h5>
                    <span>
                      {contactContent.contactDetails.Contact_3?.Contact_Number}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 wow slideInUp"
              data-wow-delay="0.3s"
            >
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0 bg-light px-4"
                      placeholder="Your Name"
                      style={{ height: 55 }}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control border-0 bg-light px-4"
                      placeholder="Your Email"
                      style={{ height: 55 }}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0 bg-light px-4"
                      placeholder="Subject"
                      style={{ height: 55 }}
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control border-0 bg-light px-4 py-3"
                      rows={5}
                      placeholder="Message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                </div>
              </form>
            </div>
            <div
              className="col-xl-4 col-lg-12 wow slideInUp"
              data-wow-delay="0.6s"
            >
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.6428960658045!2d80.21951977483833!3d12.80167628749832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52510b7ea14dbd%3A0x49b38c5db4767675!2sDataDNA!5e0!3m2!1sen!2sin!4v1715751776232!5m2!1sen!2sin"
                width="400"
                height="300"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  );
}

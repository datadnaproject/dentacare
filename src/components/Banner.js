import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Banner() {
  const [bannerContent, setBannerContent] = useState({
    banner_1: "",
    banner_2: "",
    banner_3: "",
  });

  useEffect(() => {
    const fetchBannerContent = async () => {
      try {
        const snapshot = await firebase.database().ref("Banner").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Banner_1, Banner_2, Banner_3 } = data;

          setBannerContent({
            banner_1: Banner_1 || "",
            banner_2: Banner_2 || "",
            banner_3: Banner_3 || "",
          });
        } else {
          console.error("Banner content not found in database");
        }
      } catch (error) {
        console.error("Error fetching banner content:", error);
      }
    };

    fetchBannerContent();
  }, []);
  return (
    <>
      {/* Banner Start */}
      <div className="container-fluid banner mb-5">
        <div className="container">
          <div className="row gx-0">
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
              <div
                className="bg-primary d-flex flex-column p-5"
                style={{ height: 300 }}
              >
                <h3 className="text-white mb-3">
                  {bannerContent.banner_1.Title}
                </h3>
                {bannerContent.banner_1.Working_Time?.map((time, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between text-white mb-3"
                  >
                    <h6 className="text-white mb-0">{time.Day}</h6>
                    <p className="mb-0">{time.Time}</p>
                  </div>
                ))}
                {/* <div className="d-flex justify-content-between text-white mb-3">
                  <h6 className="text-white mb-0">Saturday</h6>
                  <p className="mb-0"> 8:00am - 7:00pm</p>
                </div>
                <div className="d-flex justify-content-between text-white mb-3">
                  <h6 className="text-white mb-0">Sunday</h6>
                  <p className="mb-0"> 8:00am - 5:00pm</p>
                </div> */}
                <a className="btn btn-light" to="/appointment">
                  Appointment
                </a>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.3s">
              <div
                className="bg-dark d-flex flex-column p-5"
                style={{ height: 300 }}
              >
                <h3 className="text-white mb-3">
                  {" "}
                  {bannerContent.banner_2.Title}
                </h3>
                <DatePicker
                  selected={null} // Set this to the state where you store the selected date
                  onChange={(date) => console.log(date)} // Handle the change event
                  placeholderText="Appointment Date"
                  className="form-control bg-light border-0 mb-3"
                  style={{ height: 40 }}
                />
                {/* <div
                  className="date mb-3"
                  id="date"
                  data-target-input="nearest"
                >
                  <input
                    type="text"
                    className="form-control bg-light border-0 datetimepicker-input"
                    placeholder="Appointment Date"
                    data-target="#date"
                    data-toggle="datetimepicker"
                    style={{ height: 40 }}
                  />
                </div> */}
                <select
                  className="form-select bg-light border-0 mb-3"
                  style={{ height: 40 }}
                >
                  <option>Select A Service</option>
                  <option value={1}>Service 1</option>
                  <option value={2}>Service 2</option>
                  <option value={3}>Service 3</option>
                </select>
                <a className="btn btn-light" href="">
                  Search Doctor
                </a>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
              <div
                className="bg-secondary d-flex flex-column p-5"
                style={{ height: 300 }}
              >
                <h3 className="text-white mb-3">
                  {bannerContent.banner_3.Title}
                </h3>
                <p className="text-white">
                  {bannerContent.banner_3.Description}
                </p>
                <h2 className="text-white mb-0">
                  {bannerContent.banner_3.Contact_Number}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Start */}
    </>
  );
}

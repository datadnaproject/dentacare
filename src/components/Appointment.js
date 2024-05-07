import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

export function Appointment() {
  const [appointmentContent, setAppointmentContent] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchAppointmentContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Appointment_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Appointment_Title, Appointment_Description } = data;

          setAppointmentContent({
            title: Appointment_Title || "",
            description: Appointment_Description || "",
          });
        } else {
          console.error("Appointment section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching appointment section content:", error);
      }
    };

    fetchAppointmentContent();
  }, []);

  return (
    <>
      {/* Appointment Start */}
      <div
        className="container-fluid bg-primary bg-appointment my-5 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-6 py-5">
              <div className="py-5">
                <h1 className="display-5 text-white mb-4">
                  {appointmentContent.title}
                </h1>
                <p className="text-white mb-0">
                  {appointmentContent.description}
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn"
                data-wow-delay="0.6s"
              >
                <h1 className="text-white mb-4">Make Appointment</h1>
                <form>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select bg-light border-0"
                        style={{ height: 55 }}
                      >
                        <option value="">Select A Service</option>
                        <option value={1}>Service 1</option>
                        <option value={2}>Service 2</option>
                        <option value={3}>Service 3</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select bg-light border-0"
                        style={{ height: 55 }}
                      >
                        <option value="">Select Doctor</option>
                        <option value={1}>Doctor 1</option>
                        <option value={2}>Doctor 2</option>
                        <option value={3}>Doctor 3</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="Your Name"
                        style={{ height: 55 }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="email"
                        className="form-control bg-light border-0"
                        placeholder="Your Email"
                        style={{ height: 55 }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <div
                        className="date"
                        id="date1"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control bg-light border-0 datetimepicker-input"
                          placeholder="Appointment Date"
                          data-target="#date1"
                          data-toggle="datetimepicker"
                          style={{ height: 55 }}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div
                        className="time"
                        id="time1"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control bg-light border-0 datetimepicker-input"
                          placeholder="Appointment Time"
                          data-target="#time1"
                          data-toggle="datetimepicker"
                          style={{ height: 55 }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-dark w-100 py-3" type="submit">
                        Make Appointment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment End */}
    </>
  );
}

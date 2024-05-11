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

  const [startDate, setStartDate] = useState(new Date());
  const [doctorOptions, setDoctorOptions] = useState([]);
  const today = new Date();
  const todayString = `${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today
    .getDate()
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;
  const [doctorName, setDoctorName] = useState("");
  const [fromHour, setFromHour] = useState(0);
  const [fromMinute, setFromMinute] = useState(0);
  const [toHour, setToHour] = useState(0);
  const [toMinute, setToMinute] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorOptions1, setDoctorOptions1] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fromDate, setFromDate] = useState(todayString);
  const [toDate, setToDate] = useState(todayString);

  //form appointment
  const [timeOptions2, setTimeOptions2] = useState([]);
  const [successMessage3, setSuccessMessage3] = useState("");
  const [modalVisible, setModalVisible] = useState();

  const [formData2, setFormData2] = useState({
    Appointmenttab_id: 0, // Initial id value
    Appointmenttab_name: "",
    Appointmenttab_email: "",
    Appointmenttab_date: new Date(),
    Appointmenttab_time: "", // Default time
    Appointmenttab_doctorname: "",
    Appointmenttab_phone: "",
  });

  useEffect(() => {
    // Fetch doctor options from Firebase
    const doctorRef = firebase.database().ref("doctors_name");
    doctorRef.once("value", (snapshot) => {
      const doctors = snapshot.val();
      if (doctors) {
        const doctorNames = Object.values(doctors);
        setDoctorOptions1(doctorNames);

        if (doctorNames.length > 0) {
          setDoctorName(doctorNames[0]);
        }
      }
    });
  }, []);

  const handleDoctorNameChange1 = (e) => {
    const { value } = e.target;
    setDoctorName(value); // Update doctorName state
    setFormData2({ ...formData2, Appointmenttab_doctorname: value }); // Update formData state
  };

  const handleTimeChange1 = (e) => {
    const { value } = e.target;
    setFormData2({ ...formData2, Appointmenttab_time: value });
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  const db = firebase.database();
  useEffect(() => {
    const fetchTimeOptions1 = () => {
      if (
        formData2.Appointmenttab_doctorname &&
        formData2.Appointmenttab_date
      ) {
        const adminRef = db.ref("adminData");
        adminRef.once("value", (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const timeRanges = Object.values(data)
              .filter(
                (item) =>
                  item.doctorName === formData2.Appointmenttab_doctorname &&
                  item.date ===
                    formData2.Appointmenttab_date.toLocaleDateString("en-US")
              )
              .map((item) => item.timeRange);
            setTimeOptions2(timeRanges);
          }
        });
      }
    };
    fetchTimeOptions1();
  }, [formData2.Appointmenttab_doctorname, formData2.Appointmenttab_date, db]);

  const handleSubmit3 = (e) => {
    e.preventDefault();
    // Store form data in Realtime Database

    db.ref("Appointment_tab")
      .orderByChild("Appointmenttab_id")
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        let latestAppointment = null;
        snapshot.forEach((childSnapshot) => {
          latestAppointment = childSnapshot.val();
        });

        // console.log("Latest appointment:", latestAppointment);

        // Calculate the new ID
        const newAppointmentId = latestAppointment
          ? latestAppointment.Appointmenttab_id + 1
          : 1;

        // console.log("New appointment ID:", newAppointmentId);
        const updatedFormData = {
          ...formData2,
          Appointmenttab_id: newAppointmentId,
          Appointmenttab_doctorname: doctorName, // Add selected doctor's name
        };

        updatedFormData.Appointmenttab_date =
          updatedFormData.Appointmenttab_date.toISOString();

        return db.ref("Appointment_tab").push(updatedFormData);
      })
      .then(() => {
        console.log("Form data stored in Realtime Database");
        // Clear form data
        setFormData2({
          Appointmenttab_id: "",
          Appointmenttab_name: "",
          Appointmenttab_email: "",
          Appointmenttab_date: new Date(),
          Appointmenttab_time: "",
          Appointmenttab_doctorname: "",
          Appointmenttab_phone: "",
        });
        setSuccessMessage3("Appointment successfully scheduled!");
        // Close the modal
        setTimeout(() => {
          setSuccessMessage3("");
          setModalVisible(false);
        }, 2000); // Clear the success message after 3 seconds
      })
      .catch((error) => {
        console.error("Error storing form data:", error);
      });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const dbRef = firebase.database().ref("adminData");
  //     dbRef.once("value", (snapshot) => {
  //       const data = snapshot.val();
  //       if (data) {
  //         const dataArray = Object.values(data);
  //         setData(dataArray);
  //       } else {
  //         setData([]);
  //       }
  //     });
  //   };

  //   fetchData();

  //   return () => {
  //     firebase.database().ref("adminData").off();
  //   };
  // }, []);

  return (
    <>
      {/* Banner Start */}
      <div className="container-fluid banner mb-5">
        <div className="container">
          <div className="banner-container">
            <div className="row gx-0 ">
              <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
                <div
                  className="bg-primary d-flex flex-column p-5"
                  style={{ height: 320 }}
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
                  <a className="btn btn-light" to="/appointment">
                    Appointment
                  </a>
                </div>
              </div>
              <div className="col-lg-4 wow zoomIn " data-wow-delay="0.3s">
                <div className="bg-dark d-flex flex-column p-5 hero-banner-2">
                  <h3 className="text-white mb-3">Make an Appointment</h3>
                  <form onSubmit={handleSubmit3} className="appointment-form">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <div className="select-wrap">
                            <div className="icon">
                              <span className="ion-ios-arrow-down" />
                            </div>
                            <select
                              name=""
                              className="form-control wide"
                              id="inputDoctorName"
                              value={formData2.Appointmenttab_doctorname}
                              onChange={handleDoctorNameChange1}
                            >
                              {doctorOptions1.map((doctor, index) => (
                                <option key={index} style={{ color: "black" }}>
                                  {doctor}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <div className="icon">
                            <span className="icon-user" />
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            name="Appointmenttab_name"
                            value={formData2.Appointmenttab_name}
                            onChange={handleInputChange1}
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <div className="icon">
                            <span className="icon-paper-plane" />
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            name="Appointmenttab_email"
                            value={formData2.Appointmenttab_email}
                            onChange={handleInputChange1}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <div className="icon">
                            <span className="icon-phone2" />
                          </div>
                          <input
                            type="tel"
                            className="form-control"
                            name="Appointmenttab_phone"
                            value={formData2.Appointmenttab_phone}
                            onChange={handleInputChange1}
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <DatePicker
                            selected={formData2.Appointmenttab_date}
                            onChange={(date) =>
                              setFormData2({
                                ...formData2,
                                Appointmenttab_date: date,
                              })
                            }
                            dateFormat="dd-MM-yyyy"
                            className="form-control"
                            placeholderText="Select Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <select
                            className="form-control"
                            name="Appointmenttab_time"
                            value={formData2.Appointmenttab_time}
                            onChange={handleTimeChange1}
                            placeholder="Select Time"
                          >
                            <option value="">Select Time</option>
                            {timeOptions2.map((time, index) => (
                              <option
                                key={index}
                                value={time}
                                style={{ color: "black" }}
                              >
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-secondary"
                        style={{ alignItems: "center" }}
                      >
                        Submit
                      </button>
                    </div>
                    {successMessage3 && (
                      <p className="text-success" style={{ color: "black" }}>
                        {successMessage3}
                      </p>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
                <div
                  className="bg-secondary d-flex flex-column p-5"
                  style={{ height: 320 }}
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
      </div>
      {/* Banner Start */}
    </>
  );
}

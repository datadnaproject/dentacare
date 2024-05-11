import React, { useEffect, useState } from "react";
import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./Banner";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
const styles = StyleSheet;
function AdminPage() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [age, setAge] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [gender, setGender] = useState("");
  // const [location, setLocation] = useState("");
  // const [message, setMessage] = useState("");

  //admin
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Format the time values
    const fromTime = `${fromHour.toString().padStart(2, "0")}:${fromMinute
      .toString()
      .padStart(2, "0")}`;
    const toTime = `${toHour.toString().padStart(2, "0")}:${toMinute
      .toString()
      .padStart(2, "0")}`;

    // Combine from and to time
    const timeRange = `From ${fromTime} to ${toTime}`;

    // Create a data object with the extracted values
    const adminData = {
      doctorName: doctorName,
      date: startDate.toLocaleDateString(),
      timeRange: timeRange,
    };

    // Push the data object to Firebase Realtime Database
    firebase
      .database()
      .ref("adminData")
      .push(adminData)
      .then(() => {
        console.log("Admin data added to Firebase");
        setSuccessMessage("Submitted successfully!");
        setDoctorName("Choose your doctor");
        setStartDate(new Date());
        setFromHour(0);
        setFromMinute(0);
        setToHour(0);
        setToMinute(0);
        window.location.href = "/adminpage";
      })
      .catch((error) => {
        console.error("Error adding admin data to Firebase: ", error);
        // You can add further actions here, like showing an error message to the user
      });
  };

  const handleDelete = (doctorName, date) => {
    // Remove the corresponding data from Firebase Realtime Database
    firebase
      .database()
      .ref("adminData")
      .orderByChild("doctorName")
      .equalTo(doctorName)
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().date === date) {
            childSnapshot.ref
              .remove()
              .then(() => {
                console.log("Data deleted from Firebase");
                window.location.href = "/adminpage";
              })
              .catch((error) => {
                console.error("Error deleting data from Firebase: ", error);
              });
          }
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = firebase.database().ref("adminData");
      dbRef.once("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.values(data);
          setData(dataArray);
        } else {
          setData([]);
        }
      });
    };

    fetchData();

    return () => {
      firebase.database().ref("adminData").off();
    };
  }, []);

  const handleDeleteAppointment = (date, patientName) => {
    // Reference to the appointments node
    const appointmentsRef = firebase.database().ref("Appointment_tab");

    // Query appointments with the specified date
    appointmentsRef
      .orderByChild("Appointmenttab_date")
      .equalTo(date)
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const appointment = childSnapshot.val();
          // Check if the appointment matches both the specified date and patient name
          if (
            appointment.Appointmenttab_date === date &&
            appointment.Appointmenttab_name === patientName
          ) {
            // Remove the appointment entry
            childSnapshot.ref
              .remove()
              .then(() => {
                console.log("Appointment data deleted from Firebase");
                setTimeout(() => {
                  window.location.reload();
                }, 500); // Adjust the delay time as needed
              })
              .catch((error) => {
                console.error(
                  "Error deleting appointment data from Firebase: ",
                  error
                );
              });
          }
        });
      });
  };

  const filterAppointments = () => {
    let filteredAppointments = [...appointmentsData];
    if (fromDate && toDate) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) =>
          new Date(appointment.Appointmenttab_date) >= new Date(fromDate) &&
          new Date(appointment.Appointmenttab_date) <= new Date(toDate)
      );
    }

    if (selectedDoctor) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) =>
          appointment.Appointmenttab_doctorname === selectedDoctor
      );
    }

    return filteredAppointments;
  };

  useEffect(() => {
    const fetchAppointments = () => {
      const appointmentsRef = firebase.database().ref("Appointment_tab");
      appointmentsRef.once("value", (snapshot) => {
        const appointments = snapshot.val();
        if (appointments) {
          const appointmentsArray = Object.values(appointments);
          setAppointmentsData(appointmentsArray);
        } else {
          setAppointmentsData([]);
        }
      });
    };
    fetchAppointments();
    return () => {
      firebase.database().ref("Appointment_tab").off();
    };
  }, []);
  // export in pdf

  const PDFDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>Doctor Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Date</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Time</Text>
              </View>
            </View>
            {data.map((item, index) => (
              <View
                key={index}
                style={
                  index % 2 === 0
                    ? { ...styles.tableRow, backgroundColor: "#DDDDDD" }
                    : styles.tableRow
                }
              >
                <View style={styles.tableCol}>
                  <Text>{item.doctorName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.date}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.timeRange}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  const PDFDocument1 = ({ appointmentsData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>Date</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Patient Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Treatment</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Doctor Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Symptoms</Text>
              </View>
            </View>
            {appointmentsData.map((item, index) => (
              <View
                key={index}
                style={
                  index % 2 === 0
                    ? { ...styles.tableRow, backgroundColor: "#DDDDDD" }
                    : styles.tableRow
                }
              >
                <View style={styles.tableCol}>
                  <Text>{item.date}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.patientName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.departmentName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.doctorName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.symptoms}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <Topbar />
      <Navbar />
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-5">
            <div className="col-md-7 text-center heading-section ftco-animate">
              <h2 className="mb-2">Admin Update</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form onSubmit={handleSubmit} className="admin_form">
                <h4>
                  Book <span>Appointment</span>
                </h4>
                <div className="form-row ">
                  {doctorOptions1.length > 0 && (
                    <div className="form-group col-lg-4">
                      <label htmlFor="inputDoctorName">Doctor Name</label>
                      <select
                        name=""
                        className="form-control wide"
                        id="inputDoctorName"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                      >
                        {doctorOptions1.map((doctor, index) => (
                          <option key={index}>{doctor}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-4">
                    <label htmlFor="inputDate">Choose Date </label>
                    <div className="input-group date">
                      <DatePicker
                        id="inputDate"
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-2">
                    <label htmlFor="fromTime">From</label>
                    <div className="input-group date">
                      <select
                        className="form-control"
                        id="fromHour"
                        value={fromHour}
                        onChange={(e) => setFromHour(e.target.value)}
                      >
                        {[...Array(24)].map((_, hour) => (
                          <option key={hour} value={hour}>
                            {hour.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <span className="input-group-text">:</span>
                      <select
                        className="form-control"
                        id="fromMinute"
                        value={fromMinute}
                        onChange={(e) => setFromMinute(e.target.value)}
                      >
                        {[...Array(60)].map((_, minute) => (
                          <option key={minute} value={minute}>
                            {minute.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-lg-2">
                    <label htmlFor="toTime">To</label>
                    <div className="input-group date">
                      <select
                        className="form-control"
                        id="toHour"
                        value={toHour}
                        onChange={(e) => setToHour(e.target.value)}
                      >
                        {[...Array(24)].map((_, hour) => (
                          <option key={hour} value={hour}>
                            {hour.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <span className="input-group-text">:</span>
                      <select
                        className="form-control"
                        id="toMinute"
                        value={toMinute}
                        onChange={(e) => setToMinute(e.target.value)}
                      >
                        {[...Array(60)].map((_, minute) => (
                          <option key={minute} value={minute}>
                            {minute.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="btn-box">
                  <button
                    type="submit"
                    className="btn "
                    style={{
                      color: "white",
                      backgroundColor: "blue",
                      borderColor: "blue",
                    }}
                  >
                    Submit
                  </button>
                </div>
                {successMessage && <p>{successMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="admin_table_section layout_padding-bottom">
        <div className="container">
          <div className="table-container"></div>
          <h2>Appointment Table</h2>
          <div className="mb-3">
            <PDFDownloadLink
              document={<PDFDocument data={data} />}
              fileName="appointment_table.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Export in pdf"
              }
            </PDFDownloadLink>
          </div>
          <table id="adminTable">
            <thead>
              <tr>
                <th style={{ color: "black" }}>Doctor Name</th>
                <th style={{ color: "black" }}>Date</th>
                <th style={{ color: "black" }}>Time</th>
                <th style={{ color: "black" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.doctorName}</td>
                  <td>{item.date}</td>
                  <td>{item.timeRange}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Button CLicked");
                        handleDelete(item.doctorName, item.date);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
        </div>
      </section>
      {/*Patient Appointment*/}
      <section className="appointments_table_section layout_padding-bottom">
        <div className="container">
          <div className="table-container"></div>
          <h2>Patient Appointments</h2>
          <div className="mb-3">
            <PDFDownloadLink
              document={
                <PDFDocument1 appointmentsData={filterAppointments()} />
              }
              fileName="patient_appointments.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Export in pdf"
              }
            </PDFDownloadLink>
          </div>
          <div className="date-filters">
            <div className="filter">
              <label>From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="filter">
              <label>To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div className="filter">
              <label>Select Doctor:</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="">All</option>
                {doctorOptions1.map((doctor, index) => (
                  <option key={index}>{doctor}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="table-responsive">
            <table id="appointmentsTable">
              <thead>
                <tr>
                  <th style={{ color: "black" }}>Date</th>
                  <th style={{ color: "black" }}>Time</th>
                  <th style={{ color: "black" }}>Name</th>
                  <th style={{ color: "black" }}>Email</th>
                  <th style={{ color: "black" }}>Doctor Name</th>
                  <th style={{ color: "black" }}>Department</th>
                  <th style={{ color: "black" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filterAppointments().map((item, index) => (
                  <tr key={index}>
                    <td>{item.Appointmenttab_date}</td>
                    <td>{item.Appointmenttab_time}</td>
                    <td>{item.Appointmenttab_name}</td>
                    <td>{item.Appointmenttab_email}</td>
                    <td>{item.Appointmenttab_doctorname}</td>
                    <td>{item.Appointmenttab_d}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteAppointment(
                            item.Appointmenttab_date,
                            item.Appointmenttab_name
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminPage;

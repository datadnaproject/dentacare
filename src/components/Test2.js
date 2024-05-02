import React, { useState, useEffect } from "react";
import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { FullSearch } from "./FullSearch";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = firebase.database().ref("users/" + userId);

      // Fetch user data from the Realtime Database
      userRef.once(
        "value",
        (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setEmail(userData.email || "");
            setAge(userData.age || "");
            setPhoneNumber(userData.phoneNumber || "");
            setGender(userData.gender || "");
            setLocation(userData.location || "");
          } else {
            setMessage("User data not found");
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
          setMessage("Error fetching user data");
        }
      );
    } else {
      setMessage("User not authenticated");
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref("users/" + userId);

    userRef
      .update({
        firstName,
        lastName,
        email: email,
        age,
        phoneNumber,
        gender,
        location,
      })
      .then(() => {
        setMessage("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setMessage("Error updating profile");
      });
  };

  return (
    <>
      <Topbar />
      <Navbar />
      <FullSearch />
      {/* Header Start */}
      <div className="container-fluid bg-primary py-5 hero-header mb-5">
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">My Profile</h1>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* Profile details start */}
      <div>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-5">
              <div className="col-md-7 text-center heading-section ftco-animate">
                <h2 className="mb-2">My Profile</h2>
              </div>
            </div>
            <div className="row form-group row mb-3">
              <div className="col-md-7">
                <div className="form_container">
                  <form onSubmit={handleUpdateProfile}>
                    <div className="form-group1">
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    {/* Other form fields */}
                    <button type="submit" className="btn btn-primary mt-0">
                      Update Profile
                    </button>
                  </form>
                  <p>{message}</p>
                </div>
              </div>
              <div className="col-md-">
                <div className="img-box">
                  {/* You can place an image here if needed */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Profile details end */}
    </>
  );
}

export default Profile;

import { NavLink } from "react-router-dom";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
export function Team() {
  const [teamImageUrls, setTeamImageUrls] = useState([]);

  const [teamContent, setTeamContent] = useState({
    title: "",
    teamMembers: [],
  });

  useEffect(() => {
    const fetchTeamContent = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Team_Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Team_Title, Team_Members } = data;
          setTeamContent({
            title: Team_Title || "",
            teamMembers: Team_Members || [],
          });
        } else {
          console.error("Team section content not found in database");
        }
      } catch (error) {
        console.error("Error fetching team section content:", error);
      }
    };

    fetchTeamContent();
  }, []);

  // Add the useEffect hook to fetch image URLs for team section
  useEffect(() => {
    const fetchTeamImageUrls = async () => {
      try {
        const storageRef = firebase.storage().ref("Team_Section");
        const listResult = await storageRef.listAll();
        const urls = await Promise.all(
          listResult.items.map(async (itemRef) => {
            return await itemRef.getDownloadURL();
          })
        );
        setTeamImageUrls(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchTeamImageUrls();
  }, []);
  return (
    <>
      {/* Team Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
              <div className="section-title bg-light rounded h-100 p-5">
                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                  Our Dentist
                </h5>
                <h1 className="display-6 mb-4">
                  Meet Our Certified &amp; Experienced Dentist
                </h1>
                <NavLink
                  to="appointment.html"
                  className="btn btn-primary py-3 px-5"
                >
                  Appointment
                </NavLink>
              </div>
            </div>
            {teamContent.teamMembers.map((member, index) => (
              <div
                key={index}
                className="col-lg-4 wow slideInUp"
                data-wow-delay="0.3s"
              >
                <div className="team-item">
                  <div
                    className="position-relative rounded-top"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      className="img-fluid rounded-top w-100"
                      src={teamImageUrls[index - 1]}
                      alt={`Image ${index}`}
                    />
                    <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                      <NavLink
                        className="btn btn-primary btn-square m-1"
                        to="#"
                      >
                        <i className="fab fa-twitter fw-normal" />
                      </NavLink>
                      <NavLink
                        className="btn btn-primary btn-square m-1"
                        to="#"
                      >
                        <i className="fab fa-facebook-f fw-normal" />
                      </NavLink>
                      <NavLink
                        className="btn btn-primary btn-square m-1"
                        to="#"
                      >
                        <i className="fab fa-linkedin-in fw-normal" />
                      </NavLink>
                      <NavLink
                        className="btn btn-primary btn-square m-1"
                        to="#"
                      >
                        <i className="fab fa-instagram fw-normal" />
                      </NavLink>
                    </div>
                  </div>
                  <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                    <h4 className="mb-2">{member.Member_Name}</h4>
                    <p className="text-primary mb-0">
                      {member.Member_Specialization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Team End */}
    </>
  );
}

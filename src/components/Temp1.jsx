import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

const [aboutContent, setAboutContent] = useState({
  title: "",
  description: "",
  highlights: "",
});
console.log(aboutContent.highlights);

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


// New code
const [aboutContent, setAboutContent] = useState({
  title: "",
  description: "",
  services: [],
});

useEffect(() => {
  const fetchAboutContent = async () => {
    try {
      const snapshot = await firebase.database().ref("About").once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        const services = Object.values(data).filter(
          (item) => typeof item === "object"
        );
        const { About_title, About_description } = data;

        setAboutContent({
          title: About_title || "",
          description: About_description || "",
          services: services.map((service) => ({
            title: service.About_subtitle || "",
            description: service.About_subdescription || "",
          })),
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

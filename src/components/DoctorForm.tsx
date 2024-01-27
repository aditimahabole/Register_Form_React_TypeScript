import React, { useState, FormEvent, useEffect } from "react";
// import "./DoctorForm.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Doctor } from "../Interfaces/doctor";
const DoctorForm: React.FC = () => {
  // Use  Effect ----------------------------
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then(() => console.log("Checking data"))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // Use Effect Ends -----------------------------------------

  // Doctor's Initial State -----------------
  const initialDoctorState: Doctor = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
    specialization: [""],
    address: {
      Line1: "",
      Line2: "",
      "Street/Locality": "",
      City: "",
      State: "",
      Pincode: "",
    },
    education: [
      {
        degree: "",
        university: "",
        year: "",
      },
    ],
    affiliations: [""],
    experience: [
      {
        position: "",
        organization: "",
        duration: "",
      },
    ],
    clinics: [
      {
        clinicID: "",
        name: "",
        address: "",
        contactNumber: "",
        email: "",
        schedule: [
          {
            day: "",
            openingTime: "",
            closingTime: "",
          },
        ],
      },
    ],
  };

  //  All states -------------------------------------------
  const [doctor, setDoctor] = useState(initialDoctorState);
  const [clickCount, setClickCount] = useState(0);
  const [clickExpCount, setClickExpCount] = useState(0);
  const [clickClinicCount, setClickClinicCount] = useState(0);
  const [formData, setFormData] = useState(initialDoctorState);
  //  All states End----------------------------------------
  // -------Handling Each Data----------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(`Setting ${name} to ${value}`);

    // Prevent adding another education section before clicking on "Add Education"

    setFormData((prevData) => {
      // For Address part
      if (name.startsWith("address.")) {
        // name = "address.Line1"
        // ["address","Line1"]
        // var = " aditi mahabole is a good firl"
        //var.split(" ")
        //["ait","mahabole","is","a"]
        const add = name.split(".");

        const addressField = add[1];

        if (addressField.includes("/")) {
          console.log("State/Locality");
          return {
            ...prevData,
            address: {
              ...prevData.address,
              "Street/Locality": value,
            },
          };
        } else {
          return {
            ...prevData,
            address: {
              ...prevData.address,
              [addressField]: value,
            },
          };
        }
      }
      // For Education Part
      if (name.startsWith("education.")) {
        // Handle education fields
        const educationIndex = Number(name.split(".")[1]);

        if (!isNaN(educationIndex) && educationIndex >= 0) {
          const updatedEducation = [...prevData.education];
          updatedEducation[educationIndex] = {
            ...updatedEducation[educationIndex],
            [name.split(".")[2]]: value,
          };

          return {
            ...prevData,
            education: updatedEducation,
          };
        }
      }
      // For Experience Part
      if (name.startsWith("experience.")) {
        // Handle education fields
        const experienceIndex = Number(name.split(".")[1]);

        if (!isNaN(experienceIndex) && experienceIndex >= 0) {
          const updatedExperienceArray = [...prevData.experience];
          // putting data at given index
          updatedExperienceArray[experienceIndex] = {
            ...updatedExperienceArray[experienceIndex],
            // position : value
            [name.split(".")[2]]: value,
          };

          return {
            ...prevData,
            experience: updatedExperienceArray,
          };
        }
      }
      // For Clinics
      if (name.startsWith("clinics.")) {
        // Handle education fields
        const hello = name.split(".");
        console.log("hello", hello);
        const [clinicsSection, clinicsIndex, field] = name.split(".");
        console.log(clinicsSection);
        // console.log("FIELD", field);
        const updatedClinicArray = [...prevData.clinics];

        const clinicIndex = Number(clinicsIndex);

        if (!isNaN(clinicIndex) && clinicIndex >= 0) {
          if (field !== "schedule") {
            console.log("field is", field);

            // Handling other fields within clinics
            updatedClinicArray[clinicIndex] = {
              ...updatedClinicArray[clinicIndex],
              [field]: value,
            };
          } else {
            // Handling schedule array
            const getClinicIndex = Number(name.split(".")[1]);
            const getScheduleIndex = Number(name.split(".")[3]);
            const scheduleField = name.split(".")[4];

            const updatedScheduleArray = [
              ...updatedClinicArray[getClinicIndex].schedule,
            ];

            if (!isNaN(getScheduleIndex) && getScheduleIndex >= 0) {
              updatedScheduleArray[getScheduleIndex] = {
                ...updatedScheduleArray[getScheduleIndex],
                [scheduleField]: value,
              };

              updatedClinicArray[clinicIndex] = {
                ...updatedClinicArray[clinicIndex],
                schedule: updatedScheduleArray,
              };
            }
          }

          return {
            ...prevData,
            clinics: updatedClinicArray,
          };
        }
      }
      // For Basic info as its just direct
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleBasicInfo = () => {
    console.log("Basic Info", formData);
  };

  const containerStyle = {
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
  };

  // Adding  -- Education , Experience , Clinic Functions
  const handleAddEducation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickCount(clickCount + 1);
    console.log("Add Education Clicked");
    console.log(formData.education);
  };
  const handleAddExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickExpCount(clickExpCount + 1);
    console.log("Add Exp Clicked");
  };
  const handleAddClinic = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickClinicCount(clickClinicCount + 1);
    console.log("Add Click Clicked");
  };
  // Removing -- Education , Experience , Clinic Functions
  const handleRemoveEducation = (indexToRemove: number) => {
    setFormData((prevData) => {
      const updatedEducation = prevData.education.filter(
        (_, index) => index !== indexToRemove
      );

      return {
        ...prevData,
        education: updatedEducation,
      };
    });

    setClickCount((prevCount) => prevCount - 1);
  };

  const handleRemoveExperience = (indexToRemove: number) => {
    setFormData((prevData) => {
      const updatedExperienceArray = prevData.experience.filter(
        (_, index) => index !== indexToRemove
      );

      return {
        ...prevData,
        experience: updatedExperienceArray,
      };
    });

    setClickExpCount((prevCount) => prevCount - 1);
  };
  const handleRemoveClinic = (indexToRemove: number) => {
    setFormData((prevData) => {
      const updatedClinicArray = prevData.clinics.filter(
        (_, index) => index !== indexToRemove
      );

      return {
        ...prevData,
        clinics: updatedClinicArray,
      };
    });

    setClickClinicCount((prevCount) => prevCount - 1);
  };

  const handleButtonClick = () => {
    // Add your additional logic or actions here
    console.log("Button clicked!");
  };

  const handleonSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        doctor
      );

      if (response.status === 201) {
        console.log("Data sent successfully");
        // Reset the form after successful submission
        setDoctor(initialDoctorState);
        setClickCount(0);
        setClickExpCount(0);
        setClickClinicCount(0);
      } else {
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    handleButtonClick();
  };

  return (
    <Container maxWidth="md" style={containerStyle}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Button variant="contained" onClick={() => handleBasicInfo()}>
          Console Data
        </Button>
        <div>
          <h1>Doctor Registration Form</h1>
          {/* --------------BASIC INFO---------------- */}
          <h2>Basic Info</h2>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="outlined-number"
              label="Contact-Number"
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Specialization"
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
            />
          </div>

          {/* --------------ADDRESS---------------- */}
          <h2>Address</h2>

          <TextField
            required
            id="outlined-required"
            label="Address Line 1"
            type="text"
            name="address.Line1"
            value={formData.address.Line1}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Address Line 2"
            type="text"
            name="address.Line2"
            value={formData.address.Line2}
            onChange={handleInputChange}
          />

          <TextField
            required
            id="outlined-required"
            label="Street/Locality"
            type="text"
            name="address.Street/Locality"
            value={formData.address["Street/Locality"]}
            onChange={handleInputChange}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              id="outlined-password-input"
              label="City"
              type="text"
              name="address.City"
              value={formData.address.City}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-number"
              label="State"
              type="text"
              name="address.State"
              value={formData.address.State}
              onChange={handleInputChange}
            />
          </div>

          <TextField
            id="outlined-required"
            label="Pincode"
            type="number"
            name="address.Pincode"
            value={formData.address.Pincode}
            onChange={handleInputChange}
          />
        </div>

        {/* --------------EDUCATION---------------- */}
        <h2>Education</h2>
        {/* <button onClick={ handleAddEducation }>Add Education </button> */}

        {Array.from({ length: clickCount }, (_, index) => (
          <div key={index}>
            <h2>Education {index + 1}</h2>
            <TextField
              id="outlined-required"
              label="Degree"
              type="text"
              name={`education.${index}.degree`}
              value={formData.education[index]?.degree || ""}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="University"
              type="text"
              name={`education.${index}.university`}
              value={formData.education[index]?.university || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Year"
              type="year"
              name={`education.${index}.year`}
              value={formData.education[index]?.year || ""}
              onChange={handleInputChange}
            />

            <Button
              variant="outlined"
              onClick={() => handleRemoveEducation(index)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        ))}
        <br></br>

        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleAddEducation}
        >
          Add Education
        </Button>

        {/* --------------EXPERIENCE---------------- */}
        <h2>Experience</h2>
        {/* <button onClick={ handleAddExperience }>Add Experience </button> */}

        {Array.from({ length: clickExpCount }, (_, index) => (
          <div key={index}>
            <h2>Experience {index + 1}</h2>
            <TextField
              id="outlined-required"
              label="Position"
              type="text"
              name={`experience.${index}.position`}
              value={formData.experience[index]?.position || ""}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Organization"
              type="text"
              name={`experience.${index}.organization`}
              value={formData.experience[index]?.organization || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Duration"
              type="number"
              name={`experience.${index}.duration`}
              value={formData.experience[index]?.duration || ""}
              onChange={handleInputChange}
            />
              <br></br>

            <Button
              variant="outlined"
              onClick={() => handleRemoveExperience(index)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        ))}
        <br></br>

        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleAddExperience}
        >
          Add Experience
        </Button>
        {/* --------------CLINIC---------------- */}
        <h2>Clinics</h2>

        {Array.from({ length: clickClinicCount }, (_, index) => (
          <div key={index}>
            <h2>Clinic {index + 1}</h2>
            <TextField
              id="outlined-required"
              label="Clinic ID"
              type="text"
              name={`clinics.${index}.clinicID`}
              value={formData.clinics[index]?.clinicID || ""}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Name"
              type="text"
              name={`clinics.${index}.name`}
              value={formData.clinics[index]?.name || ""}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Address"
              type="text"
              name={`clinics.${index}.address`}
              value={formData.clinics[index]?.address || ""}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Contact Number"
              type="tel"
              name={`clinics.${index}.contactNumber`}
              value={formData.clinics[index]?.contactNumber || ""}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Email"
              type="email"
              name={`clinics.${index}.email`}
              value={formData.clinics[index]?.email || ""}
              onChange={handleInputChange}
            />

            <h3>Schedule</h3>
            {doctor.clinics[index]?.schedule.map(( schedule,scheduleIndex) => (
              
              <div key={scheduleIndex}>
                
                <TextField
                  id={`clinic-${index}-day-${scheduleIndex}`}
                  label={`Day${schedule.day}`}
                  type="text"
                  name={`clinics.${index}.schedule.${index}.day`}
                  value={formData.clinics[index]?.schedule[index]?.day || ""}
                  onChange={handleInputChange}
                />
                <TextField
                  id={`clinic-${index}-openingTime-${scheduleIndex}`}
                  label="Opening Time"
                  type="text"
                  name={`clinics.${index}.schedule.${index}.openingTime`}
                  value={
                    formData.clinics[index]?.schedule[index]?.openingTime || ""
                  }
                  onChange={handleInputChange}
                />
                <TextField
                  id={`clinic-${index}-closingTime-${scheduleIndex}`}
                  label="Closing Time"
                  type="text"
                  name={`clinics.${index}.schedule.${index}.closingTime`}
                  value={
                    formData.clinics[index]?.schedule[index]?.closingTime || ""
                  }
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <br></br>

            <Button
              variant="outlined"
              onClick={() => handleRemoveClinic(index)}
              startIcon={<DeleteIcon />}
            >
              Delete Clinic
            </Button>
          </div>
        ))}
        <br></br>
        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleAddClinic}
        >
          Add Clinic
        </Button>
      </Box>
      <br></br>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleonSubmit}
      >
        Submit
      </Button>

      {/* </div> */}
    </Container>
  );
};

export default DoctorForm;

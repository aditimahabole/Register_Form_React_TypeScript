import React, { useState, FormEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Appointment } from "../Interfaces/appointment";

const AppointmentForm: React.FC = () => {
  // Use Effect for initial data fetching
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(
    //         // Network response was not ok: ${response.statusText}
    //       );
    //     }
    //     return response.json();
    //   })
    //   .then(() => console.log("Checking data"))
    //   .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Initial State for Appointment
  const initialAppointmentState: Appointment = {
    _id: "",
    doctorID: "",
    patientID: "",
    clinicID: "",
    date: "",
    time: "",
    status: "",
    patient: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      dateOfBirth: "",
      gender: "",
    },
    clinics: {
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
  };

  // All states
  const [appointment, setAppointment] = useState(initialAppointmentState);
  const [formData, setFormData] = useState(initialAppointmentState);
  const [clickAddSchedule, setClickAddSchedule] = useState(0);

  // Handling each data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(`Setting ${name} to ${value}`);

    setFormData((prevData) => {
      console.log(prevData);

      if (name.startsWith("clinics.")) {
        const add = name.split(".");
        console.log("name splitting : ", add);
        const clinicsField = add[1];

        if (clinicsField === "schedule") {
          console.log("value is ", value);
          const scheduleField = add[3];
          console.log("schedule Field ", scheduleField);
          const getScheduleIndex = Number(name.split(".")[2]);
          console.log("schedule Index ", getScheduleIndex);
          const updatedScheduleArray = [...prevData.clinics.schedule];
          console.log("updatedScheduleArray ", updatedScheduleArray);
          updatedScheduleArray[getScheduleIndex] = {
            ...updatedScheduleArray[getScheduleIndex],
            [scheduleField]: value,
          };
          console.log("Updated Schedule Array is : ", updatedScheduleArray);

          return {
            ...prevData,
            clinics: {
              ...prevData.clinics,
              schedule: updatedScheduleArray,
            },
          };
        }

        return {
          ...prevData,
          clinics: {
            ...prevData.clinics,
            [clinicsField]: value,
          },
        };
      }

      if (name.startsWith("patient.")) {
        const add = name.split(".");
        const patientField = add[1];

        return {
          ...prevData,
          patient: {
            ...prevData.patient,
            [patientField]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleAppointmentInfo = () => {
    const scarray = formData.clinics.schedule;

    scarray.map((sc) => {
      console.log("Day : ", sc.day);
      console.log("OpeningTime : ", sc.openingTime);
      console.log("Closing Time : ", sc.closingTime);
    });
    console.log("Schedule Info : ", formData.clinics.schedule[0]);
    console.log("Appointment Info", formData);
  };
  // Adding Schedule--------------
  const handleAddSchedule = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickAddSchedule(clickAddSchedule + 1);
    console.log("Add Schedule Clicked");
    // console.log(formData.education);
  };
  // Removing A Schedule 
  const handleRemoveSchedule = (indexToRemove: number) => {
    setFormData((prevData) => {
      const updatedScheduleArray = prevData.clinics.schedule.filter(
        (_, index) => index !== indexToRemove
      );

      return {
        ...prevData,
        clinics:{
            ...prevData.clinics,
            schedule:updatedScheduleArray,
        },
      };
    });
}
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const handleonSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        appointment
      );

      if (response.status === 201) {
        console.log("Data sent successfully");
        // Reset the form after successful submission
        setAppointment(initialAppointmentState);
      } else {
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    handleButtonClick();
  };

  const containerStyle = {
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
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
        <Button variant="contained" onClick={() => handleAppointmentInfo()}>
          Console Data
        </Button>
        <h1>Appointment Form</h1>
        {/* Appointment Details */}
        <TextField
          required
          id="outlined-required"
          label="Doctor ID"
          type="text"
          name="doctorID"
          value={formData.doctorID}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Patient ID"
          type="text"
          name="patientID"
          value={formData.patientID}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Clinic ID"
          type="text"
          name="clinicID"
          value={formData.clinicID}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Date"
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Time"
          type="text"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Status"
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        />

        {/* Patient Details */}
        <h2>Patient Details</h2>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          type="text"
          name="patient.firstName"
          value={formData.patient.firstName}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          type="text"
          name="patient.lastName"
          value={formData.patient.lastName}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          name="patient.email"
          value={formData.patient.email}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Contact Number"
          type="text"
          name="patient.contactNumber"
          value={formData.patient.contactNumber}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Date of Birth"
          type="text"
          name="patient.dateOfBirth"
          value={formData.patient.dateOfBirth}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Gender"
          type="text"
          name="patient.gender"
          value={formData.patient.gender}
          onChange={handleInputChange}
        />

        {/* Clinic Details */}
        <h2>Clinic Details</h2>
        <TextField
          required
          id="outlined-required"
          label="Name"
          type="text"
          name="clinics.name"
          value={formData.clinics.name}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Address"
          type="text"
          name="clinics.address"
          value={formData.clinics.address}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Contact Number"
          type="text"
          name="clinics.contactNumber"
          value={formData.clinics.contactNumber}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          name="clinics.email"
          value={formData.clinics.email}
          onChange={handleInputChange}
        />

        {/* ----------------------Schedule--------------------------------- */}
        <h2>Schedule</h2>
        {
          // 0 1 2 3
          // appointment.clinics?.schedule.map((schedule, scheduleIndex) => (
          Array.from({ length: clickAddSchedule }, (_, scheduleIndex) => (
            <div key={scheduleIndex}>
              <TextField
                id={`clinic-schedule-day-${scheduleIndex}`}
                label={`Day ${scheduleIndex + 1}`}
                type="text"
                name={`clinics.schedule.${scheduleIndex}.day`}
                value={formData.clinics?.schedule[scheduleIndex]?.day || ""}
                onChange={handleInputChange}
              />
              <TextField
                id={`clinic-schedule-openingTime-${scheduleIndex}`}
                label="Opening Time"
                type="text"
                name={`clinics.schedule.${scheduleIndex}.openingTime`}
                value={
                  formData.clinics?.schedule[scheduleIndex]?.openingTime || ""
                }
                onChange={handleInputChange}
              />
              <TextField
                id={`clinic-schedule-closingTime-${scheduleIndex}`}
                label="Closing Time"
                type="text"
                name={`clinics.schedule.${scheduleIndex}.closingTime`}
                value={
                  formData.clinics?.schedule[scheduleIndex]?.closingTime || ""
                }
                onChange={handleInputChange}
              />
               <Button
              variant="outlined"
              onClick={() => handleRemoveSchedule(scheduleIndex)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            </div>
          ))
        }
        <br></br>
        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleAddSchedule}
        >
          Add Schedule
        </Button>

        {/* Submit Button */}
        <br></br>
        <br></br>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleonSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AppointmentForm;

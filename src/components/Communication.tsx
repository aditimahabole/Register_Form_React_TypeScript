import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CardHeader } from "@mui/material";
import { Communication } from "../Interfaces/communication"; // Import the Prescription interface

const CommunicationForm: React.FC = () => {
  // ----------------Prescription Initial State--------------------------

  const initialCommunicationState: Communication = {
    _id: "",
    doctorID: "",
    patientID: "",
    clinicID: "",
    dates: "",
    medium: "",
    content: "",
    patient: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      dateOfBirth: "",
      gender: "",
    },
    clinic: {
      name: "",
      address: "",
      contactNumber: "",
      email: "",
    },
  };
  // ---------------------Yup Validation---------------------------------

  const validationSchema = Yup.object({
    doctorID: Yup.string().required("Doctor ID is required"),
    patientID: Yup.string().required("Patient ID is required"),
    clinicID: Yup.string().required("Clinic ID is required"),
    dates: Yup.string().required("Date is required"),
    medium: Yup.string().required("Medium is required"),
    content: Yup.string().required("Content is required"),
    patient: Yup.object().shape({
      firstName: Yup.string().required("Patient First Name is required"),
      lastName: Yup.string().required("Patient Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Patient Email is required"),
      contactNumber: Yup.string().required(
        "Patient Contact Number is required"
      ),
      dateOfBirth: Yup.string().required("Patient Date of Birth is required"),
      gender: Yup.string().required("Patient Gender is required"),
    }),
    clinic: Yup.object().shape({
      name: Yup.string().required("Clinic Name is required"),
      address: Yup.string().required("Clinic Address is required"),
      contactNumber: Yup.string().required("Clinic Contact Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Clinic Email is required"),
    }),
  });

  // --------------------Formik Setup----------------------
  const formik = useFormik({
    initialValues: initialCommunicationState,
    validationSchema,
    onSubmit: (value) => {
      alert("HELLOOOOOO");
      console.log("BHAIIIII HOJAAAAAA");

      console.log(value);
    },
  });
  //   --------------------Styles---------------------------------
  const containerStyle = {
    padding: "20px",
    border: "none",
    borderRadius: "5px",
    width: "100%",
    height: "100%",
    overflowY: "auto" as const,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  const textFieldStyle = {
    marginBottom: "10px",
  };
  // -----------------Data rendered here-----------------------------------
  return (
    <Container maxWidth="md">
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
        style={containerStyle}
      >
        {/* <h1>Prescription Form</h1> */}
        <h1>Communication Form</h1>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="doctorID"
            label="Doctor ID"
            variant="outlined"
            fullWidth
            name="doctorID"
            value={formik.values.doctorID}
            onChange={formik.handleChange}
            error={formik.touched.doctorID && Boolean(formik.errors.doctorID)}
            helperText={formik.touched.doctorID ? formik.errors.doctorID : ""}
            style={textFieldStyle}
          />
          <TextField
            id="patientID"
            label="Patient ID"
            variant="outlined"
            fullWidth
            name="patientID"
            value={formik.values.patientID}
            onChange={formik.handleChange}
            error={formik.touched.patientID && Boolean(formik.errors.patientID)}
            helperText={formik.touched.patientID ? formik.errors.patientID : ""}
            style={textFieldStyle}
          />

          <TextField
            id="clinicID"
            label="clinic ID"
            variant="outlined"
            fullWidth
            name="clinicID"
            value={formik.values.clinicID}
            onChange={formik.handleChange}
            error={formik.touched.clinicID && Boolean(formik.errors.clinicID)}
            helperText={formik.touched.clinicID ? formik.errors.clinicID : ""}
            style={textFieldStyle}
          />
        </div>

        <TextField
          id="dates"
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          name="dates"
          value={formik.values.dates}
          onChange={formik.handleChange}
          error={formik.touched.dates && Boolean(formik.errors.dates)}
          helperText={formik.touched.dates ? formik.errors.dates : ""}
          InputLabelProps={{
            shrink: true,
          }}
          style={textFieldStyle}
        />

        <TextField
          id="medium"
          label="Medium"
          variant="outlined"
          fullWidth
          name="medium"
          value={formik.values.medium}
          onChange={formik.handleChange}
          error={formik.touched.medium && Boolean(formik.errors.medium)}
          helperText={formik.touched.medium ? formik.errors.medium : ""}
          style={textFieldStyle}
        />

        <TextField
          id="content"
          label="Content"
          variant="outlined"
          fullWidth
          name="content"
          multiline
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content ? formik.errors.content : ""}
          style={textFieldStyle}
        />

        {/* Patient Information */}
        <CardHeader title="Patient Information" />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="patient.firstName"
            label="Patient First Name"
            variant="outlined"
            fullWidth
            name="patient.firstName"
            value={formik.values.patient.firstName}
            onChange={formik.handleChange}
            error={
              formik.touched.patient?.firstName &&
              Boolean(formik.errors.patient?.firstName)
            }
            helperText={
              formik.touched.patient?.firstName
                ? formik.errors.patient?.firstName
                : ""
            }
            style={textFieldStyle}
          />

          <TextField
            id="patient.lastName"
            label="Patient Last Name"
            variant="outlined"
            fullWidth
            name="patient.lastName"
            value={formik.values.patient.lastName}
            onChange={formik.handleChange}
            error={
              formik.touched.patient?.lastName &&
              Boolean(formik.errors.patient?.lastName)
            }
            helperText={
              formik.touched.patient?.lastName
                ? formik.errors.patient?.lastName
                : ""
            }
            style={textFieldStyle}
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
            id="patient.email"
            label="Patient Email"
            variant="outlined"
            fullWidth
            name="patient.email"
            value={formik.values.patient.email}
            onChange={formik.handleChange}
            error={
              formik.touched.patient?.email &&
              Boolean(formik.errors.patient?.email)
            }
            helperText={
              formik.touched.patient?.email ? formik.errors.patient?.email : ""
            }
            style={textFieldStyle}
          />
          <TextField
            id="patient.contactNumber"
            label="Patient Contact Number"
            variant="outlined"
            fullWidth
            name="patient.contactNumber"
            value={formik.values.patient.contactNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.patient?.contactNumber &&
              Boolean(formik.errors.patient?.contactNumber)
            }
            helperText={
              formik.touched.patient?.contactNumber
                ? formik.errors.patient?.contactNumber
                : ""
            }
            style={textFieldStyle}
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
            id="patient.dateOfBirth"
            label="Patient Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            name="patient.dateOfBirth"
            value={formik.values.patient.dateOfBirth}
            onChange={formik.handleChange}
            error={
              formik.touched.patient?.dateOfBirth &&
              Boolean(formik.errors.patient?.dateOfBirth)
            }
            //   helperText={formik.touched.patient?.dateOfBirth ? formik.errors.patient?.dateOfBirth : ''}
            InputLabelProps={{
              shrink: true,
            }}
            style={textFieldStyle}
          />

          <TextField
            id="patient.gender"
            label="Patient Gender"
            variant="outlined"
            fullWidth
            name="patient.gender"
            value={formik.values.patient.gender}
            onChange={formik.handleChange}
            error={
              formik.touched.patient?.gender &&
              Boolean(formik.errors.patient?.gender)
            }
            helperText={
              formik.touched.patient?.gender
                ? formik.errors.patient?.gender
                : ""
            }
            style={textFieldStyle}
          />
        </div>

        {/* Clinic Information */}
        <CardHeader title="Clinic Information" />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="clinic.name"
            label="Clinic Name"
            variant="outlined"
            fullWidth
            name="clinic.name"
            value={formik.values.clinic.name}
            onChange={formik.handleChange}
            error={
              formik.touched.clinic?.name && Boolean(formik.errors.clinic?.name)
            }
            helperText={
              formik.touched.clinic?.name ? formik.errors.clinic?.name : ""
            }
            style={textFieldStyle}
          />

          <TextField
            id="clinic.address"
            label="Clinic Address"
            variant="outlined"
            fullWidth
            name="clinic.address"
            value={formik.values.clinic.address}
            onChange={formik.handleChange}
            error={
              formik.touched.clinic?.address &&
              Boolean(formik.errors.clinic?.address)
            }
            helperText={
              formik.touched.clinic?.address
                ? formik.errors.clinic?.address
                : ""
            }
            style={textFieldStyle}
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
            id="clinic.contactNumber"
            label="Clinic Contact Number"
            variant="outlined"
            fullWidth
            name="clinic.contactNumber"
            value={formik.values.clinic.contactNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.clinic?.contactNumber &&
              Boolean(formik.errors.clinic?.contactNumber)
            }
            helperText={
              formik.touched.clinic?.contactNumber
                ? formik.errors.clinic?.contactNumber
                : ""
            }
            style={textFieldStyle}
          />
          <TextField
            id="clinic.email"
            label="Clinic Email"
            variant="outlined"
            fullWidth
            name="clinic.email"
            value={formik.values.clinic.email}
            onChange={formik.handleChange}
            error={
              formik.touched.clinic?.email &&
              Boolean(formik.errors.clinic?.email)
            }
            helperText={
              formik.touched.clinic?.email ? formik.errors.clinic?.email : ""
            }
            style={textFieldStyle}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Submit A
        </Button>
      </form>
    </Container>
  );
};

export default CommunicationForm;

import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CardHeader } from "@mui/material";
import { Prescription } from "../Interfaces/prescription"; // Import the Prescription interface


const PrescriptionForm: React.FC = () => {
  // ----------------Prescription Initial State--------------------------
  const initialPrescriptionState: Prescription = {
    doctorID: "",
    patientID: "",
    clinicID: "",
    date: "",
    medications: [""],
    instructions: "",
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
      address: {
        Line1: "",
        Line2: "",
        Street: "",
        City: "",
        Country: "",
      },
      contactNumber: "",
      email: "",
    },
  };
  // ---------------------Yup Validation---------------------------------

  const validationSchema = Yup.object({
    doctorID: Yup.string().required("Doctor ID is required"),
    patientID: Yup.string().required("Patient ID is required"),
    clinicID: Yup.string().required("Clinic ID is required"),
    date: Yup.string().required("Date is required"),
    medications:
      //  Yup.array().of(
      Yup.string().required("Medication is required"),
    // ),
    instructions: Yup.string().required("Instructions are required"),
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
      address: Yup.object().shape({
        Line1: Yup.string().required("Address Line1 is required"),
        Line2: Yup.string().required("Address Line2 is required"),
        Street: Yup.string().required("Street is required"),
        City: Yup.string().required("City is required"),
        Country: Yup.string().required("Country is required"),
      }),
      contactNumber: Yup.string().required("Clinic Contact Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Clinic Email is required"),
    }),
  });

  // --------------------Formik Setup----------------------
  const formik = useFormik({
    initialValues: initialPrescriptionState,
    validationSchema,
    onSubmit: (values) => {
      if (typeof values.medications === "string") {
        values.medications = (values.medications as string)
          .split(",")
          .map((m: string) => m.trim());
      }

      console.log(values);
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
        <CardHeader title="Prescription Form" />

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
          label="Clinic ID"
          variant="outlined"
          fullWidth
          name="clinicID"
          value={formik.values.clinicID}
          onChange={formik.handleChange}
          error={formik.touched.clinicID && Boolean(formik.errors.clinicID)}
          helperText={formik.touched.clinicID ? formik.errors.clinicID : ""}
          style={textFieldStyle}
        />

        <TextField
          id="date"
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date ? formik.errors.date : ""}
          InputLabelProps={{
            shrink: true,
          }}
          style={textFieldStyle}
        />

        <TextField
          id="medications"
          label="Medications"
          variant="outlined"
          fullWidth
          name="medications"
          value={formik.values.medications}
          onChange={formik.handleChange}
          error={
            formik.touched.medications && Boolean(formik.errors.medications)
          }
          helperText={
            formik.touched.medications ? formik.errors.medications : ""
          }
          style={textFieldStyle}
        />

        <TextField
          id="instructions"
          label="Instructions"
          variant="outlined"
          fullWidth
          name="instructions"
          multiline
          rows={4}
          value={formik.values.instructions}
          onChange={formik.handleChange}
          error={
            formik.touched.instructions && Boolean(formik.errors.instructions)
          }
          helperText={
            formik.touched.instructions ? formik.errors.instructions : ""
          }
          style={textFieldStyle}
        />

        {/* Patient Information */}

        <CardHeader title="Patient Information" />
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
          helperText={
            formik.touched.patient?.dateOfBirth
              ? formik.errors.patient?.dateOfBirth
              : ""
          }
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
            formik.touched.patient?.gender ? formik.errors.patient?.gender : ""
          }
          style={textFieldStyle}
        />

        {/* Clinic Information */}
        <CardHeader title="Clinic Information" />
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
          id="clinic.address.Line1"
          label="Address Line1"
          variant="outlined"
          fullWidth
          name="clinic.address.Line1"
          value={formik.values.clinic.address.Line1}
          onChange={formik.handleChange}
          error={
            formik.touched.clinic?.address?.Line1 &&
            Boolean(formik.errors.clinic?.address?.Line1)
          }
          helperText={
            formik.touched.clinic?.address?.Line1
              ? formik.errors.clinic?.address?.Line1
              : ""
          }
          style={textFieldStyle}
        />
        <TextField
          id="clinic.address.Line2"
          label="Address Line2"
          variant="outlined"
          fullWidth
          name="clinic.address.Line2"
          value={formik.values.clinic.address.Line2}
          onChange={formik.handleChange}
          error={
            formik.touched.clinic?.address?.Line2 &&
            Boolean(formik.errors.clinic?.address?.Line2)
          }
          helperText={
            formik.touched.clinic?.address?.Line2
              ? formik.errors.clinic?.address?.Line2
              : ""
          }
          style={textFieldStyle}
        />
        <TextField
          id="clinic.address.Street"
          label="Street"
          variant="outlined"
          fullWidth
          name="clinic.address.Street"
          value={formik.values.clinic.address.Street}
          onChange={formik.handleChange}
          error={
            formik.touched.clinic?.address?.Street &&
            Boolean(formik.errors.clinic?.address?.Street)
          }
          helperText={
            formik.touched.clinic?.address?.Street
              ? formik.errors.clinic?.address?.Street
              : ""
          }
          style={textFieldStyle}
        />
        <TextField
          id="clinic.address.City"
          label="City"
          variant="outlined"
          fullWidth
          name="clinic.address.City"
          value={formik.values.clinic.address.City}
          onChange={formik.handleChange}
          error={
            formik.touched.clinic?.address?.City &&
            Boolean(formik.errors.clinic?.address?.City)
          }
          helperText={
            formik.touched.clinic?.address?.City
              ? formik.errors.clinic?.address?.City
              : ""
          }
          style={textFieldStyle}
        />
        <TextField
          id="clinic.address.Country"
          label="Country"
          variant="outlined"
          fullWidth
          name="clinic.address.Country"
          value={formik.values.clinic.address.Country}
          onChange={formik.handleChange}
          error={
            formik.touched.clinic?.address?.Country &&
            Boolean(formik.errors.clinic?.address?.Country)
          }
          helperText={
            formik.touched.clinic?.address?.Country
              ? formik.errors.clinic?.address?.Country
              : ""
          }
          style={textFieldStyle}
        />
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
            formik.touched.clinic?.email && Boolean(formik.errors.clinic?.email)
          }
          helperText={
            formik.touched.clinic?.email ? formik.errors.clinic?.email : ""
          }
          style={textFieldStyle}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default PrescriptionForm;

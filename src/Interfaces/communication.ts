export interface Communication {
  _id: string;
  doctorID: string;
  patientID: string;
  clinicID: string;
  dates: string;
  medium: string;
  content: string;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    dateOfBirth: string;
    gender: string;
  };
  clinic: {
    name: string;
    address: string;
    contactNumber: string;
    email: string;
  };
}



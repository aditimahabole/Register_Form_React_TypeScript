// prescription-interface.ts

interface Address {
  Line1: string;
  Line2?: string;
  Street: string;
  City: string;
  Country: string;
}

interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  gender: string;
}

interface Clinic {
  name: string;
  address: Address;
  contactNumber: string;
  email: string;
}

export interface Prescription {
  _id?: string;
  doctorID: string;
  patientID: string;
  clinicID: string;
  date: string;
  medications: string[];
  instructions: string;
  patient: Patient;
  clinic: Clinic;
}

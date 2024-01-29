export interface Patient {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    dateOfBirth: string;
    gender: string;
}

export interface Appointment {
    _id: string;
    doctorID: string;
    patientID: string;
    clinicID: string;
    date: string; 
    time: string;
    status: string;
    patient: Patient;
    clinics: Clinic; 
}

export interface Clinic {
    name: string;
    address: string;
    contactNumber: string;
    email: string;
    schedule: Schedule[];
}

export interface Schedule {
    day: string;
    openingTime: string;
    closingTime: string;
}
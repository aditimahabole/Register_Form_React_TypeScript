export interface Education {
    degree: string;
    university: string;
    year: string;
}
export interface Experience {
    position: string;
    organization: string;
    duration: string;
}
export interface Schedule {
    day: string;
    openingTime: string;
    closingTime: string;
}

export interface Clinic {
    clinicID: string;
    name: string;
    address: string;
    contactNumber: string;
    email: string;
    schedule: Schedule[];
}

export interface Doctor {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactNumber: string;
    specialization: string[];
    address: {
        Line1: string;
        Line2: string;
        "Street/Locality": string;
        City: string;
        State: string;
        Pincode: string;
    };
    education: Education[];
    affiliations: string[];
    experience: Experience[];
    clinics: Clinic[];
    // [key: string]: any;
}

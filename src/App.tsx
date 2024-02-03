import "./App.css";

// import DoctorForm from "./components/DoctorForm";
// import Appointment from "./components/Appointment";
import PrescriptionForm from "./components/PriscriptionForm";
import CommunicationForm from "./components/Communication";
function App() {
  return (
    <>
      <CommunicationForm />
      <PrescriptionForm />
      {/* <Appointment /> */}
      {/* <DoctorForm /> */}
    </>
  );
}

export default App;

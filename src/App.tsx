import "./App.css";

import DoctorForm from "./components/DoctorForm";
import Appointment from "./components/Appointment";
import PrescriptionForm from "./components/PriscriptionForm";
function App() {
  return (
    <>
      <PrescriptionForm />
      <Appointment />
      <DoctorForm />
    </>
  );
}

export default App;

import "./components/css/style.css";
import { createContext, useState } from "react";
import Login from './components/Login/Login'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home";
export const TotalAmounts = createContext();
export const Valid = createContext();
export const NameAndEmail = createContext();

function App() {
  const [grandTotal, setGrandTotal] = useState(0);
  const [validStatus, setValidStatus] = useState(false);
  const [nameAndEmail, setNameAndEmail] = useState({name:'',email:''});
  return (
    <TotalAmounts.Provider value={[grandTotal, setGrandTotal]}>
      <Valid.Provider value={[validStatus, setValidStatus]}>
        <NameAndEmail.Provider value={[nameAndEmail, setNameAndEmail]}>    
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </NameAndEmail.Provider>
      </Valid.Provider>
    </TotalAmounts.Provider>
  );
}

export default App;

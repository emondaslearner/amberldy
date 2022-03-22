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
export const GetFile = createContext()

function App() {
  const [grandTotal, setGrandTotal] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [nameAndEmail, setNameAndEmail] = useState({name:'',email:''});
  const [file,setFile] = useState(null)
  return (
    <TotalAmounts.Provider value={[grandTotal, setGrandTotal]}>
      <Valid.Provider value={[clicked, setClicked]}>
        <NameAndEmail.Provider value={[nameAndEmail, setNameAndEmail]}>    
          <GetFile.Provider value={[file,setFile]}>
            <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/" element={<Home />}/>
            </Routes>
          </GetFile.Provider>
        </NameAndEmail.Provider>
      </Valid.Provider>
    </TotalAmounts.Provider>
  );
}

export default App;

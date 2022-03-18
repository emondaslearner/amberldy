import logo from './logo.svg';
import './components/css/style.css';
import Header from './components/Header/Header'
import LeftSide from './components/leftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import { createContext, useState } from 'react';
export const TotalAmounts = createContext()
export const Valid = createContext()

function App() {
  const [grandTotal,setGrandTotal] = useState(0)
  const [validStatus,setValidStatus] = useState(false)
  return (
    <TotalAmounts.Provider value={[grandTotal,setGrandTotal]}>
      <Valid.Provider value={[validStatus,setValidStatus]}>
        <Header />
        <div className="content">
          <LeftSide/>
          <RightSide />
        </div>
      </Valid.Provider>
    </TotalAmounts.Provider>
  );
}

export default App;

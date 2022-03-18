import React, { Component, useContext } from "react";
import {
  faCircleUser,
  faDownload,
  faEllipsis,
  faEye,
  faIndianRupeeSign
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TotalAmounts, Valid } from "../../App";

function RightSide() {
  const [grandTotal, setGrandTotal] = useContext(TotalAmounts);
    const [validStatus,setValidStatus] = useContext(Valid)
    const sendInformation = () => {
        setValidStatus(true)
    }
  return (
    <div className="rightSide">
      <div className="clientDetails">
        <h4>Client Details</h4>
        <div>
          <div className="clientLeft">
            <div>
              <FontAwesomeIcon className="user" icon={faCircleUser} />
            </div>
            <div>
              <h4>Chris Dare</h4>
              <p>darechrisnextfifteen123.com</p>
            </div>
          </div>
          <div>
            <FontAwesomeIcon className="setting" icon={faEllipsis} />
          </div>
        </div>
        <h5>NEXT FIFTEEN COMMUNICATIONS LIMITED</h5>
        <p>Bermondsey Street, London, United Kingdom, SE13XF</p>
        <button>Add Customer</button>
      </div>
      <div className="amountDue">
        <div>
          <div>
            <h5>Amount Due(GBP)</h5>
          </div>
          <div>
            <FontAwesomeIcon className="setting" icon={faEllipsis} />
          </div>
        </div>
        <h1>
          <FontAwesomeIcon icon={faIndianRupeeSign} /> {grandTotal}<sub>(Vat incl.)</sub>
        </h1>
        <p>
          Due date: <span>28 jan 2022</span>
        </p>
        <div className="pdf">
          <h5>Also attach pdf in mail</h5>
          <div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="butt">
        <button>
          <FontAwesomeIcon icon={faEye} /> Preview
        </button>
        <button>
          <FontAwesomeIcon icon={faDownload} />
          Download
        </button>
      </div>
      <button onClick={sendInformation} >Send Invoice</button>
    </div>
  );
}

export default RightSide;

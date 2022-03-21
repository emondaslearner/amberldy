import React, { Component, useContext } from "react";
import {
  faCircleUser,
  faDownload,
  faEllipsis,
  faEye,
  faSterlingSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NameAndEmail, TotalAmounts, Valid } from "../../App";

function RightSide() {
  const name = React.createRef()
  const email = React.createRef()
  const [nameAndEmail, setNameAndEmail] = useContext(NameAndEmail)
  const [grandTotal, setGrandTotal] = useContext(TotalAmounts);
  const [validStatus, setValidStatus] = useContext(Valid);
  const sendInformation = () => {
    if(name.current.value == '' || email.current.value == ''){
      const getInput = document.querySelectorAll('.clientLeft input')
      for(let i = 0;i < getInput.length;i++){
          if(getInput[i].value == ''){              
              getInput[i].style.border = "1px solid red";
              getInput[i].placeholder = "Please fill the filed";
              getInput[i].classList.add("changePlaceholderColor");
          }
      }
    }else{
      setNameAndEmail({name:name.current.value,email:email.current.value})
    }
    setValidStatus(true);
    document.querySelectorAll('.clientLeft input')[0].value = ''
    document.querySelectorAll('.clientLeft input')[1].value = ''
  };

  //check input empty or not on blur
  const checkInput = (e) => {
    const data = e.target.value;
    if (data == "") {
      e.target.style.border = "1px solid red";
      e.target.placeholder = "Please fill the filed";
      e.target.classList.add("changePlaceholderColor");
    } else {
      e.target.style.border = "1px solid transparent";
      e.target.classList.remove("changePlaceholderColor");
    }
  };
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
              <input ref={name} onBlur={checkInput} placeholder="Enter client name" type="text" />
              <input ref={email} onBlur={checkInput} placeholder="Enter client email" type="email" />
            </div>
          </div>
          <div>
            <FontAwesomeIcon className="setting" icon={faEllipsis} />
          </div>
        </div>
        <h5>NEXT FIFTEEN COMMUNICATIONS LIMITED</h5>
        <p>Bermondsey Street, London, United Kingdom, SE13XF</p>
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
          <FontAwesomeIcon className="rightMoneySign" icon={faSterlingSign} />{" "}
          {grandTotal != 0 ? grandTotal.toFixed(2) : "0.00"}
          <sub>(Vat incl.)</sub>
        </h1>
      </div>
      <button onClick={sendInformation}>Send Invoice</button>
    </div>
  );
}

export default RightSide;

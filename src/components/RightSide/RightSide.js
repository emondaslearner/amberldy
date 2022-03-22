import React, { Component, useContext, useEffect, useState } from "react";
import {
  faCircleUser,
  faDownload,
  faEllipsis,
  faEye,
  faSterlingSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NameAndEmail, TotalAmounts, Valid,GetFile } from "../../App";

function RightSide() {
  const [file,setFile] = useContext(GetFile);
  const name = React.createRef()
  const email = React.createRef()
  const [nameAndEmail, setNameAndEmail] = useContext(NameAndEmail)
  const [grandTotal, setGrandTotal] = useContext(TotalAmounts);
  const [clicked, setClicked] = useContext(Valid);
  const [fileError,setFileError] = useState('')

  //sent data at server on click 
  const sendInformation = () => {
    if(name.current.value == '' || email.current.value == ''){
      //final check data available or not in rightComponent inputs
      const getInput = document.querySelectorAll('.clientLeft input')
      for(let i = 0;i < getInput.length;i++){
          if(getInput[i].value == ''){              
              getInput[i].style.border = "1px solid red";
              getInput[i].placeholder = "Please fill the filed";
              getInput[i].classList.add("changePlaceholderColor");
          }
      }
    }else{
      //if data available then sent it leftComponent
      setNameAndEmail({name:name.current.value,email:email.current.value})
    }
    //change click status for run leftComponent functions
    setClicked(true);

    //empty right inputs
    document.querySelectorAll('.clientLeft input')[0].value = ''
    document.querySelectorAll('.clientLeft input')[1].value = ''
    setFile(null)
  };

  //check rightComponent inputs empty or not on blur
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


  //toggle data for change status of pdf button
  const [pickerStatus,setPickerStatus] = useState(false);
  const togglePdfPicker = () => {
    setPickerStatus(!pickerStatus);
  }

  //run function when toggle data of pdf button
  useEffect(() => {
    if(pickerStatus){
      document.querySelector('.pdf div button').classList.add('on')
      document.querySelector('.pdf div').style.background = '#2B3EB8'
      document.querySelector('.pdfName').style.display = 'block'
    }else{
      document.querySelector('.pdf div button').classList.remove('on')
      document.querySelector('.pdfName').style.display = 'none'
      document.querySelector('.pdf div').style.background = 'rgb(206, 202, 202)'
      setFileError('')
      setFile(null)
    }
  },[pickerStatus])

  //get pdf file on change
  const getFile = (e) => {
    const type = e.target.files[0].type.split('/').pop()
    if(type == 'pdf'){
      setFileError('')
      setFile(e.target.files[0])
    }else{
      setFileError('you can only select pdf file')
    }
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
        <div className="pdf">
          <h3>attach pdf in mail</h3>
          <div onClick={togglePdfPicker}>
            <button></button>
          </div>
        </div>
        {
          pickerStatus == true && <input onChange={getFile} className="pdfInput" type="file" />
        }
        <p className="error">{fileError != '' && fileError}</p>
        <p className="pdfName" style={{color:'black',textAlign:'center'}}>{file != null && file.name}</p>
      </div>
      <button onClick={sendInformation}>Send Invoice</button>
    </div>
  );
}

export default RightSide;

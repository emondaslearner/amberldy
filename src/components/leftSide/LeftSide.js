import React, { Component, useContext, useEffect, useState } from "react";
import logo from "../image/Amberley-Logo-blue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTimes,
  faSterlingSign
} from "@fortawesome/free-solid-svg-icons";
import { NameAndEmail, TotalAmounts, Valid ,GetFile } from "../../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function LeftSide() {
  const [itemError, setItemError] = useState("");
  const [item, setItem] = useState([]);
  const [unit, setUnit] = useState(0);
  const [rate, setRate] = useState(0);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = React.useState(true);
  
  //ref of item input
  const refFirst = React.createRef();
  const refSecond = React.createRef();
  const refThird = React.createRef();
  const refFourth = React.createRef();

  //ref of invoice information
  const invoiceNumber = React.createRef()
  const purchaseNo = React.createRef()
  const issuedDate = React.createRef()
  const description = React.createRef()
  const chris = React.createRef()

  //leftComponent inputs empty or not on blur
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


  //add item to invoice
  const addItem = () => {
    //check data is empty or not in item input
    if (
      refFirst.current.value === "" ||
      refSecond.current.value === "" ||
      refThird.current.value === ""
    ) {
      setItemError("Please fill all fields");
    }else {
      //if data is available then add item
      const countVat = (total/100)*parseFloat(refFourth.current.value)
      const random = Math.ceil(Math.random() * 20000);
      const getItem = {
        id: random,
        itemName: refFirst.current.value,
        itemUnit: refSecond.current.value,
        itemRate: refThird.current.value,
        itemVat:countVat ,
        itemTotal: total,
      };

      setItemError("");
      setItem((prev) => [...prev, getItem]);
      setTotal(0);


      refFirst.current.value = "";
      refSecond.current.value = "";
      refThird.current.value = "";
      refFourth.current.value = "20";
    }
  };

  //count total
  useEffect(() => {
    setTotal(unit * rate);
  }, [unit, rate]);

  //count subTotal on change total
  useEffect(() => {
    const countVat = (total/100)*parseFloat(refFourth.current.value)
    if(item.length != 0){
        let getTo = 0;
        for(let i = 0;i < item.length;i++){
          getTo = getTo + item[i].itemTotal
          setSubTotal(getTo + total)
        }
        let countTotalVat = 0;
        for(let i = 0;i < item.length;i++){
          countTotalVat = countTotalVat + item[i].itemVat
          setVat(countTotalVat + countVat)
        }
    }else{
      setSubTotal(total)
      setVat(countVat)
    }
  },[total])


  //change vat value on change
  const changeVat = (e) => {
    const countVat = (total/100)*parseFloat(refFourth.current.value)
    if(item.length != 0){
      let countTotalVat = 0;
      for(let i = 0;i < item.length;i++){
        countTotalVat = countTotalVat + item[i].itemVat
        setVat(countTotalVat + countVat)
      }
    }else{
      setVat(countVat)
    }
  }

  //grand total
  const [grandTotal, setGrandTotal] = useContext(TotalAmounts);
  const totalAmount = subTotal + vat;
  setGrandTotal(subTotal + vat);

  //get current date and set it issue date
  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    document.querySelector('.issue').value = today;
  },[])

  //remove item from invoice
  const closeItem = (getItem) => {
    setSubTotal((subTotal - (getItem.itemTotal - getItem.itemVat)) - getItem.itemVat)
    setVat(vat - getItem.itemVat);
    const remove = item.filter((data) => {
      return data.id != getItem.id;
    });
    setItem(remove);
  };




  //available data in clicked context when click on sent invoice 
  const [clicked,setClick] = useContext(Valid)

  //get name or email from rightSide component
  const [nameAndEmail, setNameAndEmail] = useContext(NameAndEmail)

  //if select file then get pdf file
  const [file,setFile] = useContext(GetFile)

  //run then code when click change data of clicked context
  useEffect(() => {
    const invoiceNumbers = invoiceNumber.current.value;
    const purchaseNos = purchaseNo.current.value;
    const issuedDates = issuedDate.current.value;
    const chrisDare = chris.current.value;

    if(clicked == true){
        if(invoiceNumbers == '' || purchaseNos == ''|| nameAndEmail.name == '' || nameAndEmail.email == '' || chrisDare == '' || issuedDates == '' || item.length == 0){
          //final check data available or not in leftComponent inputs
          const getInput = document.querySelectorAll('.invoiceInformation .left input')
            for(let i = 0;i < getInput.length;i++){
                if(getInput[i].value == ''){              
                    getInput[i].style.border = "1px solid red";
                    getInput[i].placeholder = "Please fill the filed";
                    getInput[i].classList.add("changePlaceholderColor");
                }
            }
            if(chrisDare == ''){
              document.querySelector('.chris').style.border = "1px solid red";
              document.querySelector('.chris').placeholder = "Please fill the filed";
              document.querySelector('.chris').classList.add("changePlaceholderColor");
            }
            if(item.length == 0){
                setItemError('Any item have not added')
            }
        }else{
            //add loader
            document.querySelector('.body').style.display = 'block'
            //if data is available then send it server
            setItemError('')
            const formData = new FormData()
            formData.append('file', file)
            formData.append('invoiceNumbers', invoiceNumbers)
            formData.append('chrisDare', chrisDare)
            formData.append('name', nameAndEmail.name)
            formData.append('email', nameAndEmail.email)
            formData.append('dueDate', startDate)
            formData.append('purchaseNos', purchaseNos)
            formData.append('issuedDates', issuedDates)
            formData.append('item', JSON.stringify(item))
            formData.append('grandTotal', grandTotal)
            formData.append('description', description.current.value)

            fetch('https://invoice-generator-v1.herokuapp.com/',{
                method: 'POST',
                body:formData
            })
            .then(res => res.json())
            .then(data => {
                //empty all input and show pop up
                setSubTotal(0)
                setVat(0)
                setItem([])
                const getInput = document.querySelectorAll('.invoiceInformation .left input')
                for(let i = 0;i < 2;i++){            
                    getInput[i].value = '';
                }
                document.querySelector('.des').value = ''
                document.querySelector('.chris').value = ''
                setFile(null)
                
                //empty right inputs
                document.querySelectorAll('.clientLeft input')[0].value = ''
                document.querySelectorAll('.clientLeft input')[1].value = ''
                document.querySelector('.body').style.display = 'none'
                document.querySelector('.alert').classList.add('showAlert')
                setTimeout(() => {
                  document.querySelector('.alert').classList.remove('showAlert')
                },3000)
            })
        }
    }
    //change clicked context data for run then this function on every click
    setClick(false)
  },[clicked])
  return (
    <div className="leftSide">
      <div className="head">
        <div className="left">
          <img src={logo} alt="" />
        </div>
        <div className="right">
          <h5>AMBERLEY INNOVATIONS LIMITED</h5>
          <p>Amberley, First Avenue,</p>
          <p>Amersham,Buckinghamshire, United,</p>
          <p>Kingdom, HP79BL,</p>
        </div>
      </div>
      <div className="invoiceInformation">
        <div className="left">
          <p>
            Invoice number:
            <input
              onBlur={checkInput}
              ref={invoiceNumber}
              placeholder="Enter invoice number"
              type="number"
            />
          </p>
          <p>
            Purchase order no:
            <input
              onBlur={checkInput}
              ref={purchaseNo}
              placeholder="Enter purchase order no"
              type="number"
            />
          </p>
          <p className="date">
            Issued date: <input className="issue" ref={issuedDate} onBlur={checkInput} type="text" readOnly />
          </p>
          <p className="dueDate">
            <span>Due date:</span>  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </p>
        </div>
        <div className="right">
          <div>
            <p>Billed to</p>
            <input ref={chris} onBlur={checkInput} className="chris" placeholder="Enter Customer Name" type="text" />
            <p>NEXT FIFTEEN COMMUNICATION GROUP PLC</p>
            <p>Bermondsey Street, London, United Kingdom</p>
          </div>
        </div>
      </div>
      <Alert
          className="alert"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Thank you! Your Invoice has been submitted
        </Alert>
      <div className="invoice">
        <h6>Item Details</h6>
        <p>{itemError != "" && itemError}</p>
        <table>
          <tr>
            <td>Item name</td>
            <td>Unit/Days/Hours</td>
            <td>Rate</td>
            <td>Vat</td>
            <td>Line Total</td>
            <td></td>
          </tr>
          {item.length != 0 &&
            item.map((data) => {
              return (
                <>
                  <br />
                  <tr className="items">
                    <td>{data.itemName}</td>
                    <td>{data.itemUnit}</td>
                    <td><FontAwesomeIcon className="moneySign" icon={faSterlingSign} />{parseInt(data.itemRate).toFixed(2)}</td>
                    <td><FontAwesomeIcon className="moneySign" icon={faSterlingSign} />{data.itemVat}</td>
                    <td>
                      <FontAwesomeIcon className="moneySign" icon={faSterlingSign} />
                      {data.itemTotal.toFixed(2)}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => closeItem(data)}
                        className="close"
                        icon={faTimes}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          <br />
          <tr className="addItem">
            <td>
              <input ref={refFirst} placeholder="Enter item name" type="text" />
            </td>
            <td>
              <input
                ref={refSecond}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Enter unit"
                type="number"
              />
            </td>
            <td>
              <input
                ref={refThird}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter Rate"
                type="number"
              />
            </td>
            <td>
              <select onChange={changeVat} ref={refFourth} id="">
                <option value="5">5%</option>
                <option value="12.5">12.5%</option>
                <option selected value="20">20%</option>
              </select>
            </td>
            <td>
              <FontAwesomeIcon style={{marginBottom:'1.5px'}}className="moneySign" icon={faSterlingSign} />
              {total != 0 ? total.toFixed(2) : "0.00"}
            </td>
            <td>
              <FontAwesomeIcon
                onClick={addItem}
                className="plus"
                icon={faCirclePlus}
              />
            </td>
          </tr>
          <br />
        </table>
        <input className="des" ref={description} placeholder="Description" type="text" />
        <div className="paymentMethod">
          <div className="left">
            <div>
              <h6>Payment Details</h6>
            </div>
            <p>
              Account name: <span>Amberley Innovations</span>
            </p>
            <p>
              Account no: <span>6795 0463 3712 </span>
            </p>
            <p>
              Routing no.: <span>021000021</span>
            </p>
          </div>
          <div className="right">
            <div>
              <p>
                Sub Total:{" "}
                <span>
                  <FontAwesomeIcon className="moneySign" icon={faSterlingSign} />
                  {subTotal != 0 ? subTotal.toFixed(2) : "0.00"}
                </span>
              </p>
              <p>
                Total Vat:{" "}
                <span>
                  <FontAwesomeIcon className="moneySign" icon={faSterlingSign} />
                  {vat != 0 ? vat.toFixed() : "0.00"}
                </span>
              </p>
              <p>
                Total Amount:{" "}
                <span>
                  <FontAwesomeIcon className="moneySign" icon={faSterlingSign} />
                  {subTotal != 0 ? totalAmount.toFixed(2) : "0.00"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;

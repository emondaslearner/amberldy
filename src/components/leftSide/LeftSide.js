import React, { Component, useContext, useEffect, useState } from "react";
import logo from "../image/Amberley-Logo-blue.png";
import bankLogo from "../image/38978.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faClosedCaptioning,
  faIndianRupeeSign,
  faRupee,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { TotalAmounts, Valid } from "../../App";

function LeftSide() {
  const [inputStatus, setInputStatus] = useState(false);
  const [itemError, setItemError] = useState("");
  const [item, setItem] = useState([]);
  const [unit, setUnit] = useState(0);
  const [rate, setRate] = useState(0);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);

  //ref of item input
  const refFirst = React.createRef();
  const refSecond = React.createRef();
  const refThird = React.createRef();
  const refFourth = React.createRef();

  //ref of invoice information
  const invoiceNumber = React.createRef()
  const purchaseNo = React.createRef()
  const issuedDate = React.createRef()
  const dueDate = React.createRef()
  const description = React.createRef()

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

  //add item to invoice
  const addItem = () => {
    if (
      refFirst.current.value == "" ||
      refSecond.current.value == "" ||
      refThird.current.value == ""
    ) {
      setItemError("Please fill all fields");
    } else {
      const random = Math.ceil(Math.random() * 20000);
      const getItem = {
        id: random,
        itemName: refFirst.current.value,
        itemUnit: refSecond.current.value,
        itemRate: refThird.current.value,
        itemVat: refFourth.current.value,
        itemTotal: total,
      };
      setItemError("");
      setItem((prev) => [...prev, getItem]);
      setSubTotal(subTotal + total);
      getItem.itemVat != 0 && setVat(vat + parseInt(refFourth.current.value));

      refFirst.current.value = "";
      refSecond.current.value = "";
      refThird.current.value = "";
      refFourth.current.value = "";
      setTotal(0);
    }
  };

  //count total
  useEffect(() => {
    setTotal(unit * rate);
  }, [unit, rate]);


  //remove item from invoice
  const closeItem = (getItem) => {
    setSubTotal(subTotal - getItem.itemTotal);
    getItem.itemVat != 0 && setVat(vat - getItem.itemVat);
    const remove = item.filter((data) => {
      return data.id != getItem.id;
    });
    setItem(remove);
  };

  //count grand total of items
  const [grandTotal, setGrandTotal] = useContext(TotalAmounts);
  const totalAmount = subTotal - vat - Math.round((subTotal / 100) * 5);
  setGrandTotal(totalAmount);


  //send data in database on click
  const [validStatus,setValidStatus] = useContext(Valid)
  useEffect(() => {
    const invoiceNumbers = invoiceNumber.current.value;
    const purchaseNos = purchaseNo.current.value;
    const issuedDates = issuedDate.current.value;
    const dueDates = dueDate.current.value;
    if(validStatus == true){
        if(invoiceNumbers == '' || purchaseNos == '' || issuedDates == '' || dueDates == '' || item.length == 0){
            const getInput = document.querySelectorAll('.invoiceInformation .left input')
            for(let i = 0;i < getInput.length;i++){
                if(getInput[i].value == ''){              
                    getInput[i].style.border = "1px solid red";
                    getInput[i].placeholder = "Please fill the filed";
                    getInput[i].classList.add("changePlaceholderColor");
                }
            }
            if(item.length == 0){
                setItemError('Any item have not added')
            }
        }else{
            setItemError('')
            const allInvoiceInformation = {invoiceNumbers,purchaseNos,issuedDates,dueDates,item,grandTotal,description:description.current.value}
            fetch('http://localhost:4000',{
                method: 'POST',
                body: JSON.stringify(allInvoiceInformation),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }
    }
    setValidStatus(false)
  },[validStatus])
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
            Issued date: <input ref={issuedDate} onBlur={checkInput} type="date" />
          </p>
          <p>
            Due date: <input ref={dueDate} onBlur={checkInput} type="date" />
          </p>
        </div>
        <div className="right">
          <div>
            <p>Billed to</p>
            <p>Chris Dare</p>
            <p>NEXT FIFTEEN COMMUNICATION GROUP PLC</p>
            <p>Bermondsey Street, London, United Kingdom</p>
          </div>
        </div>
      </div>
      <div className="invoice">
        <h6>Item Details</h6>
        <p>{itemError != "" && itemError}</p>
        <table>
          <tr>
            <td>Item name</td>
            <td>Unit</td>
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
                    <td>{data.itemRate}</td>
                    <td>{data.itemVat}</td>
                    <td>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {data.itemTotal}
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
              <input ref={refFourth} placeholder="Enter vat" type="number" />
            </td>
            <td>
              <FontAwesomeIcon icon={faIndianRupeeSign} />
              {total != 0 ? total : "0.00"}
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
        <input ref={description} placeholder="Description" type="text" />
        <div className="paymentMethod">
          <div className="left">
            <div>
              <div>
                <h6>Payment Method</h6>
                <p>Wire Transfer</p>
              </div>
              <div>
                <h6>Selected</h6>
                <img src={bankLogo} alt="" />
              </div>
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
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {subTotal != 0 ? subTotal : "0.00"}
                </span>
              </p>
              <p>
                Discount:{" "}
                <span>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {subTotal != 0 ? Math.round((subTotal / 100) * 5) : "0.00"}
                </span>
              </p>
              <p>
                Total Vat:{" "}
                <span>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {vat != 0 ? vat : "0.00"}
                </span>
              </p>
              <p>
                Total Amount:{" "}
                <span>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {subTotal != 0 ? totalAmount : "0.00"}
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

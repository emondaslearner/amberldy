import React, { useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie";
import logIn from "../image/login-image.jpg";

const Login = () => {
  const location  = useNavigate()
  const cookies = new Cookies();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [inputValue, setInputValue] = useState({
    email: "",
    otp: "",
  });
  const [existsOTP, setExistsOTP] = useState(false);
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const createOTP = (e) => {
    fetch(`https://invoice-generator007.herokuapp.com/createOtp/${inputValue.email}`, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        // cookies('randomKey')
        setExistsOTP(data.success);
        setSuccess(data.success);
        setMessage(data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
    e.preventDefault();
  };
  const verifyOTP = (e) => {
    fetch(
      `https://invoice-generator007.herokuapp.com/validateOTP/${inputValue.otp}/${inputValue.email}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setExistsOTP(data.success);
        setSuccess(data.success);
        setMessage(data.message);
        sessionStorage.setItem('login','success')
        location('/')
      });
    e.preventDefault();
  };
  return (
    <div className="login">
      <h1>
        Verify your <span className="login-text">Email</span>
      </h1>
      <div>
        <img className="login-image" src={logIn} alt="login" />
      </div>
      {!existsOTP && (
        <form onSubmit={(e) => createOTP(e)}>
          <input
            type="email"
            className="input-box"
            id="email"
            placeholder="Enter Your email"
            name="email"
            value={inputValue.email}
            onChange={handlerInputChange}
          />
          <input type="submit" className="submit-btn" />
        </form>
      )}
      {success && inputValue.email && (
        <form onSubmit={(e) => verifyOTP(e)}>
          <input
            type="text"
            className="input-box"
            id="otp"
            name="otp"
            placeholder="Enter your OTP"
            value={inputValue.otp}
            onChange={handlerInputChange}
          />
          <input type="submit" className="submit-btn" />
        </form>
      )}
      {
        message && <h1>{message}</h1>
      }
    </div>
  );
};

export default Login;

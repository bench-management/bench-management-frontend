import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verification = ({ setIsAuthenticated }) => { // Accept setIsAuthenticated as a prop
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP input
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/request-login`, { email });
      setMessage(response.data);
      setStep(2); // Move to OTP step
    } catch (error) {
      setMessage("Error sending verification code.");
    }
    setLoading(false);
  };


const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/verify-login`, {
        email,
        verificationCode,
      });
      setMessage(response.data);
  
      if (response.data.includes("Login successful")) {
        setIsAuthenticated(true); // Update state
        localStorage.setItem("isAuthenticated", "true"); // Persist state
        navigate("/"); // Redirect
      } else {
        setMessage("Invalid OTP or login failed.");
      }
    } catch (error) {
      setMessage("Error verifying code.");
    }
    setLoading(false);
  };
  

  return (
    <div className="container mt-4">
      <h2>Verification</h2>
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {/* Step 1: Email Input */}
      {step === 1 && !loading && (
        <form onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="text"
              className="form-control"
              id="emailInput"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Verification Code
          </button>
        </form>
      )}

      {/* Step 2: OTP Input */}
      {step === 2 && !loading && (
        <form onSubmit={handleOTPSubmit}>
          <div className="form-group">
            <label htmlFor="otpInput">Verification Code</label>
            <input
              type="text"
              className="form-control"
              id="otpInput"
              placeholder="Enter OTP"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Verify
          </button>
        </form>
      )}

      {/* Feedback Message */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Verification;

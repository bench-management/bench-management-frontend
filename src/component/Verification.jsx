import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/verification.css"; // Ensure the CSS is imported properly
import apiClient, { saveToken } from "../lib/apiClient";
import { isAuthenticated } from "../lib/auth";

const Verification = () => { // Accept setIsAuthenticated as a prop
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
      const response = await apiClient.post("/request-login", { email });
      setMessage(response.data);
      setStep(2); // Move to OTP step
    } catch {
      setMessage("Error sending verification code.");
    }
    setLoading(false);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: Verify login and get token
      const response = await apiClient.post("/verify-login", {
        email,
        verificationCode,
      });
      const token = response.data;

      // Step 2: Save the token
      saveToken(token);

      // Step 3: Redirect to a protected page
      navigate("/")
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid login credentials.");
    } finally {
      setLoading(false)
    }
  };

  if (isAuthenticated()) {
    navigate("/")
  }

  return (
    <div className="cntr">
      <h2 style={{ paddingRight: 20 }}>Verification</h2>
      {loading && (
        <div className="spinner-border text-primary" role="status"></div>
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
              We&apos;ll never share your email with anyone else.
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
          <button type="submit" className="btn btn-primary" style={{ paddingTop: 10 }}>
            Verify
          </button>
        </form>
      )}

      {/* Feedback Message */}
      {message && <div className="alert alert-info  mt-3" >{message}</div>}
    </div>
  );
};

export default Verification;

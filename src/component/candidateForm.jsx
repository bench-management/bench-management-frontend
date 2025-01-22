
import { useState } from "react";
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import apiClient from "../lib/apiClient";

function CandidateForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    // if (!formData.empId) newErrors.empId = 'Employee ID is required.';
    // if (!formData.name) newErrors.name = 'Candidate Name is required.';
    // if (!formData.skill) newErrors.skill = 'Skills are required.';
    // if (!formData.baseLocation) newErrors.baseLocation = 'Base Location is required.';
    // if (!formData.status) newErrors.status = 'Status is required.';
    // if (formData.pastExperience && formData.pastExperience < 0) {
    //   newErrors.pastExperience = "Past Experience cannot be negative.";
    // }
    // if (!formData.accoliteDoj) newErrors.accoliteDoj = 'Accolite DOJ is required.';
    // if (!formData.benchStartDate) newErrors.benchStartDate = 'Bench Start Date is required.';
    // if (!formData.onBench) newErrors.onBench = 'On Bench status is required.';
    // return newErrors;
    return 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.alert("Please fix the errors in the form before submitting.");
      return;
    }

    const formattedData = {
      ...formData,
      onBench: formData.onBench === "yes",
      mentorship: formData.mentorship === "yes",
      pastExperience: parseInt(formData.pastExperience, 10) || 0,
      accoliteDoj: formData.accoliteDoj,
      benchStartDate: formData.benchStartDate,
    };
      console.log(formattedData);
    try {
      const response =  await apiClient.post(
        "/candidates",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      console.log("Candidate submitted successfully:", response.data);
      setFormData({});
    } catch (err) {
      console.error("Error submitting candidate data:", err);
      window.alert("Failed to submit candidate data. Please try again.");
    }
  };

  const formFields = [
    { label: 'Employee ID', name: 'empId', type: 'text', placeholder: 'Enter employee ID', isRequired: true },
    { label: 'Candidate Name', name: 'name', type: 'text', placeholder: 'Enter candidate name', isRequired: true },
    { label: 'Skills', name: 'skill', type: 'select', placeholder: 'Enter skills', options: ['JAVA' , 'REACT' , 'ANGULAR','SPRING BOOT','MONGO DB','MYSQL','OTHERS'], isRequired: true },
    { label: 'Skill Base Location', name: 'skillBaseLocation', type: 'select', placeholder: 'Select Skill Base Location', options: ['BANGALORE', 'HYDERABAD', 'MUMBAI', 'CHENNAI', 'GUDGAON'], isRequired: true },
    { label: 'Current Location', name: 'currentLocation', type: 'select', placeholder: 'Select Current Location', options: ['BANGALORE', 'HYDERABAD', 'MUMBAI', 'CHENNAI', 'GUDGAON'] },
    { label: 'Status', name: 'status', type: 'select', placeholder: 'Enter status',options: ['RESIGNED', 'SABBATICAL', 'UNDER_EVALUATION', 'ONBOARDING_IN_PROGRESS', 'ONBOARDED, INTERVIEW_IN_PROGRESS', 'ON_HOLD'], isRequired: true },
    { label: 'Past Experience (in years)', name: 'pastExperience', type: 'number', placeholder: 'Enter past experience', isRequired: true },
    { label: 'Client ID', name: 'clientId', type: 'text', placeholder: 'Enter Client ID' },
    { label: 'Project Type', name: 'projectType', type: 'text', placeholder: 'Enter project type' },
    { label: 'On Bench', name: 'onBench', type: 'select', options: ['yes', 'no'], isRequired: true },
    { label: 'Accolite DOJ', name: 'accoliteDoj', type: 'date', isRequired: true },
    { label: 'Bench Start Date', name: 'benchStartDate', type: 'date', isRequired: true },
    { label: 'Mentorship', name: 'mentorship', type: 'select', options: ['yes', 'no'] },
    { label: 'Last Working Day in Accolite', name: 'lwdInAccolite', type: 'date' },
    { label: 'Onboarding Date', name: 'onboardingDate', type: 'date' },
    { label: 'Project Allocation Status', name: 'projectAllocationStatus', type: 'text', placeholder: 'Enter Project Allocation Status' },
    { label: 'Remarks', name: 'remarks', type: 'text', placeholder: 'Enter Remarks' },
    { label: 'Tentative Onboarding Date', name: 'tentativeOnboardingDate', type: 'date' },
    { label: 'TH Link', name: 'thLink', type: 'url', placeholder: 'Enter TH Link' },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "80%", maxWidth: "800px" }} className="p-4">
        <Card.Body>
          <h3 className="text-center mb-4">Candidate Details Form</h3>

          {success && (
            <div className="alert alert-success">
              Candidate submitted successfully!
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
              index % 2 === 0 && (
                <Row key={index} className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId={`formGroup${formFields[index].name}`}>
                      <Form.Label>
                        {formFields[index].label}{formFields[index].isRequired && <span style={{ color: "red" }}>*</span>}
                      </Form.Label>
                      {formFields[index].type === "select" ? (
                        <Form.Control
                          as="select"
                          name={formFields[index].name}
                          value={formData[formFields[index].name] || ""}
                          onChange={handleChange}
                          isInvalid={!!errors[formFields[index].name]}
                        >
                          <option value="">Select</option>
                          {formFields[index].options.map((option, i) => (
                            <option value={option} key={i}>{option}</option>
                          ))}
                        </Form.Control>
                      ) : (
                        <Form.Control
                          type={formFields[index].type}
                          name={formFields[index].name}
                          value={formData[formFields[index].name] || ""}
                          placeholder={formFields[index].placeholder || ""}
                          onChange={handleChange}
                          isInvalid={!!errors[formFields[index].name]}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        {errors[formFields[index].name]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {formFields[index + 1] && (
                    <Col md={6}>
                      <Form.Group controlId={`formGroup${formFields[index + 1].name}`}>
                        <Form.Label>
                          {formFields[index + 1].label}{formFields[index + 1].isRequired && <span style={{ color: "red" }}>*</span>}
                        </Form.Label>
                        {formFields[index + 1].type === "select" ? (
                          <Form.Control
                            as="select"
                            name={formFields[index + 1].name}
                            value={formData[formFields[index + 1].name] || ""}
                            onChange={handleChange}
                            isInvalid={!!errors[formFields[index + 1].name]}
                          >
                            <option value="">Select</option>
                            {formFields[index + 1].options.map((option, i) => (
                              <option value={option} key={i}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : (
                          <Form.Control
                            type={formFields[index + 1].type}
                            name={formFields[index + 1].name}
                            value={formData[formFields[index + 1].name] || ""}
                            placeholder={formFields[index + 1].placeholder || ""}
                            onChange={handleChange}
                            isInvalid={!!errors[formFields[index + 1].name]}
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors[formFields[index + 1].name]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}
                </Row>
              )
            ))}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CandidateForm;



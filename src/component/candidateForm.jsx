import { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function CandidateForm() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Format the data to match the backend model
    const formattedData = {
      ...formData,
      onBench: formData.onBench === "yes",
      mentorship: formData.mentorship === "yes",
      pastExperience: parseInt(formData.pastExperience, 10) || 0,
      mentorshipRating: parseInt(formData.mentorshipRating, 10) || 0,
    };

    try {
      const response = await axios.post("http://localhost:8080/candidates", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess(true);
      console.log("Candidate submitted successfully:", response.data);

      // Clear the form for new input
      setFormData({});
    } catch (err) {
      console.error("Error submitting candidate data:", err);
      setError("Failed to submit candidate data. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '80%', maxWidth: '800px' }} className="p-4">
        <Card.Body>
          <h3 className="text-center mb-4">Candidate Details Form</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && (
            <div className="alert alert-success">
              Candidate submitted successfully!
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmpId">
              <Form.Label>Employee ID:</Form.Label>
              <Form.Control
                type="text"
                name="empId"
                value={formData.empId || ''}
                placeholder="Enter employee ID"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Candidate Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name || ''}
                placeholder="Enter candidate name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupSkills">
              <Form.Label>Skills:</Form.Label>
              <Form.Control
                type="text"
                name="skill"
                value={formData.skill || ''}
                placeholder="Enter skills"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPastExperience">
              <Form.Label>Past Experience (in years):</Form.Label>
              <Form.Control
                type="number"
                name="pastExperience"
                value={formData.pastExperience || ''}
                placeholder="Enter past experience"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupBaseLocation">
              <Form.Label>Base Location:</Form.Label>
              <Form.Control
                type="text"
                name="baseLocation"
                value={formData.baseLocation || ''}
                placeholder="Enter base location"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupStatus">
              <Form.Label>Status:</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status || ''}
                placeholder="Enter status"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupClientId">
              <Form.Label>Client ID:</Form.Label>
              <Form.Control
                type="text"
                name="clientId"
                value={formData.clientId || ''}
                placeholder="Enter client ID"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupTentativeOnboardingDate"
            >
              <Form.Label>Tentative Onboarding Date:</Form.Label>
              <Form.Control
                type="date"
                name="tentativeOnboardingDate"
                value={formData.tentativeOnboardingDate || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupRemarks">
              <Form.Label>Remarks:</Form.Label>
              <Form.Control
                as="textarea"
                name="remarks"
                rows={3}
                value={formData.remarks || ''}
                placeholder="Enter remarks"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAccoliteDOJ">
              <Form.Label>Accolite DOJ:</Form.Label>
              <Form.Control
                type="date"
                name="accoliteDoj"
                value={formData.accoliteDoj || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupOnBench">
              <Form.Label>On Bench:</Form.Label>
              <Form.Control
                as="select"
                name="onBench"
                value={formData.onBench || ''}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupBenchStartDate">
              <Form.Label>Bench Start Date:</Form.Label>
              <Form.Control
                type="date"
                name="benchStartDate"
                value={formData.benchStartDate || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLWDInAccolite">
              <Form.Label>LWD in Accolite:</Form.Label>
              <Form.Control
                type="date"
                name="lwdInAccolite"
                value={formData.lwdInAccolite || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupMentorshipRating">
              <Form.Label>Mentorship Rating:</Form.Label>
              <Form.Control
                as="select"
                name="mentorshipRating"
                value={formData.mentorshipRating || ''}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupMentorId">
              <Form.Label>Mentor ID:</Form.Label>
              <Form.Control
                type="text"
                name="mentorId"
                value={formData.mentorId || ''}
                placeholder="Enter mentor ID"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupProjectType">
              <Form.Label>Project Type:</Form.Label>
              <Form.Control
                as="select"
                name="projectType"
                value={formData.projectType || ''}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="bfsi">BFSI</option>
                <option value="healthcare">Healthcare</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupProjectAllocationStatus">
              <Form.Label>Project Allocation Status:</Form.Label>
              <Form.Control
                as="select"
                name="projectAllocationStatus"
                value={formData.projectAllocationStatus || ''}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupCurrentLocation">
              <Form.Label>Current Location:</Form.Label>
              <Form.Control
                type="text"
                name="currentLocation"
                value={formData.currentLocation || ''}
                placeholder="Enter current location"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupMentorship">
              <Form.Label>Mentorship:</Form.Label>
              <Form.Control
                as="select"
                name="mentorship"
                value={formData.mentorship || ''}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupTHLink">
              <Form.Label>TH Link:</Form.Label>
              <Form.Control
                type="url"
                name="thLink"
                value={formData.thLink || ''}
                placeholder="Enter Tech Hiring link"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupSelectedDate">
              <Form.Label>Selected Date:</Form.Label>
              <Form.Control
                type="date"
                name="selectedDate"
                value={formData.selectedDate || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupOnboardingDate">
              <Form.Label>Onboarding Date:</Form.Label>
              <Form.Control
                type="date"
                name="onboardingDate"
                value={formData.onboardingDate || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupInterviewIds">
              <Form.Label>Interview IDs:</Form.Label>
              <Form.Control
                type="text"
                name="interviewIds"
                value={formData.interviewIds || ''}
                placeholder="Enter interview IDs"
                onChange={handleChange}
              />
            </Form.Group>

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

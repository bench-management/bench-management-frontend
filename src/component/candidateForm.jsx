import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';

function CandidateForm() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '80%', maxWidth: '800px' }} className="p-4">
        <Card.Body>
          <h3 className="text-center mb-4">Candidate Details Form</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Candidate Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter candidate name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupSkills">
              <Form.Label>Skills:</Form.Label>
              <Form.Control type="text" placeholder="Enter skills" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPastExperience">
              <Form.Label>Past Experience (in years):</Form.Label>
              <Form.Control type="number" placeholder="Enter past experience" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupBaseLocation">
              <Form.Label>Base Location:</Form.Label>
              <Form.Control type="text" placeholder="Enter base location" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupStatus">
              <Form.Label>Status:</Form.Label>
              <Form.Control type="text" placeholder="Enter status" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupClientId">
              <Form.Label>Client ID:</Form.Label>
              <Form.Control type="text" placeholder="Enter client ID" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupTentativeOnboardingDate">
              <Form.Label>Tentative Onboarding Date:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupRemarks">
              <Form.Label>Remarks:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter remarks" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAccoliteDOJ">
              <Form.Label>Accolite DOJ:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupOnBench">
              <Form.Label>On Bench:</Form.Label>
              <Form.Control as="select">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupBenchStartDate">
              <Form.Label>Bench Start Date:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLWDInAccolite">
              <Form.Label>LWD in Accolite:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupMentorshipRating">
              <Form.Label>Mentorship Rating:</Form.Label>
              <Form.Control as="select">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupMentorId">
              <Form.Label>Mentor ID:</Form.Label>
              <Form.Control type="text" placeholder="Enter mentor ID" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupProjectType">
              <Form.Label>Project Type:</Form.Label>
              <Form.Control as="select">
                <option value="bfsi">BFSI</option>
                <option value="healthcare">Healthcare</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupProjectAllocationStatus">
              <Form.Label>Project Allocation Status:</Form.Label>
              <Form.Control as="select">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupCurrentLocation">
              <Form.Label>Current Location:</Form.Label>
              <Form.Control type="text" placeholder="Enter current location" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupMentorship">
              <Form.Label>Mentorship:</Form.Label>
              <Form.Control as="select">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupTHLink">
              <Form.Label>TH Link:</Form.Label>
              <Form.Control type="url" placeholder="Enter Tech Hiring link" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupSelectionDate">
              <Form.Label>Selection Date:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupOnboardingDate">
              <Form.Label>Onboarding Date:</Form.Label>
              <Form.Control type="date" />
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

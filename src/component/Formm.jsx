import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';

function Formm() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '80%', maxWidth: '800px' }} className="p-4">
        <Card.Body>
          <h3 className="text-center mb-4">Candidate Details Form</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Candidate Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupSkills">
              <Form.Label>Skills: </Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupExperience">
              <Form.Label>Experience (in years):</Form.Label>
              <Form.Control type="number" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupBaseLocation">
              <Form.Label>Base Location:</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupStatus">
              <Form.Label>Status:</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupClient">
              <Form.Label>Client:</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTentativeonboarding">
              <Form.Label>Tentative Onboarding Date:</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupRemarks">
              <Form.Label>Remarks:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter remarks about candidate here" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAccoliteDOJ">
              <Form.Label>Accolite DOJ:</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGrouponbench">
              <Form.Label>On Bench:</Form.Label>
              <Form.Control as="select">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAgeing1">
              <Form.Label>Ageing:</Form.Label>
              <Form.Control type="number" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLWD">
              <Form.Label>LWD in Accolite:</Form.Label>
              <Form.Control type="text" placeholder="" />
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

            <Form.Group className="mb-3" controlId="formMentorshipName">
              <Form.Label>Mentorship Name:</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProjectType">
              <Form.Label>Project Type:</Form.Label>
              <Form.Control as="select">
                <option value="bfsi">BFSI</option>
                <option value="healthcare">Healthcare</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAllocationStatus">
              <Form.Label>Project Allocation Status:</Form.Label>
              <Form.Control as="select">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCurrentLocation">
              <Form.Label>Current Location:</Form.Label>
              <Form.Control type="text" placeholder="Your current location" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMentee">
              <Form.Label>Mentorship:</Form.Label>
              <Form.Control type="text" placeholder="Mentorship" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTHLink">
              <Form.Label>TH Link:</Form.Label>
              <Form.Control type="url" placeholder="Enter a valid link" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupSelectionDate">
              <Form.Label>Selection Date:</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupOnboardingDate">
              <Form.Label>Onboarding Date:</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAgeing2">
              <Form.Label>Ageing:</Form.Label>
              <Form.Control type="number" placeholder="" />
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

export default Formm;

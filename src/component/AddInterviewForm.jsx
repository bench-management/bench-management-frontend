import { useState, useEffect, useRef } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function AddInterviewForm() {
  const [formData, setFormData] = useState({
    comments: [],
  });
  const [errors, setErrors] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [newComment, setNewComment] = useState('');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSearchChange = (event) => {
    clearTimeout(debounceTimer);
    const value = event.target.value;
    setSearchTerm(value);

    setDebounceTimer(
      setTimeout(() => {
        if (value) {
          fetchCandidates(value);
          setShowDropdown(true);
        } else {
          setShowDropdown(false);
        }
      }, 300)
    );
  };

  const fetchCandidates = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/candidates/search?searchTerm=${searchTerm}`
      );
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const selectCandidate = (candidate) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      candidateIdString: candidate.id,
    }));
    setSearchTerm(`${candidate.empId} - ${candidate.name}`);
    setShowDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.candidateIdString)
      newErrors.candidateIdString = 'Candidate is required.';
    if (!formData.clientId) newErrors.clientId = 'Client ID is required.';
    if (!formData.interviewerName)
      newErrors.interviewerName = 'Interviewer name is required.';
    if (!formData.interviewStatus)
      newErrors.interviewStatus = 'Interview status is required.';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.alert('Please fix the errors in the form.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/interviews',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setSuccess(true);
      setFormData({ comments: [] });
      setSearchTerm('');
      console.log('Interview submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting interview:', error);
      window.alert('Failed to submit interview. Please try again.');
    }
  };

  const addComment = () => {
    if (newComment.trim() === '') return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      comments: [...prevFormData.comments, newComment],
    }));
    setNewComment('');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '80%', maxWidth: '800px' }} className="p-4">
        <Card.Body>
          <h3 className="text-center mb-4">Add Interview</h3>

          {success && (
            <div className="alert alert-success">
              Interview submitted successfully!
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" ref={dropdownRef}>
              <Form.Label>Search Candidate (empId or name):</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                placeholder="Search by empId or name"
                onChange={handleSearchChange}
              />
              {showDropdown && candidates.length > 0 && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                  }}
                >
                  {candidates.map((candidate) => (
                    <button
                      key={candidate.id}
                      className="dropdown-item"
                      type="button"
                      onClick={() => selectCandidate(candidate)}
                    >
                      {candidate.empId} - {candidate.name}
                    </button>
                  ))}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Client ID:</Form.Label>
              <Form.Control
                type="text"
                name="clientId"
                value={formData.clientId || ''}
                placeholder="Enter Client ID"
                onChange={handleChange}
                isInvalid={!!errors.clientId}
              />
              <Form.Control.Feedback type="invalid">
                {errors.clientId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Interview Status:</Form.Label>
              <Form.Select
                name="interviewStatus"
                value={formData.interviewStatus || ''}
                onChange={handleChange}
                isInvalid={!!errors.interviewStatus}
              >
                <option value="">Select Status</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ONGOING">Ongoing</option>
                <option value="REJECTED">Rejected</option>
                <option value="SELECTED">Selected</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.interviewStatus}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Interviewer Name:</Form.Label>
              <Form.Control
                type="text"
                name="interviewerName"
                value={formData.interviewerName || ''}
                placeholder="Enter Interviewer Name"
                onChange={handleChange}
                isInvalid={!!errors.interviewerName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.interviewerName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Project:</Form.Label>
              <Form.Control
                type="text"
                name="project"
                value={formData.project || ''}
                placeholder="Enter Project Name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Client Requirement:</Form.Label>
              <Form.Control
                type="text"
                name="clientRequirement"
                value={formData.clientRequirement || ''}
                placeholder="Enter Client Requirement"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Accolite Hiring Manager:</Form.Label>
              <Form.Control
                type="text"
                name="accoliteHiringManager"
                value={formData.accoliteHiringManager || ''}
                placeholder="Enter Accolite Hiring Manager"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Client Hiring Manager:</Form.Label>
              <Form.Control
                type="text"
                name="clientHiringManager"
                value={formData.clientHiringManager || ''}
                placeholder="Enter Client Hiring Manager"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department:</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department || ''}
                placeholder="Enter Department"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comments:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={newComment}
                  placeholder="Add a comment"
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="success" className="ms-2" onClick={addComment}>
                  Add
                </Button>
              </div>
              {formData.comments.length > 0 && (
                <ul className="mt-2">
                  {formData.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              )}
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

export default AddInterviewForm;

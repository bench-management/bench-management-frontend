import { useState, useEffect, useRef } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function AddInterviewForm() {
  const [formData, setFormData] = useState({
    comments: [],
  });
  const [errors, setErrors] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [clients, setClients] = useState([]);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [newComment, setNewComment] = useState('');

  const candidateDropdownRef = useRef(null);
  const clientDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (candidateDropdownRef.current && !candidateDropdownRef.current.contains(event.target)) &&
        (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target))
      ) {
        setShowDropdown(false);
        setShowClientDropdown(false);
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
        fetchCandidates(value);
        setShowDropdown(true);
      }, 300)
    );
  };

  const handleClientSearchChange = (event) => {
    clearTimeout(debounceTimer);
    const value = event.target.value;
    setClientSearchTerm(value);

    setDebounceTimer(
      setTimeout(() => {
        fetchClients(value);
        setShowClientDropdown(true);
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

  const fetchClients = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/clients/search?searchTerm=${searchTerm}`
      );
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const selectCandidate = (candidate) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      candidateId: candidate.id,
    }));
    setSearchTerm(`${candidate.empId} - ${candidate.name}`);
    setShowDropdown(false);
  };

  const selectClient = (client) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientId: client.id,
    }));
    setClientSearchTerm(`${client.clientId} - ${client.clientName}`);
    setShowClientDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.candidateId)
      newErrors.candidateId = 'Candidate is required.';
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
    console.log('newErrors :>> ', newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.alert('Please fix the errors in the form.', newErrors);
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
      setClientSearchTerm('');
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
            {/* Candidate Search */}
            <Form.Group className="mb-3" ref={candidateDropdownRef}>
              <Form.Label>Search Candidate (empId or name):</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                placeholder="Search by empId or name"
                onChange={handleSearchChange}
                onFocus={handleSearchChange}
                style={{ position: 'relative' }}
              />
              {showDropdown && candidates.length > 0 && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: 'absolute',
                    width: '80%',
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

            {/* Client Search */}
            <Form.Group className="mb-3" ref={clientDropdownRef}>
              <Form.Label>Search Client (Client ID or name):</Form.Label>
              <Form.Control
                type="text"
                value={clientSearchTerm}
                placeholder="Search by Client ID or name"
                onChange={handleClientSearchChange}
                onFocus={handleClientSearchChange}
              />
              {showClientDropdown && clients.length > 0 && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: 'absolute',
                    width: '80%',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                  }}
                >
                  {clients.map((client) => (
                    <button
                      key={client.id}
                      className="dropdown-item"
                      type="button"
                      onClick={() => selectClient(client)}
                    >
                      {client.clientId} - {client.clientName}
                    </button>
                  ))}
                </div>
              )}
            </Form.Group>

            {/* Interview Status */}
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

            {/* Interviewer Name */}
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

            {/* Interview Date */}
            <Form.Group className="mb-3">
              <Form.Label>Interview Date:</Form.Label>
              <Form.Control
                type="date"
                name="interviewDate"
                value={formData.interviewDate || ''}
                onChange={handleChange}
                isInvalid={!!errors.interviewDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.interviewDate}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Project */}
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

            {/* Client Requirement */}
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

            {/* Accolite Hiring Manager */}
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

            {/* Client Hiring Manager */}
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

            {/* Department */}
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

            {/* Comments */}
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

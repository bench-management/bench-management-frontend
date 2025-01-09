import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function EditCandidateForm() {
  const { id: candidateId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/candidates/${candidateId}`
        );
        const data = await response.json();
        setFormData(data); // Load candidate data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        setLoading(false);
      }
    };

    if (candidateId) {
      fetchCandidate();
    }
  }, [candidateId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData((prevFormData) => {
      const updatedArray = [...prevFormData[field]];
      updatedArray[index] = value;
      return { ...prevFormData, [field]: updatedArray };
    });
  };

  const handleAddArrayItem = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [...(prevFormData[field] || []), ''],
    }));
  };

  const handleRemoveArrayItem = (index, field) => {
    setFormData((prevFormData) => {
      const updatedArray = [...prevFormData[field]];
      updatedArray.splice(index, 1);
      return { ...prevFormData, [field]: updatedArray };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Format the data to match the backend model
    const formattedData = formData;
    try {
      const response = await axios.put(
        `http://localhost:8080/api/candidates/${formattedData.id}`,
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // setSuccess(true);
      console.log('Candidate updated successfully:', response.data);

      // Clear the form for new input
      setFormData({});

      navigate('/');
    } catch (err) {
      console.error('Error updating candidate data:', err);
      // setError("Failed to submit candidate data. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <Card className="shadow" style={{ width: '40rem', padding: '2rem' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Edit Candidate</h3>
          <Form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => {
              if (key == 'id' || key == 'interviews') return null;
              const value = formData[key];
              if (Array.isArray(value)) {
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{key}:</Form.Label>
                    {value.map((item, index) => (
                      <Row key={index} className="align-items-center mb-2">
                        <Col>
                          <Form.Control
                            type="text"
                            value={item}
                            placeholder={`Enter ${key} ${index + 1}`}
                            onChange={(e) =>
                              handleArrayChange(index, e.target.value, key)
                            }
                          />
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveArrayItem(index, key)}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Button
                      variant="secondary"
                      onClick={() => handleAddArrayItem(key)}
                    >
                      Add {key}
                    </Button>
                  </Form.Group>
                );
              } else if (typeof value === 'boolean') {
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{key}:</Form.Label>
                    <Form.Check
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleChange}
                    />
                  </Form.Group>
                );
              } else if (key.toLowerCase().includes('date')) {
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{key}:</Form.Label>
                    <Form.Control
                      type="date"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  </Form.Group>
                );
              } else {
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{key}:</Form.Label>
                    <Form.Control
                      type="text"
                      name={key}
                      value={value || ''}
                      placeholder={`Enter ${key}`}
                      onChange={handleChange}
                    />
                  </Form.Group>
                );
              }
            })}
            <Button type="submit" variant="primary" className="w-100">
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditCandidateForm;

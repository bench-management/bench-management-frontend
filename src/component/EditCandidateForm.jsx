import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Card, Button, Container } from 'react-bootstrap';

function EditCandidateForm({ onSave }) {
  const { id: candidateId } = useParams(); // Candidate ID from URL
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(
          `https://676a5c79863eaa5ac0de18c9.mockapi.io/search/candidate/searchCandidate/${candidateId}`
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
      [field]: [...(prevFormData[field] || []), ""],
    }));
  };

  const handleRemoveArrayItem = (index, field) => {
    setFormData((prevFormData) => {
      const updatedArray = [...prevFormData[field]];
      updatedArray.splice(index, 1);
      return { ...prevFormData, [field]: updatedArray };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData); // Save form data
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: '#f8f9fa' }} // Grey background
    >
      <Card className="shadow" style={{ width: '30rem' }}>
        <Card.Body>
          <h3 className="text-center">Edit Candidate</h3>
          <Form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => {
              const value = formData[key];
              if (Array.isArray(value)) {
                // Render array fields
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{key}:</Form.Label>
                    {value.map((item, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <Form.Control
                          type="text"
                          value={item}
                          placeholder={`Enter ${key} ${index + 1}`}
                          onChange={(e) =>
                            handleArrayChange(index, e.target.value, key)
                          }
                          className="me-2"
                        />
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveArrayItem(index, key)}
                        >
                          Remove
                        </Button>
                      </div>
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
                // Render boolean fields
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
                // Render date fields
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
                // Render text fields
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

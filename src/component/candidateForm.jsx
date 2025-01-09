// import { useState } from 'react';
// import { Form, Card, Button } from 'react-bootstrap';
// import axios from 'axios';

// function CandidateForm() {
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.empId) newErrors.empId = 'Employee ID is required.';
//     if (!formData.name) newErrors.name = 'Candidate Name is required.';
//     if (!formData.skill) newErrors.skill = 'Skills are required.';
//     if (!formData.baseLocation)
//       newErrors.baseLocation = 'Base Location is required.';
//     if (!formData.status) newErrors.status = 'Status is required.';
//     if (formData.pastExperience && formData.pastExperience < 0) {
//       newErrors.pastExperience = 'Past Experience cannot be negative.';
//     }
//     if (!formData.projectType)
//       newErrors.projectType = 'Project Type is required.';
//     if (!formData.onBench) newErrors.onBench = 'On Bench status is required.';

//     return newErrors;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate the form
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       window.alert('Please fix the errors in the form before submitting.');
//       return;
//     }

//     const formattedData = {
//       ...formData,
//       onBench: formData.onBench === 'yes',
//       mentorship: formData.mentorship === 'yes',
//       pastExperience: parseInt(formData.pastExperience, 10) || 0,
//       mentorshipRating: parseInt(formData.mentorshipRating, 10) || 0,
//     };

//     try {
//       const response = await axios.post(
//         'http://localhost:8080/api/candidates',
//         formattedData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setSuccess(true);
//       console.log('Candidate submitted successfully:', response.data);
//       setFormData({});
//     } catch (err) {
//       console.error('Error submitting candidate data:', err);
//       window.alert('Failed to submit candidate data. Please try again.');
//     }
//   };

//   return (
//     <div
      
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: '100vh' }}
//     >
//       <Card style={{ width: '80%', maxWidth: '800px' }} className="p-4">
//         <Card.Body>
//           <h3 className="text-center mb-4">Candidate Details Form</h3>

//           {success && (
//             <div className="alert alert-success">
//               Candidate submitted successfully!
//             </div>
//           )}

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="formGroupEmpId">
//               <Form.Label>Employee ID:</Form.Label>

//               <Form.Control
//                 type="text"
//                 name="empId"
//                 value={formData.empId || ''}
//                 placeholder="Enter employee ID"
//                 onChange={handleChange}
//                 isInvalid={!!errors.empId}
//               />

//               <Form.Control.Feedback type="invalid">
//                 {errors.empId}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formGroupName">
//               <Form.Label>Candidate Name:</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name || ''}
//                 placeholder="Enter candidate name"
//                 onChange={handleChange}
//                 isInvalid={!!errors.name}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.name}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formGroupSkills">
//               <Form.Label>Skills:</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="skill"
//                 value={formData.skill || ''}
//                 placeholder="Enter skills"
//                 onChange={handleChange}
//                 isInvalid={!!errors.skill}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.skill}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formGroupBaseLocation">
//               <Form.Label>Base Location:</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="baseLocation"
//                 value={formData.baseLocation || ''}
//                 placeholder="Enter base location"
//                 onChange={handleChange}
//                 isInvalid={!!errors.baseLocation}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.baseLocation}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formGroupStatus">
//               <Form.Label>Status:</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="status"
//                 value={formData.status || ''}
//                 placeholder="Enter status"
//                 onChange={handleChange}
//                 isInvalid={!!errors.status}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.status}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formGroupExperience">
//               <Form.Label>Past Experience (in years):</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="pastExperience"
//                 value={formData.pastExperience || ''}
//                 placeholder="Enter past experience"
//                 onChange={handleChange}
//                 isInvalid={!!errors.pastExperience}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.pastExperience}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formGroupProjectType">
//               <Form.Label>Project Type:</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="projectType"
//                 value={formData.projectType || ''}
//                 placeholder="Enter project type"
//                 onChange={handleChange}
//                 isInvalid={!!errors.projectType}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.projectType}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formGroupOnBench">
//               <Form.Label>On Bench:</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="onBench"
//                 value={formData.onBench || ''}
//                 onChange={handleChange}
//                 isInvalid={!!errors.onBench}
//               >
//                 <option value="">Select</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </Form.Control>
//               <Form.Control.Feedback type="invalid">
//                 {errors.onBench}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Button variant="primary" type="submit" className="w-100 mt-3">
//               Submit
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default CandidateForm;

import { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';

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
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.empId) newErrors.empId = 'Employee ID is required.';
    if (!formData.name) newErrors.name = 'Candidate Name is required.';
    if (!formData.skill) newErrors.skill = 'Skills are required.';
    if (!formData.baseLocation)
      newErrors.baseLocation = 'Base Location is required.';
    if (!formData.status) newErrors.status = 'Status is required.';
    if (formData.pastExperience && formData.pastExperience < 0) {
      newErrors.pastExperience = 'Past Experience cannot be negative.';
    }
    if (!formData.accoliteDoj) newErrors.accoliteDoj = 'Accolite DOJ is required.';
    if (!formData.benchStartDate)
      newErrors.benchStartDate = 'Bench Start Date is required.';
    if (!formData.onBench) newErrors.onBench = 'On Bench status is required.';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.alert('Please fix the errors in the form before submitting.');
      return;
    }

    const formattedData = {
      ...formData,
      onBench: formData.onBench === 'yes',
      mentorship: formData.mentorship === 'yes',
      pastExperience: parseInt(formData.pastExperience, 10) || 0,
      accoliteDoj: formData.accoliteDoj,
      benchStartDate: formData.benchStartDate,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/candidates`,
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(true);
      console.log('Candidate submitted successfully:', response.data);
      setFormData({});
    } catch (err) {
      console.error('Error submitting candidate data:', err);
      window.alert('Failed to submit candidate data. Please try again.');
    }
  };

  const formFields = [
    { label: 'Employee ID', name: 'empId', type: 'text', placeholder: 'Enter employee ID', isRequired: true },
    { label: 'Candidate Name', name: 'name', type: 'text', placeholder: 'Enter candidate name', isRequired: true },
    { label: 'Skills', name: 'skill', type: 'text', placeholder: 'Enter skills', isRequired: true },
    { label: 'Base Location', name: 'baseLocation', type: 'text', placeholder: 'Enter base location', isRequired: true },
    { label: 'Current Location', name: 'currentLocation', type: 'text', placeholder: 'Enter Current Location' },
    { label: 'Status', name: 'status', type: 'text', placeholder: 'Enter status', isRequired: true },
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '80%', maxWidth: '800px' }} className="p-4">
        <Card.Body>
          <h3 className="text-center mb-4">Candidate Details Form</h3>

          {success && (
            <div className="alert alert-success">
              Candidate submitted successfully!
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
              <Form.Group className="mb-3" controlId={`formGroup${field.name}`} key={index}>
                <Form.Label>{field.label}:</Form.Label>
                {field.type === 'select' ? (
                  <Form.Control
                    as="select"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    isInvalid={!!errors[field.name]}
                  >
                    <option value="">Select</option>
                    {field.options.map((option, i) => (
                      <option value={option} key={i}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    placeholder={field.placeholder || ''}
                    onChange={handleChange}
                    isInvalid={!!errors[field.name]}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors[field.name]}
                </Form.Control.Feedback>
              </Form.Group>
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
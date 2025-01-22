import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation

const InterviewsDisplayTable = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/interviews`)
      .then((response) => response.json())
      .then((data) => {

        const transformedData = data.map((item) => ({
          id: item.id,
          candidateId: item.candidateId,
          clientId: item.clientId,
          interviewStatus: item.interviewStatus,
          interviewerName: item.interviewerName,
          interviewDate: new Date(item.interviewDate).toLocaleString(), // Format the date
          department: item.department,
          accoliteHiringManager: item.accoliteHiringManager,
          clientHiringManager: item.clientHiringManager,
          clientRequirement: item.clientRequirement,
          comments: item.comments.join(', '), // Convert array to a string for display
          project: item.project,
        }));

        setInterviews(transformedData);

        const initialFilters = {};
        Object.keys(data[0] || {}).forEach((key) => {
          initialFilters[key] = { value: '' };
        });
        setFilters(initialFilters);

        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const onFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: { value } };
    setFilters(updatedFilters);
  };

  const renderFilterInput = (field) => (
    <InputText
      className="form-control form-control-sm"
      style={{ minWidth: '150px' }}
      value={filters[field]?.value || ''}
      onChange={(e) => onFilterChange(field, e.target.value)}
      placeholder={`Search by ${field}`}
    />
  );

  const customFilter = (value, filter) => {
    if (filter && value) {
      return value.toString().toLowerCase().includes(filter.toLowerCase());
    }
    return true;
  };

  const formatColumnName = (name) =>
    name
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/^([a-z])/g, (char) => char.toUpperCase());

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const renderEditButton = (rowData) => (
    <button
      className="btn btn-primary btn-sm"
      onClick={() => navigate(`/edit-interview/${rowData.id}`)}
    >
      Edit
    </button>
  );

  // const candidateTemplate = (rowData) => {
  //   //TODO:
  //   // const candidate = rowData.candidateId;
  //   // return candidate ? `${candidate.name} (${candidate.empId})` : 'N/A';
  //   return rowData.candidateId
  // };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading interviews, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-primary">Interviews List</h2>
        <div>
          <button className="btn btn-warning me-2" onClick={handleEditClick}>
            {editMode ? 'Cancel Edit' : 'Edit'}
          </button>
          <Link className="btn btn-success" to="/add-interview">
            Add Interview
          </Link>
        </div>
      </div>

      {/* DataTable */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <DataTable
            value={interviews}
            paginator
            rows={10}
            responsiveLayout="scroll"
            filters={filters}
            filterDisplay="row"
            className="table table-striped table-hover text-center"
          >
            {editMode && (
              <Column
                header="Actions"
                body={renderEditButton}
                style={{ textAlign: 'center', width: '150px', padding: '10px' }} // Adjusted width and added padding
              />
            )}
            {interviews.length > 0 &&
              Object.keys(interviews[0]).map((key) => {
                // if (key === 'candidateId') {
                //   return (
                //     <Column
                //       key={key}
                //       field={key}
                //       header={<div className="font-weight-bold">Candidate</div>}
                //       body={candidateTemplate}
                //       bodyStyle={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px' }}
                //       headerStyle={{ textAlign: 'center', padding: '10px', color: '#007bff' }}
                //     />
                //   );
                // }
                return (
                  <Column
                    key={key}
                    field={key}
                    header={<div className="font-weight-bold" style={{ color: '#007bff' }}>{formatColumnName(key)}</div>}
                    filter
                    filterMatchMode="custom"
                    filterFunction={customFilter}
                    filterElement={renderFilterInput(key)}
                    bodyStyle={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px', border: '1px solid', borderColor: '#D0DDD0' }} // Added padding here
                    headerStyle={{ textAlign: 'center', padding: '10px', border: '1px solid', borderColor: '#D0DDD0' }} // Added padding here
                  />
                );
              })}
          </DataTable>
        </div>
      </div>

      {/* Floating Add Button */}
      <Link
        to="/add-interview"
        className="btn btn-success rounded-circle position-fixed shadow"
        style={{
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <i className="pi pi-plus" style={{ fontSize: '24px' }}></i>
      </Link>
    </div>
  );
};

export default InterviewsDisplayTable;

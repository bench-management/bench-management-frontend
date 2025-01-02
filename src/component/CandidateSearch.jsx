import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    fetch('http://localhost:8080/candidates')
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((candidate) => ({
          id: candidate.id,
          empId: candidate.empId,
          name: candidate.name,
          skill: candidate.skill,
          pastExperience: candidate.pastExperience,
          baseLocation: candidate.baseLocation,
          status: candidate.status,
          client: candidate.clientId,
          projectType: candidate.projectType,
          onBench: candidate.onBench,
          benchStartingDate: candidate.benchStartDate,
          tentativeOnboarding_Date: candidate.tentativeOnboardingDate,
          remarks: candidate.remarks,
          thLink: candidate.thLink,
          interviewId: candidate.interviewIds,
        }));
        setCandidates(transformedData);

        // Initialize filters for each field
        const initialFilters = {};
        Object.keys(transformedData[0]).forEach((key) => {
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
      style={{ minWidth: '150px' }} // Set minimum width for the search bar
      value={filters[field]?.value || ''}
      onChange={(e) => onFilterChange(field, e.target.value)}
      placeholder={`Search by ${field}`}
    />
  );

  // Custom filter function for partial matching (contains)
  const customFilter = (value, filter) => {
    if (filter && value) {
      return value.toString().toLowerCase().includes(filter.toLowerCase());
    }
    return true;
  };

  // Function to format the column names into a more readable form
  const formatColumnName = (name) => {
    return name
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Insert space before uppercase letters
      .replace(/^([a-z])/g, (char) => char.toUpperCase()); // Capitalize first letter
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const renderEditButton = (rowData) => {
    return (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => navigate(`/edit-candidate/${rowData.id}`)}
      >
        Edit
      </button>
    );
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 bg-light">
      {/* Header with Add and Edit Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link className="btn btn-success" to="/add-candidate">
          Add-Candidate
        </Link>
        <button className="btn btn-warning" onClick={handleEditClick}>
          {editMode ? 'Cancel Edit' : 'Edit'}
        </button>
      </div>

      <h1 className="text-center mb-4">Candidate List</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <DataTable
            value={candidates}
            paginator
            rows={10}
            filters={filters}
            filterDisplay="row"
            className="table table-striped table-bordered table-hover text-center"
          >
            {/* Render Edit Button Column first if Edit Mode is Enabled */}
            {editMode && (
              <Column
                header="Actions"
                body={renderEditButton}
                style={{ textAlign: 'center', width: '100px' }}
              />
            )}
            {candidates.length > 0 &&
              Object.keys(candidates[0]).map((key) => {
                if (key === 'id') return;
                return (
                  <Column
                    key={key}
                    field={key}
                    header={
                      <div
                        className="font-weight-bold"
                        style={{
                          padding: '10px',
                          margin: '5px 0',
                        }}
                      >
                        {formatColumnName(key)}
                      </div>
                    }
                    filter
                    filterMatchMode="custom"
                    filterFunction={customFilter}
                    filterElement={renderFilterInput(key)}
                    filterField={key}
                    bodyStyle={{
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      padding: '10px',
                    }}
                    headerStyle={{
                      textAlign: 'center',
                      padding: '15px 10px',
                      marginBottom: '5px',
                    }}
                  />
                );
              })}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;

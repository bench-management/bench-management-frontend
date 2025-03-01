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
    fetch(`${import.meta.env.VITE_API_URL}/api/candidates`)
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((candidate) => {
          const currentDate = new Date();

          // Parse dates
          const benchStartDate = new Date(candidate.benchStartDate);
          const onboardingDate = candidate.onboardingDate ? new Date(candidate.onboardingDate) : null;
          const accoliteDoj = new Date(candidate.accoliteDoj);

          // Format dates to readable format
          const formatDate = (date) => (date ? date.toLocaleDateString("en-US") : null);

          // Calculate ageing
          const ageing = onboardingDate
            ? Math.floor((onboardingDate - benchStartDate) / (1000 * 60 * 60 * 24))
            : Math.floor((currentDate - benchStartDate) / (1000 * 60 * 60 * 24));

          // Calculate total experience
          const experienceInAccolite = Math.floor((currentDate - accoliteDoj) / (1000 * 60 * 60 * 24 * 365.25));
          const totalExperience = candidate.pastExperience + experienceInAccolite;

          return {
            id: candidate.id,
            empId: candidate.empId,
            name: candidate.name,
            skill: candidate.skill,
            status: candidate.status,
            onBench: candidate.onBench,
            ageing: ageing + " days", // Days difference
            benchStartingDate: formatDate(benchStartDate), // Formatted date
            tentativeOnboardingDate: formatDate(new Date(candidate.tentativeOnboardingDate)), // Formatted date
            totalExperience: totalExperience + " years", // Total years of experience
            // pastExperience: candidate.pastExperience,
            // TODO: interviewId: candidate.interviews?.map((interview) => interview.interviewId) || [],
            baseLocation: candidate.baseLocation,
            // client: candidate.clientId,
            projectType: candidate.projectType,
            projectAllocationStatus: candidate.projectAllocationStatus,
            selectionDate: formatDate(new Date(candidate.selectionDate)), // Formatted date
            remarks: candidate.remarks,
            thLink: candidate.thLink,
            currentLocation: candidate.currentLocation,
            mentorship: candidate.mentorship,
            accoliteDoj: formatDate(accoliteDoj), // Formatted date
            lwdInAccolite: formatDate(new Date(candidate.lwdInAccolite)), // Formatted date
            onboardingDate: formatDate(onboardingDate), // Formatted date
          };
        });

        setCandidates(transformedData);

        const initialFilters = {};
        Object.keys(transformedData[0] || {}).forEach((key) => {
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
      value={filters[field]?.value || ''}
      onChange={(e) => onFilterChange(field, e.target.value)}
      placeholder={`Search by ${field}`}
      style={{ boxSizing: 'border-box', minWidth: '150px' }} // Ensure the input field has a minimum width
    />
  );

  const customFilter = (value, filter) => {
    if (filter && value) {
      return value.toString().toLowerCase().includes(filter.toLowerCase());
    }
    return true;
  };

  const formatColumnName = (name) => {
    return name
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/^([a-z])/g, (char) => char.toUpperCase());
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const renderEditButton = (rowData) => (
    <button
      className="btn btn-primary btn-sm"
      onClick={() => navigate(`/edit-candidate/${rowData.id}`)}
    >
      Edit
    </button>
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading candidates, please wait...</p>
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
        <h2 className="mb-0 text-primary">Candidate List</h2>
        <div>
          <button className="btn btn-warning me-2" onClick={handleEditClick}>
            {editMode ? 'Cancel Edit' : 'Edit'}
          </button>
          <Link className="btn btn-success" to="/add-candidate">
            Add Candidate
          </Link>
        </div>
      </div>

      {/* DataTable */}
      <div className="card shadow-sm">
        <div className="card-body p-2"> {/* Added padding here */}
          <DataTable
            value={candidates}
            paginator
            rows={10}
            filters={filters}
            filterDisplay="row"
            stripedRows
            showGridlines
            className="table table-striped table-hover text-center"
          >
            {editMode && (
              <Column
                header="Actions"
                body={renderEditButton}
                style={{ textAlign: 'center', width: '150px', padding: '10px' }} // Adjusted width and added padding
              />
            )}
            {candidates.length > 0 &&
              Object.keys(candidates[0]).map((key) => {
                if (key === 'id') return null;
                return (
                  <Column
                    key={key}
                    field={key}
                    header={<span className="text-primary">{formatColumnName(key)}</span>}
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
    </div>
  );
};

export default CandidateSearch;

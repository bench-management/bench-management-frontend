import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Link } from 'react-router-dom';

const InterviewsDisplayTable = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/interviews')
      .then((response) => response.json())
      .then((data) => {
        setInterviews(data);

        // Initialize filters
        const initialFilters = {};
        Object.keys(data[0] || {}).forEach((key) => {
          initialFilters[key] = { value: '' };
        });
        setFilters(initialFilters);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching interviews:', error);
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

  const formatColumnName = (name) =>
    name
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/^([a-z])/, (char) => char.toUpperCase());

  const candidateTemplate = (rowData) => {
    const candidate = rowData.candidateId;
    return candidate ? `${candidate.name} (${candidate.empId})` : 'N/A';
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link className="btn btn-success" to="/add-interview">
          Add Interview
        </Link>
      </div>

      <h1 className="text-center mb-4">Interviews List</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <DataTable
            value={interviews}
            paginator
            rows={10}
            filters={filters}
            filterDisplay="row"
            className="table table-striped table-bordered table-hover text-center"
          >
            {interviews.length > 0 &&
              Object.keys(interviews[0]).map((key) => {
                if (key === 'candidateId') {
                  return (
                    <Column
                      key={key}
                      field={key}
                      header={<div className="font-weight-bold">Candidate</div>}
                      body={candidateTemplate}
                      bodyStyle={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}
                      headerStyle={{
                        textAlign: 'center',
                      }}
                    />
                  );
                }
                return (
                  <Column
                    key={key}
                    field={key}
                    header={
                      <div className="font-weight-bold">
                        {formatColumnName(key)}
                      </div>
                    }
                    filter
                    filterMatchMode="contains"
                    filterElement={renderFilterInput(key)}
                    bodyStyle={{
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}
                    headerStyle={{
                      textAlign: 'center',
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

export default InterviewsDisplayTable;

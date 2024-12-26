
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../styles/CandidateSearchPage.css'; 

export default function CandidateSearchPage() {
    const [candidates, setCandidates] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://676a5c79863eaa5ac0de18c9.mockapi.io/search/candidate/searchCandidate')
            .then((response) => response.json())
            .then((data) => {
                setCandidates(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const renderHeader = () => {
        return (
            <div className="header-container">
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search by keyword"
                    className="search-input"
                />
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Clear"
                    outlined
                    onClick={() => setGlobalFilterValue('')}
                    className="clear-button"
                />
            </div>
        );
    };

    const renderArray = (rowData, field) => {
        return Array.isArray(rowData[field]) ? rowData[field].join(', ') : rowData[field];
    };

    const renderBoolean = (rowData, field) => {
        return rowData[field] ? 'Yes' : 'No';
    };

    const renderDate = (rowData, field) => {
        return rowData[field] ? new Date(rowData[field]).toLocaleDateString() : 'N/A';
    };

    const header = renderHeader();

    return (
        <div className="candidate-search-page">
            <div className="card">
                <DataTable
                    value={candidates}
                    paginator
                    rows={10}
                    loading={loading}
                    dataKey="id"
                    globalFilterFields={['name', 'skill', 'baseLocation', 'status']}
                    globalFilter={globalFilterValue}
                    header={header}
                    emptyMessage="No candidates found."
                >
                    <Column field="id" header="ID" style={{ minWidth: '8rem' }} />
                    <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
                    <Column field="skill" header="Skill" style={{ minWidth: '12rem' }} />
                    <Column field="pastExperience" header="Experience (Years)" style={{ minWidth: '12rem' }} />
                    <Column field="baseLocation" header="Base Location" style={{ minWidth: '12rem' }} />
                    <Column field="status" header="Status" style={{ minWidth: '12rem' }} />
                    <Column field="client" header="Client" style={{ minWidth: '12rem' }} />
                    <Column header="Project Type" body={(rowData) => renderArray(rowData, 'projectType')} style={{ minWidth: '14rem' }} />
                    <Column header="On Bench" body={(rowData) => renderBoolean(rowData, 'onBench')} style={{ minWidth: '10rem' }} />
                    <Column header="Bench Start Date" body={(rowData) => renderDate(rowData, 'benchStartingDate')} style={{ minWidth: '14rem' }} />
                    <Column header="Tentative Onboarding Date" body={(rowData) => renderDate(rowData, 'tentativeOnboarding_Date')} style={{ minWidth: '14rem' }} />
                    <Column field="remarks" header="Remarks" style={{ minWidth: '12rem' }} />
                    <Column header="Tech Hiring Link" body={(rowData) => <a href={rowData.thLink}>Link</a>} style={{ minWidth: '14rem' }} />
                    <Column header="Interview IDs" body={(rowData) => renderArray(rowData, 'interviewId')} style={{ minWidth: '14rem' }} />
                </DataTable>
            </div>
        </div>
    );
}

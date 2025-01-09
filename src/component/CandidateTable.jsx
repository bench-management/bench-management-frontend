import { useEffect, useState } from "react";
import { Table, Input, Spin, Alert } from "antd";
import PropTypes from "prop-types";
import { fetchAllCandidates, fetchInterviewsByCandidateId } from "../lib/api";
import "../css/CandidateTable.css"

const { Search } = Input;

// Sub-Table Component
const SubTable = ({ candidateId, onSearch }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interviewData, setInterviewData] = useState([]);

    const fetchInterviews = async (candidateId) => {
        try {
            const interviewData = await fetchInterviewsByCandidateId(candidateId)
            setInterviewData(interviewData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchInterviews(candidateId)
    }, [candidateId]);

    const columns = [
        { title: "Interview Date", dataIndex: "interviewDate", key: "interviewDate" },
        { title: "Interviewer Name", dataIndex: "interviewerName", key: "interviewerName" },
        { title: "Interview Status", dataIndex: "interviewStatus", key: "interviewStatus" },
        { title: "Department", dataIndex: "department", key: "department" },
        { title: "Accolite Hiring Manager", dataIndex: "accoliteHiringManager", key: "accoliteHiringManager" },
        { title: "Client Hiring Manager", dataIndex: "clientHiringManager", key: "clientHiringManager" },
        { title: "Client Requirement", dataIndex: "clientRequirement", key: "clientRequirement" },
        { title: "Comments", dataIndex: "comments", key: "comments" },
        { title: "Project", dataIndex: "project", key: "project" },
    ];

    const filteredData = interviewData && interviewData.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(onSearch.toLowerCase())
        )
    );

    if (error) {
        return (
            <Alert
                message="Error"
                description={`Failed to load interview details: ${error}`}
                type="error"
                showIcon
                style={{ margin: 20 }}
            />
        );
    }

    return <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="id"
        loading={loading}
        className="subtable subtable-header"
        bordered
        size="small"
    />;
};

SubTable.propTypes = {
    candidateId: PropTypes.string.isRequired,
    onSearch: PropTypes.string
}

// Main Table Component
const CandidateTable = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [mainTableSearch, setMainTableSearch] = useState("");
    const [subTableSearch, setSubTableSearch] = useState("");

    const fetchCandidates = async () => {
        try {
            const candidates = await fetchAllCandidates();
            setCandidates(candidates);
        } catch (error) {
            console.log(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCandidates()
    }, []);

    const handleRowClick = (record) => {
        setExpandedRowKeys((prevExpandedKeys) =>
            prevExpandedKeys.includes(record.id) ? [] : [record.id]
        );
    };

    const columns = [
        { title: "Employee ID", dataIndex: "empId", key: "empId" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Skill", dataIndex: "skill", key: "skill" },
        { title: "Experience", dataIndex: "pastExperience", key: "pastExperience" },
        { title: "Base Location", dataIndex: "baseLocation", key: "baseLocation" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Accolite DOJ", dataIndex: "accoliteDoj", key: "accoliteDoj" },
        { title: "Bench Start Date", dataIndex: "benchStartDate", key: "benchStartDate" },
        { title: "Onboarding Date", dataIndex: "onboardingDate", key: "onboardingDate" },
        { title: "Remarks", dataIndex: "remarks", key: "remarks" },
    ];

    if (error) {
        return (
            <Alert
                message="Error"
                description={`Failed to load candidates: ${error}`}
                type="error"
                showIcon
                style={{ margin: 20 }}
            />
        );
    }

    const filteredCandidates = candidates.filter((candidate) =>
        Object.values(candidate).some((value) =>
            typeof value === "string"
                ? value.toLowerCase().includes(mainTableSearch.toLowerCase())
                : false
        )
    );

    return (
        <div style={{
            backgroundColor: '#f1e9d1',
            padding: '2rem'
        }}>
            {/* Main Table Search */}
            <div style={{ padding: '1rem', display: "flex", justifyContent: "flex-end" }}>
                <Search
                    placeholder="Search candidates..."
                    onChange={(e) => setMainTableSearch(e.target.value)}
                    style={{ width: 300 }}
                    allowClear
                />
            </div>

            <Table
                columns={columns}
                dataSource={filteredCandidates}
                loading={loading}
                bordered
                size="small"
                className="main-table"
                expandable={{
                    expandedRowKeys,
                    expandedRowRender: (record) => (
                        <div style={{ padding: '1rem 0 3rem', backgroundColor: '#f1e9d1' }}>
                            <div style={{ padding: '1rem', display: "flex", justifyContent: "flex-end" }}>
                                <Search
                                    placeholder={`Search...`}
                                    onChange={(e) => setSubTableSearch(e.target.value)}
                                    style={{ width: 300 }}
                                    allowClear
                                />
                            </div>
                            <SubTable candidateId={record.id} onSearch={subTableSearch} />
                        </div>
                    ),
                    rowExpandable: () => true,
                    onExpand: (expanded, record) =>
                        setExpandedRowKeys(expanded ? [record.id] : []),
                }}
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record), // Click anywhere on the row to expand/collapse
                })}
            />
        </div>
    );
};

export default CandidateTable;

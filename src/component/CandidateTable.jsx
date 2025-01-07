import React, { useEffect, useState } from "react";
import { Table, Input, Radio, Spin, Alert } from "antd";

const { Search } = Input;

// Sub-Table Component
const SubTable = ({ type, data, onSearch }) => {
    const columns = {
        interviews: [
            { title: "Interview ID", dataIndex: "interviewId", key: "interviewId" },
            { title: "Interviewer", dataIndex: "interviewerName", key: "interviewerName" },
            { title: "Date", dataIndex: "date", key: "date" },
        ],
    };

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(onSearch.toLowerCase())
        )
    );

    return <Table columns={columns[type]} dataSource={filteredData} pagination={false} rowKey="interviewId" />;
};

// Main Table Component
const CandidateTable = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [subTableType, setSubTableType] = useState("interviews");
    const [mainTableSearch, setMainTableSearch] = useState("");
    const [subTableSearch, setSubTableSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/candidates")
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
                    accoliteDoj: new Date(candidate.accoliteDoj).toLocaleDateString(),
                    benchStartDate: new Date(candidate.benchStartDate).toLocaleDateString(),
                    tentativeOnboardingDate: candidate.tentativeOnboardingDate ? new Date(candidate.tentativeOnboardingDate).toLocaleDateString() : null,
                    remarks: candidate.remarks,
                    mentorship: candidate.mentorship,
                    currentLocation: candidate.currentLocation,
                    thLink: candidate.thLink,
                    lwdInAccolite: candidate.lwdInAccolite ? new Date(candidate.lwdInAccolite).toLocaleDateString() : null,
                    projectType: candidate.projectType,
                    projectAllocationStatus: candidate.projectAllocationStatus,
                    selectionDate: candidate.selectionDate ? new Date(candidate.selectionDate).toLocaleDateString() : null,
                    onboardingDate: new Date(candidate.onboardingDate).toLocaleDateString(),
                    interviews: candidate.interviews || [],
                }));
                setCandidates(transformedData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleRowClick = (record) => {
        setExpandedRowKeys((prevExpandedKeys) =>
            prevExpandedKeys.includes(record.id) ? [] : [record.id]
        );
    };

    // Filter main table
    const filteredCandidates = candidates.filter((candidate) =>
        Object.values(candidate).some((value) =>
            typeof value === "string"
                ? value.toLowerCase().includes(mainTableSearch.toLowerCase())
                : false
        )
    );

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

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: 50 }}>
                <Spin size="large" />
                <p>Loading candidates...</p>
            </div>
        );
    }

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

    return (
        <div>
            {/* Type Selection */}
            <div style={{ marginBottom: 16 }}>
                <Radio.Group
                    value={subTableType}
                    onChange={(e) => setSubTableType(e.target.value)}
                >
                    <Radio.Button value="interviews">Interviews</Radio.Button>
                </Radio.Group>
            </div>

            {/* Main Table Search */}
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
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
                expandable={{
                    expandedRowKeys,
                    expandedRowRender: (record) => (
                        <>
                            {/* Sub-Table Search */}
                            <div style={{ marginBottom: 8, display: "flex", justifyContent: "flex-end" }}>
                                <Search
                                    placeholder={`Search ${subTableType}...`}
                                    onChange={(e) => setSubTableSearch(e.target.value)}
                                    style={{ width: 300 }}
                                    allowClear
                                />
                            </div>

                            {/* Sub-Table */}
                            <SubTable
                                type={subTableType}
                                data={record[subTableType]}
                                onSearch={subTableSearch}
                            />
                        </>
                    ),
                    rowExpandable: () => true,
                    onExpand: (expanded, record) =>
                        setExpandedRowKeys(expanded ? [record.id] : []), // Sync with + button
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

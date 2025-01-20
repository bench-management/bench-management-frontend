import { useEffect, useRef, useState } from "react";
import { Modal, Table, Input, Alert, Button, Space } from "antd";
import { CloseOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import PropTypes from "prop-types";
import { fetchAllCandidates, fetchInterviewsByCandidateId } from "../lib/api";
import { Link } from "react-router-dom";

const { Search } = Input;

// Sub-Table Component
const SubTable = ({ candidateId, onSearch }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interviewData, setInterviewData] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [mainTableSearch, setMainTableSearch] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [remarks, setRemarks] = useState([]);

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

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [tableKey, setTableKey] = useState(0);

    const filtersRef = useRef({});

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const clearAllFilters = () => {
        setMainTableSearch("");
        setSearchText('')
        setSearchedColumn('')
        filtersRef.current = {};
        setTableKey((prevKey) => prevKey + 1);
    };

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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {

            filtersRef.current[dataIndex] = { clearFilters, confirm };

            return <div
                style={{
                    padding: 8,
                    // border: "1px solid"
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        // border: "1px solid"
                    }}
                >
                    {/* <Button
                        type="link"
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={() => {
                            close();
                        }}
                    >
                    </Button> */}
                    <Button
                        onClick={() => {
                            if (clearFilters) {
                                handleReset(clearFilters)
                            }
                        }}
                        size="small"
                        style={{
                            // display: "flex",
                            // width: "100%",
                            // flexGrow: 1,
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            // display: "flex",
                            // width: "100%",
                            // flexGrow: 1,
                        }}
                    >
                        Filter
                    </Button>
                </Space >
            </div >
        },
        filterIcon: (filtered) => (
            <FilterOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    //-------------------
    const [remarks, setRemarks] = useState(""); // Adjusted to store a single remark

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const openRemarksModal = (text) => {
        setRemarks(text); // Store the remarks to display in the modal
        showModal(); // Open the modal
    };
    


    const columns = [
        { title: "Employee ID", dataIndex: "empId", key: "empId", fixed: 'left', ...getColumnSearchProps('empId') },
        { title: "Name", dataIndex: "name", key: "name", fixed: 'left', ...getColumnSearchProps('name') },
        { title: "Skill", dataIndex: "skill", key: "skill", fixed: 'left', ...getColumnSearchProps('skill') },
        { title: "Experience", dataIndex: "pastExperience", key: "pastExperience", fixed: 'left', ...getColumnSearchProps('pastExperience') },
        { title: "Base Location", dataIndex: "baseLocation", key: "baseLocation", ...getColumnSearchProps('baseLocation') },
        { title: "Status", dataIndex: "status", key: "status", ...getColumnSearchProps('status') },
        { title: "Accolite DOJ", dataIndex: "accoliteDoj", key: "accoliteDoj", ...getColumnSearchProps('accoliteDoj') },
        { title: "Bench Start Date", dataIndex: "benchStartDate", key: "benchStartDate", ...getColumnSearchProps('benchStartDate') },
        { title: "Onboarding Date", dataIndex: "onboardingDate", key: "onboardingDate", ...getColumnSearchProps('onboardingDate') },
        {
            title: "Remarks",
            dataIndex: "remarks",
            key: "remarks",
            fixed: 'right',
            width: 200,
            render: (text) => (
                <a onClick={() => openRemarksModal(text)} style={{ color: "#1677ff", cursor: "pointer" }}>
                    Manage
                </a>
            ),
        },
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
            padding: '1rem',
            // border: "1px solid blue"
        }}>
            {/* Main Table Search */}
            <div style={{ margin: "0 0 1rem", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                    <Search
                        placeholder="Search candidates..."
                        onChange={(e) => setMainTableSearch(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Button onClick={clearAllFilters} style={{ color: "gray" }}>Clear filters</Button>
                </div>

            </div>

            <Table
                key={tableKey}
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
                pagination={{
                    position: ["bottomCenter"],
                }}
                scroll={{
                    x: 'max-content',
                }}
            />
            <Link
                to="/add-candidate"
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
            <Modal
                title="Remarks"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{remarks}</p> {/* Display the remarks */}
            </Modal>
        </div>
    );
};

export default CandidateTable;

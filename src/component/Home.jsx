import CandidateTable from './CandidateTable';

const Home = () => {
  return (
    <main className="d-flex flex-column gap-8 p-4">
      {/* <Link to={'/add-candidate'} className="btn btn-success w-8">+ Add Candidate</Link> */}
      <CandidateTable />
    </main>
  );
};

export default Home;

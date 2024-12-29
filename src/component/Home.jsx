// import { Link } from "react-router-dom"
import CandidateSearch from "./CandidateSearch"

const Home = () => {
    return (
        <main className="d-flex flex-column gap-8 p-4">
            {/* <Link to={'/add-candidate'} className="btn btn-success w-8">+ Add Candidate</Link> */}
            <CandidateSearch />
        </main>
    )
}

export default Home
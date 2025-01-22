import apiClient from "./apiClient";

// Fetch all candidates
export const fetchAllCandidates = async () => {
    try {
        const response = await apiClient.get("/candidates");
        const data = response.data;

        // Transform data
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
            tentativeOnboardingDate: candidate.tentativeOnboardingDate
                ? new Date(candidate.tentativeOnboardingDate).toLocaleDateString()
                : null,
            remarks: candidate.remarks,
            mentorship: candidate.mentorship,
            currentLocation: candidate.currentLocation,
            thLink: candidate.thLink,
            lwdInAccolite: candidate.lwdInAccolite
                ? new Date(candidate.lwdInAccolite).toLocaleDateString()
                : null,
            projectType: candidate.projectType,
            projectAllocationStatus: candidate.projectAllocationStatus,
            selectionDate: candidate.selectionDate
                ? new Date(candidate.selectionDate).toLocaleDateString()
                : null,
            onboardingDate: new Date(candidate.onboardingDate).toLocaleDateString(),
        }));

        return transformedData;
    } catch (error) {
        console.error("Error while fetching candidates:", error);
        throw new Error("Error while fetching candidates.");
    }
};

// Fetch interviews by candidate ID
export const fetchInterviewsByCandidateId = async (candidateId) => {
    try {
        const response = await apiClient.get(`/interviews/candidate/${candidateId}`);
        const data = response.data;

        // Transform data
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
            comments: item.comments.join(", "), // Convert array to a string for display
            project: item.project,
        }));

        return transformedData;
    } catch (error) {
        console.error(`Error fetching interviews for candidate ${candidateId}:`, error);
        throw new Error("Error fetching interviews for candidate.");
    }
};

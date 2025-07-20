import api from "./api";
import { BANKS_API, BRANCHES_API, LOAN_CRITERIA_API, LOANS_API, LOGIN_API, OTHER_API, USERS_API } from "./constants_apis";


//  Authentication API calls
export const sendOTP = (data) => api.post(USERS_API + "/otp/send", data);
export const reSendOTP = (data) => api.post(USERS_API + "/otp/resend", data);
export const loginApi = (data) => api.post(LOGIN_API, data);

//  User API calls
export const getAllUsers = (id) => api.get(`${USERS_API}/below/${id}`);
export const getUserById = (id) => api.get(`${USERS_API}/${id}`); // Get user by ID
export const createUser = (data) => api.post(USERS_API, data);       // create User
export const updateUser = (id, data) => api.put(`${USERS_API}/${id}`, data); // Update User
export const deleteUser = (id) => api.delete(`${USERS_API}/${id}`);    // Delete User

// Loan Applications API calls
export const getLoanApplications = () => api.get(LOANS_API);
export const getLoanApplicationById = (id) => api.get(`${LOANS_API}/${id}`);
//export const createLoanApplication = (data) => api.post(LOANS_API, data);
export const createLoanApplication = (formData, config = {}) => api.post(LOANS_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });

export const updateLoanApplication = (id, formData, config = {}) => api.put(`${LOANS_API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });

export const updateLoanBankBranch = (id, data) => api.patch(`${LOANS_API}/${id}/branch`, data);


//export const updateLoanApplication = (id, data) => api.put(`${LOANS_API}/${id}`, data);
export const deleteLoanApplication = (id) => api.delete(`${LOANS_API}/${id}`);
export const getLoanApplicationByUserId = () => api.get(`${LOANS_API}/user`);
export const getLoanApplicationByBranchId = (role,id) => api.get(`${LOANS_API}/${role}/${id}`);
export const getLoanApplicationsForSubAgent = (subAgentId) => api.get(`${LOANS_API}/subAgent/${subAgentId}`);
export const getVisibleLoanApplications = () => api.get(`${LOANS_API}/visible`);
export const submitLoanDecision = (id, data) => api.post(`${LOANS_API}/${id}/decision`, data);


//Loan file upload
export const uploadLoanFile = (applicationId, data) => api.post(`${LOANS_API}/upload/${applicationId}`, data);

// Loan Criteria API calls
export const getLoanCriteria = () => api.get(LOAN_CRITERIA_API);
export const getLoanCriteriaById = (id) => api.get(`${LOAN_CRITERIA_API}/${id}`);
export const createLoanCriteria = (data) => api.post(LOAN_CRITERIA_API, data);
export const updateLoanCriteria = (id, data) => api.put(`${LOAN_CRITERIA_API}/${id}`, data);
export const deleteLoanCriteria = (id) => api.delete(`${LOAN_CRITERIA_API}/${id}`);


// Bank API calls
export const getBanks = () => api.get(BANKS_API);
export const getBankById = (id) => api.get(`${BANKS_API}/${id}`);
export const createBank = (data) => api.post(BANKS_API, data);
export const updateBank = (id, data) => api.put(`${BANKS_API}/${id}`, data);
export const deleteBank = (id) => api.delete(`${BANKS_API}/${id}`);
export const getBanksByUserId = (role,id) => api.get(`${BANKS_API}/${role}/${id}`);

// Branch API calls
export const getBranches = (bankId) => api.get(`${BRANCHES_API}/${bankId}/branches`);
export const getBranchById = (bankId, id) => api.get(`${BRANCHES_API}/${bankId}/branches/${id}`);
export const createBranch = (bankId,data) => api.post(`${BRANCHES_API}/${bankId}/branches`, data);
export const updateBranch = (id,bankId, data) => api.put(`${BRANCHES_API}/${bankId}/branches/${id}`, data);
export const deleteBranch = (bankId,id) => api.delete(`${BRANCHES_API}/${bankId}/branches/${id}`);

//Dashboard API calls
export const getDashboardData = () => api.get(`${OTHER_API}/applicationStatus`);//other/applicationStatus/

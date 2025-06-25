//  Your API base URL
export const API_BASE_URL = 'http://localhost:8000/instaFinn';

//  Define your API endpoints as constants
export const LOGIN_API = `${API_BASE_URL}/users/login`;
export const USERS_API = `${API_BASE_URL}/users`;
export const LOANS_API = `${API_BASE_URL}/loans`; 
export const LOAN_CRITERIA_API = `${API_BASE_URL}/criteria`;
export const BANKS_API = `${API_BASE_URL}/banks`;
export const BRANCHES_API = `${API_BASE_URL}/banks`;
export const OTHER_API=`${API_BASE_URL}/other`;
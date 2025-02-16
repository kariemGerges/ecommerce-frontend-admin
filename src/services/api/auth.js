import axiosClient from "../api/axiosInstance";

export const loginAdmin = async (credentials) => {
    try {
        const response = await axiosClient.post('/auth/admin', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// logout user
export const logoutUser = async () => {
    try {
        const response = await axiosClient.post(`/auth/logout`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// get user profile
export const getUserProfile = async () => {
    try {
        const response = await axiosClient.get(`/auth/profile`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return null; // Return null for unauthorized users
        }
        throw error.response?.data || { message: 'Server error' };
    }
};
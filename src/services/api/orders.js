import axiosClient from './axiosInstance';

// get all orders by admin
export const getOrders = async ({ queryKey }) => {
    try {
        const [_, { page, limit, status, userId, startDate, endDate }] = queryKey;
        const response = await axiosClient.get('/orders', {
            params: {
                page,
                limit,
                status,
                userId,
                startDate,
                endDate,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders from api:', error);
        throw error;
    }
};
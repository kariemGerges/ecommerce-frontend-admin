import axiosClient from './axiosInstance';


// admin create product
export const createProduct = async (productData) => {
    try {
        const response = await axiosClient.post(`/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// admin update product
export const updateProduct = async (id, productData) => {
    try {
        const response = await axiosClient.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// admin delete product
export const deleteProduct = async (id) => {
    try {
        const response = await axiosClient.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

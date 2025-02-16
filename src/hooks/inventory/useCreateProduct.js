import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/products';

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onMutate: async (newProduct) => {
            // Cancel ongoing queries for 'products'
            await queryClient.cancelQueries(['products']);

            // Snapshot the previous data
            const prevAll = queryClient.getQueryData(['products', 'all']);

            // If we have an all-products cache, add the new item
            if (prevAll) {
                queryClient.setQueryData(['products', 'all'], (old) => {
                    return [...old, { ...newProduct, _id: 'temp-id' }];
                });
            }

            return { prevAll };
        },
        // Rollback if error
        onError: (error, newProduct, context) => {
            if (context?.prevAll) {
                queryClient.setQueryData(['products', 'all'], context.prevAll);
            }
        },
        // Invalidate or refetch on success/failure
        onSettled: () => {
            queryClient.invalidateQueries(['products']);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};
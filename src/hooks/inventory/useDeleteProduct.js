import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api/products';

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onMutate: async ({ id, updates }) => {
            await queryClient.cancelQueries(['products']);

            const prevAll = queryClient.getQueryData(['products', 'all']);
            const prevOne = queryClient.getQueryData(['products', id]);

            // Optimistically update single-product cache
            if (prevOne) {
                queryClient.setQueryData(['products', id], {
                    ...prevOne,
                    ...updates,
                    _id: id,
                });
            }

            // Optimistically update the all-products cache
            if (prevAll) {
                queryClient.setQueryData(['products', 'all'], (old) =>
                    old.map((p) => (p._id === id ? { ...p, ...updates } : p))
                );
            }

            return { prevAll, prevOne };
        },
        onError: (error, variables, context) => {
            // Roll back
            if (context?.prevOne) {
                queryClient.setQueryData(
                    ['products', variables.id],
                    context.prevOne
                );
            }
            if (context?.prevAll) {
                queryClient.setQueryData(['products', 'all'], context.prevAll);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
        onSettled: (data, error, { id }) => {
            // Always refetch or invalidate
            queryClient.invalidateQueries(['products', id]);
            queryClient.invalidateQueries(['products', 'all']);
        },
    });
};

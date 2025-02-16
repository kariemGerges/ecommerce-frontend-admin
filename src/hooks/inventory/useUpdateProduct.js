import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../api/products';

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onMutate: async (id) => {
            await queryClient.cancelQueries(['products']);

            const prevAll = queryClient.getQueryData(['products', 'all']);
            const prevOne = queryClient.getQueryData(['products', id]);

            // Remove from all-products
            if (prevAll) {
                queryClient.setQueryData(['products', 'all'], (old) =>
                    old.filter((p) => p._id !== id)
                );
            }

            // Remove the single product from cache
            queryClient.removeQueries(['products', id], { exact: true });

            return { prevAll, prevOne };
        },
        onError: (error, id, context) => {
            // Roll back
            if (context?.prevAll) {
                queryClient.setQueryData(['products', 'all'], context.prevAll);
            }
            if (context?.prevOne) {
                queryClient.setQueryData(['products', id], context.prevOne);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};

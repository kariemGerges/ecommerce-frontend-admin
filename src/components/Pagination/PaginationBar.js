import React from 'react';
import { motion } from 'framer-motion';

// A robust pagination bar using React + Tailwind
// Updated to avoid duplicate page numbers (e.g., "1 1").
//   - Buttons for First & Last page
//   - Display of "Page X of Y"
//   - Animated buttons for previous/next (includes page numbers)
//   - Ellipsis-based page range
// Example usage:
// <PaginationBar
//   currentPage={currentPage}
//   totalPages={totalPages}
//   hasPreviousPage={hasPreviousPage}
//   hasNextPage={hasNextPage}
//   totalOrders={totalOrders}
//   nextPage={nextPage}
//   previousPage={previousPage}
//   setPage={setPage}
//   siblingCount={1}
//   boundaryCount={1}
// />

function range(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => start + idx);
}

export default function PaginationBar({
    currentPage = 1,
    totalPages = 1,
    hasPreviousPage = false,
    hasNextPage = false,
    totalOrders = 0,
    nextPage = null,
    previousPage = null,
    setPage = () => {},
    siblingCount = 1,
    boundaryCount = 1,
}) {
    // Utility to generate page ranges with ellipses
    const generatePageNumbers = () => {
        const totalPageNumbers = siblingCount + 2 * boundaryCount + 2;

        // if total pages is less than totalPageNumbers, show all pages
        if (totalPages <= totalPageNumbers) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

        const shouldShowLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
        const shouldShowRightEllipsis =
            rightSiblingIndex < totalPages - (boundaryCount + 1);

        const firstSection = range(1, boundaryCount);
        const lastSection = range(totalPages - boundaryCount + 1, totalPages);

        const middleSection = range(leftSiblingIndex, rightSiblingIndex);

        let pages = [];

        // Add first boundary
        pages.push(...firstSection);

        // Ellipsis for left gap
        if (shouldShowLeftEllipsis) {
            pages.push('...');
        }

        // Middle pages
        pages.push(...middleSection);

        // Ellipsis for right gap
        if (shouldShowRightEllipsis) {
            pages.push('...');
        }

        // Add last boundary
        pages.push(...lastSection);

        // Remove consecutive duplicates (e.g., avoid "1, 1")
        const dedupedPages = [];
        for (let i = 0; i < pages.length; i++) {
            if (i === 0 || pages[i] !== pages[i - 1]) {
                dedupedPages.push(pages[i]);
            }
        }

        return dedupedPages;
    };

    const pageNumbers = generatePageNumbers();

    // Handler for changing page
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setPage(page);
    };

    // Motion button variants for hover/tap animations
    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    };

    return (
        <div className="p-4">
            {/* Optional summary of total orders */}
            {totalOrders > 0 && (
                <p className="text-sm text-gray-700 mb-2">
                    Total Orders: {totalOrders}
                </p>
            )}

            {/* Page count display */}
            <p className="text-sm text-gray-600 mb-2">
                Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center justify-center space-x-2">
                {/* First Page Button */}
                {/* <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="rounded-2xl shadow px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    First
                </motion.button> */}

                {/* Previous Page Button with page number */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="rounded-2xl shadow px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
                    onClick={() => handlePageChange(previousPage)}
                    disabled={!hasPreviousPage}
                >
                    {/* {`Prev${previousPage ? ` (${previousPage})` : ''}`} */}
                    Previous
                </motion.button>

                {/* Numbered Pages (with ellipses) */}
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={index} className="mx-2 text-gray-500">
                                ...
                            </span>
                        );
                    }

                    return (
                        <motion.button
                            key={index}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handlePageChange(page)}
                            className={`rounded-2xl shadow px-3 py-2 transition-colors duration-200 ${
                                currentPage === page
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </motion.button>
                    );
                })}

                {/* Next Page Button with page number */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="rounded-2xl shadow px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
                    onClick={() => handlePageChange(nextPage)}
                    disabled={!hasNextPage}
                >
                    {/* {`Next${nextPage ? ` (${nextPage})` : ''}`} */}
                    Next
                </motion.button>

                {/* Last Page Button */}
                {/* <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="rounded-2xl shadow px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Last
                </motion.button> */}
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { useFetchAllOrders } from '../../hooks/orders/useFetchAllOrders';

// import Components
import PaginationBar from '../../components/Pagination/PaginationBar';
import OrderFilters from '../../components/Filter/Filters';
import OrderStatsSection from '../../components/LoggedInDashboardComponents/OrderStatsSection';
import OrderListView from '../../components/LoggedInDashboardComponents/OrderListView';
import OrderGridView from '../../components/LoggedInDashboardComponents/OrderGridView';
import OrderDetailsModal from '../../components/LoggedInDashboardComponents/OrderDetailsModal';

// View Toggle Component to switch between grid and list view
const ViewToggle = ({ view, onViewChange }) => (
    <div className="flex items-center gap-2 m-4 ">
        <button
            onClick={() => onViewChange('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                view === 'grid'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <LayoutGrid size={20} />
            <span>Grid</span>
        </button>
        <button
            onClick={() => onViewChange('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                view === 'list'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <List size={20} />
            <span>List</span>
        </button>
    </div>
);

// Orders Grid Component

// Orders List Component
const LoggedInDashboard = () => {
    const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
    const [page, setPage] = useState(1); // State for current page
    const [limit, setLimit] = useState(12); // State for items per page
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [view, setView] = useState('grid'); // State for view (grid or list)

    const [selectedFilters, setSelectedFilters] = useState({
        status: '',
        userId: '',
        startDate: '',
        endDate: '',
    });

    // console.log(selectedFilters);

    const { data, isLoading, isError, error } = useFetchAllOrders(
        selectedFilters,
        page,
        limit
    );
    const allOrders = data?.orders || [];
    const pagination = data?.pagination || {};

    // Helper functions
    // Function to format date
    const getDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Function to get order status in colors
    const getOrderStatus = (order) => {
        // Mock function - implement real status logic as needed
        switch (order.pickupStatus) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Check if data is loading
    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4 p-6">
                <div className="h-10 bg-gray-200 rounded-lg w-1/2"></div>
                <div className="grid gap-4 md:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-32 bg-gray-200 rounded-xl"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    // Check if there is an error
    if (isError) {
        return (
            <div className="p-6 bg-red-100 text-red-700 rounded-xl mx-6">
                ⚠️ Error: {error.message || 'Please Sign In to view this page'}
            </div>
        );
    }

    // callback function to update the selected filters
    const handleFilterChange = (newFilters) => {
        setSelectedFilters(newFilters);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Stats Header Section */}
            <OrderStatsSection data={data} />

            {/* Search Bar and Filters */}
            <div className="grid md:grid-cols-3 gap-4 p-6">
                {/* Filters - Takes up 2/3 of space */}
                <div className="md:col-span-2">
                    <OrderFilters onFilterChange={handleFilterChange} />
                </div>

                {/* Search Bar - Takes up 1/3 of space */}
                <div className="relative md:col-span-1">
                    <Search
                        className="absolute left-3 top-6 transform -translate-y-1/2
                            text-gray-400 hover:text-gray-400 "
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* View Toggle and Items Per Page */}
            <div className="flex justify-between items-center mb-6">
                {/* View Toggle */}
                <ViewToggle view={view} onViewChange={setView} />

                {/* Divider with page numbers */}
                <div className="flex items-center">
                    {/* Bottom left page number */}
                    <span className="text-sm text-gray-500 mr-4 font-cinzel">
                        Total Pages {pagination.totalPages}
                    </span>

                    {/* Divider */}
                    <div className="h-12 w-px bg-gray-200"></div>

                    {/* Top right page number */}
                    <span className=" text-gray-500 ml-4 font-cinzel">
                        Page {pagination.currentPage}
                    </span>
                </div>

                {/* Items Per Page */}
                <div className="flex items-center">
                    <p className="text-gray-700 text-xl mr-4 mb-1">Items:</p>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        className="rounded-xl px-2 py-1 border
                            border-emerald-600 focus:ring-2
                            focus:ring-purple-500 focus:border-transparent
                            bg-gray-900/5 focus:bg-teal-500/10 mx-5"
                    >
                        <option value={24}>25 items</option>
                        <option value={48}>50 items</option>
                        <option value={96}>100 items</option>
                    </select>
                </div>
            </div>

            {/* Orders Views - Grid or List */}
            {view === 'grid' ? (
                <OrderGridView
                    orders={allOrders}
                    onOrderClick={setSelectedOrder}
                    getDate={getDate}
                    getOrderStatus={getOrderStatus}
                />
            ) : (
                <OrderListView
                    orders={allOrders}
                    onOrderClick={setSelectedOrder}
                    getDate={getDate}
                    getOrderStatus={getOrderStatus}
                />
            )}

            {/* Pagination */}
            <PaginationBar
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                totalOrders={pagination.totalDocs}
                nextPage={pagination.nextPage}
                previousPage={pagination.previousPage}
                setPage={setPage}
            />

            {/* Order Details Modal */}
            <OrderDetailsModal
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                getDate={getDate}
                getOrderStatus={getOrderStatus}
            />
        </div>
    );
};

export default LoggedInDashboard;

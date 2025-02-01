import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, X, Calendar, User, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import {useFetchAllOrders} from '../../hooks/orders/useFetchAllOrders';
import PaginationBar from '../../components/Pagination/PaginationBar';
import OrderFilters from '../../components/Filter/Filters';

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/25 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

const LoggedInDashboard = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedFilters, setSelectedFilters] = useState({
        status: '',
        userId: '',
        startDate: '',
        endDate: '',
    });

    const filters = {};

    const { data, isLoading, isError, error } = useFetchAllOrders(
        filters,
        page,
        12
    );
    const allOrders = data?.orders || [];
    const pagination = data?.pagination || {};

    const getDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getOrderStatus = (order) => {
        // Mock function - implement real status logic as needed
        return {
            Pending: 'bg-yellow-100 text-yellow-800',
            Processing: 'bg-blue-100 text-blue-800',
            Completed: 'bg-green-100 text-green-800',
            Cancelled: 'bg-red-100 text-red-800',
        }['Processing'];
    };

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
            {/* Stats Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Order Dashboard
                    </h1>

                    <div className="grid md:grid-cols-3 sx:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-emerald-600 to-orange-300 rounded-2xl p-4 text-white md:col-span-2">
                            <div className="flex items-center gap-6 px-4 py-2">
                                {/* Total Orders */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-xl">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80">
                                            Total Orders
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {data?.totalOrders}
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-12 w-px bg-white/20"></div>

                                {/* Status Counts */}
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-green-300"
                                        />
                                        <div>
                                            <p className="text-sm text-white/80">
                                                Completed
                                            </p>
                                            <p className="text-lg font-bold">
                                                {data?.ordersCompleted}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock
                                            size={20}
                                            className="text-blue-300"
                                        />
                                        <div>
                                            <p className="text-sm text-white/80">
                                                Ready
                                            </p>
                                            <p className="text-lg font-bold">
                                                {data?.ordersReady}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <AlertCircle
                                            size={20}
                                            className="text-yellow-300"
                                        />
                                        <div>
                                            <p className="text-sm text-white/80">
                                                Pending
                                            </p>
                                            <p className="text-lg font-bold">
                                                {data?.ordersPending}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-fuchsia-500 to-zinc-600 rounded-2xl p-6 text-white md:col-span-1">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <ShoppingBag size={28} />
                                </div>
                                <div>
                                    <p className="text-sm text-white/80">
                                        Total Items
                                    </p>
                                    <p className="text-3xl font-bold">
                                        {data?.totalItems}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="relative mb-6">
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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

                {/* Filters */}
                <OrderFilters
                    onFilterChange={handleFilterChange}
                />

                {/* Orders Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {allOrders.map((order) => (
                        <div
                            key={order._id}
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                    #{order._id.slice(-6)}
                                </span>
                                <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatus(
                                        order
                                    )}`}
                                >
                                    Processing
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar size={16} />
                                    <span className="text-sm">
                                        {getDate(order.pickupDate)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <User size={16} />
                                    <span className="text-sm">John Doe</span>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <div className="text-sm text-gray-500">
                                        {order.items.reduce(
                                            (sum, item) => sum + item.quantity,
                                            0
                                        )}{' '}
                                        items
                                    </div>
                                    <div className="text-xl font-bold text-gray-900">
                                        ${order.totalPrice.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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
            </div>

            {/* Custom Modal for Order Details */}
            <Modal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
            >
                <div className="relative">
                    <button
                        onClick={() => setSelectedOrder(null)}
                        className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 p-1"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-xl font-bold mb-6">
                        Order Details #{selectedOrder?._id.slice(-6)}
                    </h2>

                    {selectedOrder && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-3">
                                        Customer Details
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <User size={16} />
                                            <span>John Doe</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar size={16} />
                                            <span>
                                                {getDate(
                                                    selectedOrder.pickupDate
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-3">
                                        Order Summary
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Status</span>
                                            <span className="font-medium">
                                                Processing
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Total Items</span>
                                            <span className="font-medium">
                                                {selectedOrder.items.reduce(
                                                    (sum, item) =>
                                                        sum + item.quantity,
                                                    0
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                                    Order Items
                                </h3>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center justify-between bg-gray-50 p-4 rounded-xl"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Product Name
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-bold text-purple-600">
                                        ${selectedOrder.totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default LoggedInDashboard;

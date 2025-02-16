import React, { useState, memo } from 'react';
import { Calendar, User, Search } from 'lucide-react';
import { getPickupTimeColor } from '../../utils/getPickupTimeColor';

// Memoized search input component
const SearchInput = memo(({ value, onChange, placeholder }) => (
    <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
));

// Memoized table header with search inputs
const TableHeader = memo(({ filters, onFilterChange }) => (
    <tr className="border-b border-gray-200">
        {[
            { key: 'orderId', placeholder: 'Order ID' },
            { key: 'date', placeholder: 'Pickup Date' },
            { key: 'time', placeholder: 'Pickup Time' },
            { key: 'customer', placeholder: 'Customer' },
            { key: 'items', placeholder: 'Items' },
            { key: 'status', placeholder: 'Status' },
            { key: 'price', placeholder: 'Price' },
        ].map(({ key, placeholder }) => (
            <th key={key} className="p-4">
                <SearchInput
                    value={filters[key]}
                    onChange={(e) => onFilterChange(key, e.target.value)}
                    placeholder={placeholder}
                />
            </th>
        ))}
    </tr>
));

// Main OrdersTable component
const OrdersTable = ({
    orders: initialOrders,
    onOrderClick,
    getDate,
    getOrderStatus,
}) => {
    const [filters, setFilters] = useState({
        orderId: '',
        date: '',
        time: '',
        customer: '',
        items: '',
        status: '',
        price: '',
    });

    if (!initialOrders) {
        return <div>Loading...</div>;
    }

    // Update local state only; do not call onFilterChange here.
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };


    // Filter orders based on search inputs

    function getFilteredOrders(initialOrders, filters) {
        // Safely map all filter values to lowercase (or empty string if not present)
        const filterOrderId = (filters.orderId ?? '').toLowerCase();
        const filterDate = (filters.date ?? '').toLowerCase();
        const filterTime = (filters.time ?? '').toLowerCase();
        const filterCustomer = (filters.customer ?? '').toLowerCase();
        const filterItems = filters.items ?? '';
        const filterStatus = (filters.status ?? '').toLowerCase();
        const filterPrice = filters.price ?? '';

        const filteredOrders = initialOrders.filter((order) => {
            // Guard against missing order object
            if (!order) return false;

            // Convert all fields to strings safely
            const orderIdString = (order._id?.slice(-6) ?? '').toLowerCase();
            const dateString = (getDate(order.pickupDate) ?? '').toLowerCase();
            const timeString = (order.pickupTime ?? '').toLowerCase();
            const customerName = (order.user?.name ?? '').toLowerCase();
            const totalItems = String(
                order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? ''
            );
            const statusString = (order.pickupStatus ?? '').toLowerCase();
            const totalPriceString = String(order.totalPrice ?? '');

            // Compare against filter values
            const matchesOrderId = orderIdString.includes(filterOrderId);
            const matchesDate = dateString.includes(filterDate);
            const matchesTime = timeString.includes(filterTime);
            const matchesCustomer = customerName.includes(filterCustomer);
            const matchesItems = totalItems.includes(filterItems);
            const matchesStatus = statusString.includes(filterStatus);
            const matchesPrice = totalPriceString.includes(filterPrice);

            return (
                matchesOrderId &&
                matchesDate &&
                matchesTime &&
                matchesCustomer &&
                matchesItems &&
                matchesStatus &&
                matchesPrice
            );
        });

        return filteredOrders;
    }

    const filteredOrders = getFilteredOrders(initialOrders, filters);

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <TableHeader
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </thead>
                    <tbody>
                        {/* Render filtered orders */}
                        {filteredOrders.length === 0 && (
                            <div className="p-4 text-center font-semibold  text-gray-500">
                                No orders found
                            </div>
                        )}
                        {filteredOrders.map((order) => (
                            <tr
                                key={order._id}
                                onClick={() => onOrderClick(order)}
                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                                        #{order._id.slice(-6)}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span>{getDate(order.pickupDate)}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full text-sm">
                                        {order.pickupTime
                                            ? getPickupTimeColor(
                                                  order.pickupTime
                                              )
                                            : 'N/A'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-500" />

                                        <span>
                                            {order.user?.name
                                                ? order.user.name
                                                : 'Guest'}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {order.items.reduce(
                                        (sum, item) => sum + item.quantity,
                                        0
                                    )}{' '}
                                    items
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${getOrderStatus(
                                            order
                                        )}`}
                                    >
                                        {order.pickupStatus}
                                    </span>
                                </td>
                                <td className="p-4 text-right font-bold">
                                    ${order.totalPrice.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;

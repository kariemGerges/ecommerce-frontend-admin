import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const OrderFilters = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        userId: '',
        startDate: '',
        endDate: '',
    });

    // For the status dropdown
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const statusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Ready', label: 'Ready' },
        { value: 'Processing', label: 'Processing' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Cancelled', label: 'Cancelled' },
    ];

    // Update local state only; do not call onFilterChange here.
    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Clears the filters and resets local state
    const clearFilters = () => {
        const cleared = {
            status: '',
            userId: '',
            startDate: '',
            endDate: '',
        };
        setFilters(cleared);
        setSelectedStatus('');
        // Optionally notify the parent that filters are cleared,
        // or keep it so the user must click Apply again.
        // onFilterChange(cleared);
    };

    // Actually apply filters (notify parent) only when user clicks "Apply"
    const applyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-500" />
                    <span className="font-medium">Filters</span>
                    {Object.values(filters).some((value) => value !== '') && (
                        <span className="bg-purple-100 text-purple-700 text-sm px-2 py-1 rounded-full">
                            Active
                        </span>
                    )}
                </div>
                <ChevronDown
                    size={20}
                    className={`text-gray-500 transform transition-transform ${
                        isOpen ? 'rotate-180 animate-bounce' : ''
                    }`}
                />
            </div>

            {isOpen && (
                <div className="p-4 border-t border-gray-100 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Status Filter */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full px-3 py-2 text-left text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    onClick={() =>
                                        setIsStatusDropdownOpen(
                                            !isStatusDropdownOpen
                                        )
                                    }
                                >
                                    {selectedStatus || 'Select Status'}
                                    <ChevronDown
                                        size={16}
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                                            isStatusDropdownOpen
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                    />
                                </button>
                                {isStatusDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                                        {statusOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
                                                onClick={() => {
                                                    setSelectedStatus(
                                                        option.label
                                                    );
                                                    handleFilterChange(
                                                        'status',
                                                        option.value
                                                    );
                                                    setIsStatusDropdownOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User ID Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                User ID
                            </label>
                            <input
                                type="text"
                                placeholder="Enter user ID"
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={filters.userId}
                                onChange={(e) =>
                                    handleFilterChange('userId', e.target.value)
                                }
                            />
                        </div>

                        {/* Start Date Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={filters.startDate}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'startDate',
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        {/* End Date Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={filters.endDate}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'endDate',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                        >
                            <X size={16} />
                            Clear Filters
                        </button>
                        <button
                            onClick={applyFilters}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderFilters;

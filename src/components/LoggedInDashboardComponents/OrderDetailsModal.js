import { useEffect } from 'react';
import { X, Calendar, User } from 'lucide-react';

const OrderDetailsModal = ({ selectedOrder, setSelectedOrder, getDate, getOrderStatus }) => {
    // Modal Component
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

    return (
        <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
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
                                            {getDate(selectedOrder.pickupDate)}
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
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatus(
                                                selectedOrder
                                            )}`}
                                        >
                                            {selectedOrder.pickupStatus}
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
                                                    item.price * item.quantity
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
    );
};

export default OrderDetailsModal;

import { Calendar, User } from 'lucide-react';
import { getPickupTimeColor } from '../../utils/getPickupTimeColor';

const OrderGridView = ({ orders, onOrderClick, getDate, getOrderStatus }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-4">
            {orders.map((order) => (
                <div
                    key={order._id}
                    onClick={() => onOrderClick(order)}
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
                            {order.pickupStatus}
                        </div>
                        <div className="flex items-center ">
                            <span className="px-3 py-1 rounded-full text-sm font-medium">
                                {getPickupTimeColor(order.pickupTime)}
                            </span>
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
                            <span className="text-sm">
                                {order.user?.name ? order.user.name : 'Guest'}
                            </span>
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
    );
};

export default OrderGridView;

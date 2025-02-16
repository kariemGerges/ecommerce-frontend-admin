import {
    AlertCircle,
    CheckCircle,
    Clock,
    Package,
    ShoppingBag,
} from "lucide-react";

const OrderStatsSection = ({ data }) => {
    return (
        <div className="bg-white border-b">
            <div className="mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Orders Dashboard
                </h1>
                <div className="grid md:grid-cols-3 sx:grid-cols-2 gap-4">
                    <div
                        className="bg-gradient-to-br from-emerald-600 
                                to-orange-300 rounded-2xl p-4 text-white md:col-span-2"
                    >
                        <div className="flex items-center gap-6 px-4 py-2">
                            
                            {/* Total Orders counter */}
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

                    {/* Total Items counter Section */}
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
    );
};

export default OrderStatsSection;

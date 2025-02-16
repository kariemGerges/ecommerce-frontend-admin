// import React, { useState, useContext, createContext } from 'react';
// import {
//     ShoppingCart,
//     AlertCircle,
//     Clock,
//     Check,
//     User,
//     Filter,
//     Search,
//     Package,
//     Apple,
// } from 'lucide-react';

// // Mock Grocery Order Data Context
// const OrderContext = createContext();

// // KPI Card Component
// const KPICard = ({ icon, label, value, color }) => (
//     <div className={`flex items-center p-4 bg-${color}-50 rounded-lg`}>
//         <div className={`mr-4 text-${color}-500`}>{icon}</div>
//         <div>
//             <p className="text-sm text-gray-500">{label}</p>
//             <p className="text-2xl font-bold">{value}</p>
//         </div>
//     </div>
// );

// // Sidebar for Grocery Store
// const Sidebar = () => (
//     <aside className="w-64 bg-white border-r p-4 shadow-md">
//         <div className="flex items-center mb-8">
//             <Apple className="mr-2 text-green-600" size={32} />
//             <h1 className="text-2xl font-bold text-green-800">Fresh Market</h1>
//         </div>
//         <nav>
//             <UserProfile />
//         </nav>
//     </aside>
// );

// // Order Summary KPIs
// const OrderSummaryKPIs = () => {
//     const { orders } = useContext(OrderContext);

//     const summaryStats = {
//         total: orders.length,
//         ready: orders.filter((o) => o.status === 'ready').length,
//         preparing: orders.filter((o) => o.status === 'preparing').length,
//         delayed: orders.filter((o) => o.isDelayed).length,
//     };

//     return (
//         <div className="col-span-4 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-green-800">
//                 Order Overview
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//                 <KPICard
//                     icon={<ShoppingCart />}
//                     label="Total Orders"
//                     value={summaryStats.total}
//                     color="green"
//                 />
//                 <KPICard
//                     icon={<Package />}
//                     label="Preparing"
//                     value={summaryStats.preparing}
//                     color="yellow"
//                 />
//                 <KPICard
//                     icon={<Check />}
//                     label="Ready"
//                     value={summaryStats.ready}
//                     color="green"
//                 />
//                 <KPICard
//                     icon={<AlertCircle />}
//                     label="Delayed"
//                     value={summaryStats.delayed}
//                     color="red"
//                 />
//             </div>
//         </div>
//     );
// };

// // Real-time Grocery Order List
// const RealTimeOrderList = () => {
//     const { orders } = useContext(OrderContext);
//     const [filter, setFilter] = useState('all');

//     const filteredOrders = orders.filter(
//         (order) => filter === 'all' || order.status === filter
//     );

//     return (
//         <div className="col-span-8 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-green-800">
//                 Current Orders
//             </h2>
//             <table className="w-full">
//                 <thead>
//                     <tr className="bg-green-100 text-left">
//                         <th className="p-2">Order ID</th>
//                         <th className="p-2">Customer</th>
//                         <th className="p-2">Items</th>
//                         <th className="p-2">Weight</th>
//                         <th className="p-2">Status</th>
//                         <th className="p-2">Pickup Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredOrders.map((order) => (
//                         <tr
//                             key={order.id}
//                             className={`border-b ${
//                                 order.isDelayed ? 'bg-red-50' : ''
//                             }`}
//                         >
//                             <td className="p-2 font-bold">{order.id}</td>
//                             <td className="p-2">{order.customerName}</td>
//                             <td className="p-2">
//                                 {order.items
//                                     .map(
//                                         (item) =>
//                                             `${item.quantity} x ${item.name}`
//                                     )
//                                     .join(', ')}
//                             </td>
//                             <td className="p-2">{order.totalWeight}</td>
//                             <td className="p-2">
//                                 <span
//                                     className={`
//                   px-2 py-1 rounded text-xs uppercase
//                   ${
//                       order.status === 'preparing'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : order.status === 'ready'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-gray-100 text-gray-800'
//                   }
//                 `}
//                                 >
//                                     {order.status}
//                                 </span>
//                             </td>
//                             <td
//                                 className={`p-2 ${
//                                     order.isDelayed
//                                         ? 'text-red-600 font-bold'
//                                         : ''
//                                 }`}
//                             >
//                                 {order.pickupTime}
//                                 {order.isDelayed && ' (Delayed)'}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// // Pickup Zone Management
// const PickupZoneManagement = () => {
//     const zones = [
//         { name: 'Zone A', capacity: '5/10', status: 'Active' },
//         { name: 'Zone B', capacity: '3/8', status: 'Active' },
//         { name: 'Zone C', capacity: '7/10', status: 'Near Capacity' },
//     ];

//     return (
//         <div className="col-span-6 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-green-800">
//                 Pickup Zones
//             </h2>
//             <div className="grid grid-cols-3 gap-4">
//                 {zones.map((zone) => (
//                     <div
//                         key={zone.name}
//                         className={`p-4 rounded-lg 
//               ${
//                   zone.status === 'Near Capacity'
//                       ? 'bg-yellow-50 border-yellow-300'
//                       : 'bg-green-50 border-green-300'
//               }
//               border
//             `}
//                     >
//                         <h3 className="font-bold mb-2">{zone.name}</h3>
//                         <p>Capacity: {zone.capacity}</p>
//                         <p
//                             className={`font-semibold ${
//                                 zone.status === 'Near Capacity'
//                                     ? 'text-yellow-700'
//                                     : 'text-green-700'
//                             }`}
//                         >
//                             {zone.status}
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // Order Alert Center
// const OrderAlertCenter = () => {
//     const { orders } = useContext(OrderContext);
//     const delayedOrders = orders.filter((order) => order.isDelayed);

//     return (
//         <div className="col-span-6 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-red-800">
//                 Urgent Alerts
//             </h2>
//             {delayedOrders.length > 0 ? (
//                 delayedOrders.map((order) => (
//                     <div
//                         key={order.id}
//                         className="bg-red-50 border-l-4 border-red-500 p-4 mb-2 rounded"
//                     >
//                         <p className="font-bold text-red-800">
//                             Delayed Order: {order.id}
//                         </p>
//                         <p>Customer: {order.customerName}</p>
//                         <p>Status: {order.status}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-green-600">
//                     No urgent alerts. All orders are on track.
//                 </p>
//             )}
//         </div>
//     );
// };

// // User Profile Component
// const UserProfile = () => {
//     const [isProfileOpen, setIsProfileOpen] = useState(false);

//     return (
//         <div className="relative">
//             <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center w-full hover:bg-green-100 p-2 rounded"
//             >
//                 <User className="mr-2" />
//                 Store Staff Profile
//             </button>
//             {isProfileOpen && (
//                 <div className="absolute left-full ml-2 mt-[-10px] bg-white border rounded shadow-lg p-4 w-64">
//                     <h3 className="font-bold mb-2 text-green-800">
//                         Staff Settings
//                     </h3>
//                     <div>
//                         <p>Current Shift: Morning</p>
//                         <p>Total Orders Today: 42</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Main Dashboard Component
// const GroceryOrderPickupDashboard = () => {
//     const [orders, setOrders] = useState([
//         {
//             id: 'GRO-001',
//             customerName: 'Emily Johnson',
//             pickupTime: '17:30',
//             status: 'ready',
//             items: [
//                 { name: 'Organic Apples', quantity: 2 },
//                 { name: 'Whole Milk', quantity: 1 },
//                 { name: 'Whole Wheat Bread', quantity: 1 },
//             ],
//             isDelayed: false,
//             orderType: 'online',
//             totalItems: 4,
//             totalWeight: '7.5 lbs',
//         },
//         {
//             id: 'GRO-002',
//             customerName: 'Michael Chen',
//             pickupTime: '18:15',
//             status: 'preparing',
//             items: [
//                 { name: 'Fresh Salmon', quantity: 1 },
//                 { name: 'Organic Spinach', quantity: 1 },
//                 { name: 'Greek Yogurt', quantity: 2 },
//             ],
//             isDelayed: true,
//             orderType: 'app',
//             totalItems: 4,
//             totalWeight: '5.2 lbs',
//         },
//     ]);

//     return (
//         <OrderContext.Provider value={{ orders, setOrders }}>
//             <div className="flex h-screen bg-green-50">
//                 <Sidebar />
//                 <main className="flex-grow p-6 overflow-hidden">
//                     <div className="grid grid-cols-12 gap-6">
//                         <OrderSummaryKPIs />
//                         <RealTimeOrderList />
//                         <PickupZoneManagement />
//                         <OrderAlertCenter />
//                     </div>
//                 </main>
//             </div>
//         </OrderContext.Provider>
//     );
// };

// export default GroceryOrderPickupDashboard;

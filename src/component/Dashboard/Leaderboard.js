// // src/components/Dashboard/Leaderboard.jsx
// "use client";
// import React from "react";
// import { FaMedal } from "react-icons/fa";

// const rankStyles = [
//   "text-yellow-400", // gold
//   "text-gray-400",   // silver
//   "text-amber-700"   // bronze
// ];

// const Leaderboard = ({ title, users = [] }) => (
//   <div className="bg-gradient-to-b from-yellow-100 via-yellow-50 to-white rounded-xl shadow-md p-4 w-full">
//     <div className="flex justify-between items-center mb-4">
//       <span className="text-xl font-semibold">{title}</span>
//       <span className="text-sm text-blue-600 font-medium">Top Performers</span>
//     </div>
//     {users.length === 0 ? (
//       <div className="flex flex-col items-center justify-center h-36 text-gray-500">
//         <FaMedal size={36} />
//         <span className="mt-2">No data available yet</span>
//       </div>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {users.slice(0, 3).map((u, idx) => (
//           <div key={u._id} className="bg-white p-4 rounded-lg shadow-md text-center">
//             <FaMedal size={28} className={`mx-auto ${rankStyles[idx]}`} />
//             <h3 className="mt-2 font-bold">{u.name}</h3>
//             <p className="text-gray-600">{u.totalApplications} Applications</p>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );

// export default Leaderboard;

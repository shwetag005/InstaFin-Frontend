'use client'; // 👈 this makes it a Client Component

import dynamic from 'next/dynamic';

const CountDashboard = dynamic(() => import('./CountDashboard'), {
  ssr: false,
});

export default function CountDashboardWrapper() {
  return <CountDashboard />;
}

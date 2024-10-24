import React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import AdminNavbar from '../components/AdminNavbar';

const Dashboard: React.FC = () => {
  const role = useSelector((state: any) => state.auth.user?.role);

  if (role === 'admin') {
    return <div className='flex flex-col'>
            <AdminNavbar />
            <AdminDashboard />;
      </div>
  } else {
    return <StaffDashboard />;
  }
};

export default Dashboard;

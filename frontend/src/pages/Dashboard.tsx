import React from 'react';
import { useSelector } from 'react-redux';
import StaffDashboard from './StaffDashboard';
import AdminNavbar from '../components/AdminNavbar';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const role = useSelector((state: any) => state.auth.user?.role);

  if (role === 'admin') {
    return <div className='flex flex-col'>
            <AdminNavbar />
            {/* <AdminDashboard />; */}
      </div>
  } else {
    return <Navbar />;
  }
};

export default Dashboard;

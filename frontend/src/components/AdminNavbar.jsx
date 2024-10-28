import React, { useState } from 'react';
import RegistrationPage from './RegistrationPage';
import UserList from '../pages/userList';
import AppraisalFormList from '../pages/appraisalFormList';
import AssignedFormPage from '../pages/assignedForm';
// import AppraisalFormList from '../pages/appraisalFormList';

const AdminNavbar = () => {
  const [activeItem, setActiveItem] = useState('Users');

  const navItems = [
    { label: 'Users', value: 'Users' },
    { label: 'User Registration', value: 'User Registration' },
    { label: 'Appraisal Forms', value: 'Appraisal Forms' },
    { label: 'Submitted Appraisal', value: 'Submitted Appraisal' },
    // { label: 'Team Association', value: 'Team Association' },
    { label: 'Form Association', value: 'Form Association' },
  ];

  return (
    <div className="w-full h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white w-64 h-full fixed">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <ul className="mt-6">
          {navItems.map((item) => (
            <li
              key={item.value}
              className={`p-4 text-lg cursor-pointer transition-colors duration-200 
                ${activeItem === item.value ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveItem(item.value)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Content area */}
      <div className="ml-64 p-6">
        {activeItem === 'User Registration' && <RegistrationPage setActiveItem={setActiveItem} />} 
        {activeItem === 'Users' && <UserList />} 
        {activeItem === 'Appraisal Forms' && <AppraisalFormList />} 
        {activeItem === 'Form Association' && <AssignedFormPage />} 
      </div>
    </div>
  );
};

export default AdminNavbar;
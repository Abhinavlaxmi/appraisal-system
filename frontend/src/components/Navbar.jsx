import React, { useState } from 'react';
import AssignedFormPage from '../pages/assignedForm';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Appraisal Forms');

  const navItems = [
    // { label: 'Users', value: 'Users' },
    { label: 'Appraisal Forms', value: 'Appraisal Forms' },
    { label: 'Submitted Appraisal', value: 'Submitted Appraisal' },
    // { label: 'Team Association', value: 'Team Association' },
    // { label: 'Form Association', value: 'Form Association' },
  ];

  return (
    <div className="w-full h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white w-64 h-full fixed">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
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
        {activeItem ==="Appraisal Forms" && <AssignedFormPage /> }
      </div>
    </div>
  );
};

export default Navbar;
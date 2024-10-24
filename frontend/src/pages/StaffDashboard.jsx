import React, { useEffect, useState } from 'react';
import axios from '../axiosinstances';
import { APIs } from '../services/APIs';
import { useSelector } from 'react-redux';

const StaffDashboard = () => {
  const [appraisals, setAppraisals] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        const response = await axios.get(`${APIs?.baseURL}/api/appraisals`);
        setAppraisals(response.data);
      } catch (error) {
        console.error('Error fetching appraisals:', error);
      }
    };

    fetchAppraisals();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
      <div>
        <h2 className="text-2xl font-semibold">Your Appraisals</h2>
        <ul>
          {appraisals.map((appraisal) => (
            <li key={appraisal._id} className="border p-4 rounded my-2">
              <p><strong>Participant:</strong> {appraisal.participant.name}</p>
              <p><strong>Appraiser:</strong> {appraisal.appraiser.name}</p>
              <p><strong>Type:</strong> {appraisal.type}</p>
              <ul>
                {appraisal.responses.map((response) => (
                  <li key={response.question._id}>
                    <strong>{response.question.questionText}:</strong> {response.answer}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StaffDashboard;
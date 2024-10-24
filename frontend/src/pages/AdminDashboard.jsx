import React, { useState, useEffect } from 'react';
import axios from '../axiosinstances';
import { APIs } from '../services/APIs';
import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../../services/redux/slices/authSlice';
// import { themeHandler } from '../../services/redux/slices/themeSlice';

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [participantId, setParticipantId] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [peersIds, setPeersIds] = useState([]);
  const [juniorsIds, setJuniorsIds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${APIs?.baseURL}/api/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${APIs?.baseURL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchQuestions();
    fetchUsers();
  }, []);

  const handleMapParticipants = async () => {
    try {
      await axios.post(`${APIs?.baseURL}/api/users/map`, {
        participantId,
        supervisorId,
        peersIds,
        juniorsIds,
      });
      alert('Participants mapped successfully');
    } catch (error) {
      console.error('Error mapping participants:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Appraisal Questions</h2>
        <ul>
          {questions.map((q) => (
            <li key={q._id}>{q.questionText}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Map Participants</h2>
        <div className="mb-4">
          <label className="block mb-2">Participant</label>
          <select
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Participant</option>
            {users.filter(u => u.role !== 'admin').map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Supervisor</label>
          <select
            value={supervisorId}
            onChange={(e) => setSupervisorId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Supervisor</option>
            {users.filter(u => u.role === 'supervisor').map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        {/* Implement multi-select for peers and juniors */}
        <button
          onClick={handleMapParticipants}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Map Participants
        </button>
      </div>

      {/* Add more admin functionalities as needed */}
    </div>
  );
};

export default AdminDashboard;

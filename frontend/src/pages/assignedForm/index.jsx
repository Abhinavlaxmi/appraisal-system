import React, { useEffect, useState } from 'react';
import { APIs } from '../../services/APIs';
import axios from '../../axiosinstances';
import { useSelector } from 'react-redux';

const AssignedFormPage = () => {
    const [assignedForms, setAssignedForms] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [forms, setForms] = useState([])
    const [users, setUsers] = useState([])
    const role = useSelector((state) => state.auth.user?.role);

    const allQuestions = async () => {
        try {
            const response = await axios.get(`${APIs?.getQuestions}`);
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
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

    const getAllAssociation = async () => {
        try {
            const response = await axios.get(`${APIs?.getAllAssociation}`);
            setAssignedForms(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if(role ==='admin'){
            allQuestions();
            fetchUsers();
        }
        getAllAssociation();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedForm && selectedUser) {
                const selectedFormDetails = forms.find(form => form._id === selectedForm);
                const selectedUserDetails = users.find(user => user._id === selectedUser);     
                
                const newAssignment = {
                    assignedTo: selectedUserDetails,
                    questionForm: selectedFormDetails,
                };
                await axios.post(`${APIs.createAssociation}`, newAssignment)
                getAllAssociation();
                resetForm();
                setIsPopupOpen(false);
            }
        } catch (error) {
            console.error('Error association:', error);
        }
    };

    const resetForm = () => {
        setSelectedForm('');
        setSelectedUser('');
    };

    return (
        <div className="min-h-screen flex flex-col p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Assigned Forms</h1>
                {role === "admin" &&
                    <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => setIsPopupOpen(true)}
                >
                    Assign
                </button>}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Assigned To</th>
                            <th className="px-4 py-2">Form Title</th>
                            <th className="px-4 py-2">Questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedForms.map((assignment, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{assignment.assignedTo.name}</td>
                                <td className="px-4 py-2">{assignment.questionForm.title}</td>
                                <td className="px-4 py-2">
                                    {assignment.questionForm.questions.join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Assign Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select Form</label>
                                <select
                                    value={selectedForm}
                                    onChange={(e) => setSelectedForm(e.target.value)}
                                    required
                                    className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Select a form</option>
                                    {forms.map(form => (
                                        <option key={form.id} value={form._id}>
                                            {form.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select User</label>
                                <select
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                    required
                                    className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Select a user</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user._id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="px-4 py-2 mr-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                                    onClick={() => setIsPopupOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Assign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignedFormPage;
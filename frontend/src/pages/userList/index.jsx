import React, { useEffect, useState } from 'react';
import axios from '../../axiosinstances';
import { APIs } from '../../services/APIs';

const UserList = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${APIs?.baseURL}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    console.log(users, "User list")

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b border-gray-200 text-left">User Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Role</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Email</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user?.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">{user?.name}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{user?.role}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{user?.email}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{user?.manager?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;

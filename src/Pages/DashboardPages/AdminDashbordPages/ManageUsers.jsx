import React from 'react';
import { useQuery } from 'react-query';

const ManageUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`);
            const data = await res.json();
            return data;
        }
    });

    const handleRole = (role, id) => {
        const body = {
            id: id,
            role: role
        }

        fetch(`http://localhost:5000/update-user-role`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount>0){
                refetch();
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(user => <>
                                <tr className="bg-base-200">
                                    <td>{user?.name}</td>
                                    <td>
                                        {user?.role == 'admin' ? 'Admin': ''}
                                        {user?.role == 'student' ? 'Student': ''}
                                        {user?.role == 'instructor' ? 'Instructor': ''}
                                    </td>
                                    <td>
                                        <button onClick={()=>handleRole('admin', user._id)}>Make Admin</button> <br />
                                        <button onClick={()=>handleRole('instructor', user._id)}>Make Instructor</button> <br />
                                        <button onClick={()=>handleRole('student', user._id)}>Make Student</button>
                                    </td>
                                </tr>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
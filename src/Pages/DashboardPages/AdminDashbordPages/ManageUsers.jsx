import React from 'react';
import { useQuery } from 'react-query';

const ManageUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`https://summer-camp-school-server-pi.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    });

    const handleRole = (role, id) => {
        const body = {
            id: id,
            role: role
        }

        fetch(`https://summer-camp-school-server-pi.vercel.app/update-user-role`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })
    }
    return (
        <div className='w-full px-6'>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <>
                                <tr className="bg-base-200 border-t-2">
                                <td>{index + 1}</td>
                                    <td><img className='h-16 w-16' src={user?.photo} alt="" /></td>
                                    <td>{user?.name}</td>
                                    <td>
                                        {user?.role == 'admin' ? 'Admin' : ''}
                                        {user?.role == 'student' ? 'Student' : ''}
                                        {user?.role == 'instructor' ? 'Instructor' : ''}
                                    </td>
                                    <td >
                                        <button className="btn btn-xs btn-primary" onClick={() => handleRole('admin', user._id)}>Make Admin</button> <br />
                                        <button className="btn  btn-xs btn-primary my-2" onClick={() => handleRole('instructor', user._id)}>Make Instructor</button> <br />
                                        <button className="btn  btn-xs btn-primary" onClick={() => handleRole('student', user._id)}>Make Student</button>
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
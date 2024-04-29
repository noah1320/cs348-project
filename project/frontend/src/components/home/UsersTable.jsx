import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { CiFilter } from "react-icons/ci";


const UsersTable = ({ users }) => {
  const [display, setDisplay] = useState('Name');
  const [showFilterBox, setShowFilterBox] = useState(false); 
  const handleFilterSelect = (filter) => {
    setDisplay(filter);
  };
  const sortedUsers = [...users].sort((a, b) => {
    if (display === 'Name') {
        return a.name.localeCompare(b.name);
    } else if (display === 'Email') {
        return a.email.localeCompare(b.email);
    } else if (display === 'UserID') {
        return a.user_id - b.user_id;
    } else {
        return 0;
    }
  });
  return (
    <div> 
        <div className='flex justify-between items-center'>
            <div className="flex items-center">
                <h1 className='text-3xl my-8'>User List</h1>
                <CiFilter onClick={() => setShowFilterBox(!showFilterBox)} /> {/* Pass onClick handler to toggle filter box visibility */}
                {showFilterBox && (
                <div className="bg-white border border-gray-300 p-4 rounded shadow-md z-10">
                    <div>
                    <label htmlFor="filter">Filter:</label>
                    <select id="filter" value={display} onChange={(e) => handleFilterSelect(e.target.value)}>
                        <option value="Name">Name</option>
                        <option value="Email">Email</option>
                        <option value="UserID">User ID</option>
                    </select>
                    </div>
                </div>
                )}
            </div>
        </div>
        <table className='w-full border-separate border-spacing-2'>
        <thead>
            <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Name</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
                Email
            </th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
                User_id
            </th>
            {/* <th className='border border-slate-600 rounded-md max-md:hidden'>
                Price ($)
            </th>
            <th className='border border-slate-600 rounded-md'>Operations</th> */}
            </tr>
        </thead>
        <tbody>
            {sortedUsers.map((user, index) => (
            <tr key={user._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                {user.name}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                {user.email}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                {user.user_id}
                </td>

            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default UsersTable;
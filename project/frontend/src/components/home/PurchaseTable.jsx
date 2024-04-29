import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { CiFilter } from "react-icons/ci";


const PurchaseTable = ({ transactions }) => {
  const [display, setDisplay] = useState('Name');
  const [showFilterBox, setShowFilterBox] = useState(false); 
  const handleFilterSelect = (filter) => {
    setDisplay(filter);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };
  const sortedTransaction = [...transactions].sort((a, b) => {
    if (display === 'Name') {
      return a.game.title.localeCompare(b.game.title);
    } else if (display === 'Email') {
      return a.email.localeCompare(b.email);
    } else if (display === 'UserID') {
      return a.user_id - b.user_id;
    } else if (display === 'Transaction_id') {
      return a.transaction_id - b.transaction_id;
    } else if (display === 'Price') {
      return a.price - b.price;
    } else if (display === 'Date') {
      return new Date(a.purchased_date) - new Date(b.purchased_date);
    }
  });

  return (
    <div>
      <div className='flex justify-between items-center'>
        

        <div className="flex items-center">
          <h1 className='text-3xl my-8'>Purchase List</h1>
            <CiFilter onClick={() => setShowFilterBox(!showFilterBox)} /> {/* Pass onClick handler to toggle filter box visibility */}
              {showFilterBox && (
                <div className="bg-white border border-gray-300 p-4 rounded shadow-md z-10">
                  <div>
                    <label htmlFor="filter">Filter:</label>
                    <select id="filter" value={display} onChange={(e) => handleFilterSelect(e.target.value)}>
                        <option value="Name">Game Title</option>
                        <option value="UserID">User ID</option>
                        <option value="Transaction_id">Transaction ID</option>
                        <option value="Price">Price</option>
                        <option value="Date">Date</option>
                    </select>
                    </div>
                </div>
                )}
            </div>
            <h1>Number of games sold: {transactions.length}</h1>

        </div>


      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Game Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
              User id
            </th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
              Transaction ID
            </th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
              Price ($)
            </th>
            <th className='border border-slate-600 rounded-md'>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransaction.map((transaction, index) => (
            <tr key={transaction._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>
                {index + 1}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                {transaction.game.title}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {transaction.user_id}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {transaction.transaction_id}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {transaction.price}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {formatDate(transaction.purchased_date)}
              </td>
                {/* <div className='flex justify-center gap-x-4'>
                  <Link to={`/games/details/${game._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/games/edit/${game._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/games/delete/${game._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { CiFilter } from "react-icons/ci";


const GamesTable = ({ games }) => {
  const [showFilterBox, setShowFilterBox] = useState(false); 
  const [display, setDisplay] = useState('Title'); 
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {

      axios
      .get('http://localhost:5555/transactions')
      .then((response) => {
        setRevenue(response.data.revenue);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const handleFilterSelect = (filter) => {
    setDisplay(filter); 
  };
  const sortedGames = [...games].sort((a, b) => {
    if (display === 'Title') {
      return a.title.localeCompare(b.title);
    } else if (display === 'Company') {
      return a.company.localeCompare(b.company);
    } else if (display === 'PublishedYear') {
      return a.published_year - b.published_year;
    } else if (display === 'Price') {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  return (
    // <div> hi </div>
    <div>
      <div className='flex justify-between items-center'>
        <div className="flex items-center"> 
          <h1 className='text-3xl my-8'>Game List  </h1>
          <CiFilter onClick={() => setShowFilterBox(!showFilterBox)} /> 
          {showFilterBox && (
          <div className="bg-white border border-gray-300 p-4 rounded shadow-md z-10"> 
            <div>
              <label htmlFor="filter">Filter:</label>
              <select id="filter" value={display} onChange={(e) => handleFilterSelect(e.target.value)}>
                <option value="Title">Title</option>
                <option value="Company">Company</option>
                <option value="PublishedYear">Published Year</option>
                <option value="Price">Price</option>
              </select>
            </div>
          </div>
        )}

 
        </div>        
        <h2>Total games: {games.length} Revenue ($): {revenue} </h2>

        <Link to='/games/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {showFilterBox && (
          <div className="absolute top-full left-0 bg-white border border-gray-300 p-4 rounded shadow-md z-10"> {/* Filter box */}

            <div>
              <label htmlFor="filter">Filter:</label>
              <select id="filter">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </div>
        )}
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
              Company
            </th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
              Published Year
            </th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
              Price ($)
            </th>
            <th className='border border-slate-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game, index) => (
            <tr key={game._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>
                {index + 1}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                {game.title}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {game.company}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {game.published_year}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {game.price}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/games/details/${game._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/games/edit/${game._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/games/delete/${game._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GamesTable;
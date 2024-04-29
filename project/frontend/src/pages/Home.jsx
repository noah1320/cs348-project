import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import GamesTable from '../components/home/GamesTable';
import UsersTable from '../components/home/UsersTable';
import PurchaseTable from '../components/home/PurchaseTable';

const Home = () => {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('Game');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/games')
      .then((response) => {
        setGames(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      axios
      .get('http://localhost:5555/users')
      .then((response) => {
        setUsers(response.data.data);
        console.log(users);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      axios
      .get('http://localhost:5555/transactions')
      .then((response) => {
        setTransactions(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  return (
    // <div>hi </div>
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('Game')}
        >
          Games
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('user')}
        >
          Users
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('transaction')}
        >
          Transaction
        </button>

      </div>

      
      {loading ? (
        <Spinner />
      ) : showType === 'Game' ? (
        <GamesTable games={games} />
      ) : showType === 'user' ? (
        <UsersTable users={users} />
      ) : showType === 'transaction' ? (
        <PurchaseTable transactions={transactions} />): hi
      }
    </div>
  );
};

export default Home;
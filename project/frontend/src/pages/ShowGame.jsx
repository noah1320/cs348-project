import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';



const ShowGame = () => {
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [dlcs, setDlc] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/games/${id}`)
      .then((response) => {
        console.log(response.data)
        setGame(response.data.data);
        setCount(response.data.count)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      axios
        .get(`http://localhost:5555/dlc/${game.game_id}`)
        .then((response) => {
          setDlc(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

      
  }, []);

  return (

    <div className='p-4'>
      
      <BackButton />
      <h1 className='text-3xl my-4 centered'>{game.title}  </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>id</span>
            <span>{game.game_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description</span>
            <span>{game.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Company</span>
            <span>{game.company}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{game.published_year}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Sale</span>
            <span>{count}</span>

            </div>
        </div>
      )}
    </div>
  );
};

export default ShowGame;
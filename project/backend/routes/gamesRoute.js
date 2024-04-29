import express  from "express";
import  Game  from "../models/gameModel.js";

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      const newGame = {
        game_id: request.body.id,
        title: request.body.title,
        company: request.body.company,
        published_year: request.body.published_year,
        price: request.body.price,
      };
  
      const game = await Game.create(newGame);
  
      return response.status(201).send(game);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.get('/', async (request, response) => {
    try {
      const games = await Game.find({});
      // console.log(games);
      return response.status(200).json({
        count: games.length,
        data: games,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const game = await Game.findById(id);
  
      return response.status(200).json(game);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.put('/:id', async (request, response) => {
    try {
 
  
      const { id } = request.params;
  
      const result = await Game.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Game not found' });
      }
  
      return response.status(200).send({ message: 'Game updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Game.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Game not found' });
      }
  
      return response.status(200).send({ message: 'Game deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
export default router;
import express  from "express";
import  User  from "../models/userModel.js";

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      // if (
      //   !request.body.title ||
      //   !request.body.company
      // ) {
      //   return response.status(400).send({
      //     message: 'Overlapping Game_ID',
      //   });
      // }
      const newUser = {
        name: request.body.name,
        email: request.body.email,
        user_id: request.body.user_id,
      };
  
      const game = await User.create(newUser);
  
      return response.status(201).send(game);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.get('/', async (request, response) => {
    try {
      const users = await User.find({});
      console.log(users);
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
      if (
        !request.body.title ||
        !request.body.company
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
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
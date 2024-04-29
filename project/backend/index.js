import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Game } from "./models/gameModel.js";
import { User } from "./models/userModel.js";
import { Purchase } from "./models/purchaseModel.js";
import { Dlc } from "./models/dlcModel.js";

// import gamesRoute from "./routes/gamesRoute.js";
// import userRoute from "./routes/userRoute.js";

import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use('/games', gamesRoute);
// app.use('/user', userRoute);


app.get('/', (request, response) =>{
    console.log(request);
    return response.status(234).send('Welcome')
});



mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('Connected');
        app.listen(PORT, () => {
            console.log(`App is listening to ${PORT}`)
        })
    }).catch((error)=> {
        console.log(error)
    })



// GAME
app.post('/games', async (request, response) => {
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
  
app.get('/games', async (request, response) => {
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
  
app.get('/games/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const game = await Game.findById(id);
      const result = await Purchase.find({ game_id: game.game_id });
      return response.status(200).json({
        count: result.length,
        data: game,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
app.put('/games/:id', async (request, response) => {
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
  
app.delete('/games/:id', async (request, response) => {
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

// USER
app.post('/users', async (request, response) => {
    try {
      const newUser = {
        name: request.body.name,
        email: request.body.email,
        user_id: request.body.user_id,

      };
  
      const user = await User.create(newUser);

      return response.status(201).send(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
app.get('/users', async (request, response) => {
    try {
      const users = await User.find({});
      // console.log(games);
      return response.status(200).json({
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
app.get('/users/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const user = await User.findById(id);
  
      return response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
app.put('/users/:id', async (request, response) => {
    try {
 
  
      const { id } = request.params;
  
      const result = await User.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
app.delete('/users/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await User.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


//transaction
app.post('/transactions', async (request, response) => {
  try {
    const newPurchase = {
      transaction_id: request.body.transaction_id,
      purchased_date: request.body.purchased_date,
      price: request.body.price,
      game_id: request.body.game_id,
      user_id: request.body.user_id,
    };
    // console.log(newPurchase)

    const user = await Purchase.create(newPurchase);

    const trasactions = await Purchase.find({});
    // console.log(games);
    return response.status(200).json({
      count: trasactions.length,
      data: trasactions,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});





app.get('/transactions', async (request, response) => {
  try {
    const transactions = await Purchase.aggregate([
      {
        $lookup: {
          from: "games", 
          localField: "game_id", 
          foreignField: "game_id", 
          as: "game" 
        }
        
      }
      ,
      {
        $unwind: "$game" 
      }
    ]);

    const trans = await Purchase.find({}); 

    const totalRevenue = trans.reduce((acc, trans) => acc + trans.price, 0);

    return response.status(200).json({
      count: transactions.length,
      data: transactions,
      revenue: totalRevenue,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});



import logger from "./libs/utils/logger";
import express from 'express'
import { Request, Response } from "express";
import cors from "cors";

// Services
import "./libs/services/database";

// API'S
import API from '../src/libs/api/index';
// import * as ORM from "../src/libs/utils/orm";
// import * as DB from "../src/libs/models";


const app = express();

// app.use(cors({
//     origin: '*'
// }));
  
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with the actual origin of your front end
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Allow cookies to be included in the request
    })
  );
  


// Middleware to parse request body
app.use(express.json());

// Beginning
app.get('/', (req, res) => {
    return res.send('Localify - API Server')
})

// User
app.post('/api/user/createuser', API.User.createUser);
app.post('/api/user/login', API.User.login);


// To check if API is still alive
app.get(`/healthcheck`, (req, res) => {
    res.send('OK')
  })


// ending
const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    logger.info(`REST API is listening on ${PORT}`)
  })
  
  export default app;
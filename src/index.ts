import logger from "./libs/utils/logger";
import express from 'express'
import { Request, Response } from "express";

// Services
import "./libs/services/database";

// API'S
import API from '../src/libs/api/index';
// import * as ORM from "../src/libs/utils/orm";
// import * as DB from "../src/libs/models";


const app = express();

// Middleware to parse request body
app.use(express.json());

// Beginning
app.get('/', (req, res) => {
    return res.send('Localify - API Server')
})

// User
// creates an user
app.post('/api/user/createuser', API.User.createUser);



app.get(`/healthcheck`, (req, res) => {
    res.send('OK')
  })


// ending
const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    logger.info(`REST API is listening on ${PORT}`)
  })
  
  export default app;
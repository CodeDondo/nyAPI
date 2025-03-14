import express from 'express';
import dbConfig from '../config/dbConfig.js';

export const dbController = express.Router();

dbController.get('/sync', async (req, res) => {
    try {
        const resp = await dbConfig.sync({ force: true});
        res.send('Data succesfully synchronized');
    } 
    catch (error) {
        res.send(error);
    }
});
import express from 'express';
import { Authenticate, Authorize } from '../utils/authUtils.js';

export const authController = express.Router()

authController.post('/login', (req, res), next => { Authenticate(req, res) })
authController.get('/authroize', Authorize, (req, res, next) => { res.send({ message: 'You are logged in'}) })

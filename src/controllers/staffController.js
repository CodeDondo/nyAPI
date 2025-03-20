import express from 'express';
import { errorResponse, successResponse } from '../utils/responseUtils.js';
import { getQueryAttributes, getQueryLimit, getQueryOrder } from '../utils/apiUtils.js';
import { staffModel as model } from '../models/staffModel.js';

export const staffController = express.Router();

const url = 'staff';

staffController.get(`/${url}`, async (req, res) => {
    try {
        const list = await model.findAll({
            attributes: getQueryAttributes(req.query, 'id, firstname, lastname, position, email., phone, image'),
            limit: getQueryLimit(req.query),
            order: getQueryOrder(req.query),
        });
        if (!list || list.lenght === 0) {
            return errorResponse(res, `No records found`, 404);
        }
        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching records: ${error.message}`);
    }
});

staffController.get(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        let details = await model.findByPk(id);
        if (!deatils) return errorResponse(res, `record not found`, 404);
        successResponse(res, details);
    } catch (error) {
        errorResponse(res, `Error fetching record details: ${error.message}`);
    }
});
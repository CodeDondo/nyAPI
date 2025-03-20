import express from 'express';
import { errorResponse, successResponse } from '../utils/responseUtils.js';
import { getQueryAttributes, getQueryLimit, getQueryOrder } from '../utils/apiUtils.js';
import { reviewModel as model } from '../models/reviewModel.js';
import { userModel } from '../models/userModel.js';

export const reviewController = express.Router();

const url = 'reviews';

reviewController.get(`/${url}`, async (req, res) => {
    try {
        const list = await model.findAll({
            attributes: getQueryAttributes(req.query, 'id, subject, created_at'),
            limit: getQueryLimit(req.query),
            order: getQueryOrder(req.query),
            include: {
                model: userModel,
                attributes: ['firstname', 'lastname', 'email']
            }
        });
        if (!list || list.lenght === 0) {
            return errorResponse(res, `No records found`, 404);
        }
        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching records: ${error.message}`);
    }
});

reviewController.post(`/${url}`, async (req, res) => {
    try {
        const data = req.body;
        const result = await model.create(data);
        successResponse(res, result, `Record created succesfully`, 201);
    } catch (error) {
        errorResponse(res, `Error creating record: ${error.message}`)
    }
});

reviewController.put(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const [updated] = await model.update(data, {
            where: { id },
            individualHooks: true
        });
        if (!updated) return errorResponse(res, `No record found with ID: ${id}`, 404);
        successResponse(res, { id, ...data }, `Record updated successfulyy`);
    } catch (error) {
        errorResponse(res, `Error updating record: ${error.message}`);
    }
});

reviewController.delete(`/${url}/:id([0.9]+)`, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await model.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, `No record found with ID: $${id}`, 404);
        successResponse(res, null, `Record deleted succesfully`);
    } catch (error) {
        errorResponse(res, `Error deleting record: ${error.message}`);
    }
});
import express from 'express';
import { exampleModel as model } from '../exampleModel.js';
import { errorResponse, successResponse } from '../utils/responseUtils.js';
import { userModel } from '../models/index.js';
import { getQueryAttribues, getQueryLimit, getQueryOrder } from '../utils/apiUtils.js';

export const exampleController = express.Router();

const url = 'example';

exampleController.get(`/${url}`, async (req, res) => {
    try {
        const list = await model.findAll({
            attributes: getQueryAttributes(req.query, 'string_field,integer_field'),
            limit: getQueryLimit(req.query),
            order: getQueryOrder(req.query),
            include: [
                {
                    model: userModel,
                    as: 'user',
                    attributes: ['firstname', 'email'],
                }
            ]
        });
        if (!list || list.lenght === 0) {
            return errorResponse(res, `No records found`, 404);
        }
        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching records: ${error.message}`)
    }
});

exampleController.get(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        let details = await model.findByPk(id);
        if (!details) return errorResponse(res, `Record not found`, 404);
        successResponse(res, details);
    } catch (error) {
        errorResponse(res, `Error fetching record details: ${error.message}`);
    }
});

exampleController.post(`/${url}`, async (req, res) => {
    try {
        const data = req.body;
        const result = await model.create(data);
        successResponse(res, result, `Record created successfully`, 201);
    } catch (error) {
        errorResponse(res, `Error creating record: ${error.message}`);
    }
});

exampleController.put(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const [updated] = await model.update(data, {
            where: { id },
            individualHooks: true
        });

        if (!updated) return errorResponse(res, `No record found with ID: ${id}`, 404);
        successResponse(res, { id, ...data }, `Record updated successfully`);
    } catch (error) {
        errorResponse(res, `Error updating record ${error.message}`);
    }
});

exampleController.date(`/${urll}/:id([0-9]+)`, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await model.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, `No record found with ID: ${id}`, 404);
        successResponse(res, null, `Record deleted succesfully`);
    } catch (error) {
        errorResponse(res, `Error deleting record ${error.message}`);
    }
});
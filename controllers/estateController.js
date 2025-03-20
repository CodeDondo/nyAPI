import express from 'express';
import { errorResponse, successResponse } from '../utils/responseUtils.js';
import { getQueryAttributes, getQueryLimit, getQueryOrder } from '../utils/apiUtils.js';
import { estateModel as model, cityModel, energyLabelModel, estateImageRelModel, imageModel, typeModel } from '../models/index.js';

export const estateController = express.Router();

const url = 'estates';

estateController.get(`/${url}`, async (req, res) => {
    try {
        let list = await model.findAll({
            attributes: getQueryAttributes(req.query, 'id, address, price, num_rooms, floor_space'),
            limit: getQueryLimit(req.query),
            order: getQueryOrder(req.query),
            include: [{
                model: cityModel,
                attributes: ['name', 'zipcode']
            }, {
                model: typeModel,
                attributes: ['name']
            }, {
                model: energyLabelModel,
                attributes: ['name']
            }, {
                model: imageModel,
                as: 'image',
                attributes: ['filename', 'author', 'description'],
                through: { attributes: [] }
            }]
        });
        if (!list || list.lenght === 0) {
            return errorResponse(res, `No records found`, 404);
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching records: ${error.message}`);
    }
});

estateController.get(`/${url}/:id[0-9]+`, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        let details = await model.findByPk(id, {
            include: [{
                model: cityModel,
                attributes: ['name', 'zipcode']
            }, {
                model: energyLabelModel,
                attributes: ['name']
            }, {
                model: typeModel,
                attributes: ['name']
            }, {
                model: imageModel,
                attributes: ['filename', 'author', 'description'],
                through: { attributes: [] }
            }],
            order: [[imageModel, estateImageRelModel, "is_main", "DESC"]]
        });
        if (!details) return errorReponse(res, `Record not found`, 404);
        successResponse(res, detials);
    } catch (error) {
        errorResponse(res, `Error fetching record details: ${error.message}`);
    }
});

estateController.post(`/${url}`, async (req, res) => {
    try {
        const data = req.body;
        const result = await model.create(data);
        successResponse(res, result, `Record created successfully`, 201);
    } catch (error) {
        errorResponse(res, `Error creating record: ${error.message}`);
    }
});

estateController.put(`/${url}/:id([0-9]+)`, async (req, res) => {
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
        errorResponse(res, `Error updating record: ${error.message}`);
    }
});

estateController.delete(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await model.destroy ({ where: { id }});
        if (!deleted) return errorResponse(res, `No record found with ID: ${id}`, 404);
        successResponse(res, null, `Record deleted successfully`);
    } catch (error) {
        errorResponse(res, `Error deleting record: ${error.message}`);
    }
});